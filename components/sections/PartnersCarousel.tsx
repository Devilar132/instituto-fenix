'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Partner } from '@/types'
import { Award, ExternalLink } from 'lucide-react'

interface PartnersCarouselProps {
  partners: Partner[]
  title?: string
  description?: string
}

export function PartnersCarousel({ 
  partners, 
  title = 'Nossos Parceiros e Patrocinadores',
  description = 'Empresas e organizações que acreditam na nossa missão'
}: PartnersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  // Duplicar os parceiros para loop infinito
  const duplicatedPartners = [...partners, ...partners, ...partners]

  // Cores por nível
  const levelColors = {
    ouro: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
    prata: 'bg-gradient-to-br from-gray-300 to-gray-500',
    bronze: 'bg-gradient-to-br from-orange-400 to-orange-600',
    apoiador: 'bg-gradient-to-br from-primary-400 to-primary-600',
  }

  const levelLabels = {
    ouro: 'Ouro',
    prata: 'Prata',
    bronze: 'Bronze',
    apoiador: 'Apoiador',
  }

  // Auto-scroll suave infinito
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0
    let isPaused = false
    const scrollSpeed = 0.5

    const scroll = () => {
      if (!isPaused) {
        scrollPosition += scrollSpeed
        const maxScroll = scrollContainer.scrollWidth / 3
        
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0
        }
        
        scrollContainer.scrollLeft = scrollPosition
      }
      
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    const handleMouseEnter = () => {
      isPaused = true
    }
    
    const handleMouseLeave = () => {
      isPaused = false
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!partners || partners.length === 0) {
    return null
  }

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-primary-50">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary-100 rounded-full">
              <Award className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {description}
          </p>
        </motion.div>

        {/* Carrossel */}
        <div className="relative py-6 md:py-8">
          {/* Gradient Overlay (esquerda) */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
          
          {/* Gradient Overlay (direita) */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

          {/* Carrossel Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-hidden scroll-smooth hide-scrollbar"
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4,
                  delay: (index % partners.length) * 0.05 
                }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="flex-shrink-0"
              >
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block"
                >
                  {/* Card */}
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white rounded-full shadow-md border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary-300 hover:shadow-primary-200/20">
                    {/* Badge de Nível */}
                    <div className={`absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full ${levelColors[partner.level]} shadow-md flex items-center justify-center z-20`}>
                      <span className="text-white text-[10px] sm:text-xs md:text-sm font-bold">
                        {partner.level === 'ouro' ? '🥇' : partner.level === 'prata' ? '🥈' : partner.level === 'bronze' ? '🥉' : '⭐'}
                      </span>
                    </div>

                    {/* Logo Container - Preservando qualidade e boa aparência */}
                    <div className="relative w-full h-full p-3 sm:p-3.5 md:p-4.5 lg:p-6 flex items-center justify-center">
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain p-2.5 sm:p-3 md:p-3.5 lg:p-4.5 transition-all duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 96px, (max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                          quality={95}
                          priority={index < 6}
                          loading={index < 6 ? 'eager' : 'lazy'}
                        />
                      </div>
                    </div>

                    {/* Tooltip Simples */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                      <div className="bg-gray-900 text-white text-xs sm:text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
                        <div className="font-bold">{partner.name}</div>
                        <div className="text-gray-300 text-xs mt-1">
                          {levelLabels[partner.level]} {partner.since && `• ${partner.since}`}
                        </div>
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                      </div>
                    </div>

                    {/* Icone de link externo */}
                    <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-primary-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                      <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
                    </div>
                  </div>

                  {/* Nome abaixo do logo (mobile) */}
                  <div className="mt-2 sm:mt-3 text-center sm:hidden">
                    <div className="text-xs font-semibold text-gray-700 line-clamp-1">
                      {partner.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {levelLabels[partner.level]}
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
