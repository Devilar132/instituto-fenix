'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ParticleBackground } from '@/components/effects/ParticleBackground'
import { GradientMesh } from '@/components/effects/GradientMesh'
import { TextReveal } from '@/components/ui/TextReveal'
import { MagneticButton } from '@/components/ui/MagneticButton'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden gradient-bg">
      {/* Gradient Mesh Background */}
      <GradientMesh />
      
      {/* Particle Background - Leve e otimizado */}
      <ParticleBackground />
      
      {/* Background Pattern - Fênix inspired */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 L60 40 L80 45 L65 60 L68 80 L50 70 L32 80 L35 60 L20 45 L40 40 Z' fill='%23FF6B35'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
      </div>
      
      {/* Gradient Overlay para mais profundidade */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-500/20 via-transparent to-dark-500/40" />
      
      {/* Efeito de brilho sutil - GPU accelerated */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"
        style={{ willChange: 'transform' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl"
        style={{ willChange: 'transform' }}
      />

      {/* Content */}
      <div className="container-custom relative z-10 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 text-balance px-2">
              <TextReveal delay={0.2}>
                Transformando Vidas através da{' '}
              </TextReveal>
              <TextReveal delay={0.4}>
                <span className="text-gradient-animated drop-shadow-lg">Arte e Cultura</span>
              </TextReveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-white/90 max-w-2xl mx-auto drop-shadow-md px-4"
            >
              O Instituto Fenix promove educação, cultura e assistência social 
              em Recife, transformando comunidades através de projetos artísticos e educacionais.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
            >
              <Link href="/projetos">
                <MagneticButton
                  size="lg"
                  variant="secondary"
                  icon={ArrowRight}
                  iconPosition="right"
                  className="bg-white text-primary-600 hover:bg-white/95 shadow-xl glow-primary"
                  magnetic={true}
                  strength={0.2}
                >
                  Conheça Nossos Projetos
                </MagneticButton>
              </Link>
              <Link href="/como-ajudar">
                <Button
                  size="lg"
                  variant="outline"
                  icon={Play}
                  className="border-2 border-white text-white hover:bg-white/10"
                >
                  Como Ajudar
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Role para baixo</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}

