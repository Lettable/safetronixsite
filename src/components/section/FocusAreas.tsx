"use client";

import { Search, FileText, Shield } from "lucide-react";
import SpotlightCard from "../layout/SpotlightCard";
import { useEffect } from "react";

const focusAreas = [
  {
    icon: <Search className="h-12 w-12 text-blue-400" />,
    title: "Detection",
    description: "Identifying CSAM using AI-powered analysis combined with crowdsourced intelligence inputs from verified researchers and automated scanning systems.",
  },
  {
    icon: <FileText className="h-12 w-12 text-blue-400" />,
    title: "Reporting",
    description: "Forwarding structured, verified reports to official NGO databases and law enforcement agencies through secure, encrypted channels.",
  },
  {
    icon: <Shield className="h-12 w-12 text-blue-400" />,
    title: "Prevention",
    description: "Raising awareness about online safety, flagging bad actors and platforms, and providing educational resources to communities.",
  },
];

export default function FocusAreas() {
  useEffect(() => {
    if (window.location.hash === "#focus") {
      const el = document.getElementById("focus");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);
  
  return (
    <section id="focus" className="px-4 py-20 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Focus Areas</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive approach to combating child exploitation online
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mb-16">
          {focusAreas.map((area, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card p-8 flex flex-col items-center text-center gap-6 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
              spotlightColor="rgba(59, 130, 246, 0.1)"
            >
              <div className="flex justify-center">
                {area.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white">{area.title}</h3>
              <p className="text-gray-300 leading-relaxed">{area.description}</p>
            </SpotlightCard>
          ))}
        </div>

        {/* Tech Stack Section */}
        <SpotlightCard
          className="custom-spotlight-card p-8 text-center border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
          spotlightColor="rgba(59, 130, 246, 0.1)"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Built for Security & Compliance</h3>
          <p className="text-gray-300 mb-4">
            Our platform is built using secure Node.js APIs with MongoDB, following EU child safety guidelines 
            and international best practices for handling sensitive reports.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-300">
            <span className="px-3 py-1 bg-blue-900/30 rounded-full">End-to-End Encryption</span>
            <span className="px-3 py-1 bg-blue-900/30 rounded-full">GDPR Compliant</span>
            <span className="px-3 py-1 bg-blue-900/30 rounded-full">Zero-Knowledge Architecture</span>
            <span className="px-3 py-1 bg-blue-900/30 rounded-full">Audit Trail</span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}