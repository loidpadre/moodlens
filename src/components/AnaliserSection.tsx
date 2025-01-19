'use client';

import "dotenv/config";
import { AnimatedGroup } from '../components/ui/animated-group';
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Magnetic } from './ui/magnetic';
interface Emotion {
    label: string;
    score?: number;
}

export default function AnaliserSection() {
    const [data, setData] = useState<Emotion[]>([]);  
    const [text, setText] = useState<string>("");  
    const [loading, setLoading] = useState<boolean>(false);  
    const [error, setError] = useState<string | null>(null);  
    const [estimatedTime, setEstimatedTime] = useState<number | null>(null); 
    const KEY_TOKEN = process.env.NEXT_PUBLIC_HF_API_KEY;
    const URL = process.env.NEXT_PUBLIC_URL;

    const analizer = async (e: FormEvent<HTMLFormElement>) => {  // Tipo para 'e'
        e.preventDefault();
        setLoading(true);
        setError(null);  
        setEstimatedTime(null);  

        try {
            if (text === "" || text === null) {  
                setLoading(false);
                return alert("Preencha o campo!");
            }

            const response = await axios.post(
                `${URL}`, 
                {
                    inputs: text,
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${KEY_TOKEN}`,
                        "Content-Type": "Application/json",
                    },
                }
            );

            setLoading(false);
            console.log(response.data); 

            if (response.data.error) {
                setError(response.data.error); 
                setEstimatedTime(response.data.estimated_time);  
            } else {
                const emotions = response.data[0]; 
                setData(emotions);  
            }

        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Erro ao analisar texto:", error.message);
                setLoading(false);
                setError("Ocorreu um erro ao processar a requisição, tente novamente");
            } else {
                console.error("Erro desconhecido:", error);
                setLoading(false);
                setError("Erro desconhecido, tente novamente");
            }
        }
    };

    const translateEmotion = (emotion: string) => {
        const translationMap: { [key: string]: string } = {
            sadness: "Tristeza",
            happiness: "Felicidade",
            anger: "Raiva",
            fear: "Medo",
            surprise: "Surpresa",
            disgust: "Nojo",
            joy: "Alegria",
            trust: "Confiança",
            anticipation: "Antecipação",
            love: "Amor",
            optimism: "Otimismo",
            pessimism: "Pessimismo",
            confusion: "Confusão",
            gratitude: "Gratidão",
            guilt: "Culpa",
            shame: "Vergonha",
            boredom: "Tédio",
            loneliness: "Solidão",
            envy: "Inveja",
        };
    
        return translationMap[emotion] || emotion;
    };

    return (
        <section className="w-[80%] m-auto mt-4 mb-20 lg:w-1/2">
            <form onSubmit={analizer}>
                <textarea
                    rows={6}
                    className="w-full mt-10 p-3 outline-none border-none text-zinc-600 resize-none border rounded"
                    placeholder="Digite o seu texto"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <Magnetic>
                    <Button className="w-full mt-4" type="submit" disabled={loading}>
                        {loading ? "Processando..." : "Enviar"}
                    </Button>
                </Magnetic>
            </form>

            {/* Exibir mensagem de erro ou tempo estimado */}
            {error && (
                <div className="mt-4 text-red-600">
                    {error}
                    {estimatedTime && (
                        <p>Tempo estimado para o modelo carregar: {estimatedTime} segundos.</p>
                    )}
                </div>
            )}

            <div>
                <AnimatedGroup
                    variants={{
                        container: {
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.05,
                                },
                            },
                        },
                        item: {
                            hidden: { opacity: 0, y: 40, filter: 'blur(4px)' },
                            visible: {
                                opacity: 1,
                                y: 0,
                                filter: 'blur(0px)',
                                transition: {
                                    duration: 1.2,
                                    type: 'spring',
                                    bounce: 0.3,
                                },
                            },
                        },
                    }}
                >
                    <div className='lg:flex gap-3 flex-wrap'>
                        {data && Array.isArray(data) && data.length > 0 && data.map((item, index) => (
                            <div className="w-full h mt-5 lg:w-[48%]" key={index}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="bg-zinc-800 p-2 rounded-sm text-white">
                                            <h1>{translateEmotion(item.label)}</h1>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="mt-2 pt-5">
                                        <span className="text-zinc-500">Pontuação: {item.score?.toFixed(4)}</span>
                                        <p className="mt-2 text-sm text-zinc-400">
                                            Aqui está a explicação do nível de {translateEmotion(item.label)}:
                                            {item.score && item.score >= 0.8 ? (
                                                <span className="font-thin text-red-500"> A pontuação de {item.score?.toFixed(2)} indica um nível muito alto de {translateEmotion(item.label)}. A emoção está bastante presente no texto, com uma forte intensidade.</span>
                                            ) : item.score && item.score >= 0.6 ? (
                                                <span className="font-thin text-yellow-500"> A pontuação de {item.score?.toFixed(2)} sugere um nível moderado de {translateEmotion(item.label)}. A emoção está perceptível, mas não é dominante no texto.</span>
                                            ) : item.score && item.score >= 0.2 ? (
                                                <span className="font-thin text-green-500"> A pontuação de {item.score?.toFixed(2)} indica um nível baixo de {translateEmotion(item.label)}. A emoção está presente, mas de forma sutil.</span>
                                            ) : (
                                                <span className="font-thin text-gray-500"> A pontuação de {item.score?.toFixed(2)} indica que a emoção {translateEmotion(item.label)} é quase inexistente ou muito fraca no texto.</span>
                                            )}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </AnimatedGroup>
            </div>
        </section>
    );
}
