'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaLinkedin, FaGithub, FaLightbulb, FaTools, FaComments, FaClipboardList, FaUserFriends, FaBrain, FaWhatsapp, FaTimes } from 'react-icons/fa'

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true)
  const [serviceModal, setServiceModal] = useState<'frontend' | 'backend' | null>(null)
  const [projectModal, setProjectModal] = useState<number | null>(null)

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

  // Datos de proyectos (ejemplo)
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

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white' : 'bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900'}`}>
      {/* Sidebar Navigation */}
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
          <FaLinkedin size={24} />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}>
          <FaGithub size={24} />
        </a>
      </div>

      {/* Theme Toggle */}
      <button 
        onClick={() => setIsDark(!isDark)}
        className={`fixed top-8 right-8 z-50 p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
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
            <button className={`px-8 py-3 border-2 rounded-lg transition-all duration-300 ${isDark ? 'border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-950' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
              Descargar CV
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`px-8 py-3 rounded-lg transition-all duration-300 ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
              Sobre mi
            </button>
          </div>

          <div className="mt-12">
            <div className={`w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 ${isDark ? 'border-slate-700' : 'border-gray-300'}`}>
              {/* Usamos la imagen desde public/Andres.jpg */}
              <Image
                src="/Andres.jpg"
                alt="Andres Cordoba"
                width={320}
                height={320}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <nav className={`fixed bottom-8 left-1/2 -translate-x-1/2 backdrop-blur-sm rounded-full px-6 py-3 flex gap-6 ${isDark ? 'bg-slate-800/80' : 'bg-white/80 shadow-lg'}`}>
          <button onClick={() => scrollToSection('home')} className={`transition-colors ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </button>
          <button onClick={() => scrollToSection('about')} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-sky-400' : 'text-gray-600 hover:text-blue-600'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={() => scrollToSection('experience')} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-sky-400' : 'text-gray-600 hover:text-blue-600'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={() => scrollToSection('services')} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-sky-400' : 'text-gray-600 hover:text-blue-600'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          </button>
          <button onClick={() => scrollToSection('projects')} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-sky-400' : 'text-gray-600 hover:text-blue-600'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          </button>
          <button onClick={() => scrollToSection('contact')} className={`transition-colors ${isDark ? 'text-slate-400 hover:text-sky-400' : 'text-gray-600 hover:text-blue-600'}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </button>
        </nav>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Mi introducción</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Acerca de mi</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className={`w-full aspect-[4/5] rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
                {/* Imagen en la sección About */}
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/Andres.jpg"
                    alt="Andres Cordoba"
                    width={800}
                    height={1000}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-md'}`}>
                  <FaLightbulb className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Pensamiento crítico</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-md'}`}>
                  <FaTools className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Resolución de problemas</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-md'}`}>
                  <FaComments className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Comunicación</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-md'}`}>
                  <FaClipboardList className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Detalle orientado</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-md'}`}>
                  <FaUserFriends className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Jugador del equipo</p>
                </div>
                <div className={`p-4 rounded-lg text-center ${isDark ? 'bg-slate-800/50' : 'bg-white shadow-md'}`}>
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
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Contáctame
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center px-4 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>Mis habilidades</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Mi Experiencia</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`backdrop-blur-sm rounded-xl p-8 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Desarrollador Frontend</h3>
              <div className="grid grid-cols-2 gap-4">
                {['HTML', 'CSS (SASS)', 'Javascript', 'Git', 'Bootstrap', 'React'].map((skill) => (
                  <div key={skill} className={`p-4 rounded-lg flex items-center gap-3 ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold ${isDark ? 'bg-sky-500' : 'bg-blue-600'}`}>
                      {skill.charAt(0)}
                    </div>
                    <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`backdrop-blur-sm rounded-xl p-8 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>Desarrollador Backend</h3>
              <div className="grid grid-cols-2 gap-4"> 
                {['Nodejs', 'Python', 'SQL/NoSQL', 'Firebase', 'Terminal', 'AWS'].map((skill) => (
                  <div key={skill} className={`p-4 rounded-lg flex items-center gap-3 ${isDark ? 'bg-slate-800/50' : 'bg-gray-50'}`}>
                    <div className={`w-8 h-8 rounded flex items-center justify-center text-white text-xs font-bold ${isDark ? 'bg-sky-500' : 'bg-blue-600'}`}>
                      {skill.charAt(0)}
                    </div>
                    <span className={isDark ? 'text-slate-300' : 'text-gray-700'}>{skill}</span>
                  </div>
                ))}
              </div>
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
            <div className={`backdrop-blur-sm rounded-xl p-8 transition-all duration-300 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
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
            
            <div className={`backdrop-blur-sm rounded-xl p-8 transition-all duration-300 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
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
              <div key={i} className={`backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`} onClick={() => setProjectModal(i)}>
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
              <div key={i} className={`backdrop-blur-sm rounded-xl p-6 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
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
                  Excelente profesional, entrega trabajos de calidad y siempre cumple con los plazos establecidos. Muy recomendado.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center px-4 py-20">
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
                href="https://wa.me/573123456789?text=Hola%20Andres,%20me%20interesa%20trabajar%20contigo" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
              >
                <FaWhatsapp className="text-green-500" size={32} />
                <div>
                  <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>WhatsApp</p>
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Envíame un mensaje</p>
                </div>
              </a>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Escríbeme lo que necesitas</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="Tu nombre:"
                  className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 focus:outline-none transition-colors ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
                />
                <textarea
                  placeholder="Dime en que te ayudo:"
                  rows={6}
                  className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 focus:outline-none transition-colors resize-none ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
                />
                <button
                  type="submit"
                  className={`w-full px-6 py-3 rounded-lg transition-all duration-300 font-semibold ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 border-t ${isDark ? 'border-slate-800' : 'border-gray-200'}`}>
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className={isDark ? 'text-slate-400' : 'text-gray-600'}>
            © 2025 Andres Cordoba. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* Service Modal */}
      {serviceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setServiceModal(null)}>
          <div className={`max-w-2xl w-full rounded-2xl p-8 relative ${isDark ? 'bg-slate-900' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setServiceModal(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
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
                  <div key={skill} className={`p-3 rounded-lg flex items-center gap-2 ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setProjectModal(null)}>
          <div className={`max-w-3xl w-full rounded-2xl overflow-hidden relative ${isDark ? 'bg-slate-900' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setProjectModal(null)}
              className={`absolute top-4 right-4 p-2 rounded-lg transition-colors z-10 ${isDark ? 'text-white bg-slate-800/80 hover:bg-slate-700' : 'text-gray-900 bg-white/80 hover:bg-gray-100'}`}
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
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
                >
                  <FaGithub size={20} />
                  Ver código
                </a>
                <a 
                  href={projects[projectModal].demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
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
