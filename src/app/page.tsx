'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import emailjs from '@emailjs/browser'
import Image from 'next/image'
import { FaLinkedin, FaGithub, FaLightbulb, FaTools, FaComments, FaClipboardList, FaUserFriends, FaBrain, FaWhatsapp, FaTimes, FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt, FaNodeJs, FaPython, FaDatabase, FaFire, FaTerminal, FaAws, FaEnvelope } from 'react-icons/fa'
import { SiTypescript } from 'react-icons/si'

type CSSVars = React.CSSProperties & {
  ['--mx']?: string
  ['--my']?: string
  ['--spd']?: string
}

export default function Portfolio() {
  const [isDark, setIsDark] = useState<boolean>(true)
  // Sync theme from localStorage after mount to avoid hydration mismatches
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('theme')
      if (saved === 'light') {
        setIsDark(false)
        document.cookie = `theme=light; path=/; max-age=31536000`
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
      } else if (saved === 'dark') {
        setIsDark(true)
        document.cookie = `theme=dark; path=/; max-age=31536000`
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
      } else if (window.matchMedia) {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
        const t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        document.cookie = `theme=${t}; path=/; max-age=31536000`
        document.documentElement.classList.remove('light','dark')
        document.documentElement.classList.add(t)
      }
    } catch {}
  }, [])
  // Loader theme resolved once on client to avoid flipping from dark to light
  const [loaderTheme, setLoaderTheme] = useState<'dark' | 'light' | null>(null)
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('theme')
      if (saved === 'light') setLoaderTheme('light')
      else if (saved === 'dark') setLoaderTheme('dark')
      else if (window.matchMedia) setLoaderTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      else setLoaderTheme('dark')
    } catch {
      setLoaderTheme('dark')
    }
  }, [])
  const [navBottom, setNavBottom] = useState(32)
  const [serviceModal, setServiceModal] = useState<'frontend' | 'backend' | null>(null)
  const [projectModal, setProjectModal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
   const iconsRef = useRef<HTMLDivElement>(null)
   const footerRef = useRef<HTMLElement | null>(null)
   const photoRef = useRef<HTMLDivElement>(null)
   const [form, setForm] = useState({ name: '', email: '', message: '' })
   const [sending, setSending] = useState(false)
   const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  // EmailJS init (public key)
  useEffect(() => {
    try {
      emailjs.init('Oy29Xjr_UT6c9xUho')
    } catch {}
  }, [])

  // Typewriter effect for hero section
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  // 3D tilt state for hero photo
  const [photoTilt, setPhotoTilt] = useState<{ rx: number; ry: number; scale: number }>({ rx: 0, ry: 0, scale: 1 })
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 })

  // Cursor parallax for floating background icons
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!iconsRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dx = (x / rect.width - 0.5) * 60 // px offset, subtle
    const dy = (y / rect.height - 0.5) * 60 // px offset, subtle
    iconsRef.current.style.setProperty('--mouseX', `${dx}px`)
    iconsRef.current.style.setProperty('--mouseY', `${dy}px`)
  }

  const handleHeroMouseLeave = () => {
    if (!iconsRef.current) return
    iconsRef.current.style.setProperty('--mouseX', `0px`)
    iconsRef.current.style.setProperty('--mouseY', `0px`)
  }

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 100
    const py = (y / rect.height) * 100
    const max = 12
    const ry = ((x - rect.width / 2) / rect.width) * (max * 2)
    const rx = -((y - rect.height / 2) / rect.height) * (max * 2)
    setPhotoTilt({ rx, ry, scale: 1.06 })
    setGlarePos({ x: px, y: py })
  }

  const handlePhotoMouseLeave = () => {
    setPhotoTilt({ rx: 0, ry: 0, scale: 1 })
  }

  // Floating particles for background
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, opacity: number, speed: number}>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 2 + 1
    }))
    setParticles(newParticles)
  }, [])

  // (moved typewriter and reset effects below after 'lang' and 't' are defined)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Idioma (ES/EN)
  const [lang, setLang] = useState<'es' | 'en'>(() => {
    if (typeof window === 'undefined') return 'es'
    const saved = window.localStorage.getItem('lang')
    return saved === 'en' ? 'en' : 'es'
  })

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
    }
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('lang', lang)
    }
  }, [lang])

  const translations: Record<string, Record<string, string>> = {
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
      mailtoBody: 'Hola Andres, me interesa trabajar contigo',
      mailtoSubject: 'Contacto Portafolio',
      whatsappText: 'Hola Andres, me interesa trabajar contigo',
      bioBlurb: 'Soy estudiante de Ingeniería con más de dos años de experiencia en el desarrollo de proyectos académicos y profesionales, donde he fortalecido mis habilidades en el análisis, diseño y construcción de soluciones tecnológicas. Mi enfoque combina la capacidad de aprendizaje constante con la aplicación práctica de metodologías y herramientas de ingeniería, lo que me ha permitido aportar valor en diferentes contextos.',
      portfolio: 'Portafolio',
      myProjects: 'Mis proyectos',
      whatTheySayAboutMe: 'Lo que dicen de mí',
      testimonials: 'Testimonios'
      ,navAchievements: 'Logros'
      ,achievementsTitle: 'Logros y Reconocimientos'
      ,achievementsIntro: 'Certificaciones, premios y métricas clave'
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
      mailtoBody: 'Hello Andres, I would like to work with you',
      mailtoSubject: 'Portfolio Contact',
      whatsappText: 'Hello Andres, I would like to work with you',
      bioBlurb: 'I am an engineering student with more than two years of experience building academic and professional projects, strengthening my skills in analysis, design, and building technological solutions. My approach combines constant learning with the practical application of engineering methodologies and tools, which has allowed me to add value in different contexts.',
      portfolio: 'Portfolio',
      myProjects: 'My projects',
      whatTheySayAboutMe: 'What they say about me',
      testimonials: 'Testimonials'
      ,navAchievements: 'Achievements'
      ,achievementsTitle: 'Achievements & Recognition'
      ,achievementsIntro: 'Certifications, awards, and key metrics'
    },
  }

  const t = useCallback((key: string) => translations[lang][key] ?? key, [lang])

  // Typewriter effect for hero section (now that 't' is defined)
  useEffect(() => {
    const fullText = t('roleTitle')
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, t])

  // Reset typewriter when language changes (after 'lang' and 't' exist)
  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
  }, [lang])

  // Eliminado: seguimiento global para cursor personalizado

  const handleToggleTheme = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('theme-switching')
    }
    setIsDark((prev: boolean) => {
      const next = !prev
      try {
        window.localStorage.setItem('theme', next ? 'dark' : 'light')
        // Persist also in cookie for SSR to pick up on next request
        document.cookie = `theme=${next ? 'dark' : 'light'}; path=/; max-age=31536000`
        // Update html class immediately to avoid any flash
        const html = document.documentElement
        html.classList.remove('light','dark')
        html.classList.add(next ? 'dark' : 'light')
      } catch {}
      return next
    })
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('theme-switching')
      }
    }, 200)
  }

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Adjust navbar bottom to avoid covering the footer
  useEffect(() => {
    const update = () => {
      if (!footerRef.current) return
      const rect = footerRef.current.getBoundingClientRect()
      const viewportH = window.innerHeight
      const overlap = Math.max(0, viewportH - rect.top)
      const base = 32 // px ~ bottom-8
      const margin = 16 // px gap por encima del footer
      const maxBottom = 96 // px ~ bottom-24 (límite superior)
      const computed = base + (overlap > 0 ? overlap + margin : 0)
      setNavBottom(Math.min(computed, maxBottom))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['home', 'about', 'experience', 'services', 'projects', 'achievements', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Parallax de íconos con scroll (suavizado)
  useEffect(() => {
    let rafId = 0
    let current = 0
    let target = 0

    const update = () => {
      current += (target - current) * 0.12
      if (iconsRef.current) {
        iconsRef.current.style.setProperty('--scrollY', `${current}px`)
      }
      rafId = requestAnimationFrame(update)
    }

    const onScroll = () => {
      target = window.scrollY
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
     return () => {
       window.removeEventListener('scroll', onScroll)
       cancelAnimationFrame(rafId)
     }
   }, [])

  // Datos de servicios
  const services = {
    frontend: {
      titleKey: 'frontendDeveloper',
      descriptionKey: 'frontendDescription',
      skills: ['React & Next.js', 'HTML5 & CSS3', 'Tailwind CSS', 'JavaScript/TypeScript', 'Responsive Design', 'UI/UX Implementation'],
      image: '🎨'
    },
    backend: {
      titleKey: 'backendDeveloper',
      descriptionKey: 'backendDescription',
      skills: ['Node.js & Express', 'Python', 'SQL & NoSQL', 'REST APIs', 'Cloud Services (AWS)', 'Authentication & Security'],
      image: '⚙️'
    }
  }

  // Datos de tecnologías con iconos
  const frontendTech = [
    { name: 'HTML', icon: <FaHtml5 className="text-orange-500" size={32} /> },
    { name: 'CSS (SASS)', icon: <FaCss3Alt className="text-blue-500" size={32} /> },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-400" size={32} /> },
    { name: 'Git', icon: <FaGitAlt className="text-orange-600" size={32} /> },
    { name: 'Bootstrap', icon: <FaBootstrap className="text-purple-600" size={32} /> },
    { name: 'React', icon: <FaReact className="text-cyan-400" size={32} /> },
  ]

  const backendTech = [
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" size={32} /> },
    { name: 'Python', icon: <FaPython className="text-blue-400" size={32} /> },
    { name: 'SQL/NoSQL', icon: <FaDatabase className="text-slate-400" size={32} /> },
    { name: 'Firebase', icon: <FaFire className="text-yellow-500" size={32} /> },
    { name: 'Terminal', icon: <FaTerminal className="text-slate-300" size={32} /> },
    { name: 'AWS', icon: <FaAws className="text-orange-400" size={32} /> },
  ]

  // Datos de proyectos
  const projects = [
    { title: 'Reproductor de música', tech: 'Next.js', description: { es: 'Reproductor de música', en: 'Music player' }, repo: 'https://github.com/Andres766/Reproductor-de-musica', demo: 'https://reproductor-de-musica-nzcrytegu-andres766s-projects.vercel.app', image: '/reproductor.jpg' },
    { title: 'Buscador de peliculas y series', tech: 'Next.js, Tailwind', description: { es: 'Explorador de películas y series con buscador, fichas y tendencias.', en: 'Movies and series search with discovery and details.' }, repo: 'https://github.com/Andres766/Cinemix', demo: 'https://cinemix-eosin.vercel.app', image: '/apppelicula.jpg' },
    { title: 'Portfolio CMS', tech: 'Next.js, TypeScript', description: { es: 'Sistema de gestión de contenido para portfolios personales', en: 'Content management system for personal portfolios' }, repo: '#', demo: '#' },
    { title: 'Weather Dashboard', tech: 'React, API Integration', description: { es: 'Dashboard meteorológico con visualización de datos', en: 'Weather dashboard with data visualization' }, repo: '#', demo: '#' },
    { title: 'Chat Application', tech: 'Node.js, Socket.io', description: { es: 'Aplicación de chat en tiempo real con salas privadas', en: 'Real-time chat app with private rooms' }, repo: '#', demo: '#' },
    { title: 'Blog Platform', tech: 'Next.js, MDX', description: { es: 'Plataforma de blog con markdown y optimización SEO', en: 'Blog platform with markdown and SEO optimization' }, repo: '#', demo: '#' },
    { title: 'Fitness Tracker', tech: 'React Native, Firebase', description: { es: 'App móvil para seguimiento de ejercicios y nutrición', en: 'Mobile app for tracking workouts and nutrition' }, repo: '#', demo: '#' },
    { title: 'Analytics Dashboard', tech: 'React, D3.js', description: { es: 'Dashboard de análisis con gráficos interactivos', en: 'Analytics dashboard with interactive charts' }, repo: '#', demo: '#' },
    { title: 'Social Media API', tech: 'Node.js, PostgreSQL', description: { es: 'API REST para aplicación de redes sociales', en: 'REST API for a social media application' }, repo: '#', demo: '#' },
  ]

  // Datos de logros
  const achievements = [
    { title: 'Certificación AWS Cloud Practitioner', date: '2024', detailEs: 'Fundamentos de nube y servicios AWS', detailEn: 'Cloud fundamentals and AWS services', icon: '📜' },
    { title: 'Primer lugar Hackathon Universitaria', date: '2023', detailEs: 'App de análisis en tiempo real', detailEn: 'Real-time analytics app', icon: '🏆' },
    { title: 'Proyecto OSS con 50+ estrellas', date: '2024', detailEs: 'Paquete npm con adopción temprana', detailEn: 'NPM package with early adoption', icon: '⭐' },
    { title: '100+ Commits en 3 meses', date: '2024', detailEs: 'Constancia y buenas prácticas', detailEn: 'Consistency and best practices', icon: '📈' },
  ]

  const navItems = [
    { id: 'home', label: t('navHome'), icon: <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /> },
    { id: 'about', label: t('navAbout'), icon: <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /> },
    { id: 'experience', label: t('navExperience'), icon: <><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /></> },
    { id: 'services', label: t('navServices'), icon: <><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" /></> },
    { id: 'projects', label: t('navProjects'), icon: <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /> },
    { id: 'achievements', label: t('navAchievements'), icon: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955 4.15.006c.969.001 1.371 1.24.588 1.81l-3.357 2.44 1.276 3.985c.29.905-.755 1.65-1.538 1.09L10 13.347l-3.356 2.867c-.783.56-1.828-.185-1.539-1.09l1.276-3.985-3.357-2.44c-.783-.57-.38-1.809.588-1.81l4.15-.006 1.286-3.955z" /> },
    { id: 'contact', label: t('navContact'), icon: <><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></> },
  ]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // 
  if (loading) {
    // Mostrar loader inmediatamente; usar fallback al estado actual si el tema del loader aún no está resuelto
    const isLoaderDark = (loaderTheme !== null) ? loaderTheme === 'dark' : isDark
    return (
      <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br ${isLoaderDark ? 'from-slate-950 via-slate-900 to-slate-950' : 'from-white via-gray-100 to-white'}`}>
        <div className="relative">
          {/* Animated Code Brackets */}
          <div className={`${isLoaderDark ? 'text-sky-400' : 'text-blue-600'} text-8xl md:text-9xl font-mono font-bold animate-pulse`}>
            {'</>'}
          </div>
          
          {/* Orbiting Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`absolute w-48 h-48 border-2 ${isLoaderDark ? 'border-sky-400/30' : 'border-blue-600/30'} rounded-full animate-spin-slow`} style={{ animationDuration: '3s' }}>
              <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 ${isLoaderDark ? 'bg-sky-400' : 'bg-blue-600'} rounded-full`}></div>
            </div>
            <div className={`absolute w-64 h-64 border-2 ${isLoaderDark ? 'border-sky-500/20' : 'border-blue-500/20'} rounded-full animate-spin-slow`} style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
              <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 ${isLoaderDark ? 'bg-sky-500' : 'bg-blue-500'} rounded-full`}></div>
            </div>
          </div>
          
          {/* Binary Code Effect */}
          <div className={`absolute -left-32 top-0 ${isLoaderDark ? 'text-sky-400/20' : 'text-blue-600/20'} text-xs font-mono animate-pulse`}>
            01001000<br/>01100101<br/>01101100<br/>01101100<br/>01101111
          </div>
          <div className={`absolute -right-32 top-0 ${isLoaderDark ? 'text-sky-400/20' : 'text-blue-600/20'} text-xs font-mono animate-pulse`} style={{ animationDelay: '0.5s' }}>
            01010111<br/>01101111<br/>01110010<br/>01101100<br/>01100100
          </div>
        </div>
        
        {/* Name */}
        <h1 className="mt-16 text-4xl md:text-5xl font-bold animate-fade-in shine-on-hover">
          {"Andres Cordoba".split("").map((ch, i) => (
            ch === " " ? (
              <span key={i} className="inline-block">&nbsp;</span>
            ) : (
              <span
                key={i}
                className={`inline-block bg-gradient-to-r ${isDark ? 'from-sky-400 via-blue-500 to-purple-600' : 'from-blue-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent animated-gradient-text`}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                {ch}
              </span>
            )
          ))}
        </h1>
        
        {/* Loading Bar */}
        <div className={`mt-8 w-64 h-1 ${isLoaderDark ? 'bg-slate-800' : 'bg-gray-300'} rounded-full overflow-hidden`}>
          <div className={`h-full bg-gradient-to-r ${isLoaderDark ? 'from-sky-400 to-sky-600' : 'from-blue-600 to-blue-500'} animate-loading-bar`}></div>
        </div>
        
        <p className={`mt-4 ${isLoaderDark ? 'text-slate-400' : 'text-gray-500'} animate-pulse`}>{t('loadingPortfolio')}</p>

    </div>
  )
  }

  return (
    <div className={`min-h-screen relative ${isDark ? 'text-white' : 'text-gray-900'}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`animated-bg ${isDark ? 'animated-bg-dark' : 'animated-bg-light'}`}></div>
        <div className={`floating-icons ${isDark ? 'floating-dark' : 'floating-light'}`} ref={iconsRef}>
          {/* Íconos adicionales en la parte superior para mantener densidad mientras se scrollea */}
          <div className="floating-wrap speed-003" style={{ top: '2%', left: '8%' }}>
            <div className="floating-icon dur-20" style={{ animationDelay: '0.3s' }}><FaReact size={20} /></div>
          </div>
          <div className="floating-wrap speed-004" style={{ top: '4%', left: '28%' }}>
            <div className="floating-icon dur-18" style={{ animationDelay: '0.8s' }}><FaNodeJs size={20} /></div>
          </div>
          <div className="floating-wrap speed-003" style={{ top: '7%', left: '52%' }}>
            <div className="floating-icon dur-19" style={{ animationDelay: '0.5s' }}><FaJs size={18} /></div>
          </div>
          <div className="floating-wrap speed-004" style={{ top: '9%', left: '76%' }}>
            <div className="floating-icon dur-20" style={{ animationDelay: '1.1s' }}><SiTypescript size={18} /></div>
          </div>
          <div className="floating-wrap speed-003" style={{ top: '12%', left: '16%' }}>
            <div className="floating-icon dur-17" style={{ animationDelay: '0.4s' }}><FaAws size={18} /></div>
          </div>
          <div className="floating-wrap speed-004" style={{ top: '14%', left: '88%' }}>
            <div className="floating-icon dur-16" style={{ animationDelay: '0.9s' }}><FaPython size={18} /></div>
          </div>
          <div className="floating-wrap speed-003" style={{ top: '17%', left: '34%' }}>
            <div className="floating-icon dur-20" style={{ animationDelay: '0.2s' }}><FaHtml5 size={18} /></div>
          </div>
          <div className="floating-wrap speed-004" style={{ top: '19%', left: '67%' }}>
            <div className="floating-icon dur-18" style={{ animationDelay: '0.7s' }}><FaCss3Alt size={18} /></div>
          </div>
          <div className="floating-wrap speed-003" style={{ top: '22%', left: '90%' }}>
            <div className="floating-icon dur-17" style={{ animationDelay: '1.3s' }}><FaGitAlt size={18} /></div>
          </div>
          <div className="floating-wrap speed-006" style={{ top: '15%', left: '12%' }}>
            <div className="floating-icon dur-16" style={{ animationDelay: '0s' }}><FaReact size={28} /></div>
          </div>
          <div className="floating-wrap speed-004" style={{ top: '72%', left: '20%' }}>
            <div className="floating-icon dur-14" style={{ animationDelay: '1.2s' }}><FaNodeJs size={28} /></div>
          </div>
          <div className="floating-wrap speed-008" style={{ top: '32%', left: '82%' }}>
            <div className="floating-icon dur-18" style={{ animationDelay: '0.6s' }}><FaJs size={26} /></div>
          </div>
          <div className="floating-wrap speed-005" style={{ top: '50%', left: '50%' }}>
            <div className="floating-icon dur-20" style={{ animationDelay: '1.8s' }}><SiTypescript size={26} /></div>
          </div>
          <div className="floating-wrap speed-007" style={{ top: '22%', left: '60%' }}>
            <div className="floating-icon dur-15" style={{ animationDelay: '0.9s' }}><FaAws size={24} /></div>
          </div>
          <div className="floating-wrap speed-003" style={{ top: '84%', left: '76%' }}>
            <div className="floating-icon dur-17" style={{ animationDelay: '2.4s' }}><FaPython size={26} /></div>
          </div>
          <div className="floating-wrap speed-005" style={{ top: '8%', left: '40%' }}>
            <div className="floating-icon dur-15" style={{ animationDelay: '0.3s' }}><FaHtml5 size={26} /></div>
          </div>
          <div className="floating-wrap speed-006" style={{ top: '28%', left: '10%' }}>
            <div className="floating-icon dur-16" style={{ animationDelay: '1.0s' }}><FaCss3Alt size={26} /></div>
          </div>
          <div className="floating-wrap speed-004" style={{ top: '65%', left: '85%' }}>
            <div className="floating-icon dur-14" style={{ animationDelay: '1.6s' }}><FaGitAlt size={24} /></div>
          </div>
          <div className="floating-wrap speed-007" style={{ top: '40%', left: '30%' }}>
            <div className="floating-icon dur-18" style={{ animationDelay: '0.8s' }}><FaDatabase size={24} /></div>
          </div>
          <div className="floating-wrap speed-003" style={{ top: '75%', left: '60%' }}>
            <div className="floating-icon dur-17" style={{ animationDelay: '2.2s' }}><FaFire size={24} /></div>
          </div>
          <div className="floating-wrap speed-008" style={{ top: '18%', left: '75%' }}>
            <div className="floating-icon dur-20" style={{ animationDelay: '0.5s' }}><FaTerminal size={24} /></div>
          </div>
          <div className="floating-wrap speed-004" style={{ top: '54%', left: '12%' }}>
            <div className="floating-icon dur-15" style={{ animationDelay: '1.4s' }}><FaBootstrap size={24} /></div>
          </div>
        <div className={`absolute inset-0 bg-grid-pattern ${isDark ? 'opacity-5' : 'opacity-10 animate-grid-light'}`}></div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`transform transition-all duration-300 hover:scale-110 ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}>
          <FaLinkedin size={24} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`transform transition-all duration-300 hover:scale-110 ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}>
          <FaGithub size={24} />
        </a>
      </div>

      {/* Language Toggle */}
      <button 
        onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
        className={`fixed top-8 left-8 z-50 px-3 py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-110 cursor-pointer ${isDark ? 'text-slate-200 hover:text-white hover:bg-slate-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'}`}
        aria-label={t('changeLanguage')}
      >
        {lang === 'es' ? 'EN' : 'ES'}
      </button>

      {/* Theme Toggle */}
      <button 
        onClick={handleToggleTheme}
        className={`fixed top-8 right-8 z-50 p-2 rounded-lg transition-all duration-150 ease-out transform hover:scale-110 cursor-pointer ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
      >
        {isDark ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Custom cursor eliminado para usar el cursor nativo */}

      {/* Hero Section: split layout with photo ring */}
      <section id="home" className="min-h-screen flex items-center px-4 py-28 relative overflow-hidden" onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>
        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute rounded-full animate-pulse ${isDark ? 'bg-sky-400' : 'bg-blue-500'}`}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                animation: `float ${particle.speed + 2}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>

        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-slate-900/30 via-transparent to-slate-900/30' : 'bg-gradient-to-br from-white/30 via-transparent to-white/30'}`} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-6">
            <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'} text-base`}>{t('greeting')}</p>
            <h1 className={`text-5xl md:text-7xl font-bold shine-on-hover`}>
              {"Andres Cordoba".split("").map((ch, i) => (
                ch === " " ? (
                  <span key={i} className="inline-block">&nbsp;</span>
                ) : (
                  <span
                    key={i}
                    className={`inline-block bg-gradient-to-r ${isDark ? 'from-sky-400 via-blue-500 to-purple-600' : 'from-blue-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent animated-gradient-text`}
                    style={{ animationDelay: `${i * 0.12}s` }}
                  >
                    {ch}
                  </span>
                )
              ))}
            </h1>
            <div className={`text-xl md:text-2xl h-8 flex items-center justify-center ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
              <span className="font-mono">
                {displayedText}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
              </span>
            </div>
          </div>

          {/* Enhanced Buttons with Ripple Effect */}
          <div className="flex flex-wrap gap-4 justify-center mt-8 opacity-0 animate-fade-in-up" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>
            <button className={`group relative px-8 py-3 border-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer ${isDark ? 'border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-950' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
              <span className="relative z-10">{t('downloadCv')}</span>
              <div className={`absolute inset-0 ${isDark ? 'bg-sky-400' : 'bg-blue-600'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`group relative px-8 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              <span className="relative z-10">{t('aboutMe')}</span>
              <div className={`absolute inset-0 ${isDark ? 'bg-sky-500' : 'bg-blue-700'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right`}></div>
            </button>
          </div>

          {/* Enhanced Profile Image with 3D Tilt & Glare */}
          <div className="mt-12 opacity-0 animate-fade-in-up" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
            <div
              ref={photoRef}
              onMouseMove={handlePhotoMouseMove}
              onMouseLeave={handlePhotoMouseLeave}
              className={`w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 relative tilt-3d transform-gpu shadow-xl ${isDark ? 'border-slate-700' : 'border-gray-300'}`}
              style={{
                transform: `perspective(900px) rotateX(${photoTilt.rx}deg) rotateY(${photoTilt.ry}deg) scale(${photoTilt.scale})`,
                transition: 'transform 180ms ease-out'
              }}
            >
              <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-gradient-to-br from-sky-400/20 to-purple-600/20' : 'bg-gradient-to-br from-blue-600/20 to-pink-600/20'} animate-pulse`}></div>
              {/* Sparkles */}
              <div className={`absolute sparkle ${isDark ? 'bg-sky-400' : 'bg-blue-600'}`} style={{ top: '8%', left: '25%', '--spd': '2.4s', pointerEvents: 'none' } as CSSVars}></div>
              <div className={`absolute sparkle ${isDark ? 'bg-purple-500' : 'bg-pink-600'}`} style={{ top: '22%', left: '78%', '--spd': '3s', pointerEvents: 'none' } as CSSVars}></div>
              <div className={`absolute sparkle ${isDark ? 'bg-cyan-400' : 'bg-indigo-500'}`} style={{ top: '70%', left: '18%', '--spd': '2.2s', pointerEvents: 'none' } as CSSVars}></div>
              <div className={`absolute sparkle ${isDark ? 'bg-sky-300' : 'bg-blue-500'}`} style={{ top: '82%', left: '62%', '--spd': '2.8s', pointerEvents: 'none' } as CSSVars}></div>
              <div className={`absolute sparkle ${isDark ? 'bg-violet-500' : 'bg-purple-600'}`} style={{ top: '40%', left: '6%', '--spd': '3.2s', pointerEvents: 'none' } as CSSVars}></div>
              <div className={`absolute sparkle ${isDark ? 'bg-emerald-400' : 'bg-green-500'}`} style={{ top: '14%', left: '50%', '--spd': '2.6s', pointerEvents: 'none' } as CSSVars}></div>
              <div
                className="absolute inset-0 rounded-full glare"
                style={{ '--mx': `${glarePos.x}%`, '--my': `${glarePos.y}%` } as CSSVars}
              />
              <Image 
                src="/Andres.jpg" 
                alt="Andres Cordoba" 
                width={320} 
                height={320} 
                className="w-full h-full object-cover relative z-10"
                style={{ transform: 'translateZ(30px)' }}
              />
            </div>
          </div>
        
        </div>

        {/* Bottom Navigation with Tooltips - Increased z-index */}
        <nav
          className={`fixed left-1/2 -translate-x-1/2 rounded-full px-5 py-2.5 flex gap-5 z-[60] glass-nav ${scrolled ? 'glass-strong' : ''} ${isDark ? 'bg-slate-800/70' : 'bg-white/70 shadow-lg'}`}
          style={{ bottom: navBottom }}
        >
          {navItems.map((item) => (
            <div key={item.id} className="relative group">
              <button 
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`relative p-1.5 rounded-full transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 cursor-pointer ${
                  activeSection === item.id 
                    ? (isDark ? 'text-sky-400 active-pill-dark' : 'text-blue-600 active-pill-light')
                    : (isDark ? 'text-slate-400 hover:text-sky-400' : 'text-gray-600 hover:text-blue-600')
                }`}
              >
                <svg className={`w-5 h-5 ${activeSection === item.id ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                  {item.icon}
                </svg>
              </button>
              
              {/* Tooltip */}
              <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
                hoveredNav === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              } ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-800 text-white'}`}>
                {item.label}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${isDark ? 'border-t-slate-700' : 'border-t-gray-800'}`}></div>
              </div>
            </div>
          ))}
        </nav>
      </section>


      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('mySkills')}</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('myExperience')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`backdrop-blur-sm rounded-xl p-8 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('frontendDeveloper')}</h3>
              <div className="grid grid-cols-2 gap-4">
                {frontendTech.map((tech) => (
                  <div key={tech.name} className={`p-4 rounded-lg flex items-center gap-3 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <div className="flex-shrink-0">
                      {tech.icon}
                    </div>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`backdrop-blur-sm rounded-xl p-8 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('backendDeveloper')}</h3>
              <div className="grid grid-cols-2 gap-4">
                {backendTech.map((tech) => (
                  <div key={tech.name} className={`p-4 rounded-lg flex items-center gap-3 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <div className="flex-shrink-0">
                      {tech.icon}
                    </div>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('myJourney')}</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('experienceTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className={`w-full aspect-[4/5] rounded-lg overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
                <Image 
                  src="/Andres.jpg" 
                  alt="Andres Cordoba" 
                  width={400} 
                  height={500} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaLightbulb className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillCriticalThinking')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaTools className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillProblemSolving')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaComments className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillCommunication')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaClipboardList className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillDetailOriented')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaUserFriends className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillTeamPlayer')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaBrain className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillSelfAwareness')}</p>
                </div>
              </div>
              
              {/* Bio breve */}
              <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-800/60 border border-slate-700 text-slate-200' : 'bg-white shadow-md text-gray-800'}`}>
                <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-sky-400' : 'text-blue-600'}`}>Bio</h4>
                <p className="text-sm">Ingeniería de software 2023-2027 — Universidad Cooperativa de Colombia</p>
              </div>

              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {t('bioBlurb')}
              </p>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {t('contactMe')}
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Services Section */}
      <section id="services" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('myServices')}</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('whatIOffer')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className={`backdrop-blur-sm rounded-xl p-8 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('frontendDeveloper')}</h3>
              <button 
                onClick={() => setServiceModal('frontend')}
                className={`flex items-center justify-center gap-2 transition-colors mx-auto cursor-pointer ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                Ver más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className={`backdrop-blur-sm rounded-xl p-8 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('backendDeveloper')}</h3>
              <button 
                onClick={() => setServiceModal('backend')}
                className={`flex items-center justify-center gap-2 transition-colors mx-auto cursor-pointer ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                Ver más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>


      {/* Enhanced Projects Section */}
      <section id="projects" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center mb-16 opacity-0 animate-fade-in-up" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
            <p className={`mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('portfolio')}</p>
            <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${isDark ? 'from-sky-400 via-blue-500 to-purple-600' : 'from-blue-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent`}>{t('myProjects')}</h2>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8">
            {projects.map((project, i) => (
              <div 
                key={i} 
                className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-2 opacity-0 animate-fade-in-up ${isDark ? 'bg-slate-800/20 hover:bg-slate-800/40 border border-slate-700/50' : 'bg-white/80 hover:bg-white shadow-lg hover:shadow-2xl border border-gray-200/50'}`}
                style={{animationDelay: `${0.4 + i * 0.1}s`, animationFillMode: 'forwards'}}
                onClick={() => setProjectModal(i)}
              >
                {/* Project Image with Overlay */}
                <div className={`aspect-video relative overflow-hidden`}>
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className={`w-full h-full flex items-center justify-center text-6xl ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>💻</div>
                  )}
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-slate-900/80 via-slate-900/20 to-transparent' : 'from-gray-900/60 via-gray-900/10 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <a 
                      href={project.repo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${isDark ? 'bg-slate-800/80 text-sky-400 hover:bg-sky-400 hover:text-slate-900' : 'bg-white/90 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub size={20} />
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 ${isDark ? 'bg-slate-800/80 text-sky-400 hover:bg-sky-400 hover:text-slate-900' : 'bg-white/90 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>

                  {/* Tech Badge */}
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${isDark ? 'bg-slate-800/80 text-sky-400' : 'bg-white/90 text-blue-600'}`}>
                    {project.tech}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className={`font-bold text-lg mb-2 transition-colors group-hover:${isDark ? 'text-sky-400' : 'text-blue-600'} ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                    {project.description[lang]}
                  </p>

                  {/* Badges: Código & Live demo */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.repo && project.repo !== '#' && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`badge ${isDark ? 'bg-slate-800/70 text-sky-400 hover:bg-slate-800/85' : 'bg-white/90 text-blue-700 hover:bg-white'} shadow-sm hover:shadow-md`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub size={14} className="badge-icon" />
                        <span>{lang === 'es' ? 'Código' : 'Code'}</span>
                      </a>
                    )}
                    {project.demo && project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`badge ${isDark ? 'bg-sky-400/85 text-slate-950 hover:bg-sky-400' : 'bg-blue-600 text-white hover:bg-blue-700'} shadow-sm hover:shadow-md`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>{lang === 'es' ? 'Live demo' : 'Live demo'}</span>
                      </a>
                    )}
                  </div>
                  
                  {/* Progress Bar Animation */}
                  <div className={`mt-4 h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    <div className={`h-full bg-gradient-to-r ${isDark ? 'from-sky-400 to-blue-500' : 'from-blue-500 to-purple-600'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                  </div>
                </div>

                {/* Glassmorphism Border Effect */}
                <div className={`absolute inset-0 rounded-2xl border transition-all duration-300 ${isDark ? 'border-sky-400/0 group-hover:border-sky-400/30' : 'border-blue-500/0 group-hover:border-blue-500/30'}`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('achievementsIntro')}</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('achievementsTitle')}</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((item, i) => (
              <div
                key={i}
                className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/40' : 'bg-white/80 hover:bg-white shadow-lg hover:shadow-xl border border-gray-200/50'}`}
                style={{animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'forwards'}}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{item.date}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  {lang === 'es' ? item.detailEs : item.detailEn}
                </p>

                <div className={`mt-4 h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                  <div className={`h-full bg-gradient-to-r ${isDark ? 'from-sky-400 to-blue-500' : 'from-blue-500 to-purple-600'} transform scale-x-0 hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('whatTheySayAboutMe')}</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('testimonials')}</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    👤
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('client')} {i}</h4>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('companyXyz')}</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('testimonialText')}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-4 py-20 pb-32">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('getInTouch')}</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('contactTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">{t('talkToMe')}</h3>
              <a 
                href={`mailto:Andsebas1128@hotmail.com?subject=${encodeURIComponent(t('mailtoSubject'))}&body=${encodeURIComponent(t('mailtoBody'))}`} 
                className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
              >
                <FaEnvelope className={`${isDark ? 'text-white' : 'text-gray-800'}`} size={32} />
                <div>
                  <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('emailLabel')}</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Andsebas1128@hotmail.com</p>
                </div>
              </a>
              <a 
                href={`https://wa.me/573174570399?text=${encodeURIComponent(t('whatsappText'))}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition duration-200 ease-in-out transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
              >
                <FaWhatsapp className="text-green-500" size={32} />
                <div>
                  <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('whatsappLabel')}</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('sendMeMessage')}</p>
                </div>
              </a>
              <a 
                href="https://github.com/Andres766" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
              >
                <FaGithub className={`${isDark ? 'text-white' : 'text-gray-800'}`} size={32} />
                <div>
                  <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>GitHub</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('visitProfile')}</p>
                </div>
              </a>
              <a 
                href="https://www.linkedin.com/in/andres-cordoba-209883183" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
              >
                <FaLinkedin className="text-blue-600" size={32} />
                <div>
                  <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>LinkedIn</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('connectWithMe')}</p>
                </div>
              </a>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">{t('writeWhatYouNeed')}</h3>
              <form id="form" className="space-y-4" onSubmit={async (e) => {
                e.preventDefault()
                if (!form.name.trim() || !form.message.trim() || !form.email.trim()) {
                  setFeedback({ type: 'error', message: t('errorCompleteFields') })
                  return
                }
                try {
                  setSending(true)
                  setFeedback({ type: null, message: '' })
                  // Try EmailJS via sendForm (default_service/template_6iorr9e) as provided snippet
                  let succeeded = false
                  try {
                    await emailjs.sendForm('default_service', 'template_6iorr9e', e.currentTarget as HTMLFormElement)
                    // sendForm resolves on success; treat as succeeded
                    succeeded = true
                  } catch {}
                  // If sendForm not used or failed, try EmailJS .send with env-configured IDs
                  if (!succeeded) {
                    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
                    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
                    if (serviceId && templateId) {
                      try {
                        await emailjs.send(serviceId, templateId, {
                          name: form.name,
                          email: form.email,
                          message: form.message,
                        })
                        // send resolves on success
                        succeeded = true
                      } catch {}
                    }
                  }
                  // Fallback to existing API if EmailJS not configured or failed
                  if (!succeeded) {
                    const res = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ name: form.name, email: form.email, message: form.message })
                    })
                    if (!res.ok) throw new Error(t('errorSending'))
                  }
                  setFeedback({ type: 'success', message: t('successMessageSent') })
                  setForm({ name: '', email: '', message: '' })
                } catch (err) {
                  const message = err instanceof Error ? err.message : t('errorGeneral')
                  setFeedback({ type: 'error', message })
                } finally {
                  setSending(false)
                }
              }}>
                <input
                  type="text"
                  name="name"
                  placeholder={t('yourName')}
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 focus:outline-none transition-colors ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('yourEmail')}
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 focus:outline-none transition-colors ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
                />
                <textarea
                  placeholder={t('yourMessage')}
                  rows={6}
                  name="message"
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 focus:outline-none transition-colors resize-none ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
                />
                {/* Campos ocultos para plantillas comunes de EmailJS */}
                <input type="hidden" name="from_name" value={form.name} />
                <input type="hidden" name="reply_to" value={form.email} />
                <input type="hidden" name="user_name" value={form.name} />
                <input type="hidden" name="user_email" value={form.email} />
                <button
                  type="submit"
                  id="button"
                  disabled={sending}
                  className={`group relative w-full px-6 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ripple overflow-hidden cursor-pointer ${isDark ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 hover:from-sky-500 hover:to-blue-600 shadow-lg shadow-sky-400/25 hover:shadow-sky-400/40' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40'} ${sending ? 'opacity-70 cursor-not-allowed scale-95' : 'hover:shadow-2xl'}`}
                >
                  <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${sending ? 'opacity-0' : 'opacity-100'}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    {t('sendMessage')}
                  </span>
                  {sending && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        <span>{t('sending')}</span>
                      </div>
                    </div>
                  )}
                  <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-sky-300 to-blue-400' : 'from-blue-500 to-purple-500'} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                </button>
                {feedback.type && (
                  <p className={`text-sm mt-2 ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback.message}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className={`py-8 border-t relative z-10 ${isDark ? 'border-slate-800 bg-slate-950/50' : 'border-gray-200 bg-white/50'} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
            © 2025 Andres Cordoba. {t('rightsReserved')}
          </p>
        </div>
      </footer>

      {/* Service Modal */}
      {serviceModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setServiceModal(null)}>
          <div className={`max-w-2xl w-full rounded-2xl p-8 relative animate-scale-in ${isDark ? 'bg-slate-900' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setServiceModal(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-90 cursor-pointer ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
            >
              <FaTimes size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{services[serviceModal].image}</div>
              <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>
                {t(services[serviceModal].titleKey)}
              </h3>
              <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {t(services[serviceModal].descriptionKey)}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Habilidades principales:</h4>
              <div className="grid grid-cols-2 gap-3">
                {services[serviceModal].skills.map((skill) => (
            <div key={skill} className={`p-3 rounded-lg flex items-center gap-2 transform transition-all duration-150 ease-out hover:scale-105 ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <svg className={`w-5 h-5 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {projectModal !== null && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setProjectModal(null)}>
          <div className={`max-w-3xl w-full rounded-2xl overflow-hidden relative animate-scale-in ${isDark ? 'bg-slate-900' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setProjectModal(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-10 cursor-pointer ${isDark ? 'text-white bg-slate-800/80 hover:bg-slate-700' : 'text-gray-900 bg-white/80 hover:bg-gray-100'}`}
            >
              <FaTimes size={24} />
            </button>
            
            <div className={`aspect-video relative overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
              {projects[projectModal]?.image ? (
                <Image src={projects[projectModal].image} alt={projects[projectModal].title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-9xl">🖥️</div>
              )}
            </div>
            
            <div className="p-8">
              <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {projects[projectModal].title}
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-sky-400' : 'text-blue-600'}`}>
                {projects[projectModal].tech}
              </p>
              <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {projects[projectModal].description[lang]}
              </p>
              
              <div className="flex gap-4">
                <a 
                  href={projects[projectModal].repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
                >
                  <FaGithub size={20} />
                  {t('viewCode')}
                </a>
                <a 
                  href={projects[projectModal].demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                  {t('viewDemo')}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}