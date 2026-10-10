"use client";

import type { ReactNode } from "react";
import Image from "next/image";

import { usePlayOnView } from "@/components/projects/usePlayOnView";

type IconName =
  | "home"
  | "calendar"
  | "list"
  | "party"
  | "package"
  | "wrench"
  | "user"
  | "users"
  | "globe"
  | "bell"
  | "chevron"
  | "chevronDown";

// Simplified versions of the lucide icons the La Factory app uses.
const iconPaths: Record<IconName, ReactNode> = {
  home: <path d="M4 10.5 12 4l8 6.5V20h-5v-5.5h-6V20H4Z" />,
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M8 3v4M16 3v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01" />
    </>
  ),
  list: <path d="m3.5 6.5 1.5 1.5 3-3M3.5 15.5l1.5 1.5 3-3M11 7h9.5M11 12h9.5M11 17h9.5" />,
  party: <path d="M5 20 9 8l7 7Zm7-15 1 2M18 6l-2 2M19 12l2-.5M14 3.5c1 1.5 0 3-1 3.5" />,
  package: (
    <>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z" />
      <path d="m4 7.5 8 4.5 8-4.5M12 12v9M8 5.2l8 4.6" />
    </>
  ),
  wrench: <path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 1-2-2Z" />,
  user: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3 19.5c.6-3.3 3-5 6-5s5.4 1.7 6 5M16 5.5a3.2 3.2 0 0 1 0 6M18 14.6c1.6.6 2.7 2.2 3 4.9" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.4 2.4 3.4 5.3 3.4 8.5s-1 6.1-3.4 8.5c-2.4-2.4-3.4-5.3-3.4-8.5s1-6.1 3.4-8.5Z" />
    </>
  ),
  bell: <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15ZM10 20.5h4" />,
  chevron: <path d="m9.5 6 6 6-6 6" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
};

function Icon({ name }: { name: IconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

// Real rooms, labels and layout of the La Factory app; fictitious coworker,
// plan usage and bookings.
const rooms = [
  { name: "La Meeting Room", photo: "/projects/la-factory/meeting-room.jpg" },
  { name: "Territori Creatiu", photo: "/projects/la-factory/territori-creatiu.jpg" },
];

const bookings = [
  { room: "La Meeting Room", day: "15", month: "OCT", date: "Jueves, 15 de octubre", time: "10:00–11:30 (90 min)" },
  { room: "Territori Creatiu", day: "20", month: "OCT", date: "Martes, 20 de octubre", time: "16:00–17:00 (60 min)" },
];

const sidebar: { icon: IconName; label: string }[] = [
  { icon: "home", label: "Inicio" },
  { icon: "calendar", label: "Reservar" },
  { icon: "list", label: "Mis reservas" },
  { icon: "party", label: "Eventos" },
  { icon: "package", label: "Mis paquetes" },
  { icon: "wrench", label: "Incidencias" },
  { icon: "user", label: "Perfil" },
];

function Toolbar() {
  return (
    <div className="lf-toolbar">
      <span className="lf-lang">
        <Icon name="globe" />
        ES
        <Icon name="chevronDown" />
      </span>
      <span className="lf-bell">
        <Icon name="bell" />
      </span>
      <span className="lf-avatar">M</span>
    </div>
  );
}

function QuotaCard() {
  return (
    <div className="lf-quota">
      <div className="lf-quota-head">
        <span>Tu tarifa actual</span>
        <span className="lf-pill">
          <Icon name="calendar" />
          Octubre de 2026
        </span>
      </div>
      <b className="lf-plan">FIXED</b>
      <b className="lf-hours">16 h</b>
      <span className="lf-muted">disponibles de 20 h</span>
      <i className="lf-bar">
        <span />
      </i>
      <span className="lf-muted">4 h utilizadas este mes</span>
    </div>
  );
}

function ActionCards() {
  return (
    <>
      <div className="lf-action">
        <span className="lf-action-icon">
          <Icon name="package" />
        </span>
        <div>
          <b>Registrar paquete</b>
          <small>¿Ha llegado un paquete para alguien? Avísale en un momento.</small>
        </div>
        <Icon name="chevron" />
      </div>
      <div className="lf-action">
        <span className="lf-action-icon">
          <Icon name="wrench" />
        </span>
        <div>
          <b>¿Algo no funciona?</b>
          <small>Comunica una incidencia del espacio.</small>
        </div>
        <Icon name="chevron" />
      </div>
    </>
  );
}

function SectionHead({ title, link }: { title: string; link: string }) {
  return (
    <div className="lf-section-head">
      <b>{title}</b>
      <span>
        {link}
        <Icon name="chevron" />
      </span>
    </div>
  );
}

function Greeting() {
  return (
    <div className="lf-greeting">
      <b>Hola, Marta</b>
      <span>Qué bueno tenerte por aquí</span>
    </div>
  );
}

// Desktop web app: sidebar, rooms and bookings on the left, plan on the right.
function WebHome() {
  return (
    <div className="lf-web">
      <aside className="lf-sidebar">
        <div className="lf-brand">
          <Image src="/projects/la-factory/logo.png" alt="" width={180} height={180} />
          La Factory
        </div>
        <nav>
          {sidebar.map((item, index) => (
            <span className={index === 0 ? "is-active" : undefined} key={item.label}>
              <Icon name={item.icon} />
              {item.label}
            </span>
          ))}
        </nav>
        <div className="lf-me">
          <span className="lf-avatar">M</span>
          Marta
        </div>
      </aside>

      <div className="lf-web-main">
        <Toolbar />
        <Greeting />
        <div className="lf-web-grid">
          <div>
            <SectionHead title="Reservar una sala" link="Ver calendario" />
            <div className="lf-rooms">
              {rooms.map((room) => (
                <div className="lf-room" key={room.name}>
                  <span className="lf-room-photo">
                    <Image src={room.photo} alt="" width={480} height={360} />
                    <span className="lf-capacity">
                      <Icon name="users" />
                      2–4 pers.
                    </span>
                  </span>
                  <b>{room.name}</b>
                  <span className="lf-room-button">
                    Disponibilidad
                    <Icon name="chevron" />
                  </span>
                </div>
              ))}
            </div>

            <SectionHead title="Próximas reservas" link="Ver todas" />
            <div className="lf-bookings">
              {bookings.map((booking) => (
                <div className="lf-booking" key={booking.room}>
                  <span className="lf-booking-date">
                    <b>{booking.day}</b>
                    {booking.month}
                  </span>
                  <div>
                    <b>{booking.room}</b>
                    <span>{booking.date}</span>
                    <span>{booking.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lf-web-side">
            <QuotaCard />
            <ActionCards />
          </div>
        </div>
      </div>
    </div>
  );
}

// Phone app home, same product in one column with the bottom tab bar.
function MobileHome() {
  return (
    <div className="lf-mobile">
      <div className="lf-status">
        <span>9:41</span>
        <span className="lf-status-icons">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="lf-mobile-head">
        <Image className="lf-mobile-logo" src="/projects/la-factory/logo.png" alt="" width={180} height={180} />
        <Toolbar />
      </div>
      <Greeting />
      <QuotaCard />
      <ActionCards />
      <SectionHead title="Reservar una sala" link="Ver calendario" />
      <div className="lf-mobile-rooms">
        {rooms.map((room) => (
          <span className="lf-room-photo" key={room.name}>
            <Image src={room.photo} alt="" width={480} height={360} />
            <span className="lf-capacity">
              <Icon name="users" />
              2–4 pers.
            </span>
          </span>
        ))}
      </div>
      <nav className="lf-tabs">
        <span className="is-active">
          <Icon name="home" />
          Inicio
        </span>
        <span>
          <Icon name="calendar" />
          Reservar
        </span>
        <span>
          <Icon name="list" />
          Mis reservas
        </span>
        <span>
          <Icon name="user" />
          Perfil
        </span>
      </nav>
    </div>
  );
}

export function LaFactoryVisual() {
  const ref = usePlayOnView<HTMLDivElement>();

  return (
    <div className="lf-scene" ref={ref}>
      {/* The web app opens out of the phone's footprint while the phone steps aside. */}
      <div className="lf-desk">
        <div className="lf-desk-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="lf-desk-screen">
          <WebHome />
        </div>
      </div>

      <div className="lf-phone">
        <div className="lf-bezel">
          <div className="lf-screen">
            <MobileHome />
            <span className="lf-island" />
          </div>
        </div>
      </div>
    </div>
  );
}
