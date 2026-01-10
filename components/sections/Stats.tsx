'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Scale, Briefcase, Users, HeartHandshake, BookOpen } from 'lucide-react'

const stats = [
  {
    icon: GraduationCap,
    value: '41',
    label: 'Pessoas Inseridas no Ensino Superior com Bolsas de 100%',
    color: 'text-white',
  },
  {
    icon: Scale,
    value: '35',
    label: 'Pessoas Colocadas em Liberdade pela Equipe Jurídica',
    color: 'text-primary-200',
  },
  {
    icon: Briefcase,
    value: '215',
    label: 'Encaminhadas ao Mercado de Trabalho',
    color: 'text-white',
  },
  {
    icon: Users,
    value: '427',
    label: 'Jovens Cadastrados no Programa de Aprendizagem',
    color: 'text-primary-200',
  },
  {
    icon: HeartHandshake,
    value: '1.200+',
    label: 'Pessoas Acompanhadas pela Equipe Psicossocial',
    color: 'text-white',
  },
  {
    icon: BookOpen,
    value: '468',
    label: 'Pessoas Encaminhadas para Qualificação Profissional',
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
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Nossos Números
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto px-4">
            Resultados que mostram o impacto do nosso trabalho na comunidade
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2 sm:mb-3 md:mb-4">
                  <div className="p-2.5 sm:p-3 md:p-4 bg-white/20 rounded-full backdrop-blur-sm border-2 border-white/30 glow-primary transition-transform hover:scale-110 duration-300">
                    <Icon className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1.5 sm:mb-2 text-white leading-tight">
                  {stat.value}
                </div>
                <div className="text-white/90 text-xs sm:text-sm md:text-base font-medium px-2 sm:px-3 leading-snug sm:leading-normal">
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

