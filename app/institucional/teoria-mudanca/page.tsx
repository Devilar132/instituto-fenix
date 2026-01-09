import { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Target, Users, Heart, TrendingUp, CheckCircle, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { TheoryOfChange } from '@/components/sections/TheoryOfChange'
import { SDGsSection } from '@/components/sections/SDGs'
import { AudiencesPartners } from '@/components/sections/AudiencesPartners'
import { ImpactFlow } from '@/components/sections/ImpactFlow'
import { ExpectedResults } from '@/components/sections/ExpectedResults'

export const metadata: Metadata = {
  title: 'Teoria da Mudança - Instituto Fenix',
  description:
    'Conheça nossa Teoria da Mudança: como transformamos vidas através da arte, cultura e educação em Recife. Entenda nosso processo de transformação social.',
}

const changeStages = [
  {
    id: '1',
    title: 'Situação Inicial',
    description: 'Pessoas em situação de vulnerabilidade social, sem acesso à cultura e educação',
    iconName: 'Users',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    challenges: [
      'Falta de acesso à cultura e arte',
      'Baixa autoestima e autoconfiança',
      'Poucas oportunidades de desenvolvimento',
      'Isolamento social',
    ],
  },
  {
    id: '2',
    title: 'Nossas Intervenções',
    description: 'Projetos e programas que criamos para promover a transformação',
    iconName: 'Sparkles',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50',
    interventions: [
      {
        name: 'Teatro na Comunidade',
        description: 'Apresentações teatrais gratuitas e oficinas de teatro',
        impact: '1500+ pessoas impactadas',
      },
      {
        name: 'Arte e Educação',
        description: 'Oficinas de artes plásticas, música e teatro em escolas públicas',
        impact: '800+ estudantes beneficiados',
      },
      {
        name: 'Casa de Acolhimento',
        description: 'Suporte social, psicológico e material para famílias',
        impact: '300+ famílias atendidas',
      },
    ],
  },
  {
    id: '3',
    title: 'Resultados Imediatos',
    description: 'Mudanças observadas durante e logo após as intervenções',
    iconName: 'CheckCircle',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    results: [
      'Participação ativa em atividades culturais',
      'Desenvolvimento de habilidades artísticas',
      'Melhoria na autoestima e autoconfiança',
      'Criação de vínculos sociais',
      'Acesso a novos conhecimentos',
    ],
  },
  {
    id: '4',
    title: 'Impacto de Longo Prazo',
    description: 'Transformações duradouras na vida das pessoas e comunidades',
    iconName: 'TrendingUp',
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-50',
    impacts: [
      {
        title: 'Desenvolvimento Pessoal',
        description: 'Maior autoconfiança, autoestima e senso de identidade',
      },
      {
        title: 'Inserção Social',
        description: 'Melhor integração na comunidade e criação de redes de apoio',
      },
      {
        title: 'Oportunidades',
        description: 'Acesso a novas oportunidades educacionais e profissionais',
      },
      {
        title: 'Transformação Comunitária',
        description: 'Comunidades mais fortalecidas e unidas',
      },
    ],
  },
]

const indicators = [
  {
    label: 'Pessoas Impactadas',
    value: '2.600+',
    description: 'Pessoas que participaram dos nossos projetos',
  },
  {
    label: 'Eventos Realizados',
    value: '36+',
    description: 'Apresentações, oficinas e eventos culturais',
  },
  {
    label: 'Projetos Ativos',
    value: '3',
    description: 'Projetos em execução transformando vidas',
  },
  {
    label: 'Parcerias',
    value: '16+',
    description: 'Organizações e empresas parceiras',
  },
]

export default function TeoriaMudancaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white overflow-hidden">
        {/* Background Pattern */}
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
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl" />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm border-2 border-white/30">
                <Target className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Teoria da <span className="text-gradient-animated">Mudança</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
              Entenda como transformamos vidas através da arte, cultura e educação.
              Nossa abordagem estratégica para criar impacto social positivo em Recife.
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-4xl font-bold mb-6 text-center">
                O que é a Teoria da Mudança?
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  A <strong>Teoria da Mudança</strong> do Instituto Fenix é nossa
                  metodologia estratégica que explica <em>como</em> e <em>por que</em> nossas
                  intervenções levam aos resultados desejados. É um mapa visual que conecta
                  nossas ações aos impactos que buscamos gerar.
                </p>
                <p>
                  Através de projetos de arte, cultura e educação, criamos um caminho de
                  transformação que vai desde a situação inicial de vulnerabilidade até o
                  desenvolvimento pessoal e comunitário duradouro.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Journey */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nossa Jornada de <span className="gradient-text">Transformação</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Um processo estruturado em 4 etapas fundamentais
            </p>
          </div>

          <TheoryOfChange stages={changeStages} />
        </div>
      </section>

      {/* Indicators Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Indicadores de <span className="gradient-text">Impacto</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Números que comprovam nossa transformação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {indicators.map((indicator, index) => (
              <Card
                key={indicator.label}
                className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="text-5xl font-bold text-primary-600 mb-2">
                    {indicator.value}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {indicator.label}
                  </h3>
                  <p className="text-gray-600 text-sm">{indicator.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDGs Section */}
      <SDGsSection />

      {/* Públicos e Parceiros - Versão Premium */}
      <AudiencesPartners />

      {/* Resultados Esperados - Versão Premium */}
      <ExpectedResults />

      {/* Fluxo de Impactos - Versão Premium */}
      <ImpactFlow />

      {/* Principles Section */}
      <section className="section-padding bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Princípios <span className="gradient-text">Fundamentais</span>
              </h2>
              <p className="text-xl text-gray-600">
                Valores que guiam nossa Teoria da Mudança
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-2 border-primary-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Heart className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Humanização</h3>
                      <p className="text-gray-700">
                        Cada pessoa é única. Nossos projetos respeitam a individualidade
                        e promovem o desenvolvimento integral do ser humano.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary-100 rounded-lg">
                      <Users className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Participação Ativa</h3>
                      <p className="text-gray-700">
                        Acreditamos que a transformação acontece quando as pessoas são
                        protagonistas de sua própria história.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-primary-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Target className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Impacto Mensurável</h3>
                      <p className="text-gray-700">
                        Monitoramos e avaliamos constantemente nossos resultados para
                        garantir que estamos gerando transformação real.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-secondary-100 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-secondary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Sustentabilidade</h3>
                      <p className="text-gray-700">
                        Buscamos criar mudanças duradouras que se perpetuem além da
                        nossa intervenção direta.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Faça Parte Desta Transformação
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Sua participação é fundamental para continuarmos transformando vidas
            através da arte e cultura
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/como-ajudar"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
            >
              Fazer uma Doação
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="/contato"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
            >
              Seja Voluntário
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

