"use client"

import React, { useMemo, useState } from 'react'

type Achievement = {
  title: string
  date: string
  detailEs: string
  detailEn: string
  icon: string
  url?: string
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
  const tagFor = (title: string) => {
    const low = title.toLowerCase()
    if (low.includes('certific')) return 'Certificación'
    if (low.includes('hackathon') || low.includes('premio') || low.includes('primer lugar')) return 'Premio'
    if (low.includes('oss') || low.includes('proyecto')) return 'Proyecto'
    if (low.includes('commit') || low.includes('+')) return 'Métrica'
    return 'Reconocimiento'
  }

  const chipClass = (dark: boolean) => (
    dark ? 'bg-slate-800/60 text-slate-200 border border-slate-700' : 'bg-gray-100 text-gray-700 border border-gray-200'
  )

  const [filter, setFilter] = useState<'Todos' | 'Certificación' | 'Premio' | 'Proyecto' | 'Métrica' | 'Reconocimiento'>('Todos')
  const [sortDesc, setSortDesc] = useState(true)

  const counts = useMemo(() => {
    const c = { Certificación: 0, Premio: 0, Proyecto: 0, Métrica: 0, Reconocimiento: 0 }
    achievements.forEach(a => { c[tagFor(a.title) as keyof typeof c]++ })
    return c
  }, [achievements])

  const filtered = useMemo(() => {
    const items = achievements.filter(a => filter === 'Todos' || tagFor(a.title) === filter)
    return items.sort((a, b) => sortDesc ? (b.date.localeCompare(a.date)) : (a.date.localeCompare(b.date)))
  }, [achievements, filter, sortDesc])
  return (
    <section id="achievements" className="flex items-center px-4 py-20">
      <div className="max-w-6xl mx-auto w-full">
        <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('achievementsIntro')}</p>
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-10 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('achievementsTitle')}</h2>

        {/* Metrics summary */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
          <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-800/50 text-slate-200' : 'bg-gray-100 text-gray-800'}`}>
            <p className="text-xs">Certificaciones</p>
            <p className="text-lg font-semibold">{counts['Certificación']}</p>
          </div>
          <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-800/50 text-slate-200' : 'bg-gray-100 text-gray-800'}`}>
            <p className="text-xs">Premios</p>
            <p className="text-lg font-semibold">{counts['Premio']}</p>
          </div>
          <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-800/50 text-slate-200' : 'bg-gray-100 text-gray-800'}`}>
            <p className="text-xs">Proyectos</p>
            <p className="text-lg font-semibold">{counts['Proyecto']}</p>
          </div>
          <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-800/50 text-slate-200' : 'bg-gray-100 text-gray-800'}`}>
            <p className="text-xs">Métricas</p>
            <p className="text-lg font-semibold">{counts['Métrica']}</p>
          </div>
          <div className={`p-3 rounded-lg text-center ${isDark ? 'bg-slate-800/50 text-slate-200' : 'bg-gray-100 text-gray-800'}`}>
            <p className="text-xs">Otros</p>
            <p className="text-lg font-semibold">{counts['Reconocimiento']}</p>
          </div>
        </div>

        {/* Filters + sort */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {(['Todos','Certificación','Premio','Proyecto','Métrica','Reconocimiento'] as const).map(label => (
            <button
              key={label}
              onClick={() => setFilter(label)}
              className={`px-3 py-1 rounded-full text-sm transition ${filter === label ? (isDark ? 'bg-sky-700 text-white' : 'bg-blue-600 text-white') : chipClass(isDark)} cursor-pointer`}
            >
              {label}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <span className={`${isDark ? 'text-slate-400' : 'text-gray-600'} text-sm`}>Orden:</span>
            <button
              onClick={() => setSortDesc(s => !s)}
              className={`px-3 py-1 rounded-full text-sm transition ${isDark ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'} cursor-pointer`}
            >
              {sortDesc ? 'Más recientes' : 'Más antiguos'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => (
            <div
              key={i}
              className={`group relative backdrop-blur-sm rounded-2xl p-5 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/40' : 'bg-white/80 hover:bg-white shadow-lg hover:shadow-xl border border-gray-200/50'}`}
              style={{ animationDelay: `${0.2 + i * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <span className={`absolute top-4 right-4 px-2 py-1 rounded-full text-xs font-semibold ${isDark ? 'bg-sky-900/40 text-sky-300 border border-sky-700/40' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>{item.date}</span>

              <div className="flex items-center gap-4 mb-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className={`font-semibold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                  <div className="mt-1 inline-flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] ${chipClass(isDark)}`}>{tagFor(item.title)}</span>
                  </div>
                </div>
              </div>
              <p className={`text-sm leading-tight ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {lang === 'es' ? item.detailEs : item.detailEn}
              </p>

              {item.url && item.url !== '#' && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition transform hover:scale-105 ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" /><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" /></svg>
                  Ver más
                </a>
              )}

              <div className={`mt-3 h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-gray-200'}`}>
                <div className={`h-full bg-gradient-to-r ${isDark ? 'from-sky-400 to-blue-500' : 'from-blue-500 to-purple-600'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}></div>
              </div>

              <div className={`absolute inset-0 rounded-2xl border transition-all duration-300 ${isDark ? 'border-sky-400/0 group-hover:border-sky-400/30' : 'border-blue-500/0 group-hover:border-blue-500/30'}`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}