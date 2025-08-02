"use client"
import { Button } from "@/components/ui/button";
import { Shield, Users, Globe } from "lucide-react";
import SpotlightCard from "../layout/SpotlightCard";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center mt-[12rem] px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          A Coalition Against CSAM
        </h1>
        <h2 className="text-xl sm:text-2xl text-blue-200 mb-8 font-medium">
          Reporting, Detecting, and Preventing Exploitation
        </h2>
        
        <p className="text-lg text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          NoCSAM is an independent digital taskforce focused on reporting CSAM online. 
          Our mission is to assist global agencies and NGOs by providing automated reports and threat intelligence.
        </p>

        <div className="flex gap-4 flex-wrap justify-center mb-16">
          <Button
            onClick={() => {
              window.location.hash = "contact";
            }}
            className="px-8 py-4 text-lg rounded-full font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-lg"
          >
            Partner with us
          </Button>
          <Button
            onClick={() => {
              window.location.href = "/track-report";
            }}
            variant="outline"
            className="px-8 py-4 text-lg rounded-full font-medium text-white border-white/20 hover:bg-white/10 transition-all duration-200"
          >
            Track Report
          </Button>
        </div>

        {/* NGO Partnership Section */}
        <SpotlightCard
          className="custom-spotlight-card p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
          spotlightColor="rgba(59, 130, 246, 0.1)"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Seeking Partnerships</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center opacity-60">
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-blue-400 mb-2" />
                <span className="text-sm text-gray-300">INHOPE</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-12 h-12 text-blue-400 mb-2" />
                <span className="text-sm text-gray-300">NCMEC</span>
              </div>
              <div className="flex flex-col items-center">
                <Globe className="w-12 h-12 text-blue-400 mb-2" />
                <span className="text-sm text-gray-300">IWF</span>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-12 h-12 text-blue-400 mb-2" />
                <span className="text-sm text-gray-300">Your NGO</span>
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}