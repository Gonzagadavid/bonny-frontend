"use client";
import React from "react";
import Header from "@/components/custom/publicHeader";
import HeroSection from "@/components/custom/heroSection";
import AboutSection from "@/components/custom/aboutSection";
import ProcessSection from "@/components/custom/processSection";
import HelpSection from "@/components/custom/helpSection";
import Footer from "@/components/custom/footer";

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <HelpSection />
      <Footer />
    </div>
  );
}
