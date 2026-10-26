"use client";

import { useEffect, useRef, useState } from "react";
import { translator } from "@/lib/i18n/translate";
import type { Locale } from "@/lib/i18n/routes";
import { mountConversation, type ConversationControls, type ConversationState } from "./conversation-motion";
import styles from "./IllustrativeConversation.module.css";

export const conversationMessages = [
  ["Cliente", "Hola, necesitamos almacenar unas 5.000 toneladas de trigo en Marruecos"],
  ["Agente", "Hola, soy el asistente virtual de Silos Spain. ¿Se trata de una instalación nueva o de una ampliación?"],
  ["Cliente", "Una instalación nueva. Nos gustaría comentarlo con vuestro equipo"],
  ["Agente", "Podemos buscar un horario para una reunión. ¿Qué día te vendría bien?"],
] as const;

export function IllustrativeConversation({ locale }: { locale: Locale }) {
  const t = translator(locale);
  const root = useRef<HTMLElement>(null);
  const controls = useRef<ConversationControls | null>(null);
  const [state, setState] = useState<ConversationState>("static");
  useEffect(() => {
    if (!root.current) return;
    const motion = mountConversation(root.current, setState);
    controls.current = motion;
    return () => { motion.destroy(); controls.current = null; };
  }, [locale]);
  const enhanced = state !== "static";
  return <figure ref={root} className={styles.figure} aria-labelledby="conversation-caption">
    <div className={styles.panel}>
      <p className={styles.header}>{t("Silos Spain · Asistente virtual")}</p>
      <ol className={styles.messages} role="list">
        {conversationMessages.map(([speaker, message], index) => <li key={message} className={index % 2 === 0 ? styles.customer : styles.agent}>
          {index % 2 === 1 && <span className={styles.typing} data-chat-typing aria-hidden="true">•••</span>}
          <div className={styles.bubble} data-chat-message>
            <span className={styles.speaker}>{t(speaker)}: </span>{t(message)}
          </div>
        </li>)}
      </ol>
      <p className={styles.summary} data-chat-summary>{t("Producto: trigo · Capacidad: 5.000 t · País: Marruecos · Proyecto: instalación nueva")}</p>
    </div>
    <figcaption id="conversation-caption">{t("Conversación ilustrativa basada en el flujo desarrollado")}</figcaption>
    <div className={styles.controls} data-available={enhanced}>
      <button type="button" disabled={!enhanced || state === "waiting" || state === "complete"} onClick={() => controls.current?.togglePause()}>{state === "paused" ? t("Reanudar") : t("Pausar")}</button>
      <button type="button" disabled={!enhanced} onClick={() => controls.current?.replay()}>{t("Volver a reproducir")}</button>
      <button type="button" disabled={!enhanced || state === "complete"} onClick={() => controls.current?.finish()}>{t("Ver conversación completa")}</button>
    </div>
  </figure>;
}
