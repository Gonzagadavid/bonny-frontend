"use client";
import React from "react";
import Header from "@/components/custom/publicHeader";
import HeroSection from "@/components/custom/heroSection";
import AboutSection from "@/components/custom/aboutSection";
import ProcessSection from "@/components/custom/processSection";
import HelpSection from "@/components/custom/helpSection";
import Footer from "@/components/custom/footer";
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
      <Header />
      <HeroSection />
      <AboutSection />
      <ProcessSection />
      <HelpSection />
      <Footer />
    </div>
  );
}
