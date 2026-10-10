"use client";

import type { ReactNode } from "react";
import Image from "next/image";

import { usePlayOnView } from "@/components/projects/usePlayOnView";

type IconName = "home" | "trucks" | "pins" | "users" | "truck" | "check";

const iconPaths: Record<IconName, ReactNode> = {
  home: <path d="M4 10.5 12 4l8 6.5V20h-5.5v-5.5h-5V20H4Z" />,
  trucks: (
    <>
      <path d="M2.5 7.5h10v8h-10ZM12.5 10h4l3 3v2.5h-7" />
      <circle cx="6" cy="17" r="1.6" />
      <circle cx="16" cy="17" r="1.6" />
    </>
  ),
  pins: (
    <>
      <path d="M8 20s-4.5-4.6-4.5-8.3a4.5 4.5 0 0 1 9 0C12.5 15.4 8 20 8 20Z" />
      <path d="M16 15s-3.5-3.6-3.5-6.5a3.5 3.5 0 0 1 7 0c0 2.9-3.5 6.5-3.5 6.5Z" />
    </>
  ),
  users: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  truck: (
    <>
      <path d="M2.5 6.5h11v9h-11ZM13.5 9.5h4l3 3.5v2.5h-7" />
      <circle cx="6.5" cy="17" r="1.8" />
      <circle cx="17" cy="17" r="1.8" />
    </>
  ),
  check: <path d="m5.5 12.5 4 4 9-9" />,
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

// The APC driver app's home screen (real layout and labels), with
// fictitious driver, plate and slaughterhouse.
function ApcHome() {
  return (
    <div className="apc-app">
      <div className="apc-status">
        <span>9:41</span>
        <span className="apc-status-icons">
          <i />
          <i />
          <i />
        </span>
      </div>
      <Image className="apc-hero" src="/projects/apc/hero.jpg" alt="" width={600} height={312} />
      <div className="apc-body">
        <p className="apc-greeting">¡Hola Laura!</p>
        <p className="apc-plate">Viajas con esta matrícula: 4821-KLM</p>
        <span className="apc-button">
          <Icon name="truck" />
          Añadir Recogida
        </span>
        <div className="apc-item">
          <span className="apc-item-tile" aria-hidden="true">
            🚚
          </span>
          <div>
            <small>455,0 KILOS</small>
            <b>6210007590</b>
            <span>Cárnicas del Valle, S.L.</span>
          </div>
          <span className="apc-item-more">•••</span>
        </div>
      </div>
      <nav className="apc-tabs">
        <span className="is-active">
          <Icon name="home" />
          Inicio
        </span>
        <span>
          <Icon name="trucks" />
          Todos los Via…
        </span>
        <span>
          <Icon name="pins" />
          Direcciones
        </span>
        <span>
          <Icon name="users" />
          Usuarios
        </span>
      </nav>
    </div>
  );
}

export function ApcVisual() {
  const ref = usePlayOnView<HTMLDivElement>();

  return (
    <div className="apc-scene" ref={ref}>
      <div className="apc-phone">
        <div className="apc-bezel">
          <div className="apc-screen">
            <ApcHome />
            <span className="apc-island" />
          </div>
        </div>
      </div>

      {/* Today's trip: pickup validated at the slaughterhouse, truck on its way to APC. */}
      <div className="apc-route">
        <span className="apc-route-line" />
        <span className="apc-route-done" />
        <span className="apc-node apc-node-origin" />
        <span className="apc-node apc-node-destination" />
        <span className="apc-truck">
          <svg viewBox="0 0 32 20" aria-hidden="true">
            <path d="M1 3.5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2V15H1Z" fill="#1c3157" />
            <path d="M21 6h5.2a2 2 0 0 1 1.7 1l2.6 4.4a2 2 0 0 1 .3 1V15H21Z" fill="#2c4a7c" />
            <path d="M23 8h3.3l1.9 3.3H23Z" fill="#dfe8f5" />
            <circle cx="7" cy="16" r="2.6" fill="#0f1b30" stroke="#ffffff" strokeWidth="1.2" />
            <circle cx="25" cy="16" r="2.6" fill="#0f1b30" stroke="#ffffff" strokeWidth="1.2" />
          </svg>
        </span>
        <div className="apc-stop apc-stop-origin">
          <b>Cárnicas del Valle</b>
          <span className="apc-pickup-status">
            <span className="apc-status-pending">
              <i />
              Recogida en curso
            </span>
            <span className="apc-status-done">
              <i>
                <Icon name="check" />
              </i>
              Recogida validada
            </span>
          </span>
        </div>
        <div className="apc-stop apc-stop-destination">
          <b>APC Europe</b>
          <small>Granollers</small>
        </div>
      </div>
    </div>
  );
}
