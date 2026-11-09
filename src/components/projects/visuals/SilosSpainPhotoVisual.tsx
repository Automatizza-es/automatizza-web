"use client";

import Image from "next/image";
import { useEffect } from "react";
import { usePlayOnView } from "../usePlayOnView";
import { CrmDashboard } from "./SilosSpainVisual";
import styles from "./SilosSpainPhotoVisual.module.css";

/** The photograph and the screen share its original 1254 × 1254 coordinate space. */
export function SilosSpainPhotoVisual() {
  const sceneRef = usePlayOnView<HTMLDivElement>(0.65);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const resize = () => {
      const { width, height } = scene.getBoundingClientRect();
      scene.style.setProperty("--silos-photo-scale", String(Math.max(width, height) / 1254));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(scene);
    return () => observer.disconnect();
  }, [sceneRef]);

  return (
    <div ref={sceneRef} className={styles.scene} aria-hidden="true">
      <div className={styles.canvas}>
        <Image
          className={styles.photo}
          src="/projects/silos-spain/laptop-olives.png"
          alt=""
          width={1254}
          height={1254}
          sizes="(max-width: 760px) 650px, (max-width: 1440px) 34vw, 500px"
        />
        <div className={styles.screen}>
          <div className={styles.entrance}>
            <div className={styles.content}>
              <CrmDashboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
