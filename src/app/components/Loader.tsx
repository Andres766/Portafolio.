"use client"

import React from 'react'

type Props = {
  loaderTheme: 'dark' | 'light'
  t: (k: string) => string
}

export default function Loader({ loaderTheme, t }: Props) {
  const isLoaderDark = loaderTheme === 'dark'
  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br ${isLoaderDark ? 'from-slate-950 via-slate-900 to-slate-950' : 'from-white via-gray-100 to-white'}`}>
      <div className="relative">
        <div className={`${isLoaderDark ? 'text-sky-400' : 'text-blue-600'} text-8xl md:text-9xl font-mono font-bold animate-pulse`}>
          {'</>'}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`absolute w-48 h-48 border-2 ${isLoaderDark ? 'border-sky-400/30' : 'border-blue-600/30'} rounded-full animate-spin-slow`} style={{ animationDuration: '3s' }}>
            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 ${isLoaderDark ? 'bg-sky-400' : 'bg-blue-600'} rounded-full`}></div>
          </div>
          <div className={`absolute w-64 h-64 border-2 ${isLoaderDark ? 'border-sky-500/20' : 'border-blue-500/20'} rounded-full animate-spin-slow`} style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
            <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 ${isLoaderDark ? 'bg-sky-500' : 'bg-blue-500'} rounded-full`}></div>
          </div>
        </div>
        <div className={`absolute -left-32 top-0 ${isLoaderDark ? 'text-sky-400/20' : 'text-blue-600/20'} text-xs font-mono animate-pulse`}>
          01001000<br/>01100101<br/>01101100<br/>01101100<br/>01101111
        </div>
        <div className={`absolute -right-32 top-0 ${isLoaderDark ? 'text-sky-400/20' : 'text-blue-600/20'} text-xs font-mono animate-pulse`} style={{ animationDelay: '0.5s' }}>
          01010111<br/>01101111<br/>01110010<br/>01101100<br/>01100100
        </div>
      </div>
      <h1 className="mt-16 text-4xl md:text-5xl font-bold animate-fade-in shine-on-hover">
        {"Andres Cordoba".split("").map((ch, i) => (
          ch === " " ? (
            <span key={i} className="inline-block">&nbsp;</span>
          ) : (
            <span
              key={i}
              className={`inline-block bg-gradient-to-r ${isLoaderDark ? 'from-sky-400 via-blue-500 to-purple-600' : 'from-blue-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent animated-gradient-text`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {ch}
            </span>
          )
        ))}
      </h1>
      <div className={`mt-8 w-64 h-1 ${isLoaderDark ? 'bg-slate-800' : 'bg-gray-300'} rounded-full overflow-hidden`}>
        <div className={`h-full bg-gradient-to-r ${isLoaderDark ? 'from-sky-400 to-sky-600' : 'from-blue-600 to-blue-500'} animate-loading-bar`}></div>
      </div>
      <p className={`mt-4 ${isLoaderDark ? 'text-slate-400' : 'text-gray-500'} animate-pulse`}>{t('loadingPortfolio')}</p>
    </div>
  )
}