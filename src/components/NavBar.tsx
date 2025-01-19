import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { Linkedin } from "lucide-react";
import Link from "next/link";
import { Card } from "./ui/card";

export default function NavBar(){
    return(
        <header className="flex justify-between p-10 items-center">
           
            <nav>
                <ul className="flex gap-4">
                <HoverCard >
  <HoverCardTrigger className="cursor-pointer">@Developer</HoverCardTrigger>
  <HoverCardContent>
    <Card  className="space-y-3 p-5 w-[200px] mt-4 mx-10">
    <span className="font-thin text-sm text-zinc-600">Hi, My name is Loid Padre, I´m software Developer</span>
    <Link href="https://www.linkedin.com/in/loidpadre/" className="text-blue-700">
    <div className="flex gap-2">
    <Linkedin size={20} /> <span className="text-sm">Loid Padre</span></div></Link>
    </Card>
  </HoverCardContent>
</HoverCard>
                </ul>
            </nav>
        </header>
    )
}