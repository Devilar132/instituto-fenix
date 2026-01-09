'use client'

import { motion } from 'framer-motion'
import {
  TrendingUp,
  Users,
  GraduationCap,
  Heart,
  Sparkles,
  Target,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface ExpectedResult {
  id: number
  title: string
  description: string
  icon: typeof TrendingUp
  color: string
  bgGradient: string
  borderColor: string
  metrics?: string[]
}

const expectedResults: ExpectedResult[] = [
  {
    id: 1,
    title: 'Aumento de Acesso à Arte, Cultura e Educação',
    description:
      'Democratização do acesso a atividades culturais e educacionais em comunidades atendidas',
    icon: GraduationCap,
    color: 'text-blue-600',
    bgGradient: 'from-blue-50 to-blue-100/50',
    borderColor: 'border-blue-200',
    metrics: ['80%+ de participação', '15+ comunidades', '36+ eventos'],
  },
  {
    id: 2,
    title: 'Desenvolvimento Socioemocional',
    description:
      'Fortalecimento de vínculos sociais, autoestima e habilidades interpessoais',
    icon: Heart,
    color: 'text-pink-600',
    bgGradient: 'from-pink-50 to-pink-100/50',
    borderColor: 'border-pink-200',
    metrics: ['Melhoria na autoestima', 'Redução do isolamento', 'Vínculos fortalecidos'],
  },
  {
    id: 3,
    title: 'Geração de Oportunidades',
    description:
      'Acesso a oportunidades educacionais, profissionais e de desenvolvimento pessoal',
    icon: Target,
    color: 'text-purple-600',
    bgGradient: 'from-purple-50 to-purple-100/50',
    borderColor: 'border-purple-200',
    metrics: ['Formação profissional', 'Encaminhamento ao trabalho', 'Cursos profissionalizantes'],
  },
  {
    id: 4,
    title: 'Comunidades Engajadas',
    description:
      'Comunidades mais colaborativas, unidas e protagonistas de sua própria transformação',
    icon: Users,
    color: 'text-green-600',
    bgGradient: 'from-green-50 to-green-100/50',
    borderColor: 'border-green-200',
    metrics: ['25+ comunidades', 'Participação ativa', 'Liderança comunitária'],
  },
]

export function ExpectedResults() {
  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 L60 40 L80 45 L65 60 L68 80 L50 70 L32 80 L35 60 L20 45 L40 40 Z' fill='%23000000'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl" />

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
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Resultados <span className="gradient-text">Esperados</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Os efeitos concretos que buscamos em cada ciclo de intervenção, medidos
            através de indicadores claros e mensuráveis
          </p>
        </motion.div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {expectedResults.map((result, index) => {
            const Icon = result.icon
            return (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <Card
                  className={`h-full border-2 ${result.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden relative`}
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${result.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  {/* Top Accent Bar */}
                  <div className={`${result.bgGradient} h-2 w-full`} />

                  <CardContent className="p-6 lg:p-8 relative z-10">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className={`p-4 ${result.bgGradient} rounded-xl border-2 ${result.borderColor} shadow-lg group-hover:shadow-xl transition-shadow flex-shrink-0`}
                      >
                        <Icon className={`h-6 w-6 lg:h-8 lg:w-8 ${result.color}`} />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span
                            className={`text-xs font-bold px-3 py-1 rounded-full ${result.color} bg-white border ${result.borderColor} whitespace-nowrap`}
                          >
                            RESULTADO {String(result.id).padStart(2, '0')}
                          </span>
                        </div>
                        <h3
                          className={`text-xl lg:text-2xl font-bold ${result.color} mb-2 leading-tight group-hover:scale-105 transition-transform`}
                        >
                          {result.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed text-sm lg:text-base">
                      {result.description}
                    </p>

                    {/* Metrics */}
                    {result.metrics && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <TrendingUp className={`h-4 w-4 ${result.color}`} />
                          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Indicadores
                          </span>
                        </div>
                        <ul className="space-y-2">
                          {result.metrics.map((metric, metricIndex) => (
                            <motion.li
                              key={metricIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                delay: index * 0.1 + metricIndex * 0.1,
                                duration: 0.4,
                              }}
                              className="flex items-center gap-3"
                            >
                              <div
                                className={`p-1 rounded-full ${result.bgGradient} border ${result.borderColor} flex-shrink-0`}
                              >
                                <CheckCircle2
                                  className={`h-3 w-3 ${result.color}`}
                                />
                              </div>
                              <span className="text-sm text-gray-700 font-medium">
                                {metric}
                              </span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Bottom Accent */}
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <ArrowRight className={`h-4 w-4 ${result.color}`} />
                        <span>Impacto mensurável e sustentável</span>
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
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 px-6 py-4 bg-white rounded-2xl border-2 border-primary-200 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Target className="h-5 w-5 text-primary-600" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">
                  Monitoramento Contínuo
                </p>
                <p className="text-xs text-gray-600">
                  Acompanhamos cada resultado para garantir impacto real
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

