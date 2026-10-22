import { AboutSection } from "@/components/home/AboutSection";
import { CalculatorSection } from "@/components/home/CalculatorSection";
import { ChangeShowcaseSection } from "@/components/home/ChangeShowcaseSection";
import { ContactSection } from "@/components/home/ContactSection";
import { EditorialMotion } from "@/components/home/EditorialMotion";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { Header } from "@/components/layout/Header";
import { LegacyContactRedirect } from "@/components/contact/LegacyContactRedirect";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "/",
  "Automatizza | Automatización de procesos e IA para empresas",
  "Automatizamos tareas repetitivas, conectamos herramientas y desarrollamos soluciones a medida para que tu empresa trabaje mejor.",
);

// Cambiar a true para recuperar la sección, conservada con sus estilos y animaciones.
const showProcessSection = false;

export default function Home() {
  return (
    <>
      <LegacyContactRedirect />
      <EditorialMotion />
      <Header redesign />
      <main>
        <HeroSection />
        <ChangeShowcaseSection />
        <ProjectsSection />
        <ServicesSection />
        {showProcessSection && <ProcessSection />}
        <CalculatorSection />
        <AboutSection />
        <FaqSection />
      </main>
      <ContactSection />
    </>
  );
}
