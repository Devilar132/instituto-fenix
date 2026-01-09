'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  Users,
  Sparkles,
  CheckCircle,
  TrendingUp,
  LucideIcon,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface Intervention {
  name: string
  description: string
  impact: string
}

interface Impact {
  title: string
  description: string
}

interface Stage {
  id: string
  title: string
  description: string
  iconName: string
  color: string
  bgColor: string
  challenges?: string[]
  interventions?: Intervention[]
  results?: string[]
  impacts?: Impact[]
}

// Mapeamento de ícones
const iconMap: Record<string, LucideIcon> = {
  Users,
  Sparkles,
  CheckCircle,
  TrendingUp,
}

interface TheoryOfChangeProps {
  stages: Stage[]
}

export function TheoryOfChange({ stages }: TheoryOfChangeProps) {
  const [activeStage, setActiveStage] = useState<string | null>(null)
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set())

  const toggleStage = (stageId: string) => {
    const newExpanded = new Set(expandedStages)
    if (newExpanded.has(stageId)) {
      newExpanded.delete(stageId)
    } else {
      newExpanded.add(stageId)
    }
    setExpandedStages(newExpanded)
  }

  return (
    <div className="relative">
      {/* Connection Line (Desktop) */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-primary-300 to-gray-300 transform -translate-y-1/2 z-0" />

      {/* Stages */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {stages.map((stage, index) => {
          const Icon = iconMap[stage.iconName] || Users
          const isExpanded = expandedStages.has(stage.id)
          const isActive = activeStage === stage.id

          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Connector Arrow (Mobile) */}
              {index < stages.length - 1 && (
                <div className="lg:hidden absolute top-1/2 -right-3 z-20">
                  <ArrowRight className="h-6 w-6 text-primary-400" />
                </div>
              )}

              <Card
                className={`h-full cursor-pointer transition-all duration-300 ${
                  isActive
                    ? 'shadow-2xl scale-105 border-2 border-primary-500'
                    : 'hover:shadow-xl hover:-translate-y-2'
                }`}
                onMouseEnter={() => setActiveStage(stage.id)}
                onMouseLeave={() => setActiveStage(null)}
                onClick={() => toggleStage(stage.id)}
              >
                <CardContent className="p-6">
                  {/* Stage Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`inline-flex p-4 rounded-full mb-4 ${stage.bgColor}`}
                    >
                      <Icon className={`h-8 w-8 ${stage.color}`} />
                    </div>
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                        ETAPA {index + 1}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-gray-600">{stage.description}</p>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t border-gray-200 space-y-4">
                          {/* Challenges */}
                          {stage.challenges && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                Desafios:
                              </h4>
                              <ul className="space-y-1">
                                {stage.challenges.map((challenge, i) => (
                                  <li
                                    key={i}
                                    className="text-xs text-gray-600 flex items-start gap-2"
                                  >
                                    <span className="text-primary-600 mt-1">•</span>
                                    <span>{challenge}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Interventions */}
                          {stage.interventions && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                Intervenções:
                              </h4>
                              <div className="space-y-3">
                                {stage.interventions.map((intervention, i) => (
                                  <div
                                    key={i}
                                    className="bg-primary-50 rounded-lg p-3 border border-primary-100"
                                  >
                                    <h5 className="font-semibold text-sm text-primary-900 mb-1">
                                      {intervention.name}
                                    </h5>
                                    <p className="text-xs text-gray-700 mb-1">
                                      {intervention.description}
                                    </p>
                                    <p className="text-xs font-semibold text-primary-600">
                                      {intervention.impact}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Results */}
                          {stage.results && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                Resultados:
                              </h4>
                              <ul className="space-y-1">
                                {stage.results.map((result, i) => (
                                  <li
                                    key={i}
                                    className="text-xs text-gray-600 flex items-start gap-2"
                                  >
                                    <span className="text-green-600 mt-1">✓</span>
                                    <span>{result}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Impacts */}
                          {stage.impacts && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                                Impactos:
                              </h4>
                              <div className="space-y-2">
                                {stage.impacts.map((impact, i) => (
                                  <div
                                    key={i}
                                    className="bg-secondary-50 rounded-lg p-3 border border-secondary-100"
                                  >
                                    <h5 className="font-semibold text-sm text-secondary-900 mb-1">
                                      {impact.title}
                                    </h5>
                                    <p className="text-xs text-gray-700">
                                      {impact.description}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Expand/Collapse Indicator */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="h-5 w-5 text-primary-600" />
                    </motion.div>
                    <span className="ml-2 text-xs text-primary-600 font-medium">
                      {isExpanded ? 'Ver menos' : 'Ver detalhes'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

