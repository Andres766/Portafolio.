"use client"

import { useCallback, useEffect, useState } from 'react'

export type Lang = 'es' | 'en'

type Translations = Record<Lang, Record<string, string>>

const translations: Translations = {
  es: {
    greeting: 'Un saludo, mi nombre es',
    downloadCv: 'Descargar CV',
    aboutMe: 'Sobre mi',
    myExperience: 'Mi Experiencia',
    frontendDeveloper: 'Desarrollador Frontend',
    backendDeveloper: 'Desarrollador Backend',
    skillCommunication: 'Comunicación',
    skillDetailOriented: 'Detalle orientado',
    skillTeamPlayer: 'Jugador del equipo',
    contactMe: 'Contáctame',
    myServices: 'Mis servicios',
    whatIOffer: 'Lo que ofrezco',
    talkToMe: 'Hablame',
    emailLabel: 'Correo electrónico',
    whatsappLabel: 'WhatsApp',
    yourName: 'Tu nombre:',
    yourEmail: 'Tu correo:',
    yourMessage: 'Dime en que te ayudo:',
    viewCode: 'Ver código',
    navHome: 'Inicio',
    navAbout: 'Sobre mí',
    navExperience: 'Experiencia',
    navServices: 'Servicios',
    navProjects: 'Proyectos',
    navContact: 'Contacto',
    getInTouch: 'Ponte en contacto',
    contactTitle: 'Contactame',
    mySkills: 'Mis habilidades',
    myJourney: 'Mi trayectoria',
    experienceTitle: 'Experiencia',
    changeLanguage: 'Cambiar idioma',
    sendMeMessage: 'Envíame un mensaje',
    visitProfile: 'Visita mi perfil',
    connectWithMe: 'Conecta conmigo',
    writeWhatYouNeed: 'Escríbeme lo que necesitas',
    errorCompleteFields: 'Por favor completa nombre, email y mensaje.',
    errorSending: 'Error al enviar',
    successMessageSent: '¡Mensaje enviado! Te responderé pronto.',
    errorGeneral: 'No se pudo enviar el mensaje. Intenta nuevamente más tarde.',
    sending: 'Enviando...',
    sendMessage: 'Enviar mensaje',
    rightsReserved: 'Todos los derechos reservados.',
    roleTitle: 'Desarrollador web Fullstack',
    loadingPortfolio: 'Cargando portafolio...',
    skillCriticalThinking: 'Pensamiento crítico',
    skillProblemSolving: 'Resolución de problemas',
    skillSelfAwareness: 'Autoconciencia',
    viewDemo: 'Ver demo',
    client: 'Cliente',
    companyXyz: 'Empresa XYZ',
    testimonialText: 'Excelente profesional, entrega trabajos de calidad y siempre cumple con los plazos establecidos. Muy recomendado.',
    frontendDescription: 'Creo interfaces de usuario modernas, responsivas y accesibles utilizando las últimas tecnologías web. Me especializo en convertir diseños en código limpio y eficiente, garantizando una experiencia de usuario excepcional.',
    backendDescription: 'Desarrollo APIs robustas y escalables, gestiono bases de datos y implemento lógica de negocio compleja. Me enfoco en crear sistemas seguros, eficientes y fáciles de mantener.',
    uiuxDesigner: 'Diseñador UI/UX',
    uiuxDescription: 'Diseño experiencias claras y atractivas con enfoque en accesibilidad, usabilidad y consistencia visual. Creo wireframes, prototipos y design systems listos para implementación.',
    devopsEngineer: 'Ingeniero DevOps',
    devopsDescription: 'Automatizo pipelines CI/CD, contenedorizo aplicaciones y despliego infraestructura como código. Enfocado en observabilidad, seguridad y confiabilidad operativa.',
    mailtoBody: 'Hola Andres, me interesa trabajar contigo',
    mailtoSubject: 'Contacto Portafolio',
    whatsappText: 'Hola Andres, me interesa trabajar contigo',
    bioBlurb: 'Soy estudiante de Ingeniería con más de dos años de experiencia en el desarrollo de proyectos académicos y profesionales, donde he fortalecido mis habilidades en el análisis, diseño y construcción de soluciones tecnológicas. Mi enfoque combina la capacidad de aprendizaje con la aplicación práctica de metodologías de ingeniería.',
    portfolio: 'Portafolio',
    myProjects: 'Mis proyectos',
    whatTheySayAboutMe: 'Lo que dicen de mí',
    testimonials: 'Testimonios',
    navAchievements: 'Logros',
    achievementsTitle: 'Logros y Reconocimientos',
    achievementsIntro: 'Certificaciones, premios y métricas clave'
  },
  en: {
    greeting: 'Hi, my name is',
    downloadCv: 'Download CV',
    aboutMe: 'About me',
    myExperience: 'My Experience',
    frontendDeveloper: 'Frontend Developer',
    backendDeveloper: 'Backend Developer',
    skillCommunication: 'Communication',
    skillDetailOriented: 'Attention to detail',
    skillTeamPlayer: 'Team player',
    contactMe: 'Contact me',
    myServices: 'My services',
    whatIOffer: 'What I offer',
    talkToMe: 'Talk to me',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
    yourName: 'Your name:',
    yourEmail: 'Your email:',
    yourMessage: 'Tell me how I can help:',
    viewCode: 'View code',
    navHome: 'Home',
    navAbout: 'About',
    navExperience: 'Experience',
    navServices: 'Services',
    navProjects: 'Projects',
    navContact: 'Contact',
    getInTouch: 'Get in touch',
    contactTitle: 'Contact me',
    mySkills: 'My skills',
    myJourney: 'My journey',
    experienceTitle: 'Experience',
    changeLanguage: 'Change language',
    sendMeMessage: 'Send me a message',
    visitProfile: 'Visit my profile',
    connectWithMe: 'Connect with me',
    writeWhatYouNeed: 'Write what you need',
    errorCompleteFields: 'Please complete name, email and message.',
    errorSending: 'Error sending',
    successMessageSent: 'Message sent! I will reply soon.',
    errorGeneral: 'Could not send the message. Try again later.',
    sending: 'Sending...',
    sendMessage: 'Send message',
    rightsReserved: 'All rights reserved.',
    roleTitle: 'Fullstack web developer',
    loadingPortfolio: 'Loading portfolio...',
    skillCriticalThinking: 'Critical thinking',
    skillProblemSolving: 'Problem solving',
    skillSelfAwareness: 'Self-awareness',
    viewDemo: 'View demo',
    client: 'Client',
    companyXyz: 'Company XYZ',
    testimonialText: 'Excellent professional, delivers quality work and always meets deadlines. Highly recommended.',
    frontendDescription: 'I build modern, responsive and accessible user interfaces using the latest web technologies. I specialize in turning designs into clean and efficient code, ensuring an outstanding user experience.',
    backendDescription: 'I develop robust and scalable APIs, manage databases and implement complex business logic. I focus on creating secure, efficient and maintainable systems.',
    uiuxDesigner: 'UI/UX Designer',
    uiuxDescription: 'I design clear and engaging experiences focused on accessibility, usability and visual consistency. I create wireframes, prototypes and design systems ready for implementation.',
    devopsEngineer: 'DevOps Engineer',
    devopsDescription: 'I automate CI/CD pipelines, containerize applications and deploy infrastructure as code. Focused on observability, security and operational reliability.',
    mailtoBody: 'Hello Andres, I would like to work with you',
    mailtoSubject: 'Portfolio Contact',
    whatsappText: 'Hello Andres, I would like to work with you',
    bioBlurb: 'I am an engineering student with more than two years of experience building academic and professional projects, strengthening my skills in analysis, design, and building technological solutions. My approach combines constant learning with the practical application of engineering methodologies.',
    portfolio: 'Portfolio',
    myProjects: 'My projects',
    whatTheySayAboutMe: 'What they say about me',
    testimonials: 'Testimonials',
    navAchievements: 'Achievements',
    achievementsTitle: 'Achievements & Recognition',
    achievementsIntro: 'Certifications, awards, and key metrics'
  },
}

export function useLang(initialLang: Lang) {
  const [lang, setLang] = useState<Lang>(initialLang)

  // Keep document and storage in sync
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem('lang', lang)
        document.cookie = `lang=${lang}; path=/; max-age=31536000`
      } catch {}
    }
  }, [lang])

  const t = useCallback((key: string) => translations[lang][key] ?? key, [lang])

  return { lang, setLang, t }
}