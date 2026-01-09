'use client'

import { motion } from 'framer-motion'
import {
  Users,
  GraduationCap,
  Briefcase,
  BookOpen,
  Rocket,
  ArrowDownRight,
  ArrowDownLeft,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface ImpactStage {
  id: number
  title: string
  description: string
  icon: typeof Users
  color: string
  bgColor: string
  borderColor: string
  position: 'left' | 'right'
}

const impactStages: ImpactStage[] = [
  {
    id: 1,
    title: 'Pessoas Cadastradas no Programa',
    description: 'Início da jornada de transformação através do cadastro e acolhimento',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    position: 'left',
  },
  {
    id: 2,
    title: 'Pessoas Formadas no Programa',
    description: 'Conclusão da formação com desenvolvimento de habilidades e competências',
    icon: GraduationCap,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    position: 'right',
  },
  {
    id: 3,
    title: 'Pessoas Encaminhadas ao Mercado de Trabalho',
    description: 'Inserção profissional através de parcerias e oportunidades de emprego',
    icon: Briefcase,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    position: 'left',
  },
  {
    id: 4,
    title: 'Pessoas Qualificadas em Cursos Profissionalizantes, Empreendedorismo e Retomada Escolar',
    description: 'Ampliação de conhecimentos e capacitação para novas oportunidades',
    icon: BookOpen,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    position: 'right',
  },
  {
    id: 5,
    title: 'Pessoas Empreendendo',
    description: 'Transformação completa com criação de negócios próprios e autonomia',
    icon: Rocket,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    position: 'left',
  },
]

export function ImpactFlow() {
  return (
    <section className="section-padding bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 L60 40 L80 45 L65 60 L68 80 L50 70 L32 80 L35 60 L20 45 L40 40 Z' fill='%23000000'/%3E%3C/svg%3E")`,
            backgroundSize: '200px 200px',
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
            <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl">
              <Rocket className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Fluxo de <span className="gradient-text">Impactos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Como nossa metodologia gera transformação sustentável através de um
            processo estruturado e mensurável
          </p>
        </motion.div>

        {/* Flow Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-pink-200 via-purple-200 via-blue-200 to-green-200 transform -translate-x-1/2" />

          {/* Stages */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {impactStages.map((stage, index) => {
              const Icon = stage.icon
              const isLeft = stage.position === 'left'
              const isLast = index === impactStages.length - 1

              return (
                <motion.div
                  key={stage.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="relative"
                >
                  <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 sm:gap-6 lg:gap-8">
                    {/* Icon Circle - Left */}
                    {isLeft && (
                      <div className="flex-shrink-0 order-1 lg:order-1 w-full lg:w-auto flex justify-center lg:justify-end">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className={`relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 ${stage.bgColor} ${stage.borderColor} border-3 sm:border-4 rounded-full flex items-center justify-center shadow-xl group cursor-pointer`}
                        >
                          {/* Number Badge */}
                          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-lg">
                            <span className={`text-[10px] sm:text-xs font-bold ${stage.color}`}>
                              {String(stage.id).padStart(2, '0')}
                            </span>
                          </div>
                          {/* Icon */}
                          <Icon className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 ${stage.color} group-hover:scale-110 transition-transform`} />
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 ${stage.bgColor} rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity`} />
                        </motion.div>
                      </div>
                    )}

                    {/* Card - Center */}
                    <div className={`flex-1 order-2 min-w-0 ${isLeft ? 'lg:ml-8' : 'lg:mr-8'}`}>
                      <Card
                        className={`h-full border-2 ${stage.borderColor} hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 group overflow-hidden`}
                      >
                        <div className={`${stage.bgColor} h-1 w-full`} />
                        <CardContent className="p-4 sm:p-6 lg:p-8">
                          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
                            {/* Icon on Card (Mobile) */}
                            <div className={`lg:hidden flex-shrink-0 p-2.5 sm:p-3 ${stage.bgColor} rounded-xl border ${stage.borderColor}`}>
                              <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${stage.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2 sm:mb-3">
                                <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${stage.color} group-hover:scale-105 transition-transform leading-tight`}>
                                  {stage.title}
                                </h3>
                                <span className={`lg:hidden text-xs font-bold px-2.5 py-1 rounded-full ${stage.color} ${stage.bgColor} border ${stage.borderColor} self-start sm:self-auto`}>
                                  ETAPA {String(stage.id).padStart(2, '0')}
                                </span>
                                <span className={`hidden lg:block text-xs font-bold px-3 py-1 rounded-full ${stage.color} ${stage.bgColor} border ${stage.borderColor} flex-shrink-0`}>
                                  ETAPA {String(stage.id).padStart(2, '0')}
                                </span>
                              </div>
                              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                {stage.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Icon Circle - Right */}
                    {!isLeft && (
                      <div className="flex-shrink-0 order-3 w-full lg:w-auto flex justify-center lg:justify-start">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                          className={`relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 ${stage.bgColor} ${stage.borderColor} border-3 sm:border-4 rounded-full flex items-center justify-center shadow-xl group cursor-pointer`}
                        >
                          {/* Number Badge */}
                          <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center shadow-lg">
                            <span className={`text-[10px] sm:text-xs font-bold ${stage.color}`}>
                              {String(stage.id).padStart(2, '0')}
                            </span>
                          </div>
                          {/* Icon */}
                          <Icon className={`h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 ${stage.color} group-hover:scale-110 transition-transform`} />
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 ${stage.bgColor} rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity`} />
                        </motion.div>
                      </div>
                    )}

                    {/* Connection Arrow */}
                    {!isLast && (
                      <div className="absolute left-1/2 -bottom-4 sm:-bottom-6 lg:-bottom-8 transform -translate-x-1/2 z-10 order-4 w-full flex justify-center">
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.15 + 0.3 }}
                          className="flex flex-col items-center"
                        >
                          {/* Dotted Line */}
                          <div className={`h-8 sm:h-12 lg:h-16 w-0.5 ${stage.bgColor} border-l-2 border-dashed ${stage.borderColor}`} />
                          {/* Arrow Icon */}
                          <div className={`p-1.5 sm:p-2 ${stage.bgColor} rounded-full border-2 ${stage.borderColor} shadow-lg`}>
                            {index % 2 === 0 ? (
                              <ArrowDownRight className={`h-4 w-4 sm:h-5 sm:w-5 ${stage.color}`} />
                            ) : (
                              <ArrowDownLeft className={`h-4 w-4 sm:h-5 sm:w-5 ${stage.color}`} />
                            )}
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Final Impact Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-200 shadow-xl">
              <Rocket className="h-6 w-6 text-green-600" />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-700">
                  Transformação Completa
                </p>
                <p className="text-xs text-gray-600">
                  Da vulnerabilidade à autonomia e empreendedorismo
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

