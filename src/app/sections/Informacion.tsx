"use client"
import Image from 'next/image'
import { FaLightbulb, FaTools, FaComments, FaClipboardList, FaUserFriends, FaBrain } from 'react-icons/fa'
import React from 'react'

type TechItem = { name: string; icon: React.ReactNode }

export default function Informacion({
  isDark,
  t,
  frontendTech,
  backendTech,
  scrollToSection,
  setServiceModal,
}: {
  isDark: boolean
  t: (key: string) => string
  frontendTech: TechItem[]
  backendTech: TechItem[]
  scrollToSection: (id: string) => void
  setServiceModal: React.Dispatch<React.SetStateAction<'frontend' | 'backend' | null>>
}) {
  return (
    <>
      {/* About Section */}
      <section id="about" className="flex items-center px-4 py-28">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('mySkills')}</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('myExperience')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className={`backdrop-blur-sm rounded-xl p-8 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('frontendDeveloper')}</h3>
              <div className="grid grid-cols-2 gap-4">
                {frontendTech.map((tech) => (
                  <div key={tech.name} className={`p-4 rounded-lg flex items-center gap-3 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <div className="flex-shrink-0">
                      {tech.icon}
                    </div>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={`backdrop-blur-sm rounded-xl p-8 ${isDark ? 'bg-slate-800/30' : 'bg-white shadow-lg'}`}>
              <h3 className={`text-2xl font-bold mb-6 text-center ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('backendDeveloper')}</h3>
              <div className="grid grid-cols-2 gap-4">
                {backendTech.map((tech) => (
                  <div key={tech.name} className={`p-4 rounded-lg flex items-center gap-3 transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-700' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <div className="flex-shrink-0">
                      {tech.icon}
                    </div>
                    <span className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="flex items-center px-4 py-28">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('myJourney')}</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('experienceTitle')}</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className={`w-full aspect-[4/5] rounded-lg overflow-hidden ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
                <Image 
                  src="/Andres.jpg" 
                  alt="Andres Cordoba" 
                  width={400} 
                  height={500} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaLightbulb className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillCriticalThinking')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaTools className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillProblemSolving')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaComments className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillCommunication')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaClipboardList className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillDetailOriented')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaUserFriends className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillTeamPlayer')}</p>
                </div>
                <div className={`p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 ${isDark ? 'bg-slate-800/50 hover:bg-slate-800' : 'bg-white shadow-md hover:shadow-xl'}`}>
                  <FaBrain className={`mx-auto mb-2 ${isDark ? 'text-sky-400' : 'text-blue-600'}`} size={24} />
                  <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{t('skillSelfAwareness')}</p>
                </div>
              </div>
              
              <div className={`rounded-lg p-4 ${isDark ? 'bg-slate-800/60 border border-slate-700 text-slate-200' : 'bg-white shadow-md text-gray-800'}`}>
                <h4 className={`text-sm font-semibold mb-1 ${isDark ? 'text-sky-400' : 'text-blue-600'}`}>Bio</h4>
                <p className="text-sm">Ingeniería de software 2023-2027 — Universidad Cooperativa de Colombia</p>
              </div>

              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>
                {t('bioBlurb')}
              </p>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className={`px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer ${isDark ? 'bg-sky-400 text-slate-950 hover:bg-sky-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                {t('contactMe')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="flex items-center px-4 py-28">
        <div className="max-w-6xl mx-auto w-full">
          <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('myServices')}</p>
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('whatIOffer')}</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div className={`backdrop-blur-sm rounded-xl p-8 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('frontendDeveloper')}</h3>
              <button 
                onClick={() => setServiceModal('frontend')}
                className={`flex items-center justify-center gap-2 transition-colors mx-auto cursor-pointer ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                Ver más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            
            <div className={`backdrop-blur-sm rounded-xl p-8 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}>
              <h3 className={`text-2xl font-bold mb-4 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('backendDeveloper')}</h3>
              <button 
                onClick={() => setServiceModal('backend')}
                className={`flex items-center justify-center gap-2 transition-colors mx-auto cursor-pointer ${isDark ? 'text-sky-400 hover:text-sky-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                Ver más
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}