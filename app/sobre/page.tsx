import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Target, Eye, Heart, Users, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Sobre Nós',
  description:
    'Conheça o Instituto Fenix, nossa missão, visão, valores e equipe. Transformando vidas através da arte e cultura em Recife.',
}

const values = [
  {
    icon: Heart,
    title: 'Compromisso Social',
    description:
      'Trabalhamos com dedicação para transformar vidas e comunidades através de ações concretas e efetivas.',
  },
  {
    icon: Users,
    title: 'Inclusão',
    description:
      'Acreditamos que todos têm direito ao acesso à cultura, educação e oportunidades de desenvolvimento.',
  },
  {
    icon: Target,
    title: 'Excelência',
    description:
      'Buscamos sempre a excelência em nossos projetos e atividades, garantindo qualidade e impacto positivo.',
  },
  {
    icon: Eye,
    title: 'Transparência',
    description:
      'Mantemos total transparência em nossas ações, prestação de contas e uso de recursos.',
  },
]

export default function SobrePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Sobre o Instituto Fenix</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100">
              Transformando vidas através da arte, cultura e educação desde 2022
            </p>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Nossa História</h2>
              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700">
                <p>
                  Fundado em 22 de março de 2022, o Instituto Fenix nasceu da paixão pela arte 
                  e do compromisso com a transformação social em Recife, Pernambuco.
                </p>
                <p>
                  Desde o início, nossa missão tem sido democratizar o acesso à cultura e educação, 
                  oferecendo oportunidades para pessoas de todas as idades e origens desenvolverem 
                  suas habilidades artísticas e criativas.
                </p>
                <p>
                  Ao longo dos anos, desenvolvemos projetos que impactam diretamente a vida de 
                  centenas de pessoas, promovendo não apenas o aprendizado técnico, mas também 
                  o desenvolvimento pessoal, a autoestima e o senso de comunidade.
                </p>
              </div>
            </div>
            <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"
                alt="Instituto Fenix - Sede"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-500/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <Card>
              <CardHeader>
                <Target className="h-12 w-12 text-primary-600 mb-4" />
                <CardTitle className="text-2xl">Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Promover educação, cultura e assistência social através de artes cênicas, 
                  projetos educacionais e ações sociais, transformando vidas e fortalecendo 
                  comunidades em Recife e região metropolitana.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="h-12 w-12 text-secondary-600 mb-4" />
                <CardTitle className="text-2xl">Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Ser referência em projetos culturais e educacionais em Pernambuco, 
                  reconhecido pelo impacto positivo na vida das pessoas e pelo compromisso 
                  com a transformação social através da arte e da cultura.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nossos <span className="gradient-text">Valores</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Os princípios que guiam todas as nossas ações e decisões
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.title} hover className="text-center">
                  <CardHeader>
                    <div className="flex justify-center mb-3 sm:mb-4">
                      <div className="p-3 sm:p-4 bg-primary-50 rounded-full">
                        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary-600" />
                      </div>
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Teoria da Mudança */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-6">
                  <Target className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Nossa Teoria da Mudança
                  </h2>
                  <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                    Entenda como transformamos vidas através da arte, cultura e educação.
                    Conheça nossa metodologia estratégica e o processo de transformação social.
                  </p>
                  <Link
                    href="/institucional/teoria-mudanca"
                    className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Conhecer Teoria da Mudança
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Onde Estamos</h2>
              <p className="text-xl text-gray-600">
                Venha nos visitar em nossa sede
              </p>
            </div>
            <Card>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Endereço</h3>
                    <p className="text-gray-700">
                      Rua dos Coelhos, 485, Casa 0485<br />
                      Coelhos, Recife-PE<br />
                      CEP: 50070-545
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Contato</h3>
                    <p className="text-gray-700">
                      Telefone: <a href="tel:+558186089100" className="text-primary-600 hover:underline">(81) 3033-5066</a><br />
                      E-mail: <a href="mailto:contato@fenixpe.org" className="text-primary-600 hover:underline">contato@fenixpe.org</a>
                    </p>
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

