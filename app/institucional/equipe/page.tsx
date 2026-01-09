import { Metadata } from 'next'
import Image from 'next/image'
import { TeamMembersGrid } from '@/components/sections/TeamMembersGrid'
import { mockTeamMembers } from '@/lib/data/mock'

export const metadata: Metadata = {
  title: 'Nossa Equipe - Instituto Fenix',
  description:
    'Conheça a equipe do Instituto Fenix, profissionais dedicados que transformam vidas através da arte, cultura e educação em Recife.',
}

export default function EquipePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section com efeitos premium */}
      <section className="relative section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 L60 40 L80 45 L65 60 L68 80 L50 70 L32 80 L35 60 L20 45 L40 40 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="container-custom relative z-10 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6">
              Nossa <span className="text-gradient-animated">Equipe</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Profissionais apaixonados dedicados a transformar vidas através da arte, cultura e educação
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm sm:text-base">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{mockTeamMembers.length} Membros</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span>Profissionais Qualificados</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span>Comprometidos com o Impacto</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <TeamMembersGrid members={mockTeamMembers} />

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Faça Parte da Nossa Equipe
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 mb-6 sm:mb-8">
              Estamos sempre em busca de talentos apaixonados por transformação social. 
              Venha fazer parte desta jornada!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Entre em Contato
              </a>
              <a
                href="/como-ajudar"
                className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Seja Voluntário
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

