import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { SavingsCalculator } from "@/components/home/SavingsCalculator";

export function CalculatorSection() {
  return (
    <section className="calculator-section" id="calculadora" aria-labelledby="calculator-title">
      <Container className="calculator-shell">
        <div className="calculator-copy" data-reveal>
          <p className="section-eyebrow">CALCULADORA AUTOMATIZZA</p>
          <h2 id="calculator-title">¿Cuánto te cuesta no automatizar?</h2>
          <p>
            Calcula cuánto te cuestan las tareas repetitivas de tu empresa y estima el tiempo y el
            valor económico que podrías recuperar al automatizarlas.
          </p>
          <Link className="button button-primary" href="/contacto">
            Cuéntanos tu proyecto <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="calculator-app" data-reveal>
          <SavingsCalculator />
        </div>
      </Container>
    </section>
  );
}
