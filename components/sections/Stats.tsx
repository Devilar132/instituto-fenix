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
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos Números
          </h2>
          <p className="text-xl text-gray-100 max-w-2xl mx-auto">
            Resultados que mostram o impacto do nosso trabalho na comunidade
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4 sm:mb-5">
                  <div className="p-3 sm:p-4 md:p-5 bg-white/20 rounded-full backdrop-blur-sm border-2 border-white/30 glow-primary transition-transform hover:scale-110 duration-300">
                    <Icon className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-white">
                  {stat.value}
                </div>
                <div className="text-white/90 text-sm sm:text-base md:text-lg font-medium px-3 sm:px-4 leading-relaxed">
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

