export const es = {
  meta: {
    role: "Ingeniero de software senior",
    description:
      "Ingeniero de software senior independiente. Acompaño a equipos a llevar productos de la intención a producción: arquitectura, interfaces y los sistemas que hay detrás. Juntos subimos el listón: considerado, rápido y hecho para durar.",
    workDescription: "Trabajo seleccionado de diseño y desarrollo de {name}.",
    contactDescription: "Empieza un proyecto con {name}.",
  },
  header: {
    codeBy: "© Código de {name}",
    menu: "Menú",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    navigation: "Navegación",
  },
  nav: [
    { id: "home", label: "Inicio" },
    { id: "about", label: "Sobre mí" },
    { id: "work", label: "Trabajo" },
    { id: "contact", label: "Contacto" },
  ],
  landing: {
    heroLine: "Ingeniero de software senior. En Ciudad de Guatemala.",
    locatedIn: "Ubicado en {location}",
    location: "Ciudad de Guatemala",
  },
  about: {
    headline: "Ayudo a las empresas a publicar software que pueden mantener.",
    description:
      "Ingeniero de software senior independiente. Acompaño a equipos a llevar productos de la intención a producción: arquitectura, interfaces y los sistemas que hay detrás. Juntos subimos el listón: considerado, rápido y hecho para durar.",
    about: "En Ciudad de Guatemala. Del primer boceto al build en producción.",
  },
  contact: {
    heading: "Trabajemos juntos",
    pageHeading: "Empecemos un proyecto juntos",
    email: "Correo",
    location: "Ubicación",
    version: "Versión",
    edition: "2026 © David Ochoa",
    localTime: "Hora local",
    socials: "Redes",
  },
  form: {
    nameLabel: "¿Cómo te llamas?",
    namePlaceholder: "Juan Pérez *",
    emailLabel: "¿Cuál es tu correo?",
    emailPlaceholder: "juan@correo.com *",
    messageLabel: "Tu mensaje",
    messagePlaceholder: "Hola {name}, ¿me puedes ayudar con… *",
    send: "Enviar",
    sending: "Enviando…",
    sentTitle: "Mensaje enviado.",
    sentBody: "Gracias por escribir. Te responderé lo antes posible.",
    error: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
  },
  work: {
    label: "Trabajo",
    heading: "Proyectos seleccionados",
    intro:
      "Sitios y productos enviados a producción — diseñados y construidos de punta a punta.",
    role: "Rol",
    location: "Ubicación",
    year: "Año",
    visit: "Visitar el sitio",
    next: "Siguiente proyecto",
    all: "Todo el trabajo",
  },
  notFound: {
    error: "Error",
    title: "Perdido.",
    body: "Esta página no existe. El trabajo sigue por acá.",
    back: "Volver al inicio",
  },
  locale: {
    es: "ES",
    en: "EN",
    name: {
      es: "Español",
      en: "English",
    },
    label: "Idioma",
    switchTo: "Cambiar a {locale}",
  },
};

export const en = {
  meta: {
    role: "Senior Software Engineer",
    description:
      "Independent senior software engineer. I help teams take products from intent to production — architecture, interfaces, and the systems underneath. Together we set a higher bar: considered, fast, and built to last.",
    workDescription: "Selected design and development work by {name}.",
    contactDescription: "Start a project with {name}.",
  },
  header: {
    codeBy: "© Code by {name}",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    navigation: "Navigation",
  },
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "work", label: "Work" },
    { id: "contact", label: "Contact" },
  ],
  landing: {
    heroLine: "Senior Software Engineer. Located in Guatemala City.",
    locatedIn: "Located in {location}",
    location: "Guatemala City",
  },
  about: {
    headline: "I help companies ship software they can keep.",
    description:
      "Independent senior software engineer. I help teams take products from intent to production — architecture, interfaces, and the systems underneath. Together we set a higher bar: considered, fast, and built to last.",
    about: "Based in Guatemala City. From first sketch to shipped build.",
  },
  contact: {
    heading: "Let's work together",
    pageHeading: "Let's start a project together",
    email: "Email",
    location: "Location",
    version: "Version",
    edition: "2026 © David Ochoa",
    localTime: "Local time",
    socials: "Socials",
  },
  form: {
    nameLabel: "What's your name?",
    namePlaceholder: "John Doe *",
    emailLabel: "What's your email?",
    emailPlaceholder: "john@doe.com *",
    messageLabel: "Your message",
    messagePlaceholder: "Hello {name}, can you help me with... *",
    send: "Send it",
    sending: "Sending…",
    sentTitle: "Message sent.",
    sentBody: "Thanks for reaching out. I'll get back to you as soon as possible.",
    error: "The message could not be sent. Please try again.",
  },
  work: {
    label: "Work",
    heading: "Selected projects",
    intro:
      "Shipped sites and products — designed and built end to end.",
    role: "Role",
    location: "Location",
    year: "Year",
    visit: "Visit the site",
    next: "Next project",
    all: "All work",
  },
  notFound: {
    error: "Error",
    title: "Lost.",
    body: "This page does not exist. The work is still this way.",
    back: "Back home",
  },
  locale: {
    es: "ES",
    en: "EN",
    name: {
      es: "Español",
      en: "English",
    },
    label: "Language",
    switchTo: "Switch to {locale}",
  },
};

export type Dictionary = typeof es;

export const dictionaries: Record<"es" | "en", Dictionary> = {
  es,
  en,
};
