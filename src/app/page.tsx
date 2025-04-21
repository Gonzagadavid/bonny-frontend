"use client";
import React from "react";
import HeroSection from "@/components/custom/HeroSection";
import AboutSection from "@/components/custom/AboutSection";
import ProcessSection from "@/components/custom/ProcessSection";
import HelpSection from "@/components/custom/HelpSection";
import Footer from "@/components/custom/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <HelpSection />
      <Footer />
    </div>
  );
}
