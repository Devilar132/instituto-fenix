export interface Project {
  id: string
  title: string
  description: string
  fullDescription?: string
  image: string
  category: 'artes-cenicas' | 'educacao' | 'assistencia-social' | 'cultura'
  status: 'ativo' | 'concluido' | 'planejado'
  startDate?: string
  endDate?: string
  impact?: {
    peopleReached?: number
    events?: number
    partnerships?: number
  }
  gallery?: string[]
}

export interface Event {
  id: string
  title: string
  description: string
  image?: string
  startDate: string
  endDate?: string
  location: string
  address?: string
  category: 'workshop' | 'apresentacao' | 'evento' | 'curso'
  registrationRequired?: boolean
  registrationUrl?: string
  price?: number
  free?: boolean
}

export interface News {
  id: string
  title: string
  excerpt: string
  content: string
  image?: string
  author?: string
  publishedAt: string
  category: string
  tags?: string[]
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio?: string
  image?: string
  social?: {
    linkedin?: string
    email?: string
  }
}

export interface DonationFormData {
  amount: number
  name: string
  email: string
  phone?: string
  anonymous: boolean
  project?: string
  message?: string
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface Testimonial {
  id: string
  name: string
  role?: string
  project?: string
  content: string
  image?: string
  rating?: number
  date?: string
  approved?: boolean
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: 'doacoes' | 'voluntariado' | 'projetos' | 'geral' | 'eventos'
  order?: number
}

export interface GalleryItem {
  id: string
  title: string
  description?: string
  image: string
  thumbnail?: string
  type: 'image' | 'video'
  videoUrl?: string
  category?: string
  projectId?: string
  eventId?: string
  date?: string
}

export interface FinancialReport {
  id: string
  title: string
  year: number
  quarter?: number
  type: 'anual' | 'trimestral' | 'mensal'
  fileUrl: string
  summary?: string
  publishedAt: string
}

export interface Partner {
  id: string
  name: string
  logo: string
  website?: string
  level: 'ouro' | 'prata' | 'bronze' | 'apoiador'
  description?: string
  since?: string
}

