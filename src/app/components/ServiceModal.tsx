"use client"

import React from 'react'
import { FaTimes } from 'react-icons/fa'

type ServiceKey = 'frontend' | 'backend'

type ServicesMap = {
  [K in ServiceKey]: {
    titleKey: string
    descriptionKey: string
    skills: string[]
    image: string
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
  if (!serviceModal) return null

  return (
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
  )
}