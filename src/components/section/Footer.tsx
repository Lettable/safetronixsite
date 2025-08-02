"use client";

import { Shield, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-md border-t border-white/10 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">NoCSAM</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              A coalition against child sexual abuse material, working to detect, report, 
              and prevent exploitation through technology and collaboration.
            </p>
            <div className="flex items-center gap-2 text-gray-400">
              <Mail className="w-4 h-4" />
              <span>contact@nocsam.org</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#focus" className="hover:text-white transition-colors">Focus Areas</a></li>
              <li><a href="#impact" className="hover:text-white transition-colors">Our Impact</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><Link href="/track-report" className="hover:text-white transition-colors">Track Report</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a 
                  href="https://www.inhope.org/EN" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  INHOPE <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.missingkids.org/gethelpnow/cybertipline" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  CyberTipline <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-gray-400 mb-4">
            © {new Date().getFullYear()} NoCSAM. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> NoCSAM does not host or store any explicit material. 
            All reports are anonymized and routed to official reporting hotlines only. 
            We operate as an independent organization and are not affiliated with any government agency.
          </p>
        </div>
      </div>
    </footer>
  );
}