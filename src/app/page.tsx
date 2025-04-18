"use client";
import React from "react";
import HeroSection from "@/components/custom/HeroSection";
import AboutSection from "@/components/custom/AboutSection";
import ProcessSection from "@/components/custom/ProcessSection";
import HelpSection from "@/components/custom/HelpSection";
import Footer from "@/components/custom/Footer";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Routes } from "@/constants/routes";
import { checkPermissions, UserRole } from "@/constants/permissions";

export default function Home() {
  const session = useSession();

  if (
    session?.data?.user &&
    checkPermissions(UserRole.VOLUNTEER, session.data.user.role)
  ) {
    redirect(Routes.ADMIN);
  }
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
