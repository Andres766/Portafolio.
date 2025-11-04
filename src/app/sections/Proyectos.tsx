"use client"
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import React from 'react'

type Project = {
  title: string
  tech: string
  description: { es: string; en: string }
  repo: string
  demo: string
  image?: string
}

export default function Proyectos({
  isDark,
  t,
  lang,
  projects,
  setProjectModal,
}: {
  isDark: boolean
  t: (key: string) => string
  lang: 'es' | 'en'
  projects: Project[]
  setProjectModal: React.Dispatch<React.SetStateAction<number | null>>
}) {
  return (
    <section id="projects" className="flex items-center px-4 py-28">
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
  )
}