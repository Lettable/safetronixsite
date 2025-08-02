"use client"
import { useState, useEffect } from "react";
import Loading from "@/components/section/Loading";
import Header from "@/components/section/Header";
import { Shield } from "lucide-react";
import Footer from "@/components/section/Footer";
import Aurora from "@/components/layout/Aurora";
import SpotlightCard from "@/components/layout/SpotlightCard";

export default function TermsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-xl text-gray-300">
              Terms and conditions for using NoCSAM services
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
                  <h2 className="text-2xl font-semibold text-white mb-4">Acceptance of Terms</h2>
                  <p className="text-gray-300 leading-relaxed">
                    By accessing and using NoCSAM services, you accept and agree to be bound by the 
                    terms and provision of this agreement. If you do not agree to abide by the above, 
                    please do not use this service.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Purpose and Mission</h2>
                  <p className="text-gray-300 leading-relaxed">
                    NoCSAM is a volunteer-driven organization dedicated to combating child sexual 
                    abuse material (CSAM) online. Our services are provided solely for the purpose 
                    of reporting suspected illegal content to appropriate authorities.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Permitted Use</h2>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Reporting suspected CSAM or child exploitation content</li>
                    <li>Tracking the status of submitted reports</li>
                    <li>Contacting us for legitimate partnership inquiries</li>
                    <li>Accessing educational resources about online safety</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Prohibited Activities</h2>
                  <ul className="text-gray-300 space-y-2 list-disc list-inside">
                    <li>Submitting false or malicious reports</li>
                    <li>Attempting to access unauthorized areas of our systems</li>
                    <li>Using our services for any illegal purposes</li>
                    <li>Sharing or distributing any explicit material</li>
                    <li>Interfering with the operation of our services</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Report Accuracy</h2>
                  <p className="text-gray-300 leading-relaxed">
                    Users are expected to submit reports in good faith and provide accurate information 
                    to the best of their knowledge. False reports may be subject to legal action and 
                    can hinder legitimate efforts to protect children.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Limitation of Liability</h2>
                  <p className="text-gray-300 leading-relaxed">
                    NoCSAM operates as a reporting intermediary and cannot guarantee specific outcomes 
                    from submitted reports. We are not responsible for actions taken or not taken by 
                    law enforcement or other authorities based on forwarded reports.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Service Availability</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We strive to maintain continuous service availability but cannot guarantee 
                    uninterrupted access. We reserve the right to modify, suspend, or discontinue 
                    services with or without notice.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Legal Compliance</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We operate in compliance with applicable laws and regulations. We may cooperate 
                    with law enforcement investigations and may be required to disclose information 
                    as mandated by law.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Important Disclaimers</h2>
                  <div className="bg-red-900/20 p-6 rounded-lg border border-red-500/30">
                    <ul className="text-gray-300 space-y-2 list-disc list-inside">
                      <li><strong>NoCSAM does not host or store any explicit material</strong></li>
                      <li>All reports are anonymized and routed to official reporting hotlines only</li>
                      <li>We are not affiliated with any government agency</li>
                      <li>We cannot provide legal advice or guarantee specific outcomes</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Changes to Terms</h2>
                  <p className="text-gray-300 leading-relaxed">
                    We reserve the right to modify these terms at any time. Changes will be posted 
                    on this page with an updated date. Continued use of our services constitutes 
                    acceptance of modified terms.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-white mb-4">Contact Information</h2>
                  <p className="text-gray-300 leading-relaxed">
                    For questions about these Terms of Service, please contact us at 
                    legal@nocsam.org or through our contact form.
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