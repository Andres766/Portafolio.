"use client"

import React from 'react'
import Image from 'next/image'
import { FaTimes, FaGithub } from 'react-icons/fa'

type Project = {
  title: string
  tech: string
  description: { es: string; en: string }
  repo: string
  demo: string
  image?: string
}

export default function ProjectModal({
  isDark,
  t,
  lang,
  projectModal,
  projects,
  setProjectModal,
}: {
  isDark: boolean
  t: (key: string) => string
  lang: 'es' | 'en'
  projectModal: number | null
  projects: Project[]
  setProjectModal: React.Dispatch<React.SetStateAction<number | null>>
}) {
  if (projectModal === null) return null

  const project = projects[projectModal]

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setProjectModal(null)}>
      <div className={`max-w-3xl w-full rounded-2xl overflow-hidden relative animate-scale-in ${isDark ? 'bg-slate-900' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={() => setProjectModal(null)}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-90 z-10 cursor-pointer ${isDark ? 'text-white bg-slate-800/80 hover:bg-slate-700' : 'text-gray-900 bg-white/80 hover:bg-gray-100'}`}
        >
          <FaTimes size={24} />
        </button>
        
        <div className={`aspect-video relative overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
          {project?.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-9xl">🖥️</div>
          )}
        </div>
        
        <div className="p-8">
          <h3 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{project.title}</h3>
          <p className={`text-sm mb-4 ${isDark ? 'text-sky-400' : 'text-blue-600'}`}>{project.tech}</p>
          <p className={`mb-6 ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{project.description[lang]}</p>
          
          <div className="flex gap-4">
            <a 
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
            >
              <FaGithub size={20} />
              {t('viewCode')}
            </a>
            <a 
              href={project.demo}
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
  )
}