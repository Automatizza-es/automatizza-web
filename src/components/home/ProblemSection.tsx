import { Container } from "@/components/layout/Container";

const problems = [
  { title: "Información repartida", context: "Emails · hojas de cálculo · aplicaciones", icon: "layers" },
  { title: "Introducción manual", context: "Datos", icon: "input" },
  { title: "Copiar y pegar información", context: "Entre sistemas", icon: "exchange" },
  { title: "Documentos que requieren demasiados pasos", context: "Procesos administrativos", icon: "document" },
  { title: "Herramientas que no se comunican", context: "Sistemas desconectados", icon: "nodes" },
  { title: "Tareas administrativas repetitivas", context: "Trabajo manual recurrente", icon: "repeat" },
];

function ProblemIcon({ name }: { name: string }) {
  const commonProps = {
    width: 21,
    height: 21,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "layers") {
    return <svg {...commonProps}><path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" /><path d="m4 12 8 4.5 8-4.5M4 16.5l8 4.5 8-4.5" /></svg>;
  }
  if (name === "input") {
    return <svg {...commonProps}><rect x="3.5" y="4" width="17" height="16" rx="2" /><path d="M7 8h6M7 12h10M7 16h4" /></svg>;
  }
  if (name === "exchange") {
    return <svg {...commonProps}><path d="M4 8h14M15 5l3 3-3 3M20 16H6M9 13l-3 3 3 3" /></svg>;
  }
  if (name === "document") {
    return <svg {...commonProps}><path d="M6 3.5h8l4 4V20H6V3.5Z" /><path d="M14 3.5V8h4M9 12h6M9 16h6" /></svg>;
  }
  if (name === "nodes") {
    return <svg {...commonProps}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="m8.2 7.2 2.6 8M15.8 7.2l-2.6 8" /></svg>;
  }
  return <svg {...commonProps}><path d="M19 7.5A8 8 0 0 0 5.7 6L4 8M4 4v4h4M5 16.5A8 8 0 0 0 18.3 18l1.7-2M20 20v-4h-4" /></svg>;
}

export function ProblemSection() {
  const fragmented = [problems[0], problems[2], problems[4]];
  const manual = [problems[1], problems[3], problems[5]];

  return (
    <section className="problem-section" aria-labelledby="problem-title">
      <Container className="problem-layout">
        <div className="problem-header" data-reveal>
          <p className="problem-eyebrow">EL PUNTO DE PARTIDA</p>
          <h2 id="problem-title">Hay tareas que no deberían seguir quitándote tiempo</h2>
          <p className="problem-description">
            Cuando la información y los procesos crecen sin una estructura común, el trabajo manual
            termina ocupando el lugar de las tareas que realmente hacen avanzar a la empresa.
          </p>
        </div>

        <div className="problem-system" data-reveal aria-label="Situaciones habituales que generan trabajo manual">
          <div className="problem-family problem-family-fragmented">
            <header><h3>Información fragmentada</h3></header>
            <div className="problem-family-items">
              {fragmented.map((problem) => (
                <article key={problem.title}>
                  <span className="problem-icon"><ProblemIcon name={problem.icon} /></span>
                  <div><strong>{problem.title}</strong><small>{problem.context}</small></div>
                </article>
              ))}
            </div>
          </div>
          <div className="problem-consequence" aria-label="Consecuencia">
            <span>CONSECUENCIA</span>
            <strong>Más trabajo manual</strong>
            <i aria-hidden="true" />
          </div>
          <div className="problem-family problem-family-manual">
            <header><h3>Procesos manuales</h3></header>
            <div className="problem-family-items">
              {manual.map((problem) => (
                <article key={problem.title}>
                  <span className="problem-icon"><ProblemIcon name={problem.icon} /></span>
                  <div><strong>{problem.title}</strong><small>{problem.context}</small></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
