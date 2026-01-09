'use client'

import { motion } from 'framer-motion'
import { Users, Calendar, Award, Heart } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '2.600+',
    label: 'Pessoas Impactadas',
    color: 'text-white',
  },
  {
    icon: Calendar,
    value: '36+',
    label: 'Eventos Realizados',
    color: 'text-primary-200',
  },
  {
    icon: Award,
    value: '16+',
    label: 'Parcerias',
    color: 'text-white',
  },
  {
    icon: Heart,
    value: '3',
    label: 'Projetos Ativos',
    color: 'text-primary-200',
  },
]

export function Stats() {
  return (
    <section className="section-padding gradient-bg text-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos Números
          </h2>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Resultados que mostram o impacto do nosso trabalho na comunidade
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="p-3 sm:p-4 bg-white/20 rounded-full backdrop-blur-sm border-2 border-white/30 glow-primary">
                    <Icon className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-white/90 text-xs sm:text-sm md:text-base font-medium px-2">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

