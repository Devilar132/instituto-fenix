# Exemplos Técnicos e Estrutura de Código - Site Fenix

## 🏗️ Estrutura de Projeto Recomendada

### Next.js 14 (App Router)

```
fenix-website/
├── app/
│   ├── layout.tsx              # Layout raiz
│   ├── page.tsx                 # Homepage
│   ├── sobre/
│   │   └── page.tsx
│   ├── projetos/
│   │   ├── page.tsx             # Lista de projetos
│   │   └── [slug]/
│   │       └── page.tsx         # Projeto individual
│   ├── eventos/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── noticias/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── contato/
│   │   └── page.tsx
│   └── api/
│       ├── doacoes/
│       │   └── route.ts
│       └── newsletter/
│           └── route.ts
├── components/
│   ├── ui/                      # Componentes base
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProjectsGrid.tsx
│   │   ├── EventsCalendar.tsx
│   │   └── DonationForm.tsx
│   └── shared/
│       ├── Logo.tsx
│       └── SocialLinks.tsx
├── lib/
│   ├── utils.ts
│   ├── api.ts
│   └── constants.ts
├── styles/
│   └── globals.css
├── public/
│   ├── images/
│   ├── icons/
│   └── favicon.ico
├── types/
│   └── index.ts
└── config/
    └── site.ts
```

---

## 💻 Exemplos de Código

### 1. Componente Hero Moderno

```tsx
// components/sections/Hero.tsx
'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background com overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Instituto Fenix"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
      </div>

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Transformando Vidas através da Arte e Cultura
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 text-gray-200"
        >
          O Instituto Fenix promove educação, cultura e assistência social em Recife
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button size="lg" variant="primary">
            Conheça Nossos Projetos
          </Button>
          <Button size="lg" variant="outline">
            Como Ajudar
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}
```

---

### 2. Grid de Projetos com Filtros

```tsx
// components/sections/ProjectsGrid.tsx
'use client'

import { useState } from 'react'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { projects } from '@/lib/data/projects'

export function ProjectsGrid() {
  const [filter, setFilter] = useState('all')

  const categories = ['all', 'artes-cenicas', 'educacao', 'assistencia-social']
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter)

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          Nossos Projetos
        </h2>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                filter === category
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? 'Todos' : category.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### 3. Formulário de Doação com Validação

```tsx
// components/sections/DonationForm.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

const donationSchema = z.object({
  amount: z.number().min(10, 'Valor mínimo é R$ 10,00'),
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  anonymous: z.boolean().default(false),
  project: z.string().optional(),
})

type DonationFormData = z.infer<typeof donationSchema>

export function DonationForm() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema)
  })

  const onSubmit = async (data: DonationFormData) => {
    setLoading(true)
    try {
      // Integração com gateway de pagamento
      const response = await fetch('/api/doacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      // Redirecionar para página de pagamento
      window.location.href = result.paymentUrl
    } catch (error) {
      console.error('Erro ao processar doação:', error)
    } finally {
      setLoading(false)
    }
  }

  const presetAmounts = [50, 100, 250, 500, 1000]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">
          Valor da Doação (R$)
        </label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {presetAmounts.map(amount => (
            <button
              key={amount}
              type="button"
              onClick={() => {/* set amount */}}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              R$ {amount}
            </button>
          ))}
        </div>
        <Input
          type="number"
          step="0.01"
          min="10"
          {...register('amount', { valueAsNumber: true })}
          placeholder="Ou digite outro valor"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <Input
        label="Nome Completo"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="E-mail"
        type="email"
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        label="Telefone (opcional)"
        type="tel"
        {...register('phone')}
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="anonymous"
          {...register('anonymous')}
          className="mr-2"
        />
        <label htmlFor="anonymous">Doação anônima</label>
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Processando...' : 'Continuar para Pagamento'}
      </Button>
    </form>
  )
}
```

---

### 4. Calendário de Eventos

```tsx
// components/sections/EventsCalendar.tsx
'use client'

import { useState } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function EventsCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          ←
        </button>
        <h3 className="text-xl font-bold">
          {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
        </h3>
        <button
          onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
          className="p-2 hover:bg-gray-100 rounded"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600">
            {day}
          </div>
        ))}
        
        {days.map(day => {
          const hasEvent = false // Verificar se há evento neste dia
          return (
            <div
              key={day.toISOString()}
              className={`
                p-2 text-center rounded cursor-pointer
                ${isSameMonth(day, currentDate) ? 'text-gray-900' : 'text-gray-400'}
                ${isToday(day) ? 'bg-primary text-white font-bold' : ''}
                ${hasEvent ? 'bg-blue-100' : ''}
                hover:bg-gray-100
              `}
            >
              {format(day, 'd')}
            </div>
          )
        })}
      </div>
    </div>
  )
}
```

---

### 5. SEO e Metadata

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Instituto Fenix - Arte, Cultura e Educação em Recife',
    template: '%s | Instituto Fenix'
  },
  description: 'Instituto Fenix promove educação, cultura e assistência social através de artes cênicas, projetos educacionais e ações sociais em Recife, Pernambuco.',
  keywords: ['instituto fenix', 'arte cênica', 'cultura recife', 'educação', 'assistência social'],
  authors: [{ name: 'Instituto Fenix' }],
  creator: 'Instituto Fenix',
  publisher: 'Instituto Fenix',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://fenixpe.org',
    siteName: 'Instituto Fenix',
    title: 'Instituto Fenix - Arte, Cultura e Educação',
    description: 'Transformando vidas através da arte e cultura em Recife',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Instituto Fenix',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instituto Fenix',
    description: 'Arte, Cultura e Educação em Recife',
    images: ['/images/twitter-card.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://fenixpe.org" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

---

### 6. Schema.org Markup

```tsx
// lib/schema.ts
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "name": "Instituto Fenix",
  "url": "https://fenixpe.org",
  "logo": "https://fenixpe.org/images/logo.png",
  "description": "Instituto que promove educação, cultura e assistência social",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua dos Coelhos, 485, Casa 0485",
    "addressLocality": "Recife",
    "addressRegion": "PE",
    "postalCode": "50070-545",
    "addressCountry": "BR"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-81-8608-9100",
    "contactType": "customer service",
    "email": "contato@fenixpe.org"
  },
  "sameAs": [
    "https://www.facebook.com/institutofenixpe",
    "https://www.instagram.com/institutofenixpe"
  ]
}

export const eventSchema = (event: any) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": event.title,
  "description": event.description,
  "startDate": event.startDate,
  "endDate": event.endDate,
  "location": {
    "@type": "Place",
    "name": event.location,
    "address": event.address
  },
  "organizer": {
    "@type": "Organization",
    "name": "Instituto Fenix"
  }
})
```

---

### 7. Performance Optimization

```tsx
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
```

---

### 8. Service Worker (PWA)

```javascript
// public/sw.js
const CACHE_NAME = 'fenix-v1'
const urlsToCache = [
  '/',
  '/sobre',
  '/projetos',
  '/styles/globals.css',
  '/images/logo.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  )
})
```

---

## 🎨 Configuração Tailwind CSS

```javascript
// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

## 📦 Dependências Principais

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.16.0",
    "react-hook-form": "^7.48.0",
    "zod": "^3.22.0",
    "@hookform/resolvers": "^3.3.0",
    "date-fns": "^2.30.0",
    "next-seo": "^6.4.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "eslint": "^8.50.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0"
  }
}
```

---

*Exemplos técnicos para implementação do site moderno do Instituto Fenix*

