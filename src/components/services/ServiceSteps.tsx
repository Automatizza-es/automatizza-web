import styles from "@/components/pages/ProcessAutomationPage.module.css";

type Props = { title: string; steps: readonly (readonly [string, string])[]; id?: string };

export function ServiceSteps({ title, steps, id = "approach-title" }: Props) {
  return <section className={styles.section} aria-labelledby={id}>
    <div className="container editorial-container">
      <h2 id={id} data-service-reveal>{title}</h2>
      <ol className={styles.steps} data-service-staircase role="list">
        {steps.map(([heading, text], i) => <li key={heading}>
          <span className={styles.number} aria-hidden="true">0{i + 1}</span>
          {i < steps.length - 1 && <svg className={styles.stepConnector} viewBox="0 0 100 64" preserveAspectRatio="none" fill="none" aria-hidden="true" focusable="false">
            <path d="M0 64H68V0H100M96 -4L100 0L96 4" stroke="currentColor" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
          </svg>}
          <h3>{heading}</h3><p>{text}</p>
        </li>)}
      </ol>
    </div>
  </section>;
}
