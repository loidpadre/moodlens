import Image from "next/image";
import { TextRoll } from "./ui/text-roll";
import { TextEffect } from "./ui/text-effect";

export default function Banner(){
    return(
        <section className="w-[70%] m-auto mt-10 text-center relative lg:w-1/2 ">
            <Image src="/banner.png" alt="Banner image" width={300} height={600} className="lg:absolute  inset-0z-0 lg:right-[-250] top-[-100]"/>
        <div className="space-y-5 z-10 relative"  >
            <h1 className="text-3xl pb-4 text-blue-400  lg:text-6xl space-y-4 font-semibold">
            <TextEffect per='char' preset='fade' speedReveal={0.4}>
            MOODLENS, EMOÇÕES A PARTIR DO TEXTO. 
    </TextEffect>
            </h1>
            <TextRoll className=' text-2xl lg:text-4xl text-black dark:text-white'>
            Uma maneira de ver o estado emocional das pessoas através das palavras.
    </TextRoll>
            <p className="lg:text-[13px] lg:w-[60%] m-auto text-zinc-400">Descubra as emoções por trás das palavras com nosso aplicativo de análise de texto. Entenda como uma pessoa se sente com base no que escreve, com insights profundos e precisos para melhorar a comunicação e o bem-estar.</p>
        </div>
    </section>
    )
}