import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft, Tag, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { mockNews } from '@/lib/data/mock'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const news = mockNews.find((n) => n.id === params.id)

  if (!news) {
    return {
      title: 'Notícia não encontrada',
    }
  }

  return {
    title: `${news.title} - Instituto Fenix`,
    description: news.excerpt,
    openGraph: {
      title: news.title,
      description: news.excerpt,
      images: news.image ? [news.image] : [],
    },
  }
}

export default function NoticiaPage({ params }: PageProps) {
  const news = mockNews.find((n) => n.id === params.id)

  if (!news) {
    notFound()
  }

  const relatedNews = mockNews
    .filter((n) => n.id !== news.id && n.category === news.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <Image
          src={news.image || '/placeholder.jpg'}
          alt={news.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-500/90 via-dark-500/50 to-transparent" />
        <div className="absolute inset-0 container-custom flex items-end pb-12">
          <div className="max-w-4xl text-white">
            <div className="flex items-center gap-4 text-sm mb-4 opacity-90">
              <span className="px-3 py-1 bg-primary-500 rounded-full font-semibold">
                {news.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {format(new Date(news.publishedAt), "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </span>
              {news.author && (
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {news.author}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {news.title}
            </h1>
            <p className="text-xl text-gray-200">{news.excerpt}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/noticias" className="inline-flex items-center mb-8 text-primary-600 hover:text-primary-700 font-medium transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Notícias
            </Link>

            {/* Tags */}
            {news.tags && news.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {news.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-50 text-primary-600 text-sm rounded-full flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
                <div
                  className="text-gray-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: news.content
                      .split('\n')
                      .map((p) => `<p>${p}</p>`)
                      .join(''),
                  }}
                />
              </div>
            </div>

            {/* Share Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-12">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Compartilhe esta notícia</h3>
                  <p className="text-sm text-gray-600">
                    Ajude a espalhar nossa mensagem
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" icon={Share2}>
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>

            {/* Related News */}
            {relatedNews.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mb-8">Notícias Relacionadas</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedNews.map((related) => (
                    <Link
                      key={related.id}
                      href={`/noticias/${related.id}`}
                      className="group"
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all">
                        <div className="relative h-48 w-full overflow-hidden">
                          <Image
                            src={related.image || '/placeholder.jpg'}
                            alt={related.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {related.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {related.excerpt}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

