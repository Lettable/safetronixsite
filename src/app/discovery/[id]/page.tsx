"use client"
import { useState, useEffect } from "react";
import Loading from "@/components/section/Loading";
import Header from "@/components/section/Header";
import { Fingerprint } from "@/components/animate-ui/icons/fingerprint";
import Footer from "@/components/section/Footer";
import Aurora from "@/components/layout/Aurora";
import DiscoveryDetailPage from "@/components/section/Discovery";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const navLinks = [
    { name: "Focus Area", href: "#focus", type: "hash" },
    { name: "Discoveries", href: "/discoveries", type: "href" },
    { name: "Report", href: "#report", type: "hash" },
    { name: "Contact", href: "#contact", type: "hash" },
  ];

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-50 bg-black pointer-events-none" aria-hidden="true">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <Header
        logo={
          <div className="flex items-center gap-2 text-white font-semibold">
            <Fingerprint animateOnHover /> Safetronix
          </div>
        }
        links={navLinks}
      />
      <DiscoveryDetailPage />
      <Footer />
    </div>
  );
}