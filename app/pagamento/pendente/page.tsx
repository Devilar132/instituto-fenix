import { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Pagamento Pendente - Instituto Fenix',
  description: 'Seu pagamento está sendo processado.',
}

export default function PagamentoPendentePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="container-custom max-w-2xl">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-12 w-12 text-yellow-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Pagamento Pendente
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Seu pagamento está sendo processado. Isso pode levar alguns minutos.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6 text-left">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">
                    Você receberá um e-mail quando o pagamento for confirmado
                  </p>
                  <p className="text-sm text-gray-600">
                    Verifique sua caixa de entrada nas próximas horas.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="primary" size="lg" icon={ArrowLeft} iconPosition="left">
                  Voltar ao Início
                </Button>
              </Link>
              <Link href="/projetos">
                <Button variant="outline" size="lg">
                  Ver Projetos
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
