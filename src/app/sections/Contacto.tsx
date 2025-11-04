"use client"
import React from 'react'
import { FaEnvelope, FaWhatsapp, FaGithub, FaLinkedin } from 'react-icons/fa'

type Feedback = { type: 'success' | 'error' | null; message: string }

export default function Contacto({
  isDark,
  t,
  lang,
  form,
  setForm,
  sending,
  feedback,
  onSubmit,
}: {
  isDark: boolean
  t: (key: string) => string
  lang: 'es' | 'en'
  form: { name: string; email: string; message: string }
  setForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; message: string }>>
  sending: boolean
  feedback: Feedback
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void
}) {
  return (
    <section id="contact" className="flex items-center px-4 py-28 pb-32">
      <div className="max-w-6xl mx-auto w-full">
        <p className={`text-center mb-2 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('getInTouch')}</p>
        <h2 className={`text-4xl md:text-5xl font-bold text-center mb-16 ${isDark ? 'text-sky-300' : 'text-blue-600'}`}>{t('contactTitle')}</h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">{t('talkToMe')}</h3>
            <a 
              href={`mailto:Andsebas1128@hotmail.com?subject=${encodeURIComponent(t('mailtoSubject'))}&body=${encodeURIComponent(t('mailtoBody'))}`} 
              className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
            >
              <FaEnvelope className={`${isDark ? 'text-white' : 'text-gray-800'}`} size={32} />
              <div>
                <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('emailLabel')}</p>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Andsebas1128@hotmail.com</p>
              </div>
            </a>
            <a 
              href={`https://wa.me/573174570399?text=${encodeURIComponent(t('whatsappText'))}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition duration-200 ease-in-out transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
            >
              <FaWhatsapp className="text-green-500" size={32} />
              <div>
                <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{t('whatsappLabel')}</p>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('sendMeMessage')}</p>
              </div>
            </a>
            <a 
              href="https://github.com/Andres766" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
            >
              <FaGithub className={`${isDark ? 'text-white' : 'text-gray-800'}`} size={32} />
              <div>
                <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>GitHub</p>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('visitProfile')}</p>
              </div>
            </a>
            <a 
              href="https://www.linkedin.com/in/andres-cordoba-209883183" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center gap-3 backdrop-blur-sm rounded-xl p-6 transition-all duration-300 transform hover:scale-105 ${isDark ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-white shadow-lg hover:shadow-xl'}`}
            >
              <FaLinkedin className="text-blue-600" size={32} />
              <div>
                <p className={`mb-1 ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>LinkedIn</p>
                <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('connectWithMe')}</p>
              </div>
            </a>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-2xl font-bold">{t('writeWhatYouNeed')}</h3>
            <form id="form" className="space-y-4" onSubmit={onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder={t('yourName')}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 focus:outline-none transition-colors ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder={t('yourEmail')}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 focus:outline-none transition-colors ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
              />
              <textarea
                name="message"
                id="message"
                placeholder={t('yourMessage')}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                className={`w-full backdrop-blur-sm border rounded-lg px-4 py-3 min-h-[140px] focus:outline-none transition-colors ${isDark ? 'bg-slate-800/30 border-slate-700 text-white placeholder-slate-500 focus:border-sky-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-600'}`}
              />
              <button 
                type="submit" 
                id="button" 
                disabled={sending} 
                className={`group relative w-full px-6 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ripple overflow-hidden cursor-pointer ${isDark ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 hover:from-sky-500 hover:to-blue-600 shadow-lg shadow-sky-400/25 hover:shadow-sky-400/40' : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40'} ${sending ? 'opacity-70 cursor-not-allowed scale-95' : 'hover:shadow-2xl'}`} 
              > 
                <span className={`flex items-center justify-center gap-2 transition-all duration-300 ${sending ? 'opacity-0' : 'opacity-100'}`}> 
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"> 
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /> 
                  </svg> 
                  {t('sendMessage')} 
                </span> 
                {sending && ( 
                  <div className="absolute inset-0 flex items-center justify-center"> 
                    <div className="flex items-center gap-2"> 
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> 
                      <span>{t('sending')}</span> 
                    </div> 
                  </div> 
                )} 
                <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-sky-300 to-blue-400' : 'from-blue-500 to-purple-500'} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div> 
              </button>
              {feedback.type && (
                feedback.type === 'success' ? (
                  <p className="text-sm mt-2 text-green-500" role="alert" aria-live="polite">
                    {feedback.message}
                  </p>
                ) : (
                  <p className="text-sm mt-2 !text-red-500" role="alert" aria-live="polite">
                    {feedback.message}
                  </p>
                )
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}