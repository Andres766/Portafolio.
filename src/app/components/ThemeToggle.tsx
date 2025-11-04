"use client"

import React from 'react'

type Props = {
  isDark: boolean
  onToggle: () => void
}

export default function ThemeToggle({ isDark, onToggle }: Props) {
  return (
    <button 
      onClick={onToggle}
      className={`fixed top-8 right-8 z-50 p-2 rounded-lg transition-all duration-150 ease-out transform hover:scale-110 cursor-pointer ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
    >
      {isDark ? (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M21.64 13A9 9 0 1111 2.36a7 7 0 1010.64 10.64z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <circle cx="12" cy="12" r="4" strokeWidth="2" />
          <path strokeWidth="2" strokeLinecap="round" d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M19.07 4.93l-1.41 1.41M6.34 17.66l-1.41 1.41" />
        </svg>
      )}
    </button>
  )
}