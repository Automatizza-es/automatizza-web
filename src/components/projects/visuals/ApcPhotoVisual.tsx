"use client";

import Image from "next/image";
import { useEffect } from "react";
import { usePlayOnView } from "../usePlayOnView";
import { ApcHome } from "./ApcVisual";
import styles from "./ApcPhotoVisual.module.css";

const photo = "/projects/apc/phone-graphite.png";
const sizes = "(max-width: 760px) 520px, (max-width: 1440px) 34vw, 420px";

export function ApcPhotoVisual() {
  const sceneRef = usePlayOnView<HTMLDivElement>(0.65);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const resize = () => {
      const { width, height } = scene.getBoundingClientRect();
      scene.style.setProperty("--apc-photo-scale", String(Math.max(width / 1122, height / 1402)));
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(scene);
    return () => observer.disconnect();
  }, [sceneRef]);

  return (
    <div ref={sceneRef} className={styles.scene} aria-hidden="true">
      <div className={styles.canvas}>
        <Image className={styles.photo} src={photo} alt="" width={1122} height={1402} sizes={sizes} />
        <div className={styles.screen}>
          <div className={styles.content}><ApcHome /></div>
        </div>
        {/* Keep the photographed camera cutout, including its lens and lighting. */}
        <div className={styles.island}>
          <Image className={styles.islandPhoto} src={photo} alt="" width={1122} height={1402} sizes={sizes} />
        </div>
      </div>
    </div>
  );
}
