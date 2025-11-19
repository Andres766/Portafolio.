"use client"

import React, { useEffect, useState } from 'react'
import {
  FaTimes,
  FaCheckCircle,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaMobileAlt,
  FaPalette,
  FaNodeJs,
  FaPython,
  FaDatabase,
  FaLock,
  FaPuzzlePiece,
  FaDraftingCompass,
  FaUniversalAccess,
  FaSitemap,
  FaMagic,
  FaTools,
  FaChartLine,
  FaAws,
  FaServer,
} from 'react-icons/fa'
import { SiTailwindcss, SiFigma, SiDocker, SiKubernetes, SiTerraform } from 'react-icons/si'

type ServiceKey = 'frontend' | 'backend' | 'uiux' | 'devops'

type ServicesMap = {
  [K in ServiceKey]: {
    titleKey: string
    descriptionKey: string
    skills: string[]
    image: string
    includes?: string[]
    process?: string[]
  }
}

export default function ServiceModal({
  isDark,
  t,
  serviceModal,
  services,
  setServiceModal,
}: {
  isDark: boolean
  t: (key: string) => string
  serviceModal: ServiceKey | null
  services: ServicesMap
  setServiceModal: React.Dispatch<React.SetStateAction<ServiceKey | null>>
}) {
  // Bloquear el scroll del fondo mientras el modal esté abierto
  useEffect(() => {
    if (!serviceModal) return
    const prevHtmlOverflow = document.documentElement.style.overflow
    const prevBodyOverflow = document.body.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow
      document.body.style.overflow = prevBodyOverflow
    }
  }, [serviceModal])

  const [activeSection, setActiveSection] = useState<'includes' | 'process' | 'tech'>('includes')

  const getSkillIcon = (skill: string) => {
    const s = skill.toLowerCase()
    // Paleta de colores rápida por modo
    const base = isDark ? 'text-sky-400' : 'text-blue-600'
    const neutral = isDark ? 'text-slate-300' : 'text-gray-700'

    if (s.includes('react') || s.includes('next')) return <FaReact className={base} size={18} />
    if (s.includes('html')) return <FaHtml5 className="text-orange-500" size={18} />
    if (s.includes('tailwind')) return <SiTailwindcss className="text-cyan-400" size={18} />
    if (s.includes('css')) return <FaCss3Alt className="text-blue-500" size={18} />
    if (s.includes('typescript') || s.includes('javascript')) return <FaJs className="text-yellow-400" size={18} />
    if (s.includes('responsive')) return <FaMobileAlt className={neutral} size={18} />
    if (s.includes('ui/ux') || s.includes('ux')) return <FaPalette className={neutral} size={18} />
    if (s.includes('node') || s.includes('express')) return <FaNodeJs className="text-green-500" size={18} />
    if (s.includes('python')) return <FaPython className="text-blue-500" size={18} />
    if (s.includes('sql') || s.includes('nosql') || s.includes('base')) return <FaDatabase className={neutral} size={18} />
    if (s.includes('rest')) return <FaServer className={neutral} size={18} />
    if (s.includes('aws') || s.includes('cloud')) return <FaAws className="text-orange-400" size={18} />
    if (s.includes('auth') || s.includes('seguridad')) return <FaLock className={neutral} size={18} />
    if (s.includes('design systems')) return <FaPuzzlePiece className={neutral} size={18} />
    if (s.includes('figma')) return <SiFigma className="text-pink-500" size={18} />
    if (s.includes('prototip')) return <FaDraftingCompass className={neutral} size={18} />
    if (s.includes('accesibilidad') || s.includes('wcag')) return <FaUniversalAccess className={neutral} size={18} />
    if (s.includes('arquitectura')) return <FaSitemap className={neutral} size={18} />
    if (s.includes('micro')) return <FaMagic className={neutral} size={18} />
    if (s.includes('ci/cd') || s.includes('pipeline')) return <FaTools className={neutral} size={18} />
    if (s.includes('docker')) return <SiDocker className="text-blue-400" size={18} />
    if (s.includes('kubernetes')) return <SiKubernetes className="text-blue-500" size={18} />
    if (s.includes('terraform') || s.includes('iac')) return <SiTerraform className="text-purple-500" size={18} />
    if (s.includes('monitor')) return <FaChartLine className={neutral} size={18} />
    return <FaPuzzlePiece className={neutral} size={18} />
  }

  if (!serviceModal) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-y-auto" onClick={() => setServiceModal(null)}>
      <div className={`max-w-4xl w-full rounded-2xl p-4 md:p-6 relative animate-scale-in ${isDark ? 'bg-slate-900' : 'bg-white'} max-h-[85vh] overflow-y-auto`} onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={() => setServiceModal(null)}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-90 cursor-pointer ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
        >
          <FaTimes size={24} />
        </button>
        
        <div className="text-center mb-5">
          <div className="text-4xl md:text-5xl mb-2">{services[serviceModal].image}</div>
          <h3 className={`text-2xl md:text-3xl font-bold mb-1 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>
            {t(services[serviceModal].titleKey)}
          </h3>
          <p className={`mb-3 text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
            {t(services[serviceModal].descriptionKey)}
          </p>
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${isDark ? 'bg-sky-900/40 text-sky-300 border border-sky-700/40' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
            <FaCheckCircle className={`${isDark ? 'text-sky-300' : 'text-blue-600'}`} />
            Calidad premium garantizada
          </div>
        </div>

        {/* Controles de secciones para reducir la densidad visual */}
        <div className="flex justify-center mb-4">
          <div className={`inline-flex rounded-full p-1 ${isDark ? 'bg-slate-800/60 border border-slate-700' : 'bg-gray-100 border border-gray-200'}`}>
            {[
              { key: 'includes', label: 'Incluye' },
              { key: 'process', label: 'Proceso' },
              { key: 'tech', label: 'Tecnologías' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveSection(key as any)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${activeSection === key ? (isDark ? 'bg-sky-500 text-slate-950' : 'bg-blue-600 text-white') : (isDark ? 'text-slate-300' : 'text-gray-700')}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {activeSection === 'includes' && services[serviceModal].includes && services[serviceModal].includes!.length > 0 && (
          <div className="space-y-2">
            <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Incluye</h4>
            <ul className="space-y-2">
              {services[serviceModal].includes!.map((inc) => (
                <li key={inc} className={`flex items-start gap-2 p-2 rounded-lg ${isDark ? 'bg-slate-800/50' : 'bg-gray-100'}`}>
                  <FaCheckCircle className={`${isDark ? 'text-sky-400' : 'text-blue-600'} mt-0.5`} />
                  <span className={`text-sm leading-tight ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{inc}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === 'process' && services[serviceModal].process && services[serviceModal].process!.length > 0 && (
          <div className="space-y-2">
            <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Proceso de trabajo</h4>
            <ol className="space-y-3">
              {services[serviceModal].process!.map((step, idx) => (
                <li key={`${step}-${idx}`} className="flex items-start gap-3">
                  <span className={`w-7 h-7 flex items-center justify-center rounded-full text-xs font-bold ${isDark ? 'bg-sky-900/40 text-sky-300 border border-sky-700/40' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>{idx + 1}</span>
                  <span className={`text-sm leading-tight ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {activeSection === 'tech' && (
          <div className="space-y-2">
            <h4 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Tecnologías</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {services[serviceModal].skills.map((skill) => (
                <div
                  key={skill}
                  className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    isDark
                      ? 'bg-slate-800/60 text-slate-300 border border-slate-700/50 hover:bg-slate-700/60 hover:ring-1 hover:ring-sky-500'
                      : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200 hover:ring-1 hover:ring-blue-400'
                  } transition-all hover:scale-[1.04] hover:-translate-y-0.5`}
                  aria-label={skill}
                >
                  <span className="shrink-0 transition-transform group-hover:rotate-6 group-hover:scale-110">
                    {getSkillIcon(skill)}
                  </span>
                  <span className="truncate">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="pt-6 flex justify-center">
          <a
            href="#contact"
            onClick={() => setServiceModal(null)}
            className={`px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Contáctame
          </a>
        </div>
      </div>
    </div>
  )
}