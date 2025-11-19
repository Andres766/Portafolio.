'use client'

import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { FaLinkedin, FaGithub, FaLightbulb, FaTools, FaComments, FaClipboardList, FaUserFriends, FaBrain, FaWhatsapp, FaTimes, FaEnvelope } from 'react-icons/fa'
import dynamic from 'next/dynamic'
const Inicio = dynamic(() => import('../sections/Inicio'), { ssr: false })
const Informacion = dynamic(() => import('../sections/Informacion'), { ssr: false })
const Proyectos = dynamic(() => import('../sections/Proyectos'), { ssr: false })
const Contacto = dynamic(() => import('../sections/Contacto'), { ssr: false })
const Logros = dynamic(() => import('../sections/Logros'), { ssr: false })
const Testimonios = dynamic(() => import('../sections/Testimonios'), { ssr: false })
const ServiceModal = dynamic(() => import('./ServiceModal'), { ssr: false })
const ProjectModal = dynamic(() => import('./ProjectModal'), { ssr: false })
import { frontendTech, backendTech } from '../data/tech'
import { projects } from '../data/projects'
import { achievements } from '../data/achievements'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'
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

export default function PortfolioClient({ initialTheme, initialLang }: { initialTheme: 'dark' | 'light' | 'system'; initialLang: 'es' | 'en' }) {
  // Theme mode (light, dark, system)
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'system'>(initialTheme)
  const [isDark, setIsDark] = useState<boolean>(initialTheme === 'dark')

  // Keep loader consistent with initial theme to avoid flash
  const [loaderTheme, setLoaderTheme] = useState<'dark' | 'light'>(initialTheme === 'dark' ? 'dark' : 'light')

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
  const [funnyText, setFunnyText] = useState('')
  const [funnyIndex, setFunnyIndex] = useState(0)
  const [funnyPhraseIndex, setFunnyPhraseIndex] = useState(0)
  const [funnyDeleting, setFunnyDeleting] = useState(false)
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

  useEffect(() => {
    const phrases = lang === 'es' ? jokesEs : jokesEn
    const current = phrases[funnyPhraseIndex] || ''
    let timeout: any
    if (!funnyDeleting) {
      if (funnyIndex < current.length) {
        timeout = setTimeout(() => {
          setFunnyText(prev => prev + current[funnyIndex])
          setFunnyIndex(prev => prev + 1)
        }, 80)
      } else {
        timeout = setTimeout(() => {
          setFunnyDeleting(true)
        }, 1200)
      }
    } else {
      if (funnyIndex > 0) {
        timeout = setTimeout(() => {
          setFunnyText(prev => prev.slice(0, -1))
          setFunnyIndex(prev => prev - 1)
        }, 40)
      } else {
        timeout = setTimeout(() => {
          setFunnyDeleting(false)
          setFunnyPhraseIndex(prev => (prev + 1) % phrases.length)
        }, 400)
      }
    }
    return () => clearTimeout(timeout)
  }, [funnyIndex, funnyDeleting, funnyPhraseIndex, lang])

  useEffect(() => {
    setFunnyText('')
    setFunnyIndex(0)
    setFunnyDeleting(false)
    setFunnyPhraseIndex(0)
  }, [lang])



  const applyTheme = (mode: 'light' | 'dark' | 'system') => {
    setThemeMode(mode)
    if (typeof document !== 'undefined') {
      document.documentElement.classList.add('theme-switching')
    }
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = mode === 'system' ? prefersDark : mode === 'dark'
    try {
      window.localStorage.setItem('theme', mode)
      document.cookie = `theme=${mode}; path=/; max-age=31536000`
      const html = document.documentElement
      html.classList.remove('light','dark')
      html.classList.add(dark ? 'dark' : 'light')
    } catch {}
    setIsDark(dark)
    setLoaderTheme(dark ? 'dark' : 'light')
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        document.documentElement.classList.remove('theme-switching')
      }
    }, 1000)
  }

  // Initialize theme from initial mode and system preference
  useEffect(() => {
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = themeMode === 'system' ? prefersDark : themeMode === 'dark'
    setIsDark(dark)
    setLoaderTheme(dark ? 'dark' : 'light')
    const html = document.documentElement
    html.classList.remove('light','dark')
    html.classList.add(dark ? 'dark' : 'light')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // React to OS theme changes when in 'system' mode
  useEffect(() => {
    if (themeMode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyTheme('system')
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else mq.addListener(handler)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else mq.removeListener(handler)
    }
  }, [themeMode])

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

      

      <LanguageToggle isDark={isDark} lang={lang as 'es'|'en'} ariaLabel={t('changeLanguage')} onToggle={() => setLang(lang === 'es' ? 'en' : 'es')} />

      {/* Theme segmented control */}
      <div className="fixed top-8 right-8 z-50">
        <div className={`inline-flex rounded-full p-1 ${isDark ? 'bg-slate-800/60 border border-slate-700' : 'bg-gray-100 border border-gray-200'}`}>
          <button
            onClick={() => applyTheme('light')}
            className={`px-3 py-1.5 rounded-full text-sm cursor-pointer ${themeMode === 'light' ? (isDark ? 'bg-sky-500 text-slate-950' : 'bg-blue-600 text-white') : (isDark ? 'text-slate-300' : 'text-gray-700')}`}
            aria-label="Modo claro"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4" strokeWidth="2" /><path strokeWidth="2" strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" /></svg>
          </button>
          <button
            onClick={() => applyTheme('dark')}
            className={`px-3 py-1.5 rounded-full text-sm cursor-pointer ${themeMode === 'dark' ? (isDark ? 'bg-sky-500 text-slate-950' : 'bg-blue-600 text-white') : (isDark ? 'text-slate-300' : 'text-gray-700')}`}
            aria-label="Modo oscuro"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21.64 13A9 9 0 1111 2.36a7 7 0 1010.64 10.64z" /></svg>
          </button>
          <button
            onClick={() => applyTheme('system')}
            className={`px-3 py-1.5 rounded-full text-sm cursor-pointer ${themeMode === 'system' ? (isDark ? 'bg-sky-500 text-slate-950' : 'bg-blue-600 text-white') : (isDark ? 'text-slate-300' : 'text-gray-700')}`}
            aria-label="Modo del sistema"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm4 12h10v2H7v-2z"/></svg>
          </button>
        </div>
      </div>

      <Inicio 
        isDark={isDark} 
        t={t} 
        handleHeroMouseMove={handleHeroMouseMove} 
        handleHeroMouseLeave={handleHeroMouseLeave} 
        displayedText={displayedText} 
        showCursor={showCursor} 
        funnyText={funnyText}
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

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}>
        <Informacion 
          isDark={isDark} 
          t={t} 
          frontendTech={frontendTech} 
          backendTech={backendTech} 
          scrollToSection={scrollToSection} 
          setServiceModal={setServiceModal} 
        />
      </div>

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '900px' }}>
        <Proyectos isDark={isDark} t={t} lang={lang as 'es' | 'en'} projects={projects} setProjectModal={setProjectModal} />
      </div>

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
        <Logros isDark={isDark} t={t} lang={lang as 'es' | 'en'} achievements={achievements} />
      </div>

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '700px' }}>
        <Testimonios isDark={isDark} t={t} lang={lang as 'es' | 'en'} />
      </div>

      <div style={{ contentVisibility: 'auto', containIntrinsicSize: '800px' }}>
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
      </div>

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
  const jokesEs = [
    'Ayer compilaba, hoy depuro',
    'Funciona en mi máquina',
    'Es una feature, no un bug',
    'Ctrl+Z es vida',
    'Commit temprano, deploy tranquilo',
    'Los puntos y coma son opcionales',
    'Testeo luego existo',
    'Café == código',
    'Standup: sí, en ello',
  ]
  const jokesEn = [
    'Yesterday I compiled, today I debug',
    'Works on my machine',
    "It’s a feature, not a bug",
    'Ctrl+Z is life',
    'Early commit, calm deploy',
    'Semicolons are optional',
    'I test therefore I am',
    'Coffee == code',
    'Standup: yes, working on it',
  ]