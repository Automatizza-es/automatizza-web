import type { ReactNode } from "react";

import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  reveal?: boolean;
};

export function SectionHeading({ id, eyebrow, title, description, reveal = false }: SectionHeadingProps) {
  return (
    <div className={styles.shell}>
      <header className={`section-header ${styles.heading}`} data-reveal={reveal ? "" : undefined}>
        <p className={`section-eyebrow ${styles.eyebrow}`}>{eyebrow}</p>
        <h2 id={id}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </header>
    </div>
  );
}
