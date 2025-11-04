"use client"

import React from 'react'

type Achievement = {
  title: string
  date: string
  detailEs: string
  detailEn: string
  icon: string
}

export default function Logros({
  isDark,
  t,
  lang,
  achievements,
}: {
  isDark: boolean
  t: (key: string) => string
  lang: 'es' | 'en'
  achievements: Achievement[]
}) {
  return (
    <section id="achievements" className="flex items-center px-4 py-28">
      <div className="max-w-6xl mx-auto w-full">
        <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('achievementsIntro')}</p>
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('achievementsTitle')}</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item, i) => (
            <div
              key={i}
              className={`backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/40' : 'bg-white/80 hover:bg-white shadow-lg hover:shadow-xl border border-gray-200/50'}`}
              style={{ animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{item.date}</p>
                </div>
              </div>
              <p className={`${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {lang === 'es' ? item.detailEs : item.detailEn}
              </p>

              <div className={`mt-4 h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                <div className={`h-full bg-gradient-to-r ${isDark ? 'from-sky-400 to-blue-500' : 'from-blue-500 to-purple-600'} transform scale-x-0 hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}