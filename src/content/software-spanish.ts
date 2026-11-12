import { routes } from "@/lib/i18n/routes";

// SEO-04 is limited to Spanish; the shared source and translations stay intact.
export const softwareSpanishMetadata = {
  title: "Desarrollo de software a medida para empresas | Automatizza",
  description: "Desarrollamos software a medida para gestionar clientes, reservas y operaciones. Definimos contigo el alcance, las integraciones y la puesta en marcha.",
} as const;

export const softwareSpanishContent = {
  h1: "Desarrollo de software a medida para empresas.",
  introduction: "Desarrollamos aplicaciones para gestionar clientes, reservas, documentación y operaciones. Partimos de cómo trabaja tu equipo, definimos una primera versión y construimos una herramienta que encaje en su día a día. Revisamos también las conexiones con otros sistemas y las necesidades de mantenimiento.",
  needsTitle: "Cuando tus herramientas se quedan cortas",
  needs: [
    ["La información está repartida.", "Clientes, documentación y seguimientos acaban entre hojas de cálculo, correos y programas distintos. Necesitas reunir la información para consultar cada gestión y continuar el trabajo desde un mismo entorno."],
    ["La herramienta te obliga a dar rodeos.", "Tu equipo repite pasos, completa datos fuera del programa o adapta su trabajo a funciones que no encajan con el proceso. Revisamos qué necesita resolver la herramienta y qué tareas conviene simplificar."],
    ["Tu proceso tiene unas reglas propias.", "Necesitas gestionar reservas, registrar operaciones o dar acceso a clientes con permisos y condiciones que las opciones disponibles no cubren."],
  ],
  needsConclusion: "Antes de proponer un desarrollo, valoramos si una herramienta existente puede resolver la necesidad.",
  examplesTitle: "Qué aplicaciones a medida podemos desarrollar",
  examples: [
    ["CRM y herramientas de gestión interna", "Aplicaciones para organizar clientes, solicitudes, oportunidades, presupuestos y documentación. Definimos qué información necesita cada perfil y cómo debe avanzar una gestión dentro de la empresa."],
    ["Portales para clientes y colaboradores", "Espacios donde clientes y colaboradores pueden consultar documentación, aportar información o seguir una gestión, con los permisos acordados para cada usuario."],
    ["Aplicaciones de operaciones para usar desde el móvil", "Herramientas para registrar y consultar información durante el trabajo: recogidas, viajes, documentación u otras operaciones que necesitan un registro adaptado al móvil."],
    ["Sistemas de reservas y gestión de espacios", "Aplicaciones para consultar disponibilidad, reservar salas y reunir usuarios, calendarios y servicios, según las reglas de funcionamiento de cada espacio."],
  ],
  projectsTitle: "Software a medida en proyectos reales",
  projects: [
    { name: "Silos Spain", text: "Una plataforma empresarial con el CRM como núcleo para reunir solicitudes, contactos, oportunidades y presupuestos. Un entorno modular que permite incorporar nuevos procesos e integraciones progresivamente.", path: routes["silos-spain"].es, link: "Ver el proyecto de Silos Spain" },
    { name: "APC Europe", text: "Una aplicación web adaptada al móvil para registrar viajes, recogidas, descargas y documentación. La información de cada operación se organiza para facilitar su consulta y seguimiento.", path: routes.apc.es, link: "Ver el proyecto de APC Europe" },
    { name: "La Factory Coworking", text: "Una aplicación web para consultar disponibilidad, reservar salas y reunir la información de usuarios y servicios del coworking, accesible desde el ordenador y el móvil.", path: routes["la-factory-coworking"].es, link: "Ver el proyecto de La Factory Coworking" },
  ],
  stepsTitle: "Cómo trabajamos, de la primera reunión a la entrega",
  steps: [
    ["Entendemos el proceso y definimos una primera versión", "En la primera reunión revisamos cómo trabaja tu equipo, qué herramientas utiliza y dónde aparece el problema. Acordamos qué debe resolver la primera versión y qué puede quedar para una ampliación."],
    ["Diseñamos pantallas, información y permisos", "Concretamos qué necesita hacer cada usuario, qué datos debe manejar la aplicación y cómo se relacionan sus pantallas. Revisamos también las integraciones y las dependencias de otros sistemas."],
    ["Desarrollamos y probamos con situaciones reales", "Construimos las funcionalidades acordadas y comprobamos su funcionamiento con ejemplos del trabajo diario. Revisamos los recorridos de usuario, los permisos y los intercambios de información incluidos en el alcance."],
    ["Ponemos en marcha y acordamos los siguientes pasos", "Preparamos la entrega y comprobamos el uso de la aplicación con tu equipo. Dejamos definido cómo gestionar incidencias, mantenimiento y posibles ampliaciones según las condiciones del proyecto."],
  ],
  faqTitle: "Antes de contratar un desarrollo a medida",
  questions: [
    ["¿Cuándo conviene desarrollar software a medida?", "Cuando un proceso importante no queda bien resuelto con las herramientas disponibles o necesita reglas, permisos e integraciones propios. Primero revisamos si una solución existente puede cubrir la necesidad y qué limitaciones tendría."],
    ["¿Qué incluye un proyecto de software a medida?", "La propuesta concreta las funcionalidades, los perfiles de usuario, los datos y las integraciones de la primera versión. También debe identificar los entregables, las pruebas y la puesta en marcha, junto con los servicios de infraestructura, licencias o mantenimiento que correspondan."],
    ["¿Cuánto cuesta desarrollar software a medida?", "El presupuesto depende del alcance, los perfiles y permisos, la complejidad de las funciones, las integraciones y los datos que haya que incorporar. La propuesta debe distinguir el desarrollo inicial de los costes recurrentes de alojamiento, herramientas de terceros y mantenimiento."],
    ["¿Podéis conectar la aplicación con nuestros programas actuales?", "Revisamos las posibilidades de integración de cada herramienta, sus accesos y sus limitaciones. Si necesitas trasladar datos de otro sistema, valoramos también su formato, calidad y volumen para acordar qué se puede incorporar y cómo comprobarlo."],
    ["¿Cómo se acuerdan el mantenimiento y el soporte?", "El mantenimiento y el soporte se definen para cada proyecto. La propuesta debe concretar cómo se comunicarían las incidencias, qué tareas estarían cubiertas y las condiciones de atención. Las ampliaciones funcionales se valoran según su alcance."],
    ["¿Cómo quedan la propiedad del software y los accesos?", "La propuesta y el contrato deben concretar la titularidad del desarrollo, las condiciones de uso, los accesos y los entregables. También deben identificar las licencias y los servicios de terceros que utilice la aplicación."],
  ],
  integrationQuestion: "¿Podéis conectar la aplicación con nuestros programas actuales?",
  closingTitle: "¿Qué necesita tu equipo que tus herramientas actuales no resuelven?",
  closingText: "Cuéntanos qué proceso quieres mejorar, quién lo utiliza y con qué herramientas trabajáis ahora. Revisamos la necesidad y valoramos contigo qué debería incluir una primera versión.",
} as const;
