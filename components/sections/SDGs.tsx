'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'

interface SDG {
  id: number
  title: string
  description: string
  color: string
  svgPath: string
  targets: string[]
}

// ODS na ordem sequencial conforme os SVGs disponíveis
const sdgs: SDG[] = [
  {
    id: 1,
    title: 'Erradicação da Pobreza',
    description: 'Acabar com a pobreza em todas as suas formas, em todos os lugares',
    color: '#E5243B',
    svgPath: '/sdgs/SDG-1.svg',
    targets: [
      'Apoio a famílias em situação de vulnerabilidade social',
      'Projetos que promovem geração de renda através da arte',
      'Acesso a oportunidades de desenvolvimento pessoal e profissional',
    ],
  },
  {
    id: 2,
    title: 'Fome Zero e Agricultura Sustentável',
    description: 'Acabar com a fome, alcançar a segurança alimentar e melhorar a nutrição',
    color: '#DDA63A',
    svgPath: '/sdgs/SDG-2.svg',
    targets: [
      'Distribuição de alimentos em ações sociais',
      'Oficinas de culinária e nutrição',
      'Parcerias para segurança alimentar',
    ],
  },
  {
    id: 4,
    title: 'Educação de Qualidade',
    description: 'Assegurar a educação inclusiva, equitativa e de qualidade',
    color: '#C5192D',
    svgPath: '/sdgs/SDG-4.svg',
    targets: [
      'Acesso igualitário à educação através da arte',
      'Desenvolvimento de habilidades artísticas e criativas',
      'Oficinas educacionais em escolas públicas',
      'Formação continuada de educadores',
    ],
  },
  {
    id: 5,
    title: 'Igualdade de Gênero',
    description: 'Alcançar a igualdade de gênero e empoderar todas as mulheres e meninas',
    color: '#FF3A21',
    svgPath: '/sdgs/SDG-5.svg',
    targets: [
      'Projetos que promovem igualdade de gênero',
      'Empoderamento de mulheres através da arte',
      'Espaços seguros e inclusivos para todos',
    ],
  },
  {
    id: 8,
    title: 'Trabalho Decente e Crescimento Econômico',
    description: 'Promover o crescimento econômico sustentado e o trabalho decente',
    color: '#A21942',
    svgPath: '/sdgs/SDG-8.svg',
    targets: [
      'Formação profissional através da arte e cultura',
      'Oportunidades de trabalho na área cultural',
      'Desenvolvimento de habilidades empreendedoras',
    ],
  },
  {
    id: 10,
    title: 'Redução das Desigualdades',
    description: 'Reduzir a desigualdade dentro dos países e entre eles',
    color: '#DD1367',
    svgPath: '/sdgs/SDG-10.svg',
    targets: [
      'Democratização do acesso à cultura',
      'Inclusão de pessoas em vulnerabilidade social',
      'Oportunidades para todos, independente de origem',
      'Projetos em comunidades periféricas',
    ],
  },
  {
    id: 16,
    title: 'Paz, Justiça e Instituições Eficazes',
    description: 'Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável',
    color: '#00689D',
    svgPath: '/sdgs/SDG-16.svg',
    targets: [
      'Promoção da cultura de paz através da arte',
      'Fortalecimento de vínculos sociais',
      'Redução da violência através de projetos culturais',
      'Mediação de conflitos comunitários',
    ],
  },
  {
    id: 17,
    title: 'Parcerias e Meios de Implementação',
    description: 'Fortalecer os meios de implementação e revitalizar a parceria global',
    color: '#19486A',
    svgPath: '/sdgs/SDG-17.svg',
    targets: [
      'Parcerias estratégicas com empresas e organizações',
      'Rede de voluntários e apoiadores',
      'Colaboração com escolas e comunidades',
      'Alianças para impacto social ampliado',
    ],
  },
]

export function SDGsSection() {
  const [selectedSDG, setSelectedSDG] = useState<SDG | null>(null)
  const [hoveredSDG, setHoveredSDG] = useState<number | null>(null)

  return (
    <>
      <section className="section-padding bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 relative overflow-hidden">
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

        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="inline-flex items-center justify-center mb-6"
            >
              <div className="p-4 bg-white rounded-full shadow-2xl border-4 border-primary-200">
                <Sparkles className="h-8 w-8 text-primary-600" />
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Objetivos de Desenvolvimento{' '}
              <span className="gradient-text">Sustentável</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              O Instituto Fenix contribui diretamente para o alcance dos Objetivos de
              Desenvolvimento Sustentável da ONU através de nossos projetos e ações
            </motion.p>
          </div>

          {/* SDGs Grid - Ordem Sequencial */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 mb-12">
            {sdgs.map((sdg, index) => {
              const isHovered = hoveredSDG === sdg.id
              return (
                <motion.div
                  key={sdg.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 100,
                    damping: 15,
                  }}
                  onHoverStart={() => setHoveredSDG(sdg.id)}
                  onHoverEnd={() => setHoveredSDG(null)}
                  className="relative"
                >
                  <Card
                    className={`cursor-pointer h-full transition-all duration-500 border-2 ${
                      isHovered
                        ? 'shadow-2xl scale-110 border-primary-400 z-20'
                        : 'hover:shadow-xl hover:-translate-y-3 border-gray-200'
                    }`}
                    onClick={() => setSelectedSDG(sdg)}
                  >
                    {/* Glow Effect on Hover */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-lg opacity-50 blur-xl -z-10"
                        style={{ backgroundColor: sdg.color }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                      />
                    )}

                    <CardContent className="p-6 text-center relative overflow-hidden">
                      {/* Background Color Fade */}
                      <div
                        className={`absolute inset-0 opacity-0 transition-opacity duration-500 ${
                          isHovered ? 'opacity-10' : ''
                        }`}
                        style={{ backgroundColor: sdg.color }}
                      />

                      {/* SVG Icon */}
                      <motion.div
                        className="relative w-24 h-24 mx-auto mb-4"
                        animate={{
                          scale: isHovered ? 1.15 : 1,
                          rotate: isHovered ? [0, -5, 5, -5, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="relative w-full h-full">
                          <Image
                            src={sdg.svgPath}
                            alt={`ODS ${sdg.id} - ${sdg.title}`}
                            fill
                            className="object-contain drop-shadow-lg"
                            sizes="96px"
                            priority={index < 4}
                          />
                        </div>
                      </motion.div>

                      {/* ODS Number Badge */}
                      <motion.div
                        className="mb-3"
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                        }}
                      >
                        <span
                          className="text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-lg inline-block"
                          style={{ backgroundColor: sdg.color }}
                        >
                          ODS {sdg.id}
                        </span>
                      </motion.div>

                      {/* Title */}
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
                        {sdg.title}
                      </h3>

                      {/* Hover Indicator */}
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3 text-xs text-primary-600 font-semibold"
                        >
                          Clique para detalhes →
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Info Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <p className="text-sm text-gray-600 mb-4 font-medium">
              Clique em um ODS para saber como o Instituto Fenix contribui
            </p>
            <a
              href="https://brasil.un.org/pt-br/sdgs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors group"
            >
              Saiba mais sobre os 17 ODS da ONU
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal Premium */}
      <AnimatePresence>
        {selectedSDG && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-dark-500/90 backdrop-blur-md"
              onClick={() => setSelectedSDG(null)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedSDG(null)}
            >
              <motion.div
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border-4"
                style={{ borderColor: selectedSDG.color }}
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Header with Color */}
                <div
                  className="h-3 w-full"
                  style={{ backgroundColor: selectedSDG.color }}
                />

                <div className="p-6 md:p-10 overflow-y-auto max-h-[90vh]">
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedSDG(null)}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>

                  {/* Header */}
                  <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                    {/* SVG */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="relative w-32 h-32 flex-shrink-0 mx-auto md:mx-0"
                    >
                      <Image
                        src={selectedSDG.svgPath}
                        alt={`ODS ${selectedSDG.id}`}
                        fill
                        className="object-contain drop-shadow-xl"
                        sizes="128px"
                      />
                    </motion.div>

                    {/* Title and Description */}
                    <div className="flex-1 text-center md:text-left">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <span
                          className="text-sm font-bold text-white px-4 py-2 rounded-full inline-block mb-3 shadow-lg"
                          style={{ backgroundColor: selectedSDG.color }}
                        >
                          ODS {selectedSDG.id}
                        </span>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3">
                          {selectedSDG.title}
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {selectedSDG.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div
                      className="p-6 rounded-xl mb-6 border-l-4"
                      style={{
                        backgroundColor: `${selectedSDG.color}10`,
                        borderColor: selectedSDG.color,
                      }}
                    >
                      <h4 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                        <Sparkles
                          className="h-5 w-5"
                          style={{ color: selectedSDG.color }}
                        />
                        Como o Instituto Fenix contribui:
                      </h4>
                      <ul className="space-y-4">
                        {selectedSDG.targets.map((target, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className="flex items-start gap-4"
                          >
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md"
                              style={{ backgroundColor: `${selectedSDG.color}20` }}
                            >
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: selectedSDG.color }}
                              />
                            </div>
                            <span className="text-gray-700 text-lg leading-relaxed">
                              {target}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                  {/* Footer */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="pt-6 border-t border-gray-200 text-center"
                  >
                    <a
                      href="https://brasil.un.org/pt-br/sdgs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors group"
                    >
                      Conheça todos os 17 Objetivos de Desenvolvimento Sustentável
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
