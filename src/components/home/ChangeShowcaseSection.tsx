"use client";

import {
  useCallback,
  useEffect,
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
  { id: "seguir", title: "Seguir", description: "Próximamente." },
  { id: "conectar", title: "Conectar", description: "Próximamente." },
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

function PlaceholderDemo({ title }: { title: string }) {
  return <div className={styles.placeholder}><span>{title}</span><p>Próximamente.</p></div>;
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
              <p className="section-eyebrow">AUTOMATIZACIÓN EN ACCIÓN</p>
              <h2 id="change-title">Menos tareas repetitivas.<br />Más tiempo para hacer crecer tu empresa.</h2>
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
                      {index === 0 ? <DocumentDemo /> : <PlaceholderDemo title={demo.title} />}
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
