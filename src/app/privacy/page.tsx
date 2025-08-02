"use client"
import { useState, useEffect } from "react";
import Loading from "@/components/section/Loading";
import Header from "@/components/section/Header";
import { Shield } from "lucide-react";
import Footer from "@/components/section/Footer";
import Aurora from "@/components/layout/Aurora";
import SpotlightCard from "@/components/layout/SpotlightCard";

export default function PrivacyPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: "Home", href: "/", type: "href" },
    { name: "Focus Areas", href: "/#focus", type: "href" },
    { name: "Impact", href: "/#impact", type: "href" },
    { name: "About", href: "/#about", type: "href" },
    { name: "Contact", href: "/#contact", type: "href" },
  ];

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-50 bg-black pointer-events-none" aria-hidden="true">
        <Aurora
          colorStops={["#1e3a8a", "#3b82f6", "#1e40af"]}
          blend={0.3}
          amplitude={0.8}
          speed={0.3}
        />
      </div>

      <Header
        logo={
          <div className="flex items-center gap-2 text-white font-semibold">
            <Shield className="w-6 h-6" />
            NoCSAM
          </div>
        }
        links={navLinks}
      />

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-300">
              How we protect your privacy and handle data
            </p>
          </div>

          <SpotlightCard
            className="custom-spotlight-card p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
            spotlightColor="rgba(59, 130, 246, 0.1)"
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 mb-6">
                <strong>Last updated:</strong> {new Date().toLocaleDateString()}
              </p>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Our Commitment</h2>
                  <p className="text-gray-300 leading-relaxed">
                    NoCSAM is committed to protecting the privacy and anonymity of all users. 
                    We understand the sensitive nature of reports related to child exploitation 
                    and have designed our systems with privacy-first principles.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
                  <div className="text-gray-300 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Report Data</h3>
                      <p>When you submit a report, we collect only the information necessary to process and forward it to appropriate authorities.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Technical Data</h3>
                      <p>We may collect basic technical information such as IP addresses for security purposes, but this data is anonymized and not linked to reports.</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">Contact Information</h3>
                      <p>If you contact us directly, we collect only the information you provide voluntarily.</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">How We Use Information</h2>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Process and verify reports before forwarding to authorities</li>
                    <li>Provide report status updates</li>
                    <li>Improve our detection and reporting systems</li>
                    <li>Respond to partnership inquiries</li>
                    <li>Ensure system security and prevent abuse</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Data Sharing</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We share verified reports only with established hotlines and law enforcement agencies 
                    such as INHOPE, NCMEC, and other official reporting channels. We never sell, rent, 
                    or share personal information for commercial purposes.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>End-to-end encryption for all sensitive communications</li>
                    <li>Secure servers with regular security audits</li>
                    <li>Limited access controls for authorized personnel only</li>
                    <li>Regular data purging of unnecessary information</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
                  <p className="text-gray-300 leading-relaxed">
                    You have the right to request information about data we hold, request corrections, 
                    or request deletion of your data (subject to legal obligations). Contact us at 
                    privacy@nocsam.org for any privacy-related requests.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Important Disclaimer</h2>
                  <div className="bg-blue-900/20 p-6 rounded-lg border border-blue-500/30">
                    <p className="text-gray-300 leading-relaxed">
                      <strong>NoCSAM does not host or store any explicit material.</strong> All reports 
                      are anonymized and routed to official reporting hotlines only. We operate as an 
                      independent organization and are not affiliated with any government agency.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                  <p className="text-gray-300 leading-relaxed">
                    If you have questions about this Privacy Policy, please contact us at 
                    privacy@nocsam.org or through our contact form.
                  </p>
                </section>
              </div>
            </div>
          </SpotlightCard>
        </div>
      </div>

      <Footer />
    </div>
  );
}