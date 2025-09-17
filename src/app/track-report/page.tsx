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

export default function TrackReportPage() {
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
