"use client";

import { useEffect } from "react";
import { Shield, Users, Globe } from "lucide-react";
import SpotlightCard from "../layout/SpotlightCard";

const team = [
  {
    name: "Dr. Sarah Chen",
    role: "Technical Director",
    bio: "Former cybersecurity researcher with 15+ years experience in digital forensics and child protection technology.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Marcus Rodriguez",
    role: "Operations Lead",
    bio: "Ex-NGO coordinator specializing in international cooperation and law enforcement liaison work.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    name: "Anonymous",
    role: "Legal Advisor",
    bio: "Former NGO partner with extensive experience in international child protection law and digital rights.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  }
];

export default function AboutUs() {
  useEffect(() => {
    if (window.location.hash === "#about") {
      const el = document.getElementById("about");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <section id="about" className="px-4 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About NoCSAM</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A decentralized volunteer organization committed to preventing child exploitation online
          </p>
        </div>

        <SpotlightCard
          className="custom-spotlight-card p-8 mb-16 border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
          spotlightColor="rgba(59, 130, 246, 0.1)"
        >
          <div className="text-center mb-8">
            <Shield className="h-16 w-16 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We are a decentralized volunteer organization formed by online security researchers 
              committed to preventing child exploitation online. Our team combines technical expertise 
              with deep understanding of the legal and ethical frameworks needed to combat CSAM effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Volunteer-Driven</h4>
              <p className="text-gray-300">
                Our team consists entirely of volunteers passionate about child safety online.
              </p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Global Reach</h4>
              <p className="text-gray-300">
                We work with organizations worldwide to ensure comprehensive coverage.
              </p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-white mb-2">Privacy First</h4>
              <p className="text-gray-300">
                All operations prioritize privacy and anonymity for reporters and victims.
              </p>
            </div>
          </div>
        </SpotlightCard>

        <div className="text-center mb-12">
          <h3 className="text-2xl font-semibold text-white mb-8">Our Team</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <SpotlightCard
              key={index}
              className="custom-spotlight-card p-6 text-center border border-white/20 bg-white/5 backdrop-blur-md shadow-lg"
              spotlightColor="rgba(59, 130, 246, 0.1)"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h4 className="text-xl font-semibold text-white mb-2">{member.name}</h4>
              <p className="text-blue-400 mb-4 font-medium">{member.role}</p>
              <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}