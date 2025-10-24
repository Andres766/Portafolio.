'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FaLinkedin, FaGithub, FaLightbulb, FaTools, FaComments, FaClipboardList, FaUserFriends, FaBrain, FaWhatsapp, FaTimes, FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaGitAlt, FaNodeJs, FaPython, FaDatabase, FaFire, FaTerminal, FaAws } from 'react-icons/fa'
import { SiTypescript } from 'react-icons/si'

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true)
  const [serviceModal, setServiceModal] = useState<'frontend' | 'backend' | null>(null)
  const [projectModal, setProjectModal] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
   const iconsRef = useRef<HTMLDivElement>(null)
   const [form, setForm] = useState({ name: '', message: '' })
   const [sending, setSending] = useState(false)
   const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'services', 'projects', 'contact']
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
      title: 'Desarrollador Frontend',
      description: 'Creo interfaces de usuario modernas, responsivas y accesibles utilizando las últimas tecnologías web. Me especializo en convertir diseños en código limpio y eficiente, garantizando una experiencia de usuario excepcional.',
      skills: ['React & Next.js', 'HTML5 & CSS3', 'Tailwind CSS', 'JavaScript/TypeScript', 'Responsive Design', 'UI/UX Implementation'],
      image: '🎨'
    },
    backend: {
      title: 'Desarrollador Backend',
      description: 'Desarrollo APIs robustas y escalables, gestiono bases de datos y implemento lógica de negocio compleja. Me enfoco en crear sistemas seguros, eficientes y fáciles de mantener.',
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
    { title: 'E-commerce Platform', tech: 'Next.js, Node.js, MongoDB', description: 'Plataforma completa de comercio electrónico con pasarela de pagos', repo: '#', demo: '#' },
    { title: 'Task Manager App', tech: 'React, Firebase', description: 'Aplicación de gestión de tareas con sincronización en tiempo real', repo: '#', demo: '#' },
    { title: 'Portfolio CMS', tech: 'Next.js, TypeScript', description: 'Sistema de gestión de contenido para portfolios personales', repo: '#', demo: '#' },
    { title: 'Weather Dashboard', tech: 'React, API Integration', description: 'Dashboard meteorológico con visualización de datos', repo: '#', demo: '#' },
    { title: 'Chat Application', tech: 'Node.js, Socket.io', description: 'Aplicación de chat en tiempo real con salas privadas', repo: '#', demo: '#' },
    { title: 'Blog Platform', tech: 'Next.js, MDX', description: 'Plataforma de blog con markdown y optimización SEO', repo: '#', demo: '#' },
    { title: 'Fitness Tracker', tech: 'React Native, Firebase', description: 'App móvil para seguimiento de ejercicios y nutrición', repo: '#', demo: '#' },
    { title: 'Analytics Dashboard', tech: 'React, D3.js', description: 'Dashboard de análisis con gráficos interactivos', repo: '#', demo: '#' },
    { title: 'Social Media API', tech: 'Node.js, PostgreSQL', description: 'API REST para aplicación de redes sociales', repo: '#', demo: '#' },
  ]

  const navItems = [
    { id: 'home', label: 'Inicio', icon: <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /> },
    { id: 'about', label: 'Sobre mí', icon: <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /> },
    { id: 'experience', label: 'Experiencia', icon: <><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /></> },
    { id: 'services', label: 'Servicios', icon: <><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></> },
    { id: 'projects', label: 'Proyectos', icon: <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /> },
    { id: 'contact', label: 'Contacto', icon: <><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></> },
  ]

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  // Loading Screen Component
  if (loading) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="relative">
          {/* Animated Code Brackets */}
          <div className="text-sky-400 text-8xl md:text-9xl font-mono font-bold animate-pulse">
            {'</>'}
          </div>
          
          {/* Orbiting Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-48 h-48 border-2 border-sky-400/30 rounded-full animate-spin-slow" style={{ animationDuration: '3s' }}>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-sky-400 rounded-full"></div>
            </div>
            <div className="absolute w-64 h-64 border-2 border-sky-500/20 rounded-full animate-spin-slow" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-sky-500 rounded-full"></div>
            </div>
          </div>
          
          {/* Binary Code Effect */}
          <div className="absolute -left-32 top-0 text-sky-400/20 text-xs font-mono animate-pulse">
            01001000<br/>01100101<br/>01101100<br/>01101100<br/>01101111
          </div>
          <div className="absolute -right-32 top-0 text-sky-400/20 text-xs font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>
            01010111<br/>01101111<br/>01110010<br/>01101100<br/>01100100
          </div>
        </div>
        
        {/* Name */}
        <h1 className="mt-16 text-4xl md:text-5xl font-bold text-white animate-fade-in">
          Andres Cordoba
        </h1>
        
        {/* Loading Bar */}
        <div className="mt-8 w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-400 to-sky-600 animate-loading-bar"></div>
        </div>
        
        <p className="mt-4 text-slate-400 animate-pulse">Cargando portafolio...</p>

    </div>
  )
}

  return (
    <div className={`min-h-screen transition-colors duration-300 relative ${isDark ? 'text-white' : 'text-gray-900'}`}>
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

      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-8 right-8 z-50 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
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

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Un saludo, mi nombre es</p>
          <h1 className="text-5xl md:text-7xl font-bold">Andres Cordoba</h1>
          <p className={`text-xl md:text-2xl ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Fullstack web developer</p>
          
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button className={`px-8 py-3 border-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${isDark ? 'border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-950' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
              Descargar CV
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Sobre mi
            </button>
          </div>

          <div className="mt-12">
            <div className={`w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 ${isDark ? 'border-slate-700' : 'border-gray-300'}`}>
              <Image 
                src="/Andres.jpg" 
                alt="Andres Cordoba" 
                width={320} 
                height={320} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Navigation with Tooltips - Increased z-index */}
        <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-sm rounded-full px-6 py-3 flex gap-6 z-[60] ${isDark ? 'bg-slate-800/90' : 'bg-white/90 shadow-lg'}`}>
          {navItems.map((item) => (
            <div key={item.id} className="relative group">
              <button 
                onClick={() => scrollToSection(item.id)}
                onMouseEnter={() => setHoveredNav(item.id)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 ${
                  activeSection === item.id 
                    ? isDark ? 'text-sky-400' : 'text-blue-600'
                    : isDark ? 'text-slate-400 hover:text-sky-400' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <svg className={`w-6 h-6 ${activeSection === item.id ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' : ''}`} fill="currentColor" viewBox="0 0 20 20">
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
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Mis habilidades</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Mi Experiencia</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`backdrop-blur-sm rounded-xl p-8 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Desarrollador Frontend</h3>
              <div className="grid grid-cols-2 gap-4">
                {frontendTech.map((tech) => (
                  <div key={tech.name} className={`p-4 rounded-lg flex items-center gap-3 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
                    <div className="flex-shrink-0">
                      {tech.icon}
                    </div>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`backdrop-blur-sm rounded-xl p-8 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Desarrollador Backend</h3>
              <div className="grid grid-cols-2 gap-4">
                {backendTech.map((tech) => (
                  <div key={tech.name} className={`p-4 rounded-lg flex items-center gap-3 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-700' : 'bg-gray-50 hover:bg-gray-100'}`}>
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
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Mi trayectoria</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Experiencia</h2>
          
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
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Pensamiento crítico</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaTools className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Resolución de problemas</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaComments className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Comunicación</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaClipboardList className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Detalle orientado</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaUserFriends className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Jugador del equipo</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaBrain className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Autoconciencia</p>
                </div>
              </div>
              
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                Soy estudiante de Ingeniería con más de dos años de experiencia en el desarrollo de proyectos académicos y 
                profesionales, donde he fortalecido mis habilidades en el análisis, diseño y construcción de soluciones 
                tecnológicas. Mi enfoque combina la capacidad de aprendizaje constante con la aplicación práctica de 
                metodologías y herramientas de ingeniería, lo que me ha permitido aportar valor en diferentes contextos.
              </p>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Contáctame
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Mis servicios</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Lo que ofrezco</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className={`backdrop-blur-sm rounded-xl p-8 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Frontend Desarrollador</h3>
              <button 
                onClick={() => setServiceModal('frontend')}
                className={`flex items-center justify-center gap-2 transition-colors mx-auto ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                Ver más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className={`backdrop-blur-sm rounded-xl p-8 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>Backend Desarrollador</h3>
              <button 
                onClick={() => setServiceModal('backend')}
                className={`flex items-center justify-center gap-2 transition-colors mx-auto ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}
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

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Portafolio</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Mis proyectos</h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <div key={i} className={`backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`} onClick={() => setProjectModal(i)}>
                <div className={`aspect-video flex items-center justify-center text-6xl ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
                  💻
                </div>
                <div className="p-4">
                  <h3 className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{project.tech}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Lo que dicen de mí</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Testimonios</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                    👤
                  </div>
                  <div>
                    <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Cliente {i}</h4>
                    <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Empresa XYZ</p>
                  </div>
                </div>
                <p className={`${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                  &quot;Excelente profesional, entrega trabajos de calidad y siempre cumple con los plazos establecidos. Muy recomendado.&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-4 py-20 pb-32">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Ponte en contacto</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Contactame</h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Hablame</h3>
              <div className={`backdrop-blur-sm rounded-xl p-6 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
                <p className={`mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Correo electronico</p>
                <p className={isDark ? 'text-white' : 'text-gray-900'}>Andsebas1128@hotmail.com</p>
              </div>
              
              <a 
                href="https://wa.me/573174570399?text=Hola%20Andres,%20me%20interesa%20trabajar%20contigo" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
              >
                <FaWhatsapp className="text-green-500" size={32} />
                <div>
                  <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>WhatsApp</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Envíame un mensaje</p>
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
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Visita mi perfil</p>
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
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Conecta conmigo</p>
                </div>
              </a>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Escríbeme lo que necesitas</h3>
              <form className="space-y-4" onSubmit={async (e) => {
                e.preventDefault()
                if (!form.name.trim() || !form.message.trim()) {
                  setFeedback({ type: 'error', message: 'Por favor completa tu nombre y el mensaje.' })
                  return
                }
                try {
                  setSending(true)
                  setFeedback({ type: null, message: '' })
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: form.name, message: form.message })
                  })
                  const data = await res.json()
                  if (!res.ok) throw new Error(data?.error || 'Error al enviar')
                  setFeedback({ type: 'success', message: '¡Mensaje enviado! Te responderé pronto.' })
                  setForm({ name: '', message: '' })
                } catch (err) {
                  setFeedback({ type: 'error', message: 'No se pudo enviar el mensaje. Intenta nuevamente más tarde.' })
                } finally {
                  setSending(false)
                }
              }}>
                <input
                  type="text"
                  placeholder="Tu nombre:"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 focus:outline-none transition-colors ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
                />
                <textarea
                  placeholder="Dime en que te ayudo:"
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 focus:outline-none transition-colors resize-none ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
                />
                <button
                  type="submit"
                  disabled={sending}
                  className={`w-full px-6 py-3 rounded-lg transition-all duration-300 font-semibold transform hover:scale-105 ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'} ${sending ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {sending ? 'Enviando...' : 'Enviar mensaje'}
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
      <footer className={`py-8 border-t relative z-10 ${isDark ? 'border-slate-800 bg-slate-950/50' : 'border-gray-200 bg-white/50'} backdrop-blur-sm`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
            © 2025 Andres Cordoba. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Service Modal */}
      {serviceModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setServiceModal(null)}>
          <div className={`max-w-2xl w-full rounded-2xl p-8 relative animate-scale-in ${isDark ? 'bg-slate-900' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setServiceModal(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-90 ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
            >
              <FaTimes size={24} />
            </button>
            
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">{services[serviceModal].image}</div>
              <h3 className={`text-3xl font-bold mb-4 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>
                {services[serviceModal].title}
              </h3>
              <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {services[serviceModal].description}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Habilidades principales:</h4>
              <div className="grid grid-cols-2 gap-3">
                {services[serviceModal].skills.map((skill) => (
                  <div key={skill} className={`p-3 rounded-lg flex items-center gap-2 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
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
              className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-10 ${isDark ? 'text-white bg-slate-800/80 hover:bg-slate-700' : 'text-gray-900 bg-white/80 hover:bg-gray-100'}`}
            >
              <FaTimes size={24} />
            </button>
            
            <div className={`aspect-video flex items-center justify-center text-9xl ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
              🖥️
            </div>
            
            <div className="p-8">
              <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {projects[projectModal].title}
              </h3>
              <p className={`text-sm mb-4 ${isDark ? 'text-sky-400' : 'text-blue-600'}`}>
                {projects[projectModal].tech}
              </p>
              <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {projects[projectModal].description}
              </p>
              
              <div className="flex gap-4">
                <a 
                  href={projects[projectModal].repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
                >
                  <FaGithub size={20} />
                  Ver código
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
                  Ver demo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}