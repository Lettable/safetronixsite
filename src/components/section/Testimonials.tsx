"use client";

import { Quote } from "lucide-react";
import SpotlightCard from "../layout/SpotlightCard";

const testimonials = [
  {
    quote: "Thanks to NoCSAM, we were able to streamline our reporting process and ensure critical information reaches the right authorities quickly.",
    author: "Emily S.",
    role: "NGO Liaison Officer",
    organization: "Child Safety International"
  },
  {
    quote: "We encourage their work in bridging the gap between public reporting and official channels. Their commitment to privacy and security is exemplary.",
    author: "Carlos M.",
    role: "Director",
    organization: "Global Watchdog Foundation"
  },
  {
    quote: "The technical expertise and ethical approach of the NoCSAM team has been invaluable in our collaborative efforts to protect children online.",
    author: "Dr. Jennifer K.",
    role: "Research Director",
    organization: "Digital Safety Institute"
  }
];

export default function Testimonials() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Partners Say</h2>
          <p className="text-xl text-gray-300">
            Trusted by organizations worldwide in the fight against child exploitation
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
              spotlightColor="rgba(59, 130, 246, 0.1)"
            >
              <div className="flex justify-center mb-6">
                <Quote className="h-8 w-8 text-blue-400" />
              </div>
              <blockquote className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                "{testimonial.quote}"
              </blockquote>
              <div className="text-center">
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-blue-400 text-sm">{testimonial.role}</div>
                <div className="text-gray-400 text-sm">{testimonial.organization}</div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}