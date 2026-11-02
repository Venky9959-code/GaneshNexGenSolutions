"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeTicker from "@/components/MarqueeTicker";
import ServicesScratchCard from "@/components/ServicesScratchCard";
import SelectedWork from "@/components/SelectedWork";
import ReviewsDM from "@/components/ReviewsDM";
import StatsStrip from "@/components/StatsStrip";
import HowItWorks from "@/components/HowItWorks";
import TeamSection from "@/components/TeamSection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import StartProjectModal from "@/components/StartProjectModal";
import FloatingEnquiry from "@/components/FloatingEnquiry";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-cream text-ink">
      {/* Fixed Navigation */}
      <Navbar onOpenProjectModal={openModal} />

      {/* Floating Bottom-Right Enquiry Pill like AI Jugaad */}
      <FloatingEnquiry onOpenProjectModal={openModal} />

      <main id="main-content">
        {/* Hero with Draggable Stickers and Outline Headlines */}
        <Hero onOpenProjectModal={openModal} />

        {/* Continuous Marquee Ticker */}
        <MarqueeTicker />

        {/* Services with Interactive Scratch Card Canvas */}
        <ServicesScratchCard />

        {/* Selected Work Portfolio Grid */}
        <SelectedWork onOpenProjectModal={openModal} />

        {/* Real DM Screenshots & WhatsApp Reviews Carousel */}
        <ReviewsDM onOpenProjectModal={openModal} />

        {/* Yellow Stats Strip */}
        <StatsStrip />

        {/* How it Works: Brief, Build, Launch */}
        <HowItWorks />

        {/* Team / Architects */}
        <TeamSection />

        {/* Bottom CTA */}
        <CallToAction onOpenProjectModal={openModal} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Guided Start a Project Modal */}
      <StartProjectModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
