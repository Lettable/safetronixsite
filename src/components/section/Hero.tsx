"use client"
import TrueFocus from "../layout/TrueFocus";
import { ArrowRight } from "../animate-ui/icons/arrow-right"
import React from "react";


export default function HeroSection() {

    return (
        <section className="flex flex-col items-center justify-center text-center mt-[16rem]">
            <div
                onClick={() => {
                    window.location.hash = "report";
                }}
                className="group mb-6 px-4 py-1 rounded-full bg-black/30 text-sm font-medium text-white border border-white/20 backdrop-blur-md shadow-sm flex items-center gap-2 cursor-pointer"
            >
                Save a child’s life
                <span className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="w-full h-full" />
                </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-3xl leading-tight mb-10">
                <TrueFocus
                    sentence="Hunt. Neutralize. Report."
                    manualMode={false}
                    blurAmount={5}
                    borderColor="red"
                    animationDuration={2}
                    pauseBetweenAnimations={1}
                />
                Cyber threats don’t get second chances.
            </h1>

            <div className="flex gap-4 flex-wrap justify-center">
                <button
                    onClick={() => {
                        window.location.hash = "report";
                    }}
                    className="px-6 py-3 rounded-full font-medium text-black bg-white hover:bg-neutral-100 transition-all duration-200 shadow-lg backdrop-blur-md cursor-pointer"
                >
                    Report Away
                </button>
                <button
                    onClick={() => {
                        window.location.href = "discoveries";
                    }}
                    className="px-6 py-3 rounded-full font-medium text-white bg-black/30 border border-white/20 hover:bg-black/50 hover:border-white/30 transition-all duration-200 shadow-lg backdrop-blur-md cursor-pointer"
                >
                    Discoveries
                </button>
            </div>
        </section>
    )
}
