"use client"

import React from 'react'

export default function Testimonios({
  isDark,
  t,
}: {
  isDark: boolean
  t: (key: string) => string
}) {
  return (
    <section id="testimonials" className="flex items-center px-4 py-28">
      <div className="max-w-6xl mx-auto w-full">
        <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('whatTheySayAboutMe')}</p>
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('testimonials')}</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                  👤
                </div>
                <div>
                  <h4 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('client')} {i}</h4>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('companyXyz')}</p>
                </div>
              </div>
              <p className={`${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('testimonialText')}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}