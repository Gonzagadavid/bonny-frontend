'use client'
import React from 'react';
import Header from '../components/custom/Header';
import HeroSection from "@/components/custom/HeroSection";
import AboutSection from "@/components/custom/AboutSection";
import ProcessSection from "@/components/custom/ProcessSection";
import HelpSection from "@/components/custom/HelpSection";
import Footer from "@/components/custom/Footer";


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