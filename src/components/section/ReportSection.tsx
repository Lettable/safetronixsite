"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Shield, Lock } from "lucide-react";
import SpotlightCard from "../layout/SpotlightCard";

export default function ReportSection() {
  return (
    <section className="px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Report CSAM</h2>
          <p className="text-xl text-gray-300">
            Help us protect children by reporting suspected content through official channels
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <SpotlightCard
            className="custom-spotlight-card p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
            spotlightColor="rgba(59, 130, 246, 0.1)"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-blue-400" />
              <h3 className="text-xl font-semibold text-white">INHOPE Network</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Report to the global network of hotlines dedicated to combating child sexual abuse material online.
            </p>
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => window.open('https://www.inhope.org/EN', '_blank')}
            >
              Report via INHOPE <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </SpotlightCard>

          <SpotlightCard
            className="custom-spotlight-card p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
            spotlightColor="rgba(59, 130, 246, 0.1)"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-red-400" />
              <h3 className="text-xl font-semibold text-white">NCMEC CyberTipline</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Submit reports directly to the National Center for Missing & Exploited Children's official reporting system.
            </p>
            <Button 
              className="w-full bg-red-600 hover:bg-red-700 text-white"
              onClick={() => window.open('https://www.missingkids.org/gethelpnow/cybertipline', '_blank')}
            >
              Report via CyberTipline <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </SpotlightCard>
        </div>

        <SpotlightCard
          className="custom-spotlight-card p-8 text-center border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
          spotlightColor="rgba(59, 130, 246, 0.1)"
        >
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-green-400" />
          </div>
          <h3 className="text-2xl font-semibold text-white mb-4">Submit Anonymously</h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            All reports are handled with complete confidentiality. Your identity is protected, 
            and no personal information is required to submit a report.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="px-4 py-2 bg-green-900/30 text-green-300 rounded-full">Anonymous Reporting</span>
            <span className="px-4 py-2 bg-blue-900/30 text-blue-300 rounded-full">Encrypted Transmission</span>
            <span className="px-4 py-2 bg-purple-900/30 text-purple-300 rounded-full">No Data Retention</span>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}