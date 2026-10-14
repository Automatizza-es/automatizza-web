"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

import { Container } from "@/components/layout/Container";
import styles from "./ChangeShowcaseSection.module.css";

function DocumentIcon() {
  return (
    <svg width="19" height="22" viewBox="0 0 20 24" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 2h8l5 5v15H4zM12 2v6h5M7 12h7M7 15h7M7 18h4" />
    </svg>
  );
}

const demonstrations = [
  {
    id: "captar",
    title: "Lo repetitivo, resuelto.",
    description: "Los datos de tus documentos se registran automáticamente, sin copiar ni pegar.",
  },
  {
    id: "seguir",
    title: "Que nada se quede atrás.",
    description: "Cada solicitud llega a quien corresponde, con las tareas y el seguimiento organizados.",
  },
  {
    id: "conectar",
    title: "Todo conectado.",
    description: "La información entra una vez y aparece donde tiene que estar.",
  },
];

const invoiceFields = [
  ["Proveedor", "Norte Studio S.L."],
  ["Nº factura", "F-2026-1256"],
  ["Fecha", "12/10/2026"],
  ["Importe", "889,35 €"],
];

const documentPaths = [
  "M155 175 C155 245 380 235 430 285",
  "M335 145 C335 210 450 220 450 285",
  "M515 175 C515 225 485 230 475 285",
];
const mobileDocumentPaths = [
  "M155 0 C155 180 350 170 440 240",
  "M500 0 V240",
  "M850 0 C850 180 650 170 560 240",
];

function ConnectionPulses({ paths }: { paths: string[] }) {
  return paths.map((d, index) => (
    <path
      className={styles.connectionPulse}
      d={d}
      pathLength="1"
      style={{ "--pulse-delay": `${index * -1.4}s` } as CSSProperties}
      key={d}
    />
  ));
}

function DocumentDemo() {
  return (
    <div className={styles.documentScene} role="group" aria-label="De tus documentos a datos registrados automáticamente">
      <svg className={styles.documentConnections} viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
        <path d="M155 175 C155 245 380 235 430 285M335 145 C335 210 450 220 450 285M515 175 C515 225 485 230 475 285M560 285 H660" />
        <circle cx="660" cy="285" r="2.5" />
        <ConnectionPulses paths={documentPaths} />
      </svg>
      <svg className={`${styles.documentConnections} ${styles.documentConnectionsMobile}`} viewBox="0 0 1000 520" preserveAspectRatio="none" aria-hidden="true">
        <path d="M155 0 C155 180 350 170 440 240M500 0 V240M850 0 C850 180 650 170 560 240M500 340 V520" />
        <ConnectionPulses paths={mobileDocumentPaths} />
      </svg>
      <ul className={styles.floatingDocuments} aria-label="Documentos de origen">
        {["factura.pdf", "pedido.pdf", "solicitud.pdf"].map((name) => (
          <li className={styles.floatingDocument} key={name}>
            <DocumentIcon />
            <span>{name}</span>
          </li>
        ))}
      </ul>
      <div className={styles.extraction}>
        <span className={styles.extractionLoader} aria-hidden="true" />
        <span>Extrayendo datos…</span>
      </div>
      <dl className={styles.registeredInvoice} aria-label="Datos registrados">
        {invoiceFields.map(([label, value]) => (
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
        ))}
        <div>
          <dt>Estado</dt>
          <dd className={styles.registeredStatus}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>
            Registrada
          </dd>
        </div>
      </dl>
    </div>
  );
}

const coordinationSteps = [
  { label: "Solicitud recibida", icon: "received" },
  { label: "Responsable asignado", icon: "assigned" },
  { label: "Seguimiento programado", icon: "scheduled" },
  { label: "Cliente atendido", icon: "completed" },
] as const;

function CoordinationIcon({ icon }: { icon: typeof coordinationSteps[number]["icon"] }) {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icon === "received" && <path d="M3 10.5V16h14v-5.5h-4l-1.5 2h-3l-1.5-2H3Zm7-8v6m-2.5-2.5L10 8.5 12.5 6" />}
      {icon === "assigned" && <><circle cx="10" cy="6" r="3" /><path d="M4 17c.5-3.5 2.5-5 6-5s5.5 1.5 6 5" /></>}
      {icon === "scheduled" && <><rect x="3" y="4.5" width="14" height="12.5" rx="2" /><path d="M6.5 2.5v4M13.5 2.5v4M3 9h14m-9 3h4" /></>}
      {icon === "completed" && <><circle cx="10" cy="10" r="7" /><path d="m6.5 10 2.5 2.5 4.5-5" /></>}
    </svg>
  );
}

function officePostureMap(viewBox: string, seated: boolean) {
  const shape = seated
    ? "M915 712Q940 706 952 729L958 763 975 798 984 849 863 849 879 799 891 768 894 739Q897 719 915 712Z"
    : "M993 207Q1010 201 1020 217L1021 247 1034 272 1030 321 1016 335 996 320 980 290 987 266 991 247 985 232Q983 215 993 207Z";
  const color = seated ? "#dd8084" : "#ed8088";
  const center = seated ? 'cx="925" cy="783" rx="78" ry="92"' : 'cx="1005" cy="246" rx="48" ry="91"';
  // Neutral grey leaves every pixel outside the two soft figure masks still.
  // The coloured channels create a small, continuous posture shift in place.
  const map = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="none"><defs><radialGradient id="posture"><stop stop-color="${color}"/><stop offset="1" stop-color="#808080"/></radialGradient><clipPath id="figure"><path d="${shape}"/></clipPath><filter id="feather"><feGaussianBlur stdDeviation="2"/></filter></defs><path fill="#808080" d="M0 0H1672V941H0Z"/><g filter="url(#feather)"><ellipse ${center} fill="url(#posture)" clip-path="url(#figure)"/></g></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(map)}`;
}

function CoordinationDemo({ active }: { active: boolean }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const filterId = `office-posture-${useId().replace(/:/g, "")}`;
  const motionAllowed = useMediaQuery("(prefers-reduced-motion: no-preference)") && active;
  const mobile = useMediaQuery("(max-width: 600px)");
  const [mapViewBox, setMapViewBox] = useState("0 0 1672 941");

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (!width || !height) return;
      const ratio = width / height;
      const visibleWidth = Math.min(1672, 941 * ratio);
      const visibleHeight = Math.min(941, 1672 / ratio);
      // Match the photo's object-fit and mobile object-position exactly.
      const x = (1672 - visibleWidth) * (mobile ? 0.54 : 0.5);
      const y = (941 - visibleHeight) / 2;
      setMapViewBox(`${x} ${y} ${visibleWidth} ${visibleHeight}`);
    });
    observer.observe(scene);
    return () => observer.disconnect();
  }, [mobile]);

  return (
    <div className={styles.coordinationScene} ref={sceneRef} role="group" aria-label="Personas y equipos coordinados para atender cada solicitud">
      <svg className={styles.officeMotionDefinitions} width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feImage href={officePostureMap(mapViewBox, false)} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="standingPosture" />
            <feDisplacementMap in="SourceGraphic" in2="standingPosture" scale="0" xChannelSelector="R" yChannelSelector="B" result="standingGesture">
              {motionAllowed && <animate attributeName="scale" values="0;5.2;0;-2.8;0" keyTimes="0;0.3;0.6;0.82;1" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" dur="11s" repeatCount="indefinite" />}
            </feDisplacementMap>
            <feImage href={officePostureMap(mapViewBox, true)} x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="seatedPosture" />
            <feDisplacementMap in="standingGesture" in2="seatedPosture" scale="0" xChannelSelector="R" yChannelSelector="B">
              {motionAllowed && <animate attributeName="scale" values="4.8;0;-2.6;0;4.8" keyTimes="0;0.35;0.62;0.84;1" calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1" dur="13s" repeatCount="indefinite" />}
            </feDisplacementMap>
          </filter>
        </defs>
      </svg>
      <Image
        className={styles.officePhoto}
        style={{ filter: motionAllowed ? `url(#${filterId})` : undefined }}
        src="/images/automation/team-office-v1.webp"
        alt="Equipos trabajando y colaborando en una oficina de dos plantas."
        fill
        sizes="(max-width: 600px) 950px, (max-width: 999px) 90vw, 800px"
      />
      <ol className={styles.coordinationSteps} aria-label="Seguimiento de una solicitud">
        {coordinationSteps.map((step) => (
          <li className={styles.coordinationLabel} key={step.icon}>
            <span className={styles.coordinationIcon}><CoordinationIcon icon={step.icon} /></span>
            <span>{step.label}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const systemSources = [
  { label: "Formulario", icon: "form" },
  { label: "Email", icon: "mail" },
  { label: "CRM", icon: "clients" },
  { label: "Archivos", icon: "files" },
] as const;
const systemResults = [
  { label: "Leads", icon: "lead" },
  { label: "Clientes", icon: "clients" },
  { label: "Proyectos", icon: "projects" },
  { label: "Facturación", icon: "invoice" },
  { label: "Tareas", icon: "tasks" },
] as const;
type SystemIconName = typeof systemSources[number]["icon"] | typeof systemResults[number]["icon"];

function SystemIcon({ name }: { name: SystemIconName }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {name === "form" && <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M8.5 8h7M8.5 12h7M8.5 16h4" /></>}
      {name === "mail" && <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 6 7.5-6" /></>}
      {name === "clients" && <><circle cx="9" cy="8.5" r="3" /><path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8M15.5 5.8a3 3 0 0 1 0 5.4M17.5 14.6c1.6.6 2.7 2.1 3 4.4" /></>}
      {name === "files" && <><rect x="7" y="3.5" width="13" height="13" rx="2" /><path d="M15.5 20.5h-10a2 2 0 0 1-2-2v-10" /></>}
      {name === "lead" && <><circle cx="9.5" cy="8" r="3.5" /><path d="M3 20c.8-3.6 3.4-5.5 6.5-5.5 1.3 0 2.5.3 3.5.9M17.5 13.5v6M14.5 16.5h6" /></>}
      {name === "projects" && <path d="M3.5 7A1.5 1.5 0 0 1 5 5.5h4.5l2 2.5H19a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18Z" />}
      {name === "invoice" && <><path d="M6 3.5h12v17l-3-2-3 2-3-2-3 2Z" /><path d="M9 8.5h6M9 12h6M9 15.5h3" /></>}
      {name === "tasks" && <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="m8 12 3 3 5-6" /></>}
    </svg>
  );
}

const systemInPaths = [12.5, 37.5, 62.5, 87.5].map((y) => `M0 ${y} C50 ${y} 50 50 100 50`);
const systemOutPaths = [10, 30, 50, 70, 90].map((y) => `M0 50 C50 50 55 ${y} 100 ${y}`);
const systemInMobilePaths = [25, 75].map((x) => `M${x} 0 C${x} 55 50 45 50 100`);
const systemOutMobilePaths = ["M50 0 V100"];

function SystemWires({ paths, mobilePaths }: { paths: string[]; mobilePaths: string[] }) {
  return (
    <>
      {[paths, mobilePaths].map((routes, orientation) => (
        <svg className={`${styles.systemWires} ${orientation === 1 ? styles.systemWiresMobile : styles.systemWiresDesktop}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" key={orientation}>
          {routes.map((d) => <path d={d} key={d} />)}
          {routes.map((d, index) => <path className={styles.systemPulse} d={d} pathLength="1" style={{ "--route-delay": `${index * -1.15}s` } as CSSProperties} key={`pulse-${d}`} />)}
        </svg>
      ))}
    </>
  );
}

function ConnectedDemo() {
  return (
    <div className={styles.connectedScene} role="group" aria-label="Automatizza conecta tus fuentes de información y la distribuye donde hace falta">
      <div className={styles.connectedFlow}>
        <ul className={styles.systemSources} aria-label="Fuentes de información">
          {systemSources.map((source) => <li key={source.icon}><SystemIcon name={source.icon} /><span>{source.label}</span></li>)}
        </ul>
        <SystemWires paths={systemInPaths} mobilePaths={systemInMobilePaths} />
        <div className={styles.systemCore} role="img" aria-label="Automatizza, núcleo que conecta y distribuye la información">
          <span className={styles.systemMark}>
            <svg width="34" height="34" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
              <path d="M7 3h20L15 18.5h3.5L15 23H2L14 8H3Z" />
              <path d="M19 14.4h10.5L19.5 24.6H30L26.5 29h-16L21 18.3h-4.5Z" />
            </svg>
          </span>
          <span className={styles.systemName}>Automatizza</span>
        </div>
        <SystemWires paths={systemOutPaths} mobilePaths={systemOutMobilePaths} />
        <ul className={styles.systemResults} aria-label="Información disponible en cada destino">
          {systemResults.map((result) => (
            <li key={result.icon}>
              <SystemIcon name={result.icon} /><span>{result.label}</span>
              <svg className={styles.systemCheck} width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m3 8 3 3 7-7" /></svg>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const scrollMedia = "(min-width: 1000px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)";

function useMediaQuery(query: string) {
  const subscribe = useCallback((notify: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", notify);
    return () => media.removeEventListener("change", notify);
  }, [query]);
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export function ChangeShowcaseSection() {
  const [active, setActive] = useState(0);
  const [fitsViewport, setFitsViewport] = useState(true);
  const scrollEnabled = useMediaQuery(scrollMedia) && fitsViewport;
  const verticalTabs = useMediaQuery("(min-width: 1000px)");
  const trackRef = useRef<HTMLDivElement>(null);
  const compositionRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);

  const select = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  useEffect(() => {
    const composition = compositionRef.current;
    const track = trackRef.current;
    if (!composition || !track) return;
    const header = document.querySelector<HTMLElement>(".site-header");
    const measure = () => {
      const headerHeight = header?.offsetHeight ?? 72;
      const height = composition.getBoundingClientRect().height;
      // Stabilize the complete composition in the available viewport, before
      // its heading travels all the way to the site header.
      const top = Math.max(headerHeight + 24, (window.innerHeight + headerHeight - height) / 2);
      composition.style.setProperty("--pin-top", `${top}px`);
      track.style.setProperty("--composition-height", `${height}px`);
      setFitsViewport(height + top + 24 <= window.innerHeight);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(composition);
    if (header) observer.observe(header);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (!scrollEnabled) {
      return;
    }
    const pinnedComposition = compositionRef.current;
    const pinnedTrack = trackRef.current;
    const tabs = [...tabRefs.current];
    const update = () => {
      const track = trackRef.current;
      const composition = compositionRef.current;
      if (!track || !composition) return;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - composition.getBoundingClientRect().height;
      if (travel <= 0) return;
      // Reserve the original layout space while the browser holds the whole
      // composition fixed. No transform needs to chase the viewport scroll.
      const top = parseFloat(getComputedStyle(composition).getPropertyValue("--pin-top")) || 96;
      const distance = top - rect.top;
      composition.style.setProperty("--pin-left", `${rect.left}px`);
      composition.style.setProperty("--pin-width", `${rect.width}px`);
      composition.style.setProperty("--pin-travel", `${travel}px`);
      track.dataset.pin = distance < 0 ? "before" : distance <= travel ? "pinned" : "after";
      const progress = Math.max(0, Math.min(1, (top - rect.top) / travel));
      tabs.forEach((tab, index) => {
        tab?.style.setProperty("--scroll-progress", Math.max(0, Math.min(1, progress * 3 - index)).toFixed(4));
      });
      const next = Math.min(2, Math.floor(progress * 3));
      if (next !== activeRef.current) select(next);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const observer = new ResizeObserver(update);
    if (pinnedComposition) observer.observe(pinnedComposition);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      observer.disconnect();
      if (pinnedTrack) delete pinnedTrack.dataset.pin;
      pinnedComposition?.style.removeProperty("--pin-left");
      pinnedComposition?.style.removeProperty("--pin-width");
      pinnedComposition?.style.removeProperty("--pin-travel");
      tabs.forEach((tab) => tab?.style.removeProperty("--scroll-progress"));
    };
  }, [scrollEnabled, select]);

  const choose = (index: number, focus = false) => {
    const track = trackRef.current;
    const composition = compositionRef.current;
    if (scrollEnabled && track && composition) {
      const top = parseFloat(getComputedStyle(composition).getPropertyValue("--pin-top")) || 96;
      const rect = track.getBoundingClientRect();
      const travel = rect.height - composition.getBoundingClientRect().height;
      const target = window.scrollY + rect.top - top + travel * ((index + 0.5) / 3);
      if (Math.abs(window.scrollY - target) < 1) select(index);
      else window.scrollTo({ top: target, behavior: "smooth" });
    } else {
      select(index);
    }
    if (focus) tabRefs.current[index]?.focus({ preventScroll: true });
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 2;
    else if (event.key === (verticalTabs ? "ArrowDown" : "ArrowRight")) next = (index + 1) % 3;
    else if (event.key === (verticalTabs ? "ArrowUp" : "ArrowLeft")) next = (index + 2) % 3;
    else return;
    event.preventDefault();
    choose(next, true);
  };

  return (
    <section className={styles.section} id="automatizacion-en-accion" aria-labelledby="change-title" data-scroll={scrollEnabled}>
      <Container className={styles.container}>
        <div className={styles.track} ref={trackRef}>
          <div className={styles.composition} ref={compositionRef}>
            <header className={`section-header ${styles.heading}`}>
              <p className="section-eyebrow">EN LA PRÁCTICA</p>
              <h2 id="change-title">Cuando todo fluye.</h2>
              <p>Menos trabajo manual, equipos mejor coordinados y herramientas que trabajan juntas.</p>
            </header>
            <div className={styles.stage}>
              <div className={styles.navigation}>
                <div className={styles.tabs} role="tablist" aria-label="Demostraciones de automatización" aria-orientation={verticalTabs ? "vertical" : "horizontal"}>
                  {demonstrations.map((demo, index) => (
                    <button
                      className={styles.tab}
                      style={{ "--tab-progress": index <= active ? 1 : 0 } as CSSProperties}
                      id={`automation-tab-${demo.id}`}
                      role="tab"
                      aria-selected={active === index}
                      aria-controls={`automation-panel-${demo.id}`}
                      aria-labelledby={`automation-label-${demo.id}`}
                      aria-describedby={`automation-description-${demo.id}`}
                      tabIndex={active === index ? 0 : -1}
                      type="button"
                      key={demo.id}
                      ref={(element) => { tabRefs.current[index] = element; }}
                      onClick={() => choose(index)}
                      onKeyDown={(event) => onTabKeyDown(event, index)}
                    >
                      <span className={styles.caseNumber} aria-hidden="true">0{index + 1}</span>
                      <span className={styles.tabHeading} id={`automation-label-${demo.id}`}>{demo.title}</span>
                      <span className={styles.tabDescription} id={`automation-description-${demo.id}`}>{demo.description}</span>
                    </button>
                  ))}
                </div>
                <p className={styles.mobileDescription} aria-hidden="true">{demonstrations[active].description}</p>
              </div>
              <div className={styles.demonstration}>
                <div className={styles.panels}>
                  {demonstrations.map((demo, index) => (
                    <div
                      className={styles.panel}
                      id={`automation-panel-${demo.id}`}
                      role="tabpanel"
                      aria-labelledby={`automation-tab-${demo.id}`}
                      aria-hidden={active !== index}
                      inert={active !== index}
                      tabIndex={active === index ? 0 : -1}
                      data-active={active === index}
                      key={demo.id}
                    >
                      {index === 0 ? <DocumentDemo /> : index === 1 ? <CoordinationDemo active={active === 1} /> : <ConnectedDemo />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
