"use client";
import React from "react";
import Header from "@/components/custom/header";
import AboutSection from "@/app/(public)/_components/aboutSectionHome";
import HeroSection from "@/app/(public)/_components/heroSectionHome";
import HelpOptions from "@/app/(public)/_components/helpOptions";
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
