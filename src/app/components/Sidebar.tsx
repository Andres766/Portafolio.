"use client"

import React from 'react'

type Props = {
  isDark: boolean
}

export default function Sidebar({ isDark }: Props) {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-4 z-40 flex flex-col gap-4">
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`transform transition-all duration-300 hover:scale-110 ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3a2 2 0 012-2h12a2 2 0 012 2v18a2 2 0 01-2 2H6a2 2 0 01-2-2V3zm4 6H6v12h2V9zm-1-3a1 1 0 100 2 1 1 0 000-2zm4 3h-2v12h2v-6.5a2.5 2.5 0 115 0V21h2v-6.5a4.5 4.5 0 00-7-3.8V9z"/></svg>
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={`transform transition-all duration-300 hover:scale-110 ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}>
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7 2 3 6 3 11c0 4 3 7 6 8-.1-.4-.2-1-.2-1.6v-2.2c-2.5.6-3.1-1.1-3.1-1.1-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 .1 1.6-.8 1.6-.8.4-1 .8-1.2 1.2-1.3-2-.2-4.2-1-4.2-4.5 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.4 0 0 .9-.3 2.8 1.1.8-.2 1.6-.3 2.4-.3s1.6.1 2.4.3c1.9-1.4 2.8-1.1 2.8-1.1.5 1.2.2 2.2.1 2.4.7.7 1.1 1.6 1.1 2.6 0 3.5-2.2 4.3-4.3 4.5.5.4.9 1.2.9 2.4v3.5c0 .6-.1 1.2-.2 1.6 3-1.1 6-4 6-8 0-5-4-9-9-9z"/></svg>
      </a>
    </div>
  )
}