'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, HandHeart } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function CTA() {
  return (
    <section className="section-padding gradient-bg text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center px-4"
        >
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="p-3 sm:p-4 bg-white/20 rounded-full backdrop-blur-sm border-2 border-white/30 glow-primary">
              <HandHeart className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Faça Parte da Transformação
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Sua contribuição faz a diferença! Doe, seja voluntário ou participe dos nossos projetos 
            e ajude a transformar vidas através da arte e cultura.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link href="/como-ajudar">
              <Button
                size="lg"
                variant="secondary"
                icon={Heart}
                className="bg-white text-primary-600 hover:bg-white/95 hover:scale-105 transition-transform shadow-xl glow-primary"
              >
                Fazer uma Doação
              </Button>
            </Link>
            <Link href="/contato">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                Seja Voluntário
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

