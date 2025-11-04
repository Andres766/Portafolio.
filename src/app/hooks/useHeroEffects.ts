import { useEffect, useState } from 'react'

export function useHeroEffects(
  iconsRef: React.RefObject<HTMLDivElement | null> | React.MutableRefObject<HTMLDivElement | null>
) {
  const [photoTilt, setPhotoTilt] = useState<{ rx: number; ry: number; scale: number }>({ rx: 0, ry: 0, scale: 1 })
  const [glarePos, setGlarePos] = useState<{ x: number; y: number }>({ x: 50, y: 50 })
  const [showCursor, setShowCursor] = useState(true)

  // Cursor parallax for floating background icons
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!iconsRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const dx = (x / rect.width - 0.5) * 60
    const dy = (y / rect.height - 0.5) * 60
    iconsRef.current.style.setProperty('--mouseX', `${dx}px`)
    iconsRef.current.style.setProperty('--mouseY', `${dy}px`)
  }

  const handleHeroMouseLeave = () => {
    if (!iconsRef.current) return
    iconsRef.current.style.setProperty('--mouseX', `0px`)
    iconsRef.current.style.setProperty('--mouseY', `0px`)
  }

  const handlePhotoMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 100
    const py = (y / rect.height) * 100
    const max = 12
    const ry = ((x - rect.width / 2) / rect.width) * (max * 2)
    const rx = -((y - rect.height / 2) / rect.height) * (max * 2)
    setPhotoTilt({ rx, ry, scale: 1.06 })
    setGlarePos({ x: px, y: py })
  }

  const handlePhotoMouseLeave = () => {
    setPhotoTilt({ rx: 0, ry: 0, scale: 1 })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  // Icon parallax with scroll (smoothed)
  useEffect(() => {
    let rafId = 0
    let current = 0
    let target = 0

    const update = () => {
      current += (target - current) * 0.12
      if (iconsRef.current) {
        iconsRef.current.style.setProperty('--scrollY', `${current}px`)
      }
      rafId = requestAnimationFrame(update)
    }

    const onScroll = () => {
      target = window.scrollY
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [iconsRef])

  return {
    photoTilt,
    glarePos,
    showCursor,
    handleHeroMouseMove,
    handleHeroMouseLeave,
    handlePhotoMouseMove,
    handlePhotoMouseLeave,
  }
}