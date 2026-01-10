'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Linkedin, Quote, Sparkles, Award, Users, X } from 'lucide-react'
import { TeamMember } from '@/types'
import { Card3D } from '@/components/ui/Card3D'
import { ScrollReveal } from '@/components/effects/ScrollReveal'

interface TeamMembersGridProps {
  members: TeamMember[]
}

export function TeamMembersGrid({ members }: TeamMembersGridProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [filter, setFilter] = useState<string>('all')

  // Bloquear scroll do body quando modal estiver aberto
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedMember])

  const roles = Array.from(new Set(members.map(m => m.role)))

  const filteredMembers = filter === 'all' 
    ? members 
    : members.filter(m => m.role === filter)

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center px-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                filter === 'all'
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => setFilter(role)}
                className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
                  filter === role
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredMembers.map((member, index) => (
              <ScrollReveal key={member.id} delay={index * 0.1} direction="up">
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card3D className="h-full flex flex-col group relative overflow-hidden cursor-pointer" onClick={() => setSelectedMember(member)}>
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-500 z-10 pointer-events-none" />
                    
                    {/* Image Container */}
                    <div className="relative h-64 sm:h-72 overflow-hidden cursor-pointer" onClick={() => setSelectedMember(member)}>
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-500/50 via-transparent to-transparent z-10" />
                      <Image
                        src={member.image || '/placeholder-avatar.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                      {/* Badge */}
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg group-hover:scale-110 transition-transform">
                          <Award className="h-5 w-5 text-primary-600" />
                        </div>
                      </div>
                      {/* Role Badge */}
                      <div className="absolute bottom-4 left-4 right-4 z-20">
                        <div className="bg-primary-600/90 backdrop-blur-sm rounded-lg px-3 py-1.5 group-hover:bg-primary-700 transition-colors">
                          <p className="text-white text-xs sm:text-sm font-semibold">{member.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                          {member.name}
                        </h3>
                        <div className="flex items-center text-primary-600 text-sm font-medium mb-3">
                          <Users className="h-4 w-4 mr-1" />
                          {member.role}
                        </div>
                        {member.bio && (
                          <p className="text-sm sm:text-base text-gray-600 line-clamp-3 leading-relaxed">
                            {member.bio}
                          </p>
                        )}
                      </div>

                      {/* Social Links */}
                      {member.social && (
                        <div className="mt-auto pt-4 border-t border-gray-200 flex items-center space-x-3">
                          {member.social.email && (
                            <a
                              href={`mailto:${member.social.email}`}
                              className="p-2 bg-primary-50 text-primary-600 rounded-lg hover:bg-primary-100 transition-all hover:scale-110"
                              aria-label={`Enviar email para ${member.name}`}
                            >
                              <Mail className="h-4 w-4" />
                            </a>
                          )}
                          {member.social.linkedin && (
                            <a
                              href={member.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all hover:scale-110"
                              aria-label={`LinkedIn de ${member.name}`}
                            >
                              <Linkedin className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </Card3D>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum membro encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Detalhes do Membro */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-500/95 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.3 }}
              className="relative w-full h-full sm:w-auto sm:h-auto sm:max-w-4xl sm:max-h-[90vh] bg-white sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botão Fechar - Topo (sempre visível) */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white active:bg-gray-100 transition-colors shadow-lg touch-manipulation"
                aria-label="Fechar"
              >
                <X className="h-6 w-6 sm:h-7 sm:w-7 text-gray-900" />
              </button>
              
              {/* Conteúdo Scrollável */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Imagem - Mobile: menor, Desktop: lateral */}
                  <div className="relative w-full h-64 sm:h-80 md:h-auto md:w-1/2 md:min-h-[500px] bg-gradient-to-br from-primary-500 to-secondary-500 flex-shrink-0">
                    <Image
                      src={selectedMember.image || '/placeholder-avatar.jpg'}
                      alt={selectedMember.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-500/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-dark-500/40" />
                  </div>
                  
                  {/* Conteúdo do Modal */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-12">
                    <div className="mb-4 sm:mb-6">
                      <div className="flex items-center mb-2 sm:mb-3">
                        <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 mr-2 flex-shrink-0" />
                        <span className="text-xs sm:text-sm font-medium text-primary-600">{selectedMember.role}</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 pr-10 sm:pr-0">
                        {selectedMember.name}
                      </h2>
                      {selectedMember.bio && (
                        <div className="space-y-3 sm:space-y-4">
                          <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary-300" />
                          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                            {selectedMember.bio}
                          </p>
                        </div>
                      )}
                    </div>

                    {selectedMember.social && (
                      <div className="pt-4 sm:pt-6 border-t border-gray-200">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                          <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 mr-2 flex-shrink-0" />
                          Contato
                        </h3>
                        <div className="space-y-2 sm:space-y-3">
                          {selectedMember.social.email && (
                            <a
                              href={`mailto:${selectedMember.social.email}`}
                              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-primary-50 active:bg-primary-100 transition-colors group touch-manipulation min-h-[52px]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Mail className="h-5 w-5 text-primary-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                              <span className="text-sm sm:text-base text-gray-700 group-hover:text-primary-600 break-all">{selectedMember.social.email}</span>
                            </a>
                          )}
                          {selectedMember.social.linkedin && (
                            <a
                              href={selectedMember.social.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors group touch-manipulation min-h-[52px]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Linkedin className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform flex-shrink-0" />
                              <span className="text-sm sm:text-base text-gray-700 group-hover:text-blue-600">LinkedIn</span>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Botão Fechar Móvel - Rodapé (apenas mobile) */}
              <div className="sm:hidden border-t border-gray-200 p-4 bg-gray-50">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 active:bg-primary-800 transition-colors touch-manipulation"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

