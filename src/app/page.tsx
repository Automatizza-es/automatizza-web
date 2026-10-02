import { AboutSection } from "@/components/home/AboutSection";
import { CalculatorSection } from "@/components/home/CalculatorSection";
import { ContactSection } from "@/components/home/ContactSection";
import { EditorialMotion } from "@/components/home/EditorialMotion";
import { HeroSection } from "@/components/home/HeroSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TasksShowcaseSection } from "@/components/home/TasksShowcaseSection";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <>
      <EditorialMotion />
      <Header />
      <main>
        <HeroSection />
        <TasksShowcaseSection />
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
