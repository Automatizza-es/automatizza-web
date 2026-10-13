"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { Container } from "@/components/layout/Container";
import styles from "./ChangeShowcaseSection.module.css";

const at = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type IconName =
  | "mail"
  | "users"
  | "layers"
  | "chart"
  | "sparkle"
  | "user"
  | "building"
  | "doc"
  | "check"
  | "calendar"
  | "send"
  | "folder"
  | "invoice"
  | "tasks"
  | "form"
  | "plus"
  | "lead"
  | "home";

const iconPaths: Record<IconName, ReactNode> = {
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4.5 7 7.5 6 7.5-6" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19c.6-3 2.8-4.8 5.5-4.8s4.9 1.8 5.5 4.8" />
      <path d="M15.5 5.8a3 3 0 0 1 0 5.4M17.5 14.6c1.6.6 2.7 2.1 3 4.4" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3.5 8.5 4.5-8.5 4.5L3.5 8 12 3.5Z" />
      <path d="m3.5 12 8.5 4.5 8.5-4.5M3.5 16l8.5 4.5 8.5-4.5" />
    </>
  ),
  chart: <path d="M5.5 20v-7M10 20V7.5M14.5 20v-4.5M19 20V4.5" />,
  sparkle: (
    <path d="M11 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5ZM18.5 15c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  building: (
    <>
      <path d="M5.5 20.5v-16h8.5v16M14 9.5h4.5v11" />
      <path d="M8.5 8h2.5M8.5 11.5h2.5M8.5 15h2.5M3.5 20.5h17" />
    </>
  ),
  doc: (
    <>
      <path d="M6.5 3.5h7.5l4 4v13h-11.5Z" />
      <path d="M13.5 3.5V8h4.5M9.5 12h5M9.5 15.5h5" />
    </>
  ),
  check: <path d="m5.5 12.5 4 4 9-9" />,
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
    </>
  ),
  send: <path d="M20.5 3.5 10.5 13.5M20.5 3.5l-6.5 17-3.5-7-7-3.5 17-6.5Z" />,
  folder: (
    <path d="M3.5 7A1.5 1.5 0 0 1 5 5.5h4.5l2 2.5H19a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18Z" />
  ),
  invoice: (
    <>
      <path d="M6 3.5h12v17l-3-2-3 2-3-2-3 2Z" />
      <path d="M9 8.5h6M9 12h6M9 15.5h3" />
    </>
  ),
  tasks: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="m8 12 3 3 5-6" />
    </>
  ),
  form: (
    <>
      <rect x="4.5" y="3.5" width="15" height="17" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  plus: <path d="M12 6.5v11M6.5 12h11" />,
  lead: (
    <>
      <circle cx="10" cy="8.5" r="3.5" />
      <path d="M3.5 20c.8-3.6 3.4-5.5 6.5-5.5 1.3 0 2.5.3 3.5.9M17.5 14v6M14.5 17h6" />
    </>
  ),
  home: <path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4Z" />,
};

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

// The "Zz" from the Automatizza wordmark.
function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
      <path d="M7 3h20L15 18.5h3.5L15 23H2L14 8H3Z" />
      <path d="M19 14.4h10.5L19.5 24.6H30L26.5 29h-16L21 18.3h-4.5Z" />
    </svg>
  );
}

const demonstrations = [
  {
    id: "captar",
    title: "Captar",
    description: "Un correo o formulario se convierte en una oportunidad en tu CRM.",
    outcome: "Una oportunidad lista para tu equipo.",
  },
  {
    id: "seguir",
    title: "Seguir",
    description: "La consulta se registra, tu equipo recibe el aviso y el seguimiento queda programado.",
    outcome: "Cada consulta tiene un siguiente paso.",
  },
  {
    id: "conectar",
    title: "Conectar",
    description: "Tus herramientas comparten información en un sistema centralizado.",
    outcome: "La misma información, en todas tus herramientas.",
  },
];

function CaptureDemo() {
  return (
    <div className={styles.capture}>
      <div className={`${styles.paper} ${styles.step}`} style={at(0)}>
        <div className={styles.paperHeading}>
          <span className={styles.appIcon}><Icon name="mail" size={20} /></span>
          <span>Correo recibido</span>
          <small>09:41</small>
        </div>
        <div className={styles.mailContent}>
          <span className={styles.meta}>Marta López · Control Digital</span>
          <h3>Solicitud de presupuesto</h3>
          <p>Hola, necesitamos presupuesto para <mark className={styles.highlight}>50 unidades del modelo X.</mark></p>
          <span className={styles.signature}>Gracias, Marta</span>
        </div>
      </div>
      <span className={`${styles.arrow} ${styles.step}`} style={at(400)} aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16m-5-5 5 5-5 5" /></svg>
      </span>
      <div className={`${styles.paper} ${styles.record} ${styles.step}`} style={at(700)}>
        <div className={styles.paperHeading}>
          <span className={styles.appIcon}><Icon name="lead" size={20} /></span>
          <span>Nueva oportunidad</span>
          <small>CRM</small>
        </div>
        <div className={styles.recordContent}>
          <span className={styles.recordLabel}>CONTACTO</span>
          <h3>Marta López</h3>
          <p className={styles.company}>Control Digital S.L.</p>
          <dl className={styles.recordFields}>
            <div className={styles.step} style={at(1050)}><dt>Interés</dt><dd>50 uds. · Modelo X</dd></div>
            <div className={styles.step} style={at(1250)}><dt>Origen</dt><dd>Correo electrónico</dd></div>
          </dl>
          <span className={`${styles.success} ${styles.step}`} style={at(1550)}><Icon name="check" size={16} /> Creada automáticamente</span>
        </div>
      </div>
    </div>
  );
}

const followSteps = [
  { icon: "doc" as IconName, title: "Consulta registrada", detail: "Guardada en el CRM", time: "09:41" },
  { icon: "send" as IconName, title: "Responsable notificado", detail: "Laura ya tiene la información", time: "09:41" },
  { icon: "calendar" as IconName, title: "Seguimiento programado", detail: "Mañana · 10:00", time: "Listo" },
];

function FollowDemo() {
  return (
    <div className={`${styles.follow} ${styles.paper}`}>
      <div className={`${styles.consultation} ${styles.step}`} style={at(0)}>
        <span className={styles.avatar}>JL</span>
        <div><h3>Juan López</h3><p>Nueva consulta · Formulario web</p></div>
        <span className={styles.consultationIcon}><Icon name="form" size={22} /></span>
      </div>
      <ol className={styles.timeline}>
        {followSteps.map((step, index) => (
          <li className={styles.step} style={at(400 + index * 450)} key={step.title}>
            <span className={styles.timelineIcon}><Icon name={step.icon} size={20} /></span>
            <div><h4>{step.title}</h4><p>{step.detail}</p></div>
            <span className={styles.time}>{step.time}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const sources = [
  { icon: "form" as IconName, label: "Formulario" },
  { icon: "mail" as IconName, label: "Correo" },
  { icon: "folder" as IconName, label: "Archivos" },
];
const inPaths = [18, 50, 82].map((y) => `M0 ${y} C55 ${y} 45 50 100 50`);
const inPathsVertical = [17, 50, 83].map((x) => `M${x} 0 C${x} 55 50 45 50 100`);

function ConnectDemo() {
  return (
    <div className={styles.connect}>
      <ul className={styles.sources}>
        {sources.map((source, index) => (
          <li className={`${styles.source} ${styles.step}`} style={at(index * 100)} key={source.label}>
            <Icon name={source.icon} size={22} /><span>{source.label}</span>
          </li>
        ))}
      </ul>
      <svg className={`${styles.connectionLines} ${styles.horizontalLines}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {inPaths.map((d) => <path className={styles.draw} d={d} key={d} pathLength="1" />)}
        {inPaths.map((d) => <path className={styles.flowLine} d={d} key={`flow-${d}`} />)}
      </svg>
      <svg className={`${styles.connectionLines} ${styles.verticalLines}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {inPathsVertical.map((d) => <path className={styles.draw} d={d} key={d} pathLength="1" />)}
        {inPathsVertical.map((d) => <path className={styles.flowLine} d={d} key={`flow-${d}`} />)}
      </svg>
      <div className={`${styles.central} ${styles.step}`} style={at(550)}>
        <span className={styles.hub}><BrandMark size={34} /></span>
        <span>Tu sistema</span>
      </div>
      <svg className={`${styles.connectionLines} ${styles.horizontalLines}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.draw} d="M0 50 H100" pathLength="1" />
        <path className={styles.flowLine} d="M0 50 H100" />
      </svg>
      <svg className={`${styles.connectionLines} ${styles.verticalLines}`} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path className={styles.draw} d="M50 0 V100" pathLength="1" />
        <path className={styles.flowLine} d="M50 0 V100" />
      </svg>
      <div className={`${styles.paper} ${styles.sharedData} ${styles.step}`} style={at(950)}>
        <div className={styles.paperHeading}><Icon name="layers" size={20} /><span>Datos sincronizados</span></div>
        <ul>
          {(["Clientes", "Proyectos", "Facturación"]).map((label, index) => (
            <li className={styles.step} style={at(1150 + index * 180)} key={label}><span>{label}</span><Icon name="check" size={17} /></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const demoComponents = [CaptureDemo, FollowDemo, ConnectDemo];
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
  const [playing, setPlaying] = useState(false);
  const scrollEnabled = useMediaQuery(scrollMedia);
  const verticalTabs = useMediaQuery("(min-width: 1000px)");
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(0);
  const manualRef = useRef<{ index: number; scrollY: number } | null>(null);

  const select = useCallback((index: number) => {
    activeRef.current = index;
    setActive(index);
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPlaying(true);
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!scrollEnabled) {
      manualRef.current = null;
      return;
    }
    const pinnedStage = stageRef.current;
    manualRef.current = null;
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;
      const rect = track.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        manualRef.current = null;
        return;
      }
      const travel = track.offsetHeight - stage.offsetHeight;
      if (travel <= 0) return;
      // The existing body overflow creates a separate sticky containing block.
      // Keep pinning local to this section instead of changing global overflow.
      const top = parseFloat(getComputedStyle(stage).getPropertyValue("--pin-top")) || 104;
      const offset = Math.max(0, Math.min(travel, top - rect.top));
      stage.style.setProperty("--pin-offset", `${offset}px`);
      const progress = Math.max(0, Math.min(1, (top - rect.top) / travel));
      let next = Math.min(2, Math.floor(progress * 3));
      const manual = manualRef.current;
      if (manual) {
        const delta = window.scrollY - manual.scrollY;
        const steps = Math.trunc(delta / (travel / 3));
        next = Math.max(0, Math.min(2, manual.index + steps));
      }
      if (next !== activeRef.current) select(next);
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
      pinnedStage?.style.removeProperty("--pin-offset");
    };
  }, [scrollEnabled, select]);

  const choose = (index: number, focus = false) => {
    manualRef.current = { index, scrollY: window.scrollY };
    select(index);
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
      <Container>
        <header className="section-header">
          <p className="section-eyebrow">AUTOMATIZACIÓN EN ACCIÓN</p>
          <h2 id="change-title">Hay otra forma de trabajar.</h2>
          <p>Procesos que avanzan, información que se organiza y herramientas que trabajan juntas.</p>
        </header>
        <div className={styles.track} ref={trackRef}>
          <div className={styles.stage} ref={stageRef}>
            <div className={styles.navigation}>
              <div className={styles.tabs} role="tablist" aria-label="Demostraciones de automatización" aria-orientation={verticalTabs ? "vertical" : "horizontal"}>
                {demonstrations.map((demo, index) => (
                  <button
                    className={styles.tab}
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
                    <span className={styles.tabHeading}><small aria-hidden="true">0{index + 1}</small><span id={`automation-label-${demo.id}`}>{demo.title}</span></span>
                    <span className={styles.tabDescription} id={`automation-description-${demo.id}`}>{demo.description}</span>
                  </button>
                ))}
              </div>
              <p className={styles.mobileDescription} aria-hidden="true">{demonstrations[active].description}</p>
            </div>
            <div className={styles.demonstration}>
              <div className={styles.workspaceHeading} aria-hidden="true"><BrandMark size={19} /><span>Tu espacio de trabajo</span><small>Demostración</small></div>
              <div className={styles.panels}>
                {demonstrations.map((demo, index) => {
                  const Demo = demoComponents[index];
                  return (
                    <div
                      className={styles.panel}
                      id={`automation-panel-${demo.id}`}
                      role="tabpanel"
                      aria-labelledby={`automation-tab-${demo.id}`}
                      aria-hidden={active !== index}
                      inert={active !== index}
                      tabIndex={active === index ? 0 : -1}
                      data-active={active === index}
                      data-playing={playing}
                      key={demo.id}
                    >
                      <div className={styles.canvas}><Demo /></div>
                      <p className={`${styles.outcome} ${styles.step}`} style={at(1750)}><Icon name="check" size={16} />{demo.outcome}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
