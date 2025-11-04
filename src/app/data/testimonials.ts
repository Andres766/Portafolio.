export type Testimonial = {
  name: string
  company: string
  role?: string
  quote: { es: string; en: string }
  avatar?: string
  rating?: number
  url?: string
}

export const testimonials: Testimonial[] = [
  {
    name: 'Cliente 1',
    company: 'Empresa XYZ',
    role: 'PM',
    quote: {
      es: 'Excelente profesional, entrega trabajos de calidad y siempre cumple con los plazos establecidos. Muy recomendado.',
      en: 'Excellent professional, delivers quality work and always meets deadlines. Highly recommended.',
    },
    avatar: '👤',
    rating: 5,
    url: '#'
  },
  {
    name: 'Cliente 2',
    company: 'Empresa XYZ',
    role: 'CTO',
    quote: {
      es: 'Gran comunicación y foco en resultados. Su aporte mejoró el rendimiento del producto.',
      en: 'Great communication and results focus. Their contribution improved product performance.',
    },
    avatar: '👤',
    rating: 5,
    url: '#'
  },
  {
    name: 'Cliente 3',
    company: 'Empresa XYZ',
    role: 'Lead Dev',
    quote: {
      es: 'Código limpio y mantenible, con muy buenas prácticas. Fue clave en el éxito del proyecto.',
      en: 'Clean, maintainable code and great practices. Key to project success.',
    },
    avatar: '👤',
    rating: 4,
    url: '#'
  },
  {
    name: 'Cliente 4',
    company: 'Startup ABC',
    role: 'Founder',
    quote: {
      es: 'Excelente colaboración, entendió rápidamente las necesidades y entregó valor desde el día uno.',
      en: 'Excellent collaboration, quickly understood our needs and delivered value from day one.',
    },
    avatar: '👤',
    rating: 5,
    url: '#'
  },
  {
    name: 'Cliente 5',
    company: 'Agencia Creativa',
    role: 'Director',
    quote: {
      es: 'Proactivo y detallista, facilitó la comunicación entre diseño y desarrollo.',
      en: 'Proactive and detail-oriented, bridged communication between design and development.',
    },
    avatar: '👤',
    rating: 5,
    url: '#'
  },
  {
    name: 'Cliente 6',
    company: 'Fintech Co.',
    role: 'PO',
    quote: {
      es: 'Implementaciones rápidas y seguras, mejoró nuestros tiempos de entrega.',
      en: 'Fast and secure implementations, improved our delivery times.',
    },
    avatar: '👤',
    rating: 4,
    url: '#'
  },
]