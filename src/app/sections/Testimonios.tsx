"use client"

import React from 'react'
import { FaStar, FaExternalLinkAlt } from 'react-icons/fa'
import { testimonials } from '../data/testimonials'

export default function Testimonios({
  isDark,
  t,
  lang,
}: {
  isDark: boolean
  t: (key: string) => string
  lang: 'es' | 'en'
}) {
  const Card = ({ item }: { item: (typeof testimonials)[number] }) => (
    <div
      className={`relative backdrop-blur-sm rounded-xl p-6 ${isDark ? 'bg-slate-800/30 border border-slate-700/40' : 'bg-white border border-gray-200/50'}`}
    >
      <div className="flex items-center gap-4 mb-3">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
          {item.avatar || '👤'}
        </div>
        <div>
          <h4 className={`font-semibold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.name}</h4>
          <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{item.role ? `${item.role} · ${item.company}` : item.company}</p>
        </div>
        {item.rating && (
          <div className="ml-auto flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} className={`${i < (item.rating || 0) ? (isDark ? 'text-sky-400' : 'text-yellow-500') : (isDark ? 'text-slate-500' : 'text-gray-300')} w-4 h-4`} />
            ))}
          </div>
        )}
      </div>
      <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{item.quote[lang]}</p>
      {item.url && item.url !== '#' && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg ${isDark ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-800'}`}
        >
          {t('visitProfile')} <FaExternalLinkAlt className="w-3 h-3" />
        </a>
      )}

      
    </div>
  )

  return (
    <section id="testimonials" className="flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('whatTheySayAboutMe')}</p>
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-10 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('testimonials')}</h2>

        {/* Carrusel horizontal en móviles, grid en escritorio */}
        <div className="md:hidden -mx-2 px-2 overflow-x-auto snap-x snap-mandatory flex gap-4">
          {testimonials.map((item, idx) => (
            <div key={idx} className="min-w-[85%] snap-center">
              <Card item={item} />
            </div>
          ))}
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <Card item={item} key={idx} />
          ))}
        </div>
      </div>
    </section>
  )
}