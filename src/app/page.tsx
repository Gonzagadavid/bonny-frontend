"use client";
import React from "react";
import Header from "@/components/custom/publicHeader";
import AboutSection from "@/components/custom/aboutSection";
import Footer from "@/components/custom/footer";
import HeroSection from "@/components/custom/heroSection";
import HelpOptions from "@/components/custom/helpOptions";
import InstagramFloatingButton from "@/components/custom/instagramFloatingButton";

export default function Home() {
  return (
    <div>
      <Header />
      <InstagramFloatingButton />
      <HeroSection />
      <AboutSection />
      <HelpOptions />
      <Footer />
    </div>
  );
}
