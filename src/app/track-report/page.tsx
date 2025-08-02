"use client"
import { useState, useEffect } from "react";
import Loading from "@/components/section/Loading";
import Header from "@/components/section/Header";
import { Shield, Search, CheckCircle, Clock, AlertTriangle, XCircle } from "lucide-react";
import Footer from "@/components/section/Footer";
import Aurora from "@/components/layout/Aurora";
import SpotlightCard from "@/components/layout/SpotlightCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ReportStatus {
  _id: string;
  reportId: string;
  status: {
    submitted: boolean;
    reviewed: boolean;
    escalated: boolean;
    contentRemoved: boolean;
    finalAction: boolean;
  };
  customMessage?: string;
  createdAt: string;
  updatedAt: string;
}

const statusSteps = [
  { key: 'submitted', label: 'Submitted', icon: CheckCircle },
  { key: 'reviewed', label: 'Reviewed', icon: Search },
  { key: 'escalated', label: 'Escalated', icon: AlertTriangle },
  { key: 'contentRemoved', label: 'Content Removed', icon: XCircle },
  { key: 'finalAction', label: 'Final Action', icon: CheckCircle },
];

export default function TrackReportPage() {
  const [loading, setLoading] = useState(true);
  const [reportId, setReportId] = useState("");
  const [reportStatus, setReportStatus] = useState<ReportStatus | null>(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportId.trim()) return;

    setSearching(true);
    setError("");
    setReportStatus(null);

    try {
      const response = await fetch(`/api/reports/status/${reportId}`);
      const data = await response.json();

      if (response.ok) {
        setReportStatus(data.report);
      } else {
        setError(data.error || "Report not found");
      }
    } catch (err) {
      setError("Failed to fetch report status. Please try again.");
    } finally {
      setSearching(false);
    }
  };

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Track Your Report</h1>
            <p className="text-xl text-gray-300">
              Enter your report ID to check the status of your submission
            </p>
          </div>

          <SpotlightCard
            className="custom-spotlight-card p-8 mb-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
            spotlightColor="rgba(59, 130, 246, 0.1)"
          >
            <form onSubmit={handleSearch} className="flex gap-4">
              <Input
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                placeholder="Enter Report ID (e.g., #2876328196312317)"
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
              <Button
                type="submit"
                disabled={searching || !reportId.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              >
                {searching ? "Searching..." : "Track Report"}
              </Button>
            </form>
          </SpotlightCard>

          {error && (
            <SpotlightCard
              className="custom-spotlight-card p-6 mb-8 border border-red-500/20 bg-red-900/10 backdrop-blur-md shadow-lg"
              spotlightColor="rgba(239, 68, 68, 0.1)"
            >
              <div className="flex items-center gap-3 text-red-400">
                <AlertTriangle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            </SpotlightCard>
          )}

          {reportStatus && (
            <SpotlightCard
              className="custom-spotlight-card p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
              spotlightColor="rgba(59, 130, 246, 0.1)"
            >
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-white mb-2">Report Status</h2>
                <p className="text-gray-300">Report ID: <span className="font-mono text-blue-400">{reportStatus.reportId}</span></p>
                <p className="text-gray-400 text-sm">Submitted: {new Date(reportStatus.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="space-y-4">
                {statusSteps.map((step, index) => {
                  const isCompleted = reportStatus.status[step.key as keyof typeof reportStatus.status];
                  const Icon = step.icon;
                  
                  return (
                    <div key={step.key} className="flex items-center gap-4">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isCompleted 
                          ? 'bg-green-600 text-white' 
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          isCompleted ? 'text-white' : 'text-gray-400'
                        }`}>
                          {step.label}
                        </h3>
                        {isCompleted && (
                          <p className="text-green-400 text-sm">Completed</p>
                        )}
                      </div>
                      <div className={`w-4 h-4 rounded-full ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-600'
                      }`} />
                    </div>
                  );
                })}
              </div>

              {reportStatus.customMessage && (
                <div className="mt-6 p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <h4 className="text-white font-semibold mb-2">Update</h4>
                  <p className="text-gray-300">{reportStatus.customMessage}</p>
                </div>
              )}

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Last updated: {new Date(reportStatus.updatedAt).toLocaleString()}
                </p>
              </div>
            </SpotlightCard>
          )}

          <SpotlightCard
            className="custom-spotlight-card p-6 mt-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
            spotlightColor="rgba(59, 130, 246, 0.1)"
          >
            <h3 className="text-lg font-semibold text-white mb-3">Need Help?</h3>
            <p className="text-gray-300 mb-4">
              If you can't find your report or have questions about the process, please contact us.
            </p>
            <Button
              onClick={() => window.location.href = "/#contact"}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Contact Support
            </Button>
          </SpotlightCard>
        </div>
      </div>

      <Footer />
    </div>
  );
}