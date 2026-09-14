import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  FileText,
  Menu,
  Minus,
  Phone,
  Plus,
  Workflow,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/logo-automatizza-transparente.png.asset.json";

const navItems = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Sobre Automatizza", href: "#sobre-automatizza" },
  { label: "Contacto", href: "#contacto" },
];

const problems = [
  "Información repartida entre emails, hojas de cálculo y aplicaciones",
  "Introducción manual de datos",
  "Copiar y pegar información entre sistemas",
  "Documentos que requieren demasiados pasos",
  "Herramientas que no se comunican",
  "Tareas administrativas repetitivas",
];

const services = [
  {
    number: "01",
    title: "Automatización e integraciones",
    description:
      "Conectamos herramientas y automatizamos tareas entre sistemas para reducir trabajo manual y errores.",
    icon: Workflow,
  },
  {
    number: "02",
    title: "Aplicaciones empresariales",
    description:
      "Desarrollamos herramientas adaptadas a procesos específicos: CRM, gestión interna, presupuestos, logística y otras necesidades.",
    icon: BarChart3,
  },
  {
    number: "03",
    title: "Inteligencia artificial aplicada",
    description:
      "Utilizamos IA cuando aporta valor para interpretar información, clasificar datos, extraer contenido o asistir determinados procesos.",
    icon: FileText,
  },
];

const phases = [
  "Entender la necesidad",
  "Analizar el proceso",
  "Diseñar la solución",
  "Desarrollar y validar",
  "Mejorar progresivamente",
];

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <img
      src={logoAsset.url}
      alt="Automatizza"
      className={inverse ? "h-7 w-auto brightness-0 invert" : "h-7 w-auto"}
    />
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="h-px w-8 bg-accent" />
      <span>{children}</span>
    </div>
  );
}

function ArrowLink({ href, children, inverse = false }: { href: string; children: string; inverse?: boolean }) {
  return (
    <a href={href} className={inverse ? "text-link text-primary-foreground" : "text-link text-primary"}>
      {children}
      <ArrowRight aria-hidden="true" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="page-shell grid h-18 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 lg:h-20 lg:grid-cols-[auto_1fr_auto]">
        <a href="#inicio" aria-label="Automatizza, inicio" className="w-fit">
          <Logo />
        </a>
        <nav aria-label="Navegación principal" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="nav-link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild className="hidden h-11 rounded-sm px-5 shadow-none lg:inline-flex">
          <a href="#contacto">Hablemos <ArrowRight /></a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-11 w-11 lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav aria-label="Navegación móvil" className="border-t border-border bg-background lg:hidden">
          <ul className="page-shell py-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="flex min-h-12 items-center justify-between border-b border-border text-sm font-medium text-primary" href={item.href} onClick={() => setOpen(false)}>
                  {item.label}<ChevronRight className="size-4 text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

function BusinessInterface() {
  return (
    <div className="business-interface" aria-label="Vista previa de una aplicación empresarial conectada">
      <div className="interface-topbar">
        <div className="flex items-center gap-2"><span className="status-dot" /><span>Entorno de trabajo</span></div>
        <span className="text-muted-foreground">Vista general</span>
      </div>
      <div className="interface-body">
        <aside className="interface-nav" aria-hidden="true">
          <span className="nav-mark active" /><span className="nav-mark" /><span className="nav-mark" /><span className="nav-mark" />
        </aside>
        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <div className="min-w-0">
              <p className="interface-kicker">Actividad comercial</p>
              <p className="mt-1 truncate font-display text-lg font-semibold text-primary sm:text-xl">Procesos conectados</p>
            </div>
            <span className="interface-badge">Actualizado</span>
          </div>
          <div className="grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
            <div className="metric"><span>Oportunidades</span><strong>24</strong><small>+ 4 esta semana</small></div>
            <div className="metric"><span>Presupuestos</span><strong>11</strong><small>6 pendientes</small></div>
            <div className="metric"><span>Procesos activos</span><strong>08</strong><small>Sin incidencias</small></div>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-[1fr_0.72fr]">
            <div className="border border-border bg-background p-4">
              <div className="mb-5 flex items-center justify-between"><span className="interface-title">Flujo de trabajo</span><Workflow className="size-4 text-accent" /></div>
              {["Solicitud recibida", "Datos validados", "Presupuesto generado"].map((label, index) => (
                <div className="workflow-row" key={label}>
                  <span className={index < 2 ? "workflow-check complete" : "workflow-check"}>{index < 2 ? <Check /> : index + 1}</span>
                  <span>{label}</span><span className="ml-auto text-muted-foreground">{index < 2 ? "Completado" : "En curso"}</span>
                </div>
              ))}
            </div>
            <div className="chart-panel">
              <div className="flex items-center justify-between"><span className="interface-title">Carga manual</span><span className="text-xs text-accent">−32%</span></div>
              <div className="bar-chart" aria-hidden="true">
                {[72, 58, 63, 44, 36, 29].map((height, index) => <span key={index} style={{ height: `${height}%` }} />)}
              </div>
              <p className="mt-3 text-xs text-muted-foreground">Últimos 6 meses</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero-section">
      <div className="page-shell">
        <div className="hero-copy">
          <SectionLabel number="01">Software para procesos reales</SectionLabel>
          <h1>Menos tareas repetitivas.<br /><span>Más tiempo para hacer crecer tu empresa.</span></h1>
          <p>Desarrollamos aplicaciones y automatizaciones adaptadas a tu forma de trabajar, incorporando inteligencia artificial cuando aporta valor. Desde una necesidad concreta hasta sistemas que conectan distintas áreas de tu empresa.</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-sm px-6 shadow-none">
              <a href="#contacto">Hablemos de tu proyecto <ArrowRight /></a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-sm border-primary/20 px-6 shadow-none">
              <a href="#proyectos">Ver proyectos reales</a>
            </Button>
          </div>
        </div>
        <div className="hero-visual"><BusinessInterface /></div>
        <div className="hero-index" aria-hidden="true"><span>Procesos</span><span>Aplicaciones</span><span>Automatización</span></div>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="section bg-background" id="problema">
      <div className="page-shell">
        <SectionLabel number="02">El punto de partida</SectionLabel>
        <div className="editorial-heading">
          <h2>Hay tareas que no deberían seguir quitándote tiempo.</h2>
          <p>Cuando la información y los procesos crecen sin una estructura común, el trabajo manual termina ocupando el lugar de las tareas que realmente hacen avanzar a la empresa.</p>
        </div>
        <div className="problem-layout">
          <div className="problem-statement">
            <p className="font-display text-2xl font-semibold leading-snug text-primary md:text-3xl">El problema no suele ser una sola herramienta.</p>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Suele estar en los pasos intermedios, en la información duplicada y en procesos que dependen demasiado de acciones manuales.</p>
            <div className="mt-10 flex items-baseline gap-3 border-t border-primary/15 pt-5"><strong className="font-display text-5xl text-primary">6</strong><span className="max-w-32 text-xs leading-5 text-muted-foreground">señales habituales de un proceso mejorable</span></div>
          </div>
          <ol className="problem-list">
            {problems.map((problem, index) => (
              <li key={problem}><span>{String(index + 1).padStart(2, "0")}</span><p>{problem}</p></li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="section bg-muted" id="servicios">
      <div className="page-shell">
        <SectionLabel number="03">Qué hacemos</SectionLabel>
        <div className="editorial-heading"><h2>Tecnología aplicada a problemas concretos.</h2><p>La solución puede ser una automatización sencilla, una aplicación a medida o un sistema que conecte varias áreas. La tecnología se decide después de entender el proceso.</p></div>
        <div className="service-list">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.number} className="service-row">
                <span className="service-number">{service.number}</span>
                <span className="service-icon"><Icon /></span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            );
          })}
        </div>
        <div className="principle-note"><span className="h-2 w-2 shrink-0 bg-accent" /><p><strong>Un principio sencillo:</strong> no utilizamos inteligencia artificial cuando una regla sencilla resuelve mejor el problema.</p></div>
      </div>
    </section>
  );
}

function SilosVisual() {
  return (
    <div className="silos-visual" aria-label="Esquema de módulos conectados de Silos Spain">
      <div className="silos-visual-head"><span>Plataforma empresarial</span><span>Vista de módulos</span></div>
      <div className="silos-map">
        <div className="silos-core"><span>Silos Spain</span><strong>Entorno conectado</strong><small>Información centralizada</small></div>
        {["CRM", "Presupuestos", "Facturas", "Automatizaciones"].map((item, index) => (
          <div key={item} className={`silos-node node-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{item}</div>
        ))}
        <span className="map-line line-one" /><span className="map-line line-two" />
      </div>
      <div className="silos-channels"><span><Check /> WhatsApp <small>Complementario</small></span><span><Phone /> Telefonía <small>Complementario</small></span></div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section className="section projects-section" id="proyectos">
      <div className="page-shell">
        <SectionLabel number="04">Proyectos reales</SectionLabel>
        <div className="editorial-heading"><h2>Soluciones construidas para necesidades reales.</h2><p>Proyectos de distinta escala, desarrollados alrededor de la forma de trabajar de cada empresa.</p></div>
        <article className="featured-project">
          <div className="featured-copy">
            <div className="project-meta"><span>Silos Spain</span><span>Proyecto en evolución</span></div>
            <h3>De procesos separados a un entorno de trabajo conectado.</h3>
            <p>Desarrollo progresivo de una plataforma empresarial para centralizar gestión comercial, presupuestos, facturas y automatizaciones, manteniendo los sistemas corporativos que siguen aportando valor.</p>
            <div className="tag-list">{["CRM", "Presupuestos", "Facturas", "Automatizaciones", "WhatsApp", "Telefonía"].map((tag) => <span key={tag}>{tag}</span>)}</div>
            <p className="project-note">WhatsApp y telefonía son desarrollos complementarios dentro de un proyecto que continúa evolucionando.</p>
            <ArrowLink href="#contacto" inverse>Ver proyecto</ArrowLink>
          </div>
          <SilosVisual />
        </article>
        <article className="secondary-project">
          <div><span className="project-count">02 / Proyecto específico</span><h3>APC</h3></div>
          <p>Aplicaciones desarrolladas para digitalizar el registro de recogidas y descargas realizadas por transportistas, adaptadas a necesidades operativas concretas en España e Irlanda.</p>
          <div className="secondary-project-end"><p>Una necesidad puntual también puede requerir una solución propia.</p><ArrowLink href="#contacto">Ver proyecto</ArrowLink></div>
        </article>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section bg-background" id="forma-de-trabajar">
      <div className="page-shell">
        <SectionLabel number="05">Forma de trabajar</SectionLabel>
        <div className="editorial-heading"><h2>Primero entendemos el proceso. Después elegimos la tecnología.</h2><p>Un recorrido directo, sin añadir complejidad innecesaria y con decisiones que se validan durante el desarrollo.</p></div>
        <ol className="phase-track">
          {phases.map((phase, index) => <li key={phase}><span>{String(index + 1).padStart(2, "0")}</span><p>{phase}</p></li>)}
        </ol>
      </div>
    </section>
  );
}

function CalculatorPreview() {
  return (
    <div className="calculator-preview" aria-label="Previsualización de la calculadora de ahorro">
      <div className="calculator-head"><div><span>Estimación</span><strong>Coste de tareas repetitivas</strong></div><span className="interface-badge">Vista previa</span></div>
      <div className="calculator-grid">
        <div className="calculator-controls">
          <label><span>Personas implicadas</span><output>3</output></label>
          <div className="fake-slider"><span style={{ width: "34%" }} /><i style={{ left: "34%" }} /></div>
          <label><span>Horas por semana</span><output>12 h</output></label>
          <div className="fake-slider"><span style={{ width: "58%" }} /><i style={{ left: "58%" }} /></div>
          <div className="fake-field"><span>Coste medio por hora</span><strong>24,00 €</strong></div>
        </div>
        <div className="calculator-result"><span>Coste anual estimado</span><strong>44.928 €</strong><div><Minus /><span>Potencial recuperable</span><b>17.971 €</b></div></div>
      </div>
    </div>
  );
}

function CalculatorSection() {
  return (
    <section className="section bg-muted" id="calculadora">
      <div className="page-shell calculator-layout">
        <div>
          <SectionLabel number="06">Herramienta Automatizza</SectionLabel>
          <h2>¿Cuánto te cuesta no automatizar?</h2>
          <p>Calcula cuánto te cuestan las tareas repetitivas de tu empresa y estima el tiempo y el valor económico que podrías recuperar al automatizarlas.</p>
          <Button disabled aria-disabled="true" size="lg" className="mt-8 h-12 rounded-sm px-6 shadow-none disabled:opacity-100">
            Calcular mi ahorro potencial <ArrowRight />
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">Calculadora disponible próximamente</p>
        </div>
        <CalculatorPreview />
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section bg-background" id="sobre-automatizza">
      <div className="page-shell about-layout">
        <div><SectionLabel number="07">Sobre Automatizza</SectionLabel><p className="about-index">A / Z</p></div>
        <div><h2>Tecnología con los pies en el negocio.</h2><p>Automatizza nace de trabajar directamente con procesos reales de empresa y buscar formas más sencillas de resolverlos. Combinamos conocimiento de negocio, automatización, desarrollo de software e inteligencia artificial para construir soluciones útiles y adaptadas.</p><ArrowLink href="#contacto">Conocer Automatizza</ArrowLink></div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contacto">
      <div className="page-shell contact-layout">
        <div><SectionLabel number="08">Empecemos por el problema</SectionLabel><h2>¿Hay algún proceso de tu empresa que sabes que podría funcionar mejor?</h2></div>
        <div><p>Cuéntanos cómo trabajáis ahora. Empezaremos por entender el problema.</p><Button asChild variant="secondary" size="lg" className="mt-8 h-12 rounded-sm px-6 shadow-none"><a href="mailto:info@automatizza.es">Hablemos de tu proyecto <ArrowRight /></a></Button><a className="contact-email" href="mailto:info@automatizza.es">info@automatizza.es</a></div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-main"><a href="#inicio" aria-label="Automatizza, volver al inicio"><Logo inverse /></a><nav aria-label="Navegación del pie"><ul>{navItems.map((item) => <li key={item.href}><a href={item.href}>{item.label}</a></li>)}</ul></nav><a href="mailto:info@automatizza.es">info@automatizza.es</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Automatizza</span><span>Soluciones digitales para procesos reales</span></div>
      </div>
    </footer>
  );
}

export function HomePage() {
  return <><Header /><main><Hero /><ProblemSection /><ServicesSection /><ProjectsSection /><ProcessSection /><CalculatorSection /><AboutSection /><ContactSection /></main><Footer /></>;
}