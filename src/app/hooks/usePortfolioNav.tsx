import { useEffect, useMemo, useState } from 'react'

export function usePortfolioNav(
  t: (key: string) => string,
  footerRef: React.MutableRefObject<HTMLElement | null>
) {
  const [navBottom, setNavBottom] = useState(32)
  const [activeSection, setActiveSection] = useState('home')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const update = () => {
      if (!footerRef.current) return
      const rect = footerRef.current.getBoundingClientRect()
      const viewportH = window.innerHeight
      const overlap = Math.max(0, viewportH - rect.top)
      const base = 32
      const margin = 16
      const maxBottom = 96
      const computed = base + (overlap > 0 ? overlap + margin : 0)
      setNavBottom(Math.min(computed, maxBottom))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [footerRef])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      const sections = ['home', 'about', 'experience', 'services', 'projects', 'achievements', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = useMemo(
    () => [
      { id: 'home', label: t('navHome'), icon: <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /> },
      { id: 'about', label: t('navAbout'), icon: <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /> },
      { id: 'experience', label: t('navExperience'), icon: <><path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" /></> },
      { id: 'services', label: t('navServices'), icon: <><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" /></> },
      { id: 'projects', label: t('navProjects'), icon: <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /> },
      { id: 'achievements', label: t('navAchievements'), icon: <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955 4.15.006c.969.001 1.371 1.24.588 1.81l-3.357 2.44 1.276 3.985c.29.905-.755 1.65-1.538 1.09L10 13.347l-3.356 2.867c-.783.56-1.828-.185-1.539-1.09l1.276-3.985-3.357-2.44c-.783-.57-.38-1.809.588-1.81l4.15-.006 1.286-3.955z" /> },
      { id: 'contact', label: t('navContact'), icon: <><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></> },
    ],
    [t]
  )

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return { navItems, navBottom, scrollToSection, activeSection, scrolled }
}