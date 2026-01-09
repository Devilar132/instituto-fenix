import { Metadata } from 'next'
import Image from 'next/image'
import { Calendar, MapPin, Clock, DollarSign } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { mockEvents } from '@/lib/data/mock'
import { formatDate } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export const metadata: Metadata = {
  title: 'Eventos',
  description:
    'Confira os próximos eventos do Instituto Fenix: oficinas, apresentações, cursos e muito mais em Recife.',
}

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Próximos Eventos</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100">
              Participe dos nossos eventos e faça parte da transformação
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {mockEvents.map((event) => (
              <Card key={event.id} hover className="overflow-hidden">
                {event.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-primary-600 uppercase">
                      {event.category}
                    </span>
                    {event.free ? (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        Gratuito
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        R$ {event.price?.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <CardTitle>{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      <Calendar className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">
                          {format(new Date(event.startDate), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(event.startDate), "HH:mm", { locale: ptBR })}
                          {event.endDate && ` - ${format(new Date(event.endDate), "HH:mm", { locale: ptBR })}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">{event.location}</p>
                        {event.address && (
                          <p className="text-xs text-gray-500">{event.address}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardContent>
                  {event.registrationRequired ? (
                    <Button className="w-full" variant="primary">
                      {event.registrationUrl ? 'Inscrever-se' : 'Em Breve'}
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline">
                      Ver Detalhes
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {mockEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Não há eventos programados no momento.
              </p>
              <p className="text-gray-400 mt-2">
                Fique atento às nossas redes sociais para novidades!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

