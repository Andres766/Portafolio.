"use client"

import React from 'react'
import { FaReact, FaNodeJs, FaJs, FaAws, FaPython, FaHtml5, FaCss3Alt, FaGitAlt, FaDatabase, FaFire, FaTerminal, FaBootstrap } from 'react-icons/fa'
import { SiTypescript } from 'react-icons/si'

type Props = {
  isDark: boolean
  iconsRef: React.RefObject<HTMLDivElement | null>
}

export default function FloatingIcons({ isDark, iconsRef }: Props) {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className={`animated-bg ${isDark ? 'animated-bg-dark' : 'animated-bg-light'}`}></div>
      <div className={`floating-icons ${isDark ? 'floating-dark' : 'floating-light'}`} ref={iconsRef}>
        <div className="floating-wrap speed-003" style={{ top: '2%', left: '8%' }}>
          <div className="floating-icon dur-20" style={{ animationDelay: '0.3s' }}><FaReact size={20} /></div>
        </div>
        <div className="floating-wrap speed-004" style={{ top: '4%', left: '28%' }}>
          <div className="floating-icon dur-18" style={{ animationDelay: '0.8s' }}><FaNodeJs size={20} /></div>
        </div>
        <div className="floating-wrap speed-003" style={{ top: '7%', left: '52%' }}>
          <div className="floating-icon dur-19" style={{ animationDelay: '0.5s' }}><FaJs size={18} /></div>
        </div>
        <div className="floating-wrap speed-004" style={{ top: '9%', left: '76%' }}>
          <div className="floating-icon dur-20" style={{ animationDelay: '1.1s' }}><SiTypescript size={18} /></div>
        </div>
        <div className="floating-wrap speed-003" style={{ top: '12%', left: '16%' }}>
          <div className="floating-icon dur-17" style={{ animationDelay: '0.4s' }}><FaAws size={18} /></div>
        </div>
        <div className="floating-wrap speed-004" style={{ top: '14%', left: '88%' }}>
          <div className="floating-icon dur-16" style={{ animationDelay: '0.9s' }}><FaPython size={18} /></div>
        </div>
        <div className="floating-wrap speed-003" style={{ top: '17%', left: '34%' }}>
          <div className="floating-icon dur-20" style={{ animationDelay: '0.2s' }}><FaHtml5 size={18} /></div>
        </div>
        <div className="floating-wrap speed-004" style={{ top: '19%', left: '67%' }}>
          <div className="floating-icon dur-18" style={{ animationDelay: '0.7s' }}><FaCss3Alt size={18} /></div>
        </div>
        <div className="floating-wrap speed-003" style={{ top: '22%', left: '90%' }}>
          <div className="floating-icon dur-17" style={{ animationDelay: '1.3s' }}><FaGitAlt size={18} /></div>
        </div>
        <div className="floating-wrap speed-006" style={{ top: '15%', left: '12%' }}>
          <div className="floating-icon dur-16" style={{ animationDelay: '0s' }}><FaReact size={28} /></div>
        </div>
        <div className="floating-wrap speed-004" style={{ top: '72%', left: '20%' }}>
          <div className="floating-icon dur-14" style={{ animationDelay: '1.2s' }}><FaNodeJs size={28} /></div>
        </div>
        <div className="floating-wrap speed-008" style={{ top: '32%', left: '82%' }}>
          <div className="floating-icon dur-18" style={{ animationDelay: '0.6s' }}><FaJs size={26} /></div>
        </div>
        <div className="floating-wrap speed-005" style={{ top: '50%', left: '50%' }}>
          <div className="floating-icon dur-20" style={{ animationDelay: '1.8s' }}><SiTypescript size={26} /></div>
        </div>
        <div className="floating-wrap speed-007" style={{ top: '22%', left: '60%' }}>
          <div className="floating-icon dur-15" style={{ animationDelay: '0.9s' }}><FaAws size={24} /></div>
        </div>
        <div className="floating-wrap speed-003" style={{ top: '84%', left: '76%' }}>
          <div className="floating-icon dur-17" style={{ animationDelay: '2.4s' }}><FaPython size={26} /></div>
        </div>
        <div className="floating-wrap speed-005" style={{ top: '8%', left: '40%' }}>
          <div className="floating-icon dur-15" style={{ animationDelay: '0.3s' }}><FaHtml5 size={26} /></div>
        </div>
        <div className="floating-wrap speed-006" style={{ top: '28%', left: '10%' }}>
          <div className="floating-icon dur-16" style={{ animationDelay: '1.0s' }}><FaCss3Alt size={26} /></div>
        </div>
        <div className="floating-wrap speed-004" style={{ top: '65%', left: '85%' }}>
          <div className="floating-icon dur-14" style={{ animationDelay: '1.6s' }}><FaGitAlt size={24} /></div>
        </div>
        <div className="floating-wrap speed-007" style={{ top: '40%', left: '30%' }}>
          <div className="floating-icon dur-18" style={{ animationDelay: '0.8s' }}><FaDatabase size={24} /></div>
        </div>
        <div className="floating-wrap speed-003" style={{ top: '75%', left: '60%' }}>
          <div className="floating-icon dur-17" style={{ animationDelay: '2.2s' }}><FaFire size={24} /></div>
        </div>
        <div className="floating-wrap speed-008" style={{ top: '18%', left: '75%' }}>
          <div className="floating-icon dur-20" style={{ animationDelay: '0.5s' }}><FaTerminal size={24} /></div>
        </div>
        <div className="floating-wrap speed-004" style={{ top: '54%', left: '12%' }}>
          <div className="floating-icon dur-15" style={{ animationDelay: '1.4s' }}><FaBootstrap size={24} /></div>
        </div>
        <div className={`absolute inset-0 bg-grid-pattern ${isDark ? 'opacity-5' : 'opacity-10 animate-grid-light'}`}></div>
      </div>
    </div>
  )
}