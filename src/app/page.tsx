"use client";
import React from "react";
import Header from "@/components/custom/publicHeader";
import AboutSection from "@/components/custom/home/aboutSectionHome";
import HeroSection from "@/components/custom/home/heroSectionHome";
import HelpOptions from "@/components/custom/home/helpOptions";
import Footer from "@/components/custom/footer";
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
