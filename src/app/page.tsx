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
  return (
    <div className="flex items-center justify-center min-h-screen overflow-hidden">
      <h1 className="text-center text-lg">
        Site has been closed - contact{" "}
        <a className="text-red-500 underline" href="https://t.me/mirzyave">
          mirzyave
        </a>{" "}
        for queries.
      </h1>
    </div>
  );
}
