"use client"

import React from 'react'

type Props = {
  isDark: boolean
  lang: 'es' | 'en'
  ariaLabel: string
  onToggle: () => void
}

export default function LanguageToggle({ isDark, lang, ariaLabel, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-8 left-8 z-50 px-3 py-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-110 cursor-pointer ${isDark ? 'text-slate-200 hover:text-white hover:bg-slate-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'}`}
      aria-label={ariaLabel}
    >
      {lang === 'es' ? 'EN' : 'ES'}
    </button>
  )
}