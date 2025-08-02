"use client";

import { useEffect, useState } from "react";
import SpotlightCard from "../layout/SpotlightCard";
import { TrendingUp, Target, Users } from "lucide-react";

const stats = [
  {
    icon: <TrendingUp className="h-8 w-8 text-blue-400" />,
    number: 11420,
    label: "Reports forwarded to global hotlines",
    suffix: "",
  },
  {
    icon: <Target className="h-8 w-8 text-red-400" />,
    number: 23,
    label: "Child Exploitation Accounts submitted",
    suffix: "",
  },
  {
    icon: <Users className="h-8 w-8 text-green-400" />,
    number: 9,
    label: "NGOs engaged in outreach",
    suffix: "",
  },
];

function CountUp({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function ImpactSection() {
  useEffect(() => {
    if (window.location.hash === "#impact") {
      const el = document.getElementById("impact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section id="impact" className="px-4 py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Working together to make the internet safer for children worldwide
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card p-8 text-center border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
              spotlightColor="rgba(59, 130, 246, 0.1)"
            >
              <div className="flex justify-center mb-4">
                {stat.icon}
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <CountUp end={stat.number} />
                {stat.suffix}
              </div>
              <p className="text-gray-300 text-lg">{stat.label}</p>
            </SpotlightCard>
          ))}
        </div>

        <div className="mt-16 text-center">
          <SpotlightCard
            className="custom-spotlight-card p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
            spotlightColor="rgba(59, 130, 246, 0.1)"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Real Impact, Real Results</h3>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto">
              Every report matters. Our automated systems and human verification processes ensure that 
              critical information reaches the right authorities quickly and securely. Together, we're 
              building a safer digital world for children.
            </p>
          </SpotlightCard>
        </div>
      </div>
    </section>
  );
}