import { AboutSection } from "@/components/landing/layout/about-section";
import { FeaturesSection } from "@/components/landing/layout/features-section";
import { FooterSection } from "@/components/landing/layout/footer";
import { HeroSection } from "@/components/landing/layout/hero-section";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <FooterSection />
    </>
  );
}
