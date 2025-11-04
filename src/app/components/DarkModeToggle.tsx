"use client"

import React from 'react'

type Props = {
  isDark: boolean
  onToggle: () => void
}

export default function DarkModeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-8 right-8 z-50 p-2 rounded-lg transition-all duration-150 ease-out transform hover:scale-110 cursor-pointer ${isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'}`}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.64 13A9 9 0 1111 2.36a7 7 0 1010.64 10.64z" />
        </svg>
      ) : (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 16a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zM4.93 4.93a1 1 0 011.41 0l1.41 1.41a1 1 0 11-1.41 1.41L4.93 6.34a1 1 0 010-1.41zm11.32 11.32a1 1 0 011.41 0l1.41 1.41a1 1 0 11-1.41 1.41l-1.41-1.41a1 1 0 010-1.41zM2 12a1 1 0 011-1h2a1 1 0 110 2H3a1 1 0 01-1-1zm16 0a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM6.34 17.66a1 1 0 011.41-1.41l1.41 1.41a1 1 0 01-1.41 1.41l-1.41-1.41zm11.32-11.32a1 1 0 011.41-1.41l1.41 1.41a1 1 0 11-1.41 1.41l-1.41-1.41z" />
        </svg>
      )}
    </button>
  )
}