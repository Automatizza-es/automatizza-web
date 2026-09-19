import { AboutSection } from "@/components/home/AboutSection";
import { CalculatorSection } from "@/components/home/CalculatorSection";
import { ContactSection } from "@/components/home/ContactSection";
import { EditorialMotion } from "@/components/home/EditorialMotion";
import { HeroSection } from "@/components/home/HeroSection";
import { ProblemSection } from "@/components/home/ProblemSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <EditorialMotion />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <ServicesSection />
        <ProjectsSection />
        <ProcessSection />
        <CalculatorSection />
        <AboutSection />
      </main>
      <ContactSection />
    </>
  );
}
