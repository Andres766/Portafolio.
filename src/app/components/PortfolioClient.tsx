'use client'

import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { FaLinkedin, FaGithub, FaLightbulb, FaTools, FaComments, FaClipboardList, FaUserFriends, FaBrain, FaWhatsapp, FaTimes, FaEnvelope } from 'react-icons/fa'
import Inicio from '../sections/Inicio'
import Informacion from '../sections/Informacion'
import Proyectos from '../sections/Proyectos'
import Contacto from '../sections/Contacto'
import Logros from '../sections/Logros'
import Testimonios from '../sections/Testimonios'
import ServiceModal from './ServiceModal'
import ProjectModal from './ProjectModal'
import { frontendTech, backendTech } from '../data/tech'
import { projects } from '../data/projects'
import { achievements } from '../data/achievements'
import { services } from '../data/services'
import { useParticles } from '../hooks/useParticles'
import { usePortfolioNav } from '../hooks/usePortfolioNav'
import { useHeroEffects } from '../hooks/useHeroEffects'
import { useLang } from '../hooks/useLang'
import FloatingIcons from './FloatingIcons'
import Loader from './Loader'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'

type CSSVars = React.CSSProperties & {
  ['--mx']?: string
  ['--my']?: string
  ['--spd']?: string
}

export default function PortfolioClient({ initialTheme, initialLang }: { initialTheme: 'dark' | 'light'; initialLang: 'es' | 'en' }) {
  // Initialize from SSR-provided props to guarantee SSR/CSR match
  const [isDark, setIsDark] = useState<boolean>(initialTheme === 'dark')

  // Keep loader consistent with initial theme to avoid flash
  const [loaderTheme, setLoaderTheme] = useState<'dark' | 'light'>(initialTheme)

  const [serviceModal, setServiceModal] = useState<'frontend' | 'backend' | 'uiux' | 'devops' | null>(null)
  const [projectModal, setProjectModal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
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
      emailjs.init('GA1MNMcBlMAqcBqvv')
    } catch {}
  }, [])

  // Typewriter effect for hero section
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  // showCursor ahora proviene del hook useHeroEffects
  // scrolled ahora proviene del hook usePortfolioNav

  // Partículas flotantes y efectos del Hero
  const particles = useParticles()
  const {
    photoTilt,
    glarePos,
    showCursor,
    handleHeroMouseMove,
    handleHeroMouseLeave,
    handlePhotoMouseMove,
    handlePhotoMouseLeave,
  } = useHeroEffects(iconsRef)

  // showCursor manejado en useHeroEffects

  // Idioma y traducciones extraídos a hook
  const { lang, setLang, t } = useLang(initialLang)


  const handleSubmitContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim() || !form.email.trim()) {
      setFeedback({ type: 'error', message: t('errorCompleteFields') })
      return
    }
    try {
      setSending(true)
      setFeedback({ type: null, message: '' })
      let succeeded = false
      try {
        const resultForm = await emailjs.sendForm('default_service', 'template_dx4icrp', e.currentTarget as HTMLFormElement)
        if (resultForm && typeof (resultForm as any).status === 'number') {
          const st = (resultForm as any).status
          if (st >= 200 && st < 300) succeeded = true
        } else {
          succeeded = true
        }
      } catch {}
      if (!succeeded) {
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
        if (serviceId && templateId) {
          try {
            const result = await emailjs.send(serviceId, templateId, {
              name: form.name,
              email: form.email,
              message: form.message,
            })
            if (result && typeof (result as any).status === 'number') {
              const st = (result as any).status
              if (st >= 200 && st < 300) succeeded = true
            } else {
              succeeded = true
            }
          } catch {}
        }
      }
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
  }

  // Typewriter effect for hero section
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

  // Reset typewriter when language changes
  useEffect(() => {
    setDisplayedText('')
    setCurrentIndex(0)
  }, [lang])

  const handleToggleTheme = () => {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('theme-switching')
    }
    setIsDark((prev: boolean) => {
      const next = !prev
      try {
        window.localStorage.setItem('theme', next ? 'dark' : 'light')
        document.cookie = `theme=${next ? 'dark' : 'light'}; path=/; max-age=31536000`
        const html = document.documentElement
        html.classList.remove('light','dark')
        html.classList.add(next ? 'dark' : 'light')
      } catch {}
      setLoaderTheme(next ? 'dark' : 'light')
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

  // Lógica de navegación y scroll extraída a hook
  const { navItems, navBottom, scrollToSection, activeSection, scrolled } = usePortfolioNav(t, footerRef)

  // services ahora importado desde src/app/data/services

  // Datos de tecnologías ahora importados desde src/app/data/tech

  // Proyectos ahora importados desde src/app/data/projects

  // Logros ahora importados desde src/app/data/achievements


  // navItems y scrollToSection ahora provienen del hook usePortfolioNav

  const onDownloadCv = () => {
    const link = document.createElement('a')
    link.href = '/CV Andres Cordoba.pdf'
    link.download = 'CV Andres Cordoba.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return <Loader loaderTheme={loaderTheme} t={t} />
  }

  return (
    <div className={`min-h-screen relative ${isDark ? 'text-white' : 'text-gray-900'}`}>
      <FloatingIcons isDark={isDark} iconsRef={iconsRef} />

      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`transform transition-all duration-300 hover:scale-110 ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}>
          <FaLinkedin size={24} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`transform transition-all duration-300 hover:scale-110 ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}>
          <FaGithub size={24} />
        </a>
      </div>

      <LanguageToggle isDark={isDark} lang={lang as 'es'|'en'} ariaLabel={t('changeLanguage')} onToggle={() => setLang(lang === 'es' ? 'en' : 'es')} />

      <button 
        onClick={handleToggleTheme}
        className={`fixed top-8 right-8 z-50 p-2 rounded-lg transition-all duration-150 ease-out transform hover:scale-110 cursor-pointer ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
      >
        {isDark ? (
          // Moon icon
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <circle cx="12" cy="12" r="4" strokeWidth="2" />
            <path strokeWidth="2" strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" />
          </svg>
        )}
      </button>

      <Inicio 
        isDark={isDark} 
        t={t} 
        handleHeroMouseMove={handleHeroMouseMove} 
        handleHeroMouseLeave={handleHeroMouseLeave} 
        displayedText={displayedText} 
        showCursor={showCursor} 
        particles={particles} 
        photoRef={photoRef} 
        photoTilt={photoTilt} 
        glarePos={glarePos} 
        handlePhotoMouseMove={handlePhotoMouseMove} 
        handlePhotoMouseLeave={handlePhotoMouseLeave} 
        onDownloadCv={onDownloadCv} 
        scrollToSection={scrollToSection} 
        navItems={navItems} 
        navBottom={navBottom} 
        scrolled={scrolled} 
        hoveredNav={hoveredNav} 
        setHoveredNav={setHoveredNav} 
        activeSection={activeSection} 
      />

      <Informacion 
        isDark={isDark} 
        t={t} 
        frontendTech={frontendTech} 
        backendTech={backendTech} 
        scrollToSection={scrollToSection} 
        setServiceModal={setServiceModal} 
      />

      <Proyectos isDark={isDark} t={t} lang={lang as 'es' | 'en'} projects={projects} setProjectModal={setProjectModal} />

      <Logros isDark={isDark} t={t} lang={lang as 'es' | 'en'} achievements={achievements} />

      <Testimonios isDark={isDark} t={t} />

      <Contacto 
        isDark={isDark}
        t={t}
        lang={lang as 'es' | 'en'}
        form={form}
        setForm={setForm}
        sending={sending}
        feedback={feedback}
        onSubmit={handleSubmitContact}
      />

      <footer ref={footerRef} className={`py-8 border-t relative z-10 ${isDark ? 'border-slate-800 bg-slate-950/50' : 'border-gray-200 bg-white/50'} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
            © 2025 Andres Cordoba. {t('rightsReserved')}
          </p>
        </div>
      </footer>

      <ServiceModal isDark={isDark} t={t} serviceModal={serviceModal} services={services as any} setServiceModal={setServiceModal as any} />

      <ProjectModal isDark={isDark} t={t} lang={lang as 'es' | 'en'} projectModal={projectModal} projects={projects} setProjectModal={setProjectModal} />

    </div>
  )
}