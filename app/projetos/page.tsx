import { Metadata } from 'next'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Conheça todos os projetos do Instituto Fenix: artes cênicas, educação, assistência social e cultura em Recife.',
}

export default function ProjetosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Nossos Projetos</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100">
              Conheça as iniciativas que transformam vidas através da arte, cultura e educação
            </p>
          </div>
        </div>
      </section>
      <ProjectsGrid />
    </div>
  )
}

