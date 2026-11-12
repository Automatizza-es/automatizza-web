"use client";

import Image from "next/image";
import { useEffect } from "react";
import { usePlayOnView } from "../usePlayOnView";
import { MobileHome, WebHome } from "./LaFactoryVisual";
import styles from "./LaFactoryPhotoVisual.module.css";

const photo = "/projects/la-factory/coworking-screens.png";
const sizes = "(max-width: 760px) 520px, (max-width: 1440px) 34vw, 420px";

export function LaFactoryPhotoVisual() {
  const sceneRef = usePlayOnView<HTMLDivElement>(0.65);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const resize = () => {
      const { width, height } = scene.getBoundingClientRect();
      scene.style.setProperty("--factory-photo-scale", String(Math.max(width / 1122, height / 1402)));
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
        <div className={styles.desktop}><div className={styles.content}><WebHome /></div></div>
        {/* The real phone is in front of the monitor: preserve its photographed bezel. */}
        <div className={styles.phoneFrame}>
          <Image className={styles.phoneFrameImage} src={photo} alt="" width={1122} height={1402} sizes={sizes} />
        </div>
        <div className={styles.mobile}><div className={styles.content}><MobileHome /></div></div>
        <div className={styles.island}>
          <Image className={styles.islandImage} src={photo} alt="" width={1122} height={1402} sizes={sizes} />
        </div>
      </div>
    </div>
  );
}
