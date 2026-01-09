import { Metadata } from 'next'
import { FAQSection } from '@/components/sections/FAQ'
import { mockFAQs } from '@/lib/data/mock'

export const metadata: Metadata = {
  title: 'Perguntas Frequentes - Instituto Fenix',
  description:
    'Encontre respostas para as perguntas mais frequentes sobre doações, voluntariado, projetos e muito mais.',
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Perguntas <span className="text-gradient-animated">Frequentes</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Encontre respostas rápidas para suas dúvidas
            </p>
          </div>
        </div>
      </section>

      <FAQSection
        faqs={mockFAQs}
        title="Tire suas Dúvidas"
        description="Encontre respostas para as perguntas mais comuns sobre o Instituto Fenix"
      />
    </div>
  )
}

