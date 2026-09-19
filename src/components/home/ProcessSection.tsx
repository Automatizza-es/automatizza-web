import { Container } from "@/components/layout/Container";

const steps = [
  {
    title: "Entender la necesidad",
    description: "Escuchamos cómo trabaja el equipo hoy y qué problema quiere resolver.",
  },
  {
    title: "Analizar el proceso",
    description: "Detectamos dónde se pierde tiempo, qué se repite y qué merece la pena cambiar.",
  },
  {
    title: "Diseñar la solución",
    description: "Definimos la opción más sencilla y útil para el proceso real.",
  },
  {
    title: "Desarrollar y validar",
    description: "Construimos por etapas y comprobamos que funciona en el día a día.",
  },
  {
    title: "Mejorar progresivamente",
    description: "El sistema evoluciona con la empresa, no al revés.",
  },
];

export function ProcessSection() {
  return (
    <section className="process-section" id="forma-de-trabajar" aria-labelledby="process-title">
      <Container>
        <header className="process-header" data-reveal>
          <p className="section-eyebrow">FORMA DE TRABAJAR</p>
          <h2 id="process-title">
            Primero entendemos el proceso
            <br />
            Después elegimos la tecnología
          </h2>
        </header>

        <div className="process-journey" data-reveal>
          <svg viewBox="0 0 1160 430" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="process-route-base"
              d="M40 220H210L275 174H450L525 224H700L775 178H950L1020 220H1120"
            />
            <path
              className="process-route-active"
              d="M40 220H210L275 174H450L525 224H700L775 178H950L1020 220H1120"
            />
          </svg>
          <ol className="process-path">
            {steps.map((step, index) => (
              <li key={step.title}>
                <span className="process-node" aria-hidden="true" />
                <span className="process-number">{index + 1}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
