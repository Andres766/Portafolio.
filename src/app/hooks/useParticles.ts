import { useEffect, useState } from 'react'

export type Particle = { id: number; x: number; y: number; size: number; opacity: number; speed: number }

export function useParticles(count: number = 30) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 2 + 1,
    }))
    setParticles(newParticles)
  }, [count])

  return particles
}