"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import SpotlightCard from "../layout/SpotlightCard";
import { Send, Users } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (window.location.hash === "#contact") {
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Thank you for your message. We'll get back to you soon!");
        setFormData({ name: "", organization: "", email: "", message: "" });
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="px-4 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">NGO Partnership</h2>
          <p className="text-xl text-gray-300">
            If you represent an NGO and want to collaborate, reach out to us
          </p>
        </div>

        <SpotlightCard
          className="custom-spotlight-card p-8 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
          spotlightColor="rgba(59, 130, 246, 0.1)"
        >
          <div className="flex items-center gap-3 mb-8">
            <Users className="h-8 w-8 text-blue-400" />
            <h3 className="text-2xl font-semibold text-white">Partner with NoCSAM</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-white">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="organization" className="text-white">Organization *</Label>
                <Input
                  id="organization"
                  value={formData.organization}
                  onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="NGO or organization name"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-white">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                placeholder="your.email@organization.org"
                required
              />
            </div>

            <div>
              <Label htmlFor="message" className="text-white">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-[120px]"
                placeholder="Tell us about your organization and how we can collaborate..."
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Send Message <Send className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-8 p-6 bg-blue-900/20 rounded-lg border border-blue-500/30">
            <h4 className="text-lg font-semibold text-white mb-2">Partnership Benefits</h4>
            <ul className="text-gray-300 space-y-2">
              <li>• Direct API integration for streamlined reporting</li>
              <li>• Custom intelligence feeds and threat analysis</li>
              <li>• Priority support and dedicated liaison</li>
              <li>• Collaborative research opportunities</li>
            </ul>
          </div>
        </SpotlightCard>
      </div>
    </section>
  );
}