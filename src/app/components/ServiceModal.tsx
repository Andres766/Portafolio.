"use client"

import React, { useEffect } from 'react'
import { FaTimes, FaCheckCircle } from 'react-icons/fa'

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

  if (!serviceModal) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in overflow-hidden" onClick={() => setServiceModal(null)}>
      <div className={`max-w-4xl w-full rounded-2xl p-6 relative animate-scale-in ${isDark ? 'bg-slate-900' : 'bg-white'}`} onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={() => setServiceModal(null)}
          className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 transform hover:scale-110 hover:rotate-90 cursor-pointer ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
        >
          <FaTimes size={24} />
        </button>
        
        <div className="text-center mb-5">
          <div className="text-5xl mb-2">{services[serviceModal].image}</div>
          <h3 className={`text-3xl font-bold mb-1 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>
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

        <div className="grid md:grid-cols-12 gap-8">
          <div className="space-y-6 md:col-span-7">
            {/* Incluye en chips horizontales */}
            {services[serviceModal].includes && services[serviceModal].includes!.length > 0 && (
              <div>
                <h4 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Incluye</h4>
                <div className="flex flex-wrap gap-2">
                  {services[serviceModal].includes!.map((inc) => (
                    <span key={inc} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm ${isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-gray-100 text-gray-700 border border-gray-200'} transition-all hover:scale-[1.02]`}>
                      <FaCheckCircle className={`${isDark ? 'text-sky-400' : 'text-blue-600'}`} />
                      <span className="leading-tight">{inc}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tecnologías / Habilidades */}
            <div>
              <h4 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Tecnologías</h4>
              <div className="flex flex-wrap gap-2">
                {services[serviceModal].skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-sm ${isDark ? 'bg-slate-800 text-slate-300 border border-slate-700' : 'bg-gray-100 text-gray-700 border border-gray-200'} transition-all hover:scale-[1.03]`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-5 md:col-span-5">
            {/* Proceso de trabajo como timeline horizontal */}
            {services[serviceModal].process && services[serviceModal].process!.length > 0 && (
              <div>
                <h4 className={`font-bold text-lg mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>Proceso de trabajo</h4>
                <div className="grid grid-cols-3 gap-5">
                  {services[serviceModal].process!.map((step, idx) => (
                    <div key={`${step}-${idx}`} className="flex flex-col items-center text-center">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold ${isDark ? 'bg-sky-900/40 text-sky-300 border border-sky-700/40' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>{idx + 1}</span>
                      <span className={`mt-2 text-sm leading-tight ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{step}</span>
                    </div>
                  ))}
                </div>

                {/* Barra de progreso eliminada por no utilizarse */}
              </div>
            )}

            {/* CTA */}
            <div className="pt-2 flex justify-start md:justify-center">
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
      </div>
    </div>
  )
}