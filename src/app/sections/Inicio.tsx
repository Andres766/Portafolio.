"use client"

import React from 'react'
import Image from 'next/image'

type NavItem = { id: string; label: string; icon: React.ReactNode }
type CSSVars = React.CSSProperties & { ['--mx']?: string; ['--my']?: string; ['--spd']?: string }

type Props = {
  isDark: boolean
  t: (k: string) => string
  handleHeroMouseMove: (e: React.MouseEvent<HTMLElement>) => void
  handleHeroMouseLeave: () => void
  displayedText: string
  showCursor: boolean
  funnyText: string
  particles: Array<{ id: number; x: number; y: number; size: number; opacity: number; speed: number }>
  photoRef: React.RefObject<HTMLDivElement | null>
  photoTilt: { rx: number; ry: number; scale: number }
  glarePos: { x: number; y: number }
  handlePhotoMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  handlePhotoMouseLeave: () => void
  onDownloadCv: () => void
  scrollToSection: (id: string) => void
  navItems: NavItem[]
  navBottom: number
  scrolled: boolean
  hoveredNav: string | null
  setHoveredNav: (id: string | null) => void
  activeSection: string | null
}

export default function Inicio({
  isDark,
  t,
  handleHeroMouseMove,
  handleHeroMouseLeave,
  displayedText,
  showCursor,
  funnyText,
  particles,
  photoRef,
  photoTilt,
  glarePos,
  handlePhotoMouseMove,
  handlePhotoMouseLeave,
  onDownloadCv,
  scrollToSection,
  navItems,
  navBottom,
  scrolled,
  hoveredNav,
  setHoveredNav,
  activeSection,
}: Props) {
  return (
    <section id="home" className="min-h-screen flex items-center px-4 py-28 relative overflow-hidden" onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full animate-pulse ${isDark ? 'bg-sky-400' : 'bg-blue-500'}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${particle.speed + 2}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-slate-900/30 via-transparent to-slate-900/30' : 'bg-gradient-to-br from-white/30 via-transparent to-white/30'}`} />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center space-y-6">
          <p className={`${isDark ? 'text-slate-400' : 'text-gray-600'} text-base`}>{t('greeting')}</p>
          <h1 className={`text-5xl md:text-7xl font-bold shine-on-hover`}>
            {"Andres Cordoba".split("").map((ch, i) => (
              ch === " " ? (
                <span key={i} className="inline-block">&nbsp;</span>
              ) : (
                <span
                  key={i}
                  className={`inline-block bg-gradient-to-r ${isDark ? 'from-sky-400 via-blue-500 to-purple-600' : 'from-blue-600 via-purple-600 to-pink-600'} bg-clip-text text-transparent animated-gradient-text`}
                  style={{ animationDelay: `${i * 0.12}s` }}
                >
                  {ch}
                </span>
              )
            ))}
          </h1>
          <div className="flex items-center justify-center">
            <div className={`inline-flex items-center px-4 py-1 rounded-full backdrop-blur-sm ${isDark ? 'bg-slate-800/20 border border-slate-700 text-slate-200' : 'bg-white/30 border border-gray-200 text-gray-800'}`}>
              <span className="font-sans text-[1.15rem] md:text-[1.35rem] font-semibold tracking-wide">
                {funnyText}
                <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
              </span>
            </div>
          </div>
          <div className={`text-xl md:text-2xl h-8 flex items-center justify-center ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
            <span className="font-mono">
              {displayedText}
              <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mt-8 opacity-0 animate-fade-in-up" style={{animationDelay: '0.8s', animationFillMode: 'forwards'}}>
          <button
            onClick={onDownloadCv}
            className={`group relative px-8 py-3 border-2 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer ${isDark ? 'border-sky-400 text-sky-400 hover:bg-sky-400 hover:text-slate-950' : 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'}`}
          >
            <span className="relative z-10">{t('downloadCv')}</span>
            <div className={`absolute inset-0 ${isDark ? 'bg-sky-400' : 'bg-blue-600'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className={`group relative px-8 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            <span className="relative z-10">{t('aboutMe')}</span>
            <div className={`absolute inset-0 ${isDark ? 'bg-sky-500' : 'bg-blue-700'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right`}></div>
          </button>
        </div>

        {/* Profile Image with 3D Tilt & Glare */}
        <div className="mt-12 opacity-0 animate-fade-in-up" style={{animationDelay: '1s', animationFillMode: 'forwards'}}>
          <div
            ref={photoRef}
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={handlePhotoMouseLeave}
            className={`w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 relative tilt-3d transform-gpu shadow-xl ${isDark ? 'border-slate-700' : 'border-gray-300'}`}
            style={{
              transform: `perspective(900px) rotateX(${photoTilt.rx}deg) rotateY(${photoTilt.ry}deg) scale(${photoTilt.scale})`,
              transition: 'transform 180ms ease-out'
            }}
          >
            <div className={`absolute inset-0 rounded-full ${isDark ? 'bg-gradient-to-br from-sky-400/20 to-purple-600/20' : 'bg-gradient-to-br from-blue-600/20 to-pink-600/20'} animate-pulse`}></div>
            {/* Sparkles */}
            <div className={`absolute sparkle ${isDark ? 'bg-sky-400' : 'bg-blue-600'}`} style={{ top: '8%', left: '25%', '--spd': '2.4s', pointerEvents: 'none' } as CSSVars}></div>
            <div className={`absolute sparkle ${isDark ? 'bg-purple-500' : 'bg-pink-600'}`} style={{ top: '22%', left: '78%', '--spd': '3s', pointerEvents: 'none' } as CSSVars}></div>
            <div className={`absolute sparkle ${isDark ? 'bg-cyan-400' : 'bg-indigo-500'}`} style={{ top: '70%', left: '18%', '--spd': '2.2s', pointerEvents: 'none' } as CSSVars}></div>
            <div className={`absolute sparkle ${isDark ? 'bg-sky-300' : 'bg-blue-500'}`} style={{ top: '82%', left: '62%', '--spd': '2.8s', pointerEvents: 'none' } as CSSVars}></div>
            <div className={`absolute sparkle ${isDark ? 'bg-violet-500' : 'bg-purple-600'}`} style={{ top: '40%', left: '6%', '--spd': '3.2s', pointerEvents: 'none' } as CSSVars}></div>
            <div className={`absolute sparkle ${isDark ? 'bg-emerald-400' : 'bg-green-500'}`} style={{ top: '14%', left: '50%', '--spd': '2.6s', pointerEvents: 'none' } as CSSVars}></div>
            <div
              className="absolute inset-0 rounded-full glare"
              style={{ '--mx': `${glarePos.x}%`, '--my': `${glarePos.y}%` } as CSSVars}
            />
            <Image 
              src="/Andres.jpg" 
              alt="Andres Cordoba" 
              width={320} 
              height={320} 
              className="w-full h-full object-cover relative z-10"
              style={{ transform: 'translateZ(30px)' }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation with Tooltips */}
      <nav
        className={`fixed left-1/2 -translate-x-1/2 rounded-full px-5 py-2.5 flex gap-5 z-[60] glass-nav ${scrolled ? 'glass-strong' : ''} ${isDark ? 'bg-slate-800/70' : 'bg-white/70 shadow-lg'}`}
        style={{ bottom: navBottom }}
      >
        {navItems.map((item) => (
          <div key={item.id} className="relative group">
            <button 
              onClick={() => scrollToSection(item.id)}
              onMouseEnter={() => setHoveredNav(item.id)}
              onMouseLeave={() => setHoveredNav(null)}
              className={`relative p-1.5 rounded-full transition-all duration-300 transform hover:scale-125 hover:-translate-y-1 cursor-pointer ${
                activeSection === item.id 
                  ? (isDark ? 'text-sky-400 active-pill-dark' : 'text-blue-600 active-pill-light')
                  : (isDark ? 'text-slate-400 hover:text-sky-400' : 'text-gray-600 hover:text-blue-600')
              }`}
            >
              <svg className={`w-5 h-5 ${activeSection === item.id ? 'drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                {item.icon as any}
              </svg>
            </button>
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 rounded-lg text-sm whitespace-nowrap transition-all duration-300 ${
              hoveredNav === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            } ${isDark ? 'bg-slate-700 text-white' : 'bg-gray-800 text-white'}`}>
              {item.label}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${isDark ? 'border-t-slate-700' : 'border-t-gray-800'}`}></div>
            </div>
          </div>
        ))}
      </nav>
    </section>
  )
}