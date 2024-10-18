"use client";

import Hero from "@/components/home/routes/hero";
import Clients from "@/components/home/routes/clients";
import CTA from "@/components/home/routes/cta";
import FAQ from "@/components/home/routes/faq";
import Pricing from "@/components/home/routes/pricing";
import Newsletter from "@/components/home/routes/newsletter";
import Features from "@/components/home/routes/feature/features";

export default function Home() {
  return (
    <>
      <Hero />
      <Clients />
      <CTA />
      <Features />
      <FAQ />
      <Pricing />
      <Newsletter />
    </>
  );
}
