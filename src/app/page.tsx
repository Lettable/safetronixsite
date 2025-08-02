"use client"
import { useState, useEffect } from "react";
import Loading from "@/components/section/Loading";
import Header from "@/components/section/Header";
import { Shield } from "lucide-react";
import HeroSection from "@/components/section/Hero";
import FocusAreas from "@/components/section/FocusAreas";
import ImpactSection from "@/components/section/Impact";
import ReportSection from "@/components/section/ReportSection";
import FAQ from "@/components/section/FAQ";
import AboutUs from "@/components/section/AboutUs";
import Testimonials from "@/components/section/Testimonials";
import ContactForm from "@/components/section/ContactForm";
import Footer from "@/components/section/Footer";
import Aurora from "@/components/layout/Aurora";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: "Focus Areas", href: "#focus", type: "hash" },
    { name: "Impact", href: "#impact", type: "hash" },
    { name: "About", href: "#about", type: "hash" },
    { name: "Track Report", href: "/track-report", type: "href" },
    { name: "Contact", href: "#contact", type: "hash" },
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
      
      <HeroSection />
      <FocusAreas />
      <ImpactSection />
      <ReportSection />
      <FAQ />
      <AboutUs />
      <Testimonials />
      <ContactForm />
      <Footer />
    </div>
  );
}