import { Metadata } from 'next'
import Link from 'next/link'
import { Heart, HandHeart, Users, Building2, Gift } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { DonationForm } from '@/components/sections/DonationForm'

export const metadata: Metadata = {
  title: 'Como Ajudar',
  description:
    'Descubra como você pode ajudar o Instituto Fenix: doações, voluntariado, parcerias e outras formas de contribuir.',
}

const waysToHelp = [
  {
    icon: Heart,
    title: 'Doações Financeiras',
    description:
      'Sua doação ajuda a manter nossos projetos e atividades. Qualquer valor faz a diferença!',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    icon: Users,
    title: 'Voluntariado',
    description:
      'Doe seu tempo e talento. Seja voluntário em nossos projetos e eventos.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Building2,
    title: 'Parcerias',
    description:
      'Empresas e organizações podem se tornar parceiras e apoiar nossos projetos.',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Gift,
    title: 'Doação de Materiais',
    description:
      'Aceitamos doações de materiais artísticos, educacionais e outros recursos.',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
]

export default function ComoAjudarPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center px-4">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <HandHeart className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Como Ajudar</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100">
              Existem várias formas de contribuir com o Instituto Fenix e fazer parte da transformação
            </p>
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {waysToHelp.map((way) => {
              const Icon = way.icon
              return (
                <Card key={way.title} hover className="text-center">
                  <CardHeader>
                    <div className={`flex justify-center mb-4 ${way.bgColor} rounded-full p-4 w-16 h-16 mx-auto`}>
                      <Icon className={`h-8 w-8 ${way.color}`} />
                    </div>
                    <CardTitle className="text-xl">{way.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{way.description}</CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">
                Faça uma <span className="gradient-text">Doação</span>
              </h2>
              <p className="text-xl text-gray-600">
                Sua contribuição ajuda a transformar vidas através da arte e cultura
              </p>
            </div>
            <DonationForm />
          </div>
        </div>
      </section>

      {/* Volunteer Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Seja um Voluntário</h2>
              <p className="text-xl text-gray-600">
                Participe dos nossos projetos e faça a diferença na comunidade
              </p>
            </div>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Como Funciona</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        <span>Preencha o formulário de interesse</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        <span>Nossa equipe entrará em contato</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        <span>Participe de uma reunião de apresentação</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">✓</span>
                        <span>Comece a fazer parte da transformação!</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t">
                    <Link href="/contato">
                      <Button size="lg" className="w-full" variant="primary">
                        Quero Ser Voluntário
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Parcerias</h2>
              <p className="text-xl text-gray-600">
                Empresas e organizações podem apoiar nossos projetos
              </p>
            </div>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Benefícios de Ser Parceiro</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Visibilidade da marca em nossos eventos e materiais</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Certificado de parceria social</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Relatórios de impacto dos projetos apoiados</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>Participação em eventos exclusivos</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-6 border-t">
                    <Link href="/contato">
                      <Button size="lg" className="w-full" variant="outline">
                        Quero Ser Parceiro
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

