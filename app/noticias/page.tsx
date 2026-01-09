import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, User, ArrowRight, Tag } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { mockNews } from '@/lib/data/mock'
import { formatDate } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const metadata: Metadata = {
  title: 'Notícias - Instituto Fenix',
  description:
    'Acompanhe as últimas notícias, atualizações e novidades do Instituto Fenix. Fique por dentro dos nossos projetos, eventos e conquistas.',
}

export default function NoticiasPage() {
  const categories = Array.from(new Set(mockNews.map((news) => news.category)))

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
              Notícias e{' '}
              <span className="text-gradient-animated">Atualizações</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-100">
              Fique por dentro de tudo que acontece no Instituto Fenix
            </p>
          </div>
        </div>
      </section>

      {/* Featured News */}
      {mockNews.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {mockNews.slice(0, 1).map((news) => (
                <Link
                  key={news.id}
                  href={`/noticias/${news.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
                      <Image
                        src={news.image || '/placeholder.jpg'}
                        alt={news.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-500/90 via-dark-500/50 to-transparent" />
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <span className="px-2 sm:px-3 py-1 bg-primary-500 text-white text-xs sm:text-sm font-semibold rounded-full">
                          Destaque
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm mb-2 sm:mb-3 opacity-90">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            {format(new Date(news.publishedAt), "dd 'de' MMMM 'de' yyyy", {
                              locale: ptBR,
                            })}
                          </span>
                          {news.author && (
                            <span className="flex items-center gap-1">
                              <User className="h-3 w-3 sm:h-4 sm:w-4" />
                              {news.author}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary-300 transition-colors line-clamp-2">
                          {news.title}
                        </h2>
                        <p className="text-sm sm:text-base text-gray-200 line-clamp-2">{news.excerpt}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 justify-center px-4">
            <button className="px-4 sm:px-6 py-2 bg-primary-600 text-white rounded-full text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transition-all">
              Todas
            </button>
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 sm:px-6 py-2 bg-white text-gray-700 rounded-full text-sm sm:text-base font-medium hover:bg-primary-50 hover:text-primary-600 transition-all shadow-md hover:shadow-lg"
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mockNews.slice(1).map((news) => (
              <Link
                key={news.id}
                href={`/noticias/${news.id}`}
                className="group"
              >
                <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={news.image || '/placeholder.jpg'}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-600 text-xs font-semibold rounded-full">
                        {news.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(news.publishedAt), 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                      </span>
                      {news.author && (
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {news.author}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>
                    {news.tags && news.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {news.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-md flex items-center gap-1"
                          >
                            <Tag className="h-3 w-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                      Ler mais
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-4xl font-bold mb-4">
            Quer receber nossas notícias?
          </h2>
          <p className="text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
            Inscreva-se em nossa newsletter e receba atualizações diretamente no
            seu e-mail
          </p>
          <Link href="/contato">
            <Button size="lg" variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
              Inscrever-se na Newsletter
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

