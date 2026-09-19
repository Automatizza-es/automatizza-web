import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/layout/Container";

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
          <Link className="button button-primary" href="#contacto">
            Calcular mi ahorro potencial <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="calculator-image" data-reveal>
          <Image
            src="/reference/calculadora.png"
            alt="Vista previa de la calculadora Automatizza con una estimación de ahorro"
            width={1774}
            height={790}
            sizes="(max-width: 900px) calc(100vw - 3.5rem), 720px"
          />
        </div>
      </Container>
    </section>
  );
}
