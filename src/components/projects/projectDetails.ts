export const projectDetails = [
  {
    slug: "silos-spain",
    client: "Silos Spain",
    category: "Plataforma empresarial",
    title: "De procesos dispersos a una gestión conectada.",
    introduction: "Una plataforma diseñada para centralizar la gestión comercial, simplificar el trabajo diario y conectar procesos que antes funcionaban por separado.",
    tags: ["Software a medida", "CRM", "Automatización"],
    challengeTitle: "La información comercial, repartida entre distintas herramientas.",
    challenge: "Información comercial dispersa, tareas manuales y herramientas independientes.",
    solution: "Un ecosistema empresarial modular con el CRM como núcleo, que permite integrar progresivamente procesos comerciales y administrativos.",
    focus: "Un núcleo común. Un sistema que puede crecer.",
    features: [
      { label: "01 / Gestión comercial", title: "Todo el ciclo comercial, a la vista.", text: "Solicitudes, contactos, oportunidades y presupuestos comparten un mismo entorno. El dashboard ayuda a situar cada proceso y su siguiente paso." },
      { label: "02 / Un entorno modular", title: "Conectar el trabajo, paso a paso.", text: "El CRM es el punto de partida para incorporar procesos administrativos, automatizaciones e IA allí donde aporten valor. Los nuevos módulos e integraciones se incorporan progresivamente." },
    ],
    video: "/videos/details/silos-crm.mp4",
    poster: "/projects/details/silos-crm.jpg",
    videoCaption: "Recorrido por el entorno comercial. Las cifras de la interfaz no representan resultados del proyecto.",
    visualNote: "Representación del CRM con datos ficticios de demostración.",
    seoImage: "/projects/details/silos-crm.jpg",
  },
  {
    slug: "apc",
    client: "APC Europe",
    category: "Aplicación de operaciones",
    title: "Cada recogida registrada. Cada viaje bajo control.",
    introduction: "Una aplicación web diseñada para simplificar el trabajo de los conductores y centralizar la información de las operaciones de transporte y recogida de materia prima.",
    tags: ["Aplicación web", "Logística", "Experiencia móvil"],
    challengeTitle: "Cada ruta genera información que hay que organizar.",
    challenge: "Organizar los datos generados durante los viajes, las recogidas y las descargas, facilitando su registro y consulta.",
    solution: "Digitalización de viajes, recogidas, descargas, documentación y controles operativos desde una aplicación adaptada al móvil.",
    focus: "Diseñada para quien está en ruta.",
    features: [
      { label: "01 / Desde el móvil", title: "Registrar una recogida, desde donde sucede.", text: "Compartimentos, kilos y datos de calidad se reúnen en un registro pensado para el conductor. Una interfaz centrada en la tarea, en el lugar de trabajo." },
      { label: "02 / Visión operativa", title: "Del registro al conjunto del viaje.", text: "Recogidas, descargas y documentación forman parte de una misma operación. Toda la información, organizada para facilitar su consulta y seguimiento." },
    ],
    video: "/videos/details/apc-app-recorrido.mp4",
    poster: "/projects/details/apc-app-recorrido.jpg",
    videoCaption: "",
    visualNote: "Representación de la interfaz móvil con datos ficticios de demostración.",
    seoImage: "/projects/apc/hero.jpg",
  },
  {
    slug: "la-factory-coworking",
    client: "La Factory Coworking",
    category: "Webapp de coworking",
    title: "Un espacio compartido. Una gestión mucho más sencilla.",
    introduction: "Una aplicación web que reúne reservas, usuarios y servicios del coworking en una experiencia digital sencilla.",
    tags: ["Aplicación web", "Reservas", "Experiencia de usuario"],
    challengeTitle: "Un espacio compartido, muchas tareas por coordinar.",
    challenge: "Facilitar la organización diaria de un espacio de coworking y reducir la dispersión de tareas administrativas.",
    solution: "Un entorno propio para gestionar reservas, miembros, calendarios y distintos servicios del espacio.",
    focus: "La experiencia del espacio, también en digital.",
    features: [
      { label: "01 / Calendario y reservas", title: "Encontrar una sala. Reservar un momento.", text: "Consultar el calendario, elegir una sala y confirmar una reserva desde el móvil." },
      { label: "02 / El espacio personal", title: "Una experiencia común, en cualquier pantalla.", text: "La información del coworker y sus reservas, reunidas en un espacio personal accesible desde el ordenador y el móvil." },
    ],
    video: "/videos/details/factory-app-recorrido.mp4",
    poster: "/projects/details/factory-app-recorrido.jpg",
    videoCaption: "Calendario y reserva de salas desde el móvil.",
    visualNote: "Interfaces web y móvil · Datos de ejemplo.",
    seoImage: "/projects/la-factory/meeting-room.jpg",
  },
] as const;

export type ProjectDetail = (typeof projectDetails)[number];

export function findProject(slug: string) {
  return projectDetails.find((project) => project.slug === slug);
}
