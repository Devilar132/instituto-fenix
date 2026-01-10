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
  title = 'Nossos Parceiros e Investidores',
  description = 'Empresas e organizações que acreditam na nossa missão'
}: PartnersCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const isPausedRef = useRef(false)

  // Duplicar os parceiros para loop infinito suave
  const duplicatedPartners = [...partners, ...partners, ...partners]

  // Scroll automático infinito simples e estável
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let scrollPosition = 0
    const scrollSpeed = 0.35 // Velocidade confortável
    const singleSetWidth = scrollContainer.scrollWidth / 3

    const autoScroll = () => {
      if (!isPausedRef.current && scrollContainer) {
        scrollPosition += scrollSpeed

        // Reset suave quando chega ao fim do primeiro set
        if (scrollPosition >= singleSetWidth) {
          scrollPosition = 0
          // Reset instantâneo mas invisível (já que duplicamos os itens)
        }

        scrollContainer.scrollLeft = scrollPosition
      }

      animationRef.current = requestAnimationFrame(autoScroll)
    }

    // Iniciar scroll
    animationRef.current = requestAnimationFrame(autoScroll)

    // Pausar no hover
    const handleMouseEnter = () => {
      isPausedRef.current = true
    }
    
    const handleMouseLeave = () => {
      isPausedRef.current = false
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current)
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [partners.length])

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
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
          
          {/* Gradient Overlay (direita) */}
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

          {/* Carrossel Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-hidden hide-scrollbar"
            style={{
              willChange: 'scroll-position'
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <motion.div
                key={`${partner.id}-${index}`}
                data-card
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  duration: 0.3,
                  delay: Math.min((index % partners.length) * 0.03, 0.3)
                }}
                whileHover={{ scale: 1.05 }}
                className="flex-shrink-0 snap-center"
              >
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block"
                >
                  {/* Card - Aumentado para melhor visualização */}
                  <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 lg:w-52 lg:h-52 xl:w-56 xl:h-56 bg-white rounded-2xl shadow-lg border-2 border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-primary-400 hover:shadow-primary-200/30">
                    {/* Logo Container - Preservando qualidade e boa aparência */}
                    <div className="relative w-full h-full p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex items-center justify-center">
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className="object-contain p-2 sm:p-3 md:p-4 lg:p-5 transition-all duration-300 group-hover:scale-110"
                          sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, (max-width: 1280px) 224px, 256px"
                          quality={95}
                          priority={index < 6}
                          loading={index < 6 ? 'eager' : 'lazy'}
                        />
                      </div>
                    </div>

                    {/* Tooltip Simples */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-30">
                      <div className="bg-gray-900 text-white text-sm sm:text-base px-4 py-2.5 rounded-lg whitespace-nowrap shadow-xl">
                        <div className="font-bold">{partner.name}</div>
                        {partner.since && (
                          <div className="text-gray-300 text-xs mt-1">
                            Parceiro desde {partner.since}
                          </div>
                        )}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
                      </div>
                    </div>

                    {/* Icone de link externo */}
                    <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-primary-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 shadow-lg">
                      <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-white" />
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
