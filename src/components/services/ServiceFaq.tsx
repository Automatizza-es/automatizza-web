import { Container } from "@/components/layout/Container";
import faqStyles from "@/components/home/FaqSection.module.css";
import styles from "@/components/pages/ProcessAutomationPage.module.css";

type Props = { title: string; questions: readonly (readonly [string, string])[]; id?: string };

export function ServiceFaq({ title, questions, id = "service-faq-title" }: Props) {
  return <section className={`${styles.section} ${styles.faq}`} aria-labelledby={id}>
    <Container className="editorial-container" data-service-reveal>
      <h2 id={id}>{title}</h2>
      <div className={`${faqStyles.questions} ${styles.questions}`}>
        {questions.map(([question, answer]) => <details className={faqStyles.item} key={question}>
          <summary className={faqStyles.summary}><h3><span>{question}</span><span className={faqStyles.icon} aria-hidden="true" /></h3></summary>
          <p className={faqStyles.answer}>{answer}</p>
        </details>)}
      </div>
    </Container>
  </section>;
}
