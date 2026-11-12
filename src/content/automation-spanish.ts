import { routes } from "@/lib/i18n/routes";

// Approved Spanish proposal; shared source strings remain for EN, FR and PT.
export const automationSpanishMetadata = {
  title: "Automatización de procesos empresariales | Automatizza",
  description: "Automatizamos solicitudes, presupuestos, documentos y seguimientos. Conectamos tus herramientas y definimos qué tareas requieren revisión de tu equipo.",
} as const;

export const automationSpanishContent = {
  h1: "Automatización de procesos empresariales.",
  introduction: "Automatizamos tareas repetitivas dentro de tus procesos: registrar solicitudes, preparar presupuestos y documentos, organizar seguimientos y compartir información entre aplicaciones. Definimos qué puede ejecutarse con reglas y qué necesita revisión de tu equipo.",
  introductionClosing: "Partimos de un proceso concreto y revisamos sus herramientas, reglas y excepciones antes de definir la solución.",
  examplesTitle: "Qué procesos de tu empresa podemos automatizar",
  examples: [
    ["Solicitudes y asignación de tareas", "Registrar solicitudes que llegan por formularios o correo, reunir sus datos y asignarlas al responsable según las reglas acordadas. Cuando falta información o hace falta una decisión, el proceso puede pasar a revisión del equipo."],
    ["Presupuestos y documentos", "Preparar presupuestos y documentos a partir de datos y plantillas, organizar archivos y trasladar información a los sistemas correspondientes. Definimos qué contenido puede generarse automáticamente y qué debe revisarse antes de utilizarlo o enviarlo."],
    ["Seguimientos, avisos y tareas pendientes", "Enviar recordatorios, comunicar cambios de estado y avisar cuando una gestión lleva tiempo pendiente o necesita información. Acordamos cuándo debe producirse cada aviso y quién tiene que recibirlo."],
    ["Conexiones entre herramientas", "Compartir información entre el CRM, el correo, hojas de cálculo y otras aplicaciones para evitar trasladarla manualmente en cada paso. Revisamos las posibilidades de integración, los permisos y las limitaciones de cada sistema."],
  ],
  caseTitle: "Un proceso comercial conectado: Silos Spain",
  caseFirst: "En Silos Spain desarrollamos una plataforma que reúne solicitudes, contactos, oportunidades y presupuestos en un mismo entorno. Su CRM permite organizar la información comercial y continuar cada gestión desde una plataforma común.",
  caseSecond: "También hemos desarrollado un agente de WhatsApp que recoge la necesidad inicial del cliente y organiza los datos de su proyecto. El flujo contempla la gestión de reuniones mediante herramientas de calendario.",
  caseSecondLinks: [{ phrase: "agente de WhatsApp", href: routes["artificial-intelligence"].es }],
  caseReference: "Otros ejemplos de procesos digitalizados son el registro de viajes y recogidas de APC Europe y la gestión de reservas de La Factory Coworking.",
  caseReferenceLinks: [
    { phrase: "APC Europe", href: routes.apc.es },
    { phrase: "La Factory Coworking", href: routes["la-factory-coworking"].es },
  ],
  stepsTitle: "Cómo trabajamos, del proceso actual a la puesta en marcha",
  steps: [
    ["Entendemos el proceso actual", "Revisamos qué ocurre desde que empieza hasta que termina: quién interviene, qué información se utiliza y qué herramientas participan. Identificamos las tareas repetitivas, las decisiones y las situaciones que requieren un tratamiento diferente."],
    ["Definimos una primera versión", "Acordamos qué pasos automatizar, qué datos deben intercambiarse y qué acciones necesitan aprobación. Delimitamos el alcance y definimos qué hacer cuando falta información o se produce una excepción."],
    ["Construimos y probamos el flujo", "Conectamos las herramientas y comprobamos las reglas, los permisos y los intercambios de información incluidos en el alcance. Probamos el recorrido habitual y los casos acordados en los que una acción debe detenerse o pasar a revisión."],
    ["Preparamos la puesta en marcha", "Preparamos la puesta en marcha de la automatización y verificamos los pasos acordados. Definimos contigo cómo gestionar las incidencias, el mantenimiento y las posibles ampliaciones según las necesidades y condiciones de cada proyecto."],
  ],
  faqTitle: "Antes de contratar una automatización",
  questions: [
    ["¿Podemos mantener los programas que utilizamos?", "Siempre que permitan una conexión adecuada, partimos de las herramientas existentes. Revisamos sus accesos, posibilidades de integración y limitaciones. Si alguna impide resolver el proceso, valoramos las alternativas contigo antes de proponer un cambio."],
    ["¿En qué se diferencian la automatización, el software a medida y la IA?", "La automatización coordina pasos y mueve información siguiendo reglas. El software a medida aporta una aplicación propia cuando necesitas pantallas, datos o funciones que tus herramientas no cubren. La IA puede ayudar cuando hay que interpretar documentos, mensajes o consultas. Un proyecto puede combinar estos enfoques, según la necesidad y las comprobaciones que requiera."],
    ["¿Qué incluye un proyecto de automatización?", "La propuesta debe concretar el proceso, los pasos incluidos, las herramientas que se conectan, los datos utilizados y las aprobaciones necesarias. También debe identificar las pruebas, la puesta en marcha y las responsabilidades de cada parte. Las posibles ampliaciones quedan fuera de la primera versión salvo que se acuerde incluirlas."],
    ["¿De qué depende el presupuesto?", "Del número y la complejidad de los pasos, las herramientas implicadas, sus posibilidades de integración, el volumen y formato de los datos y las excepciones que deba gestionar el flujo. La propuesta debe distinguir el trabajo inicial de los costes recurrentes de herramientas, licencias, infraestructura y mantenimiento que correspondan."],
    ["¿Qué ocurre si falla una conexión o cambia una herramienta?", "Al definir el proceso, acordamos qué hacer si falta información, se interrumpe una conexión o una tarea no se completa. Según el caso, puede requerirse un aviso, una revisión o una reanudación controlada. El mantenimiento y las condiciones de atención se concretan para cada proyecto."],
    ["¿Cómo puedo estimar si merece la pena automatizar?", "La calculadora de automatización permite introducir cuántas personas realizan una tarea, cuántas horas le dedican al día, los días laborables al mes y el coste medio por hora, además del porcentaje de tiempo que estimas que podría liberarse. Con esas hipótesis calcula horas recuperables y su valor económico potencial. La estimación anual supone 12 meses con la misma carga de trabajo. El resultado no es el presupuesto del proyecto ni un ahorro garantizado; los costes de implantación, mantenimiento y licencias no están incluidos."],
  ],
  comparisonQuestion: "¿En qué se diferencian la automatización, el software a medida y la IA?",
  comparisonLinks: [
    { phrase: "software a medida", href: routes["bespoke-software"].es },
    { phrase: "IA", href: routes["artificial-intelligence"].es },
  ],
  calculatorQuestion: "¿Cómo puedo estimar si merece la pena automatizar?",
  calculatorLinks: [{ phrase: "calculadora de automatización", href: routes.calculator.es }],
  closingTitle: "¿Qué tarea sigue pasando por demasiadas manos?",
  closingText: "Cuéntanos qué ocurre desde que empieza hasta que termina, quién interviene y qué herramientas utilizáis. Revisamos contigo dónde se repite trabajo y qué podría incluir una primera automatización.",
} as const;
