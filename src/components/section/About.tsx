"use client";

import { ShieldCheck, Flame, Radar } from "lucide-react";
import SpotlightCard from "../layout/SpotlightCard";
import { useEffect } from "react";

const features = [
    {
        icon: <ShieldCheck className="h-10 w-10 text-white" />,
        title: "Real-Time Defense",
        description: "Rapidly identify and report harmful content to relevant authorities before it can cause damage, ensuring swift action and minimal exposure.",
    },
    {
        icon: <Flame className="h-10 w-10 text-white" />,
        title: "No Mercy Takedowns",
        description: "We don’t tolerate illegal or abusive content. Our team works tirelessly to escalate verified reports to enforcement agencies and digital platforms without delay.",
    },
    {
        icon: <Radar className="h-10 w-10 text-white" />,
        title: "Intelligent Detection",
        description: "Using advanced AI and continuous monitoring, we scan for patterns and threats 24/7, empowering proactive reporting and safer online environments.",
    },
];


export default function About() {
    useEffect(() => {
        if (window.location.hash === "#focus") {
            const el = document.getElementById("focus");
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, []);
    
    return (
        <div id="focus" className="pl-[12rem] pr-[12rem]">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-[10rem]">
                {features.map((item, index) => (
                    <SpotlightCard
                        key={index}
                        className="custom-spotlight-card p-6 flex flex-col justify-center gap-4 aspect-square border border-white/20 bg-white/10 backdrop-blur-md shadow-lg"

                        spotlightColor="rgba(219, 218, 226, 0.44)"
                    >
                        <div className="flex gap-3">
                            {item.icon}
                        </div>
                        <h1 className="text-xl font-semibold text-white">{item.title}</h1>
                        <h4 className="text-lg text-gray-300">{item.description}</h4>
                    </SpotlightCard>
                ))}
            </div>
        </div>
    );
}
