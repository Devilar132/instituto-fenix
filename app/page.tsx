import { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ProjectsGrid } from '@/components/sections/ProjectsGrid'
import { Stats } from '@/components/sections/Stats'
import { CTA } from '@/components/sections/CTA'
import { Testimonials } from '@/components/sections/Testimonials'
import { PartnersCarousel } from '@/components/sections/PartnersCarousel'
import { mockTestimonials, mockPartners } from '@/lib/data/mock'

export const metadata: Metadata = {
  title: 'Início',
  description:
    'Instituto Fenix - Transformando vidas através da arte e cultura em Recife, Pernambuco. Projetos de educação, artes cênicas e assistência social.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <PartnersCarousel partners={mockPartners} />
      <ProjectsGrid />
      <Testimonials
        testimonials={mockTestimonials.slice(0, 3)}
        title="O que dizem sobre nós"
        description="Histórias reais de transformação"
        showControls={false}
      />
      <CTA />
    </>
  )
}

