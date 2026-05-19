"use client";

import { useCallback, useState } from "react";
import { IntroCurtain } from "@/components/intro-curtain";
import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { RoomsSection } from "@/components/rooms-section";
import { CtaSection } from "@/components/cta-section";
import { SiteFooter } from "@/components/site-footer";

export function HomePage() {
  const [ready, setReady] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <>
      <IntroCurtain onComplete={handleIntroComplete} />
      <div className="min-h-screen bg-[#F7F3ED]">
        <SiteHeader ready={ready} />
        <main>
          <HeroSection ready={ready} />
          <FeaturesSection />
          <RoomsSection />
          <CtaSection />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
