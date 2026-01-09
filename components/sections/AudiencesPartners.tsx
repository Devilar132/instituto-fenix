'use client'

import { motion } from 'framer-motion'
import {
  Users,
  GraduationCap,
  Building2,
  Heart,
  Sparkles,
  Handshake,
  School,
  Briefcase,
  UsersRound,
  Home,
  BookOpen,
  Award,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface AudienceGroup {
  title: string
  icon: typeof Users
  description: string
  items: {
    label: string
    icon?: typeof Users
    count?: string
  }[]
  color: string
  bgGradient: string
  borderColor: string
}

const audiencesData: AudienceGroup[] = [
  {
    title: 'Nossos Públicos',
    icon: Users,
    description: 'Pessoas e grupos que diretamente impactamos através dos nossos projetos',
    items: [
      {
        label: 'Jovens de Unidades Socioeducativas',
        icon: UsersRound,
        count: '500+',
      },
      {
        label: 'Pessoas Privadas de Liberdade',
        icon: Users,
        count: '300+',
      },
      {
        label: 'Egressos do Sistema Prisional',
        icon: GraduationCap,
        count: '200+',
      },
    ],
    color: 'text-primary-600',
    bgGradient: 'from-primary-50 to-primary-100/50',
    borderColor: 'border-primary-200',
  },
  {
    title: 'Famílias & Comunidades',
    icon: Heart,
    description: 'Rede de apoio e comunidades que amplificam nosso impacto social',
    items: [
      {
        label: 'Familiares de Socioeducandos, Pessoas Privadas de Liberdade e Egressos',
        icon: Home,
        count: '800+',
      },
      {
        label: 'Comunidades Locais',
        icon: Heart,
        count: '25+',
      },
      {
        label: 'Instituições de Ensino',
        icon: School,
        count: '15+',
      },
    ],
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-blue-100/50',
    borderColor: 'border-blue-200',
  },
  {
    title: 'Parceiros Estratégicos',
    icon: Handshake,
    description: 'Organizações e empresas que caminham conosco para transformação social',
    items: [
      {
        label: 'Empresas com Agenda ESG, Impacto Positivo e Investidores de Negócios de Impacto Socioeconômico',
        icon: Building2,
        count: '18+',
      },
      {
        label: 'Organizações da Sociedade Civil',
        icon: Award,
        count: '12+',
      },
    ],
    color: 'text-green-600',
    bgGradient: 'from-green-50 to-green-100/50',
    borderColor: 'border-green-200',
  },
]

export function AudiencesPartners() {
  return (
    <section className="section-padding bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-xl">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Nossos Públicos <span className="gradient-text">&amp; Parceiros</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Quem impactamos diretamente e com quem caminhamos lado a lado para
            amplificar resultados e criar transformação social sustentável
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {audiencesData.map((group, index) => {
            const Icon = group.icon
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                <Card
                  className={`h-full border-2 ${group.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden group`}
                >
                  {/* Header with Gradient */}
                  <div
                    className={`bg-gradient-to-br ${group.bgGradient} p-6 border-b-2 ${group.borderColor}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-white shadow-lg ${group.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <h3 className={`text-2xl font-bold ${group.color} mb-2`}>
                      {group.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {group.description}
                    </p>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {group.items.map((item, itemIndex) => {
                        const ItemIcon = item.icon || Users
                        return (
                          <motion.li
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: index * 0.15 + itemIndex * 0.1,
                              duration: 0.4,
                            }}
                            className="flex items-start gap-4 group/item"
                          >
                            <div
                              className={`p-2 rounded-lg ${group.bgGradient} border ${group.borderColor} flex-shrink-0 group-hover/item:scale-110 transition-transform duration-300`}
                            >
                              <ItemIcon className={`h-4 w-4 ${group.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                                <span className="text-gray-900 font-semibold text-sm leading-tight flex-1">
                                  {item.label}
                                </span>
                                {item.count && (
                                  <span
                                    className={`text-xs font-bold px-2 py-1 rounded-full ${group.color} bg-white border ${group.borderColor} whitespace-nowrap flex-shrink-0`}
                                  >
                                    {item.count}
                                  </span>
                                )}
                              </div>
                            </div>
                          </motion.li>
                        )
                      })}
                    </ul>

                    {/* Footer Stats */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">
                          Total Impactado
                        </span>
                        <span className={`text-lg font-bold ${group.color}`}>
                          {group.items.reduce((acc, item) => {
                            const count = parseInt(item.count?.replace(/\D/g, '') || '0')
                            return acc + count
                          }, 0)}+
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-full border border-primary-200">
            <Handshake className="h-5 w-5 text-primary-600" />
            <p className="text-sm text-gray-700 font-medium">
              Quer fazer parte desta rede de transformação?{' '}
              <a
                href="/contato"
                className="text-primary-600 hover:text-primary-700 font-semibold underline underline-offset-2"
              >
                Entre em contato
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

