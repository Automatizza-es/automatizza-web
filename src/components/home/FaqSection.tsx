"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";

import { Container } from "@/components/layout/Container";
import styles from "./FaqSection.module.css";

const questions = [
  {
    question: "¿Qué procesos de una pyme se pueden automatizar?",
    answer: "Los procesos repetitivos que siguen reglas claras y requieren mover información entre personas, documentos o programas suelen ser buenos candidatos. Por ejemplo: registrar solicitudes, actualizar datos de clientes, preparar documentos, enviar avisos o hacer seguimientos. Las tareas que necesitan interpretar mensajes o documentos también pueden automatizarse en parte, con los controles adecuados.",
  },
  {
    question: "¿Cómo saber si merece la pena automatizar un proceso?",
    answer: "Conviene comparar el tiempo y los errores que genera actualmente con el coste de implantar y mantener la solución. También importa la frecuencia con la que se repite y las excepciones que hay que resolver. En una primera conversación gratuita y sin compromiso, podemos revisar vuestro caso y valorar por dónde empezar.",
  },
  {
    question: "¿Es necesario cambiar los programas que ya utiliza la empresa?",
    answer: "No necesariamente. Primero estudiamos las herramientas que ya utilizáis y sus posibilidades de conexión, para evitar introducir los mismos datos varias veces o trasladarlos manualmente. Si alguna herramienta no permite una integración fiable, os explicamos las alternativas antes de proponer un cambio.",
  },
  {
    question: "¿Cuándo tiene sentido desarrollar una aplicación a medida?",
    answer: "Cuando un proceso importante no queda bien resuelto con las herramientas disponibles y adaptarse a ellas obliga a duplicar trabajo o mantener demasiadas tareas manuales. Puede ser una aplicación para gestionar clientes y presupuestos, organizar reservas o registrar operaciones desde el móvil. En nuestros proyectos podéis ver ejemplos desarrollados para Silos Spain, APC Europe y La Factory Coworking.",
  },
  {
    question: "¿Qué puede hacer un agente de IA por WhatsApp o teléfono?",
    answer: "Puede responder consultas habituales, recoger información, ayudar a gestionar citas o realizar acciones en las herramientas de la empresa, según las integraciones disponibles. Definimos qué información puede utilizar, qué acciones tiene permitidas y cuándo debe derivar la conversación a una persona. Su alcance depende del proceso y del nivel de supervisión que necesite.",
  },
  {
    question: "¿Cuánto cuesta automatizar un proceso o desarrollar una aplicación a medida?",
    answer: "Depende del alcance, las herramientas que haya que conectar y la complejidad del desarrollo. Una automatización concreta requiere un trabajo distinto al de una aplicación completa. Antes de presupuestar, revisamos el proceso y detallamos tanto el trabajo inicial como los posibles costes recurrentes de licencias, infraestructura y servicios externos.",
  },
  {
    question: "¿Se puede empezar automatizando un solo proceso?",
    answer: "Sí. Podemos empezar por una tarea concreta, comprobar cómo funciona en el día a día y ampliar la solución por fases. Esto permite ajustar lo necesario antes de incorporar otros procesos, sin abordar todos los cambios a la vez.",
  },
];

export function FaqSection() {
  const { t } = useI18n();
  return (
    <section className={styles.section} aria-labelledby="faq-title">
      <Container className="editorial-container">
        <header>
          <p className={`section-eyebrow ${styles.eyebrow}`}>{t("PREGUNTAS FRECUENTES")}</p>
          <h2 id="faq-title" className={styles.title}>{t("Antes de empezar")}</h2>
        </header>
        <div className={styles.questions}>
          {questions.map(({ question, answer }) => (
            <details className={styles.item} key={question}>
              <summary className={styles.summary}>
                <h3>
                  <span>{t(question)}</span>
                  <span className={styles.icon} aria-hidden="true" />
                </h3>
              </summary>
              <p className={styles.answer}>{t(answer)}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
