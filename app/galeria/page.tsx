import { Metadata } from 'next'
import { Gallery } from '@/components/sections/Gallery'
import { mockGallery } from '@/lib/data/mock'

export const metadata: Metadata = {
  title: 'Galeria - Instituto Fenix',
  description:
    'Explore nossa galeria de fotos e vídeos. Veja os momentos especiais dos nossos eventos, projetos e atividades.',
}

export default function GaleriaPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 20 L60 40 L80 45 L65 60 L68 80 L50 70 L32 80 L35 60 L20 45 L40 40 Z' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Nossa <span className="text-gradient-animated">Galeria</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Momentos especiais capturados em cada projeto e evento
            </p>
          </div>
        </div>
      </section>

      <Gallery
        items={mockGallery}
        title="Fotos e Vídeos"
        description="Explore os melhores momentos dos nossos projetos, eventos e atividades"
      />
    </div>
  )
}

