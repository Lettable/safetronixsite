"use client";
import MetaBalls from "@/components/layout/MetaBalls";
import { TypingText } from "../animate-ui/text/typing";

export default function Loading() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black">
            <div className="w-60 h-60 relative z-0">
                <MetaBalls
                    color="#ffffff"
                    cursorBallColor="#ffffff"
                    cursorBallSize={1.5}
                    ballCount={12}
                    animationSize={20}
                    enableMouseInteraction={true}
                    enableTransparency={true}
                    hoverSmoothness={0.05}
                    clumpFactor={1}
                    speed={0.6}
                />
            </div>

            <p className="text-white mt-6 text-lg font-medium tracking-wide min-h-[1.5em]">
                <TypingText text="Loading..." loop />
            </p>

        </div>
    );
}
