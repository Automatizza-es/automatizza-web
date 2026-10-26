// AI service and illustrative conversation: EN, FR and European Portuguese.
const aiMessages: Record<string, readonly [string, string, string]> = {
  "Inteligencia artificial para empresas | Automatizza": [
    "Artificial intelligence for businesses | Automatizza",
    "Intelligence artificielle pour les entreprises | Automatizza",
    "Inteligência artificial para empresas | Automatizza"
  ],
  "Aplicamos IA a documentos, consultas y agentes de WhatsApp o llamadas. Definimos fuentes, permisos y revisiones para cada tarea de tu empresa.": [
    "We apply AI to documents, enquiries and WhatsApp or voice agents, defining sources, permissions and reviews for each task in your business.",
    "Nous appliquons l’IA aux documents, aux demandes et aux agents WhatsApp ou vocaux, en définissant sources, autorisations et vérifications pour chaque tâche.",
    "Aplicamos IA a documentos, consultas e agentes de WhatsApp ou chamadas. Definimos fontes, permissões e revisões para cada tarefa da sua empresa."
  ],
  "SERVICIOS / INTELIGENCIA ARTIFICIAL": [
    "SERVICES / ARTIFICIAL INTELLIGENCE",
    "SERVICES / INTELLIGENCE ARTIFICIELLE",
    "SERVIÇOS / INTELIGÊNCIA ARTIFICIAL"
  ],
  "Inteligencia artificial para empresas.": [
    "Artificial intelligence for businesses.",
    "Intelligence artificielle pour les entreprises.",
    "Inteligência artificial para empresas."
  ],
  "Incorporamos inteligencia artificial a tareas concretas: interpretar documentos, clasificar mensajes, consultar información o atender consultas. Definimos contigo dónde puede ayudar y qué necesita revisión": [
    "We bring artificial intelligence to specific tasks: interpreting documents, classifying messages, finding information or handling enquiries. Together, we define where it can help and what needs review",
    "Nous intégrons l’intelligence artificielle à des tâches concrètes : interpréter des documents, classer des messages, consulter des informations ou répondre aux demandes. Nous définissons avec vous où elle peut être utile et ce qui nécessite une vérification",
    "Incorporamos inteligência artificial em tarefas concretas: interpretar documentos, classificar mensagens, consultar informação ou responder a pedidos. Definimos consigo onde pode ajudar e o que precisa de revisão"
  ],
  "Dónde puede ayudar la inteligencia artificial": [
    "Where artificial intelligence can help",
    "Où l’intelligence artificielle peut être utile",
    "Onde a inteligência artificial pode ajudar"
  ],
  "Documentos y correos": [
    "Documents and emails",
    "Documents et e-mails",
    "Documentos e e-mails"
  ],
  "Extraer información y organizarla para su revisión.": [
    "Extract information and organise it for review.",
    "Extraire les informations et les organiser pour vérification.",
    "Extrair informação e organizá-la para revisão."
  ],
  "Información interna": [
    "Internal information",
    "Informations internes",
    "Informação interna"
  ],
  "Facilitar consultas sobre documentación y fuentes autorizadas.": [
    "Make it easier to find answers in documentation and authorised sources.",
    "Faciliter les recherches dans la documentation et les sources autorisées.",
    "Facilitar consultas sobre documentação e fontes autorizadas."
  ],
  "Agentes de WhatsApp": [
    "WhatsApp agents",
    "Agents WhatsApp",
    "Agentes de WhatsApp"
  ],
  "Recoger solicitudes, responder dentro de un alcance definido y conectar con otras herramientas.": [
    "Collect enquiries, respond within a defined scope and connect to other tools.",
    "Recueillir les demandes, répondre dans un périmètre défini et se connecter à d’autres outils.",
    "Recolher pedidos, responder dentro de um âmbito definido e ligar a outras ferramentas."
  ],
  "Agentes de llamadas": [
    "Voice agents",
    "Agents vocaux",
    "Agentes de chamadas"
  ],
  "Recoger el motivo de una llamada y gestionar acciones concretas según las integraciones acordadas.": [
    "Capture the reason for a call and handle specific actions through the agreed integrations.",
    "Recueillir le motif d’un appel et gérer des actions précises selon les intégrations convenues.",
    "Recolher o motivo de uma chamada e gerir ações concretas de acordo com as integrações acordadas."
  ],
  "Una primera conversación que ayuda a avanzar": [
    "A first conversation that helps move things forward",
    "Un premier échange pour avancer",
    "Uma primeira conversa que ajuda a avançar"
  ],
  "Para Silos Spain hemos desarrollado un agente de WhatsApp que recoge la necesidad inicial del cliente y organiza los datos de su proyecto. El flujo contempla también la gestión de reuniones mediante herramientas de calendario": [
    "For Silos Spain, we developed a WhatsApp agent that gathers the customer’s initial requirements and organises their project details. The flow also includes managing meetings through calendar tools",
    "Pour Silos Spain, nous avons développé un agent WhatsApp qui recueille le besoin initial du client et organise les données de son projet. Le parcours prévoit également la gestion de réunions à l’aide d’outils de calendrier",
    "Para a Silos Spain, desenvolvemos um agente de WhatsApp que recolhe a necessidade inicial do cliente e organiza os dados do seu projeto. O fluxo contempla também a gestão de reuniões através de ferramentas de calendário"
  ],
  "Silos Spain · Asistente virtual": [
    "Silos Spain · Virtual assistant",
    "Silos Spain · Assistant virtuel",
    "Silos Spain · Assistente virtual"
  ],
  "Cliente": [
    "Customer",
    "Client",
    "Cliente"
  ],
  "Agente": [
    "Agent",
    "Agent",
    "Agente"
  ],
  "Hola, necesitamos almacenar unas 5.000 toneladas de trigo en Marruecos": [
    "Hello, we need to store around 5,000 tonnes of wheat in Morocco",
    "Bonjour, nous avons besoin de stocker environ 5 000 tonnes de blé au Maroc",
    "Olá, precisamos de armazenar cerca de 5.000 toneladas de trigo em Marrocos"
  ],
  "Hola, soy el asistente virtual de Silos Spain. ¿Se trata de una instalación nueva o de una ampliación?": [
    "Hello, I’m the Silos Spain virtual assistant. Is this a new installation or an extension?",
    "Bonjour, je suis l’assistant virtuel de Silos Spain. S’agit-il d’une nouvelle installation ou d’une extension ?",
    "Olá, sou o assistente virtual da Silos Spain. Trata-se de uma instalação nova ou de uma ampliação?"
  ],
  "Una instalación nueva. Nos gustaría comentarlo con vuestro equipo": [
    "A new installation. We’d like to discuss it with your team",
    "Une nouvelle installation. Nous aimerions en discuter avec votre équipe",
    "Uma instalação nova. Gostaríamos de falar sobre isso com a vossa equipa"
  ],
  "Podemos buscar un horario para una reunión. ¿Qué día te vendría bien?": [
    "We can look for a time for a meeting. Which day would suit you?",
    "Nous pouvons chercher un créneau pour une réunion. Quel jour vous conviendrait ?",
    "Podemos procurar um horário para uma reunião. Que dia lhe daria jeito?"
  ],
  "Producto: trigo · Capacidad: 5.000 t · País: Marruecos · Proyecto: instalación nueva": [
    "Product: wheat · Capacity: 5,000 t · Country: Morocco · Project: new installation",
    "Produit : blé · Capacité : 5 000 t · Pays : Maroc · Projet : nouvelle installation",
    "Produto: trigo · Capacidade: 5.000 t · País: Marrocos · Projeto: instalação nova"
  ],
  "Conversación ilustrativa basada en el flujo desarrollado": [
    "Illustrative conversation based on the developed flow",
    "Conversation illustrative fondée sur le parcours développé",
    "Conversa ilustrativa baseada no fluxo desenvolvido"
  ],
  "Pausar": [
    "Pause",
    "Mettre en pause",
    "Pausar"
  ],
  "Reanudar": [
    "Resume",
    "Reprendre",
    "Retomar"
  ],
  "Volver a reproducir": [
    "Replay",
    "Rejouer",
    "Reproduzir novamente"
  ],
  "Ver conversación completa": [
    "Show full conversation",
    "Afficher toute la conversation",
    "Ver conversa completa"
  ],
  "Elegimos una tarea": [
    "We choose a task",
    "Nous choisissons une tâche",
    "Escolhemos uma tarefa"
  ],
  "Concretamos qué debe resolver y cómo evaluar el resultado.": [
    "We define what it needs to solve and how to assess the result.",
    "Nous précisons ce qu’elle doit résoudre et comment évaluer le résultat.",
    "Definimos o que deve resolver e como avaliar o resultado."
  ],
  "Preparamos la información": [
    "We prepare the information",
    "Nous préparons les informations",
    "Preparamos a informação"
  ],
  "Definimos fuentes, permisos y acciones permitidas.": [
    "We define sources, permissions and allowed actions.",
    "Nous définissons les sources, les autorisations et les actions permises.",
    "Definimos fontes, permissões e ações permitidas."
  ],
  "Probamos sus respuestas": [
    "We test its responses",
    "Nous testons ses réponses",
    "Testamos as respostas"
  ],
  "Revisamos situaciones habituales, errores y casos que requieren intervención humana.": [
    "We review everyday situations, errors and cases that need human intervention.",
    "Nous examinons les situations courantes, les erreurs et les cas nécessitant une intervention humaine.",
    "Analisamos situações habituais, erros e casos que exigem intervenção humana."
  ],
  "Lo incorporamos al trabajo": [
    "We bring it into daily work",
    "Nous l’intégrons au travail quotidien",
    "Integramos a solução no trabalho"
  ],
  "Acompañamos la puesta en marcha y acordamos seguimiento y mantenimiento.": [
    "We support the launch and agree on follow-up and maintenance.",
    "Nous accompagnons la mise en service et convenons du suivi et de la maintenance.",
    "Acompanhamos a entrada em funcionamento e acordamos o acompanhamento e a manutenção."
  ],
  "¿Todas las automatizaciones necesitan inteligencia artificial?": [
    "Does every automation need artificial intelligence?",
    "Toutes les automatisations nécessitent-elles de l’intelligence artificielle ?",
    "Todas as automatizações precisam de inteligência artificial?"
  ],
  "No. Muchas tareas se resuelven conectando herramientas y definiendo reglas. Valoramos la IA cuando hace falta interpretar información, siempre con un alcance y unas comprobaciones definidos.": [
    "No. Many tasks can be handled by connecting tools and defining rules. We consider AI when information needs interpreting, always with a defined scope and checks.",
    "Non. De nombreuses tâches peuvent être traitées en connectant des outils et en définissant des règles. Nous envisageons l’IA lorsqu’il faut interpréter des informations, avec un périmètre et des vérifications définis.",
    "Não. Muitas tarefas resolvem-se ligando ferramentas e definindo regras. Avaliamos a IA quando é preciso interpretar informação, sempre com um âmbito e verificações definidos."
  ],
  "¿Puede equivocarse un agente de IA?": [
    "Can an AI agent make mistakes?",
    "Un agent d’IA peut-il se tromper ?",
    "Um agente de IA pode enganar-se?"
  ],
  "Sí. Probamos sus respuestas y definimos límites, revisiones y qué hacer si no dispone de información suficiente. No sustituye las comprobaciones que requiera cada tarea.": [
    "Yes. We test its responses and define limits, reviews and what to do when it lacks sufficient information. It does not replace the checks each task requires.",
    "Oui. Nous testons ses réponses et définissons les limites, les vérifications et la marche à suivre si les informations sont insuffisantes. Il ne remplace pas les contrôles nécessaires à chaque tâche.",
    "Sim. Testamos as respostas e definimos limites, revisões e o que fazer quando não há informação suficiente. Não substitui as verificações que cada tarefa exige."
  ],
  "¿Qué información puede consultar?": [
    "What information can it access?",
    "Quelles informations peut-il consulter ?",
    "Que informação pode consultar?"
  ],
  "Solo las fuentes y los accesos que se acuerden para el proyecto. Revisamos los permisos y el tratamiento de los datos según las herramientas y los proveedores utilizados.": [
    "Only the sources and access agreed for the project. We review permissions and data processing according to the tools and providers used.",
    "Uniquement les sources et les accès convenus pour le projet. Nous examinons les autorisations et le traitement des données en fonction des outils et des prestataires utilisés.",
    "Apenas as fontes e os acessos acordados para o projeto. Analisamos as permissões e o tratamento dos dados de acordo com as ferramentas e os fornecedores utilizados."
  ],
  "¿Cuándo interviene una persona?": [
    "When does a person step in?",
    "Quand une personne intervient-elle ?",
    "Quando intervém uma pessoa?"
  ],
  "Definimos qué acciones necesitan aprobación y cuándo derivar una consulta al equipo, por ejemplo ante información incompleta o situaciones fuera del alcance acordado.": [
    "We define which actions need approval and when to refer an enquiry to the team, for example when information is incomplete or a situation is outside the agreed scope.",
    "Nous définissons les actions qui nécessitent une validation et les situations où transmettre une demande à l’équipe, par exemple si les informations sont incomplètes ou si la situation dépasse le périmètre convenu.",
    "Definimos que ações precisam de aprovação e quando encaminhar uma consulta para a equipa, por exemplo perante informação incompleta ou situações fora do âmbito acordado."
  ],
  "Del alcance, las fuentes de información, las integraciones y las pruebas necesarias. Acordamos el trabajo inicial, el seguimiento y el mantenimiento, además de los costes recurrentes de los proveedores y su uso.": [
    "It depends on the scope, information sources, integrations and testing needed. We agree on the initial work, follow-up and maintenance, along with recurring provider and usage costs.",
    "Du périmètre, des sources d’information, des intégrations et des tests nécessaires. Nous convenons du travail initial, du suivi et de la maintenance, ainsi que des coûts récurrents des prestataires et de leur utilisation.",
    "Do âmbito, das fontes de informação, das integrações e dos testes necessários. Acordamos o trabalho inicial, o acompanhamento e a manutenção, além dos custos recorrentes dos fornecedores e da sua utilização."
  ],
  "¿En qué tarea te gustaría incorporar inteligencia artificial?": [
    "Which task would you like to bring artificial intelligence to?",
    "Pour quelle tâche aimeriez-vous utiliser l’intelligence artificielle ?",
    "Em que tarefa gostaria de incorporar inteligência artificial?"
  ],
  "Cuéntanos qué necesita tu equipo. Revisamos dónde puede ayudar la IA y qué límites y comprobaciones necesita.": [
    "Tell us what your team needs. We review where AI can help and which limits and checks it requires.",
    "Parlez-nous des besoins de votre équipe. Nous examinons où l’IA peut être utile et les limites et vérifications nécessaires.",
    "Conte-nos o que precisa a sua equipa. Analisamos onde a IA pode ajudar e que limites e verificações exige."
  ]
};
export default aiMessages;
