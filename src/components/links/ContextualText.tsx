import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./ContextualText.module.css";

type TextLink = { phrase: string; href: string };

// Insert real anchors in existing translated copy without changing its text.
export function ContextualText({ text, links }: { text: string; links: readonly TextLink[] }) {
  const matches = links.map((link) => ({ ...link, start: text.indexOf(link.phrase) }))
    .filter((link) => link.phrase && link.start >= 0).sort((a, b) => a.start - b.start);
  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const link of matches) {
    if (link.start < cursor) continue;
    parts.push(text.slice(cursor, link.start));
    parts.push(<Link className={styles.link} href={link.href} key={`${link.start}-${link.href}`}>{link.phrase}</Link>);
    cursor = link.start + link.phrase.length;
  }
  parts.push(text.slice(cursor));
  return <>{parts}</>;
}
