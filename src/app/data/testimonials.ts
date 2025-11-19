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
    name: 'Julian Moreno',
    company: 'Empresa XYZ',
    role: 'Estudiante de Ingeniería de Software',
    quote: {
      es: 'Estudiamos y desarrollamos varios proyectos juntos, desde pequeñas pruebas hasta entregas completas. Siempre aporta ideas claras, organiza el trabajo del equipo y mantiene la calidad del código en cada fase. Es confiable, comprometido y orientado a resultados.',
      en: 'We studied and built multiple projects together, from small proofs to complete deliveries. He consistently brings clear ideas, organizes team work, and keeps code quality at every stage. Reliable, committed, and truly results‑oriented.',
    },
    avatar: '/julian.jpg',
    rating: 5,
    url: '#'
  },
  {
    name: 'Luis Cajigas',
    company: 'Empresa XYZ',
    role: 'Estudiante de Ingeniería de Software',
    quote: {
      es: 'Hemos estudiado y trabajado en equipo en varios proyectos académicos y personales. Luis se destaca por su compromiso, buena comunicación y capacidad para resolver problemas bajo presión. Sus aportes mejoran el rendimiento y la experiencia de usuario.',
      en: 'We have studied and worked together across academic and personal projects. Luis stands out for commitment, clear communication, and problem‑solving under pressure. His contributions improve performance and user experience.',
    },
    avatar: '/luis.jpg',
    rating: 5,
    url: '#'
  },
  {
    name: 'Ubeimar Yepes',
    company: 'Empresa XYZ',
    role: 'Estudiante de Ingeniería de Software',
    quote: {
      es: 'Compartimos estudios y ejecutamos proyectos donde Andres aportó soluciones claras y código sólido. Domina buenas prácticas, documenta lo necesario y facilita la integración con el equipo. Su enfoque técnico y disciplina elevan cualquier proyecto.',
      en: 'We have studied together and shipped projects where Andres delivered clear solutions and solid code. He follows best practices, documents what matters, and makes team integration smooth. Technical focus and discipline raise any project.',
    },
    avatar: '/uber.jpg',
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