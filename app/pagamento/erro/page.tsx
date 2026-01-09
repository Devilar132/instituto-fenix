import { Metadata } from 'next'
import Link from 'next/link'
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'

export const metadata: Metadata = {
  title: 'Erro no Pagamento - Instituto Fenix',
  description: 'Houve um problema com seu pagamento.',
}

export default function PagamentoErroPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="container-custom max-w-2xl">
        <Card>
          <CardContent className="p-12 text-center">
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Erro no Pagamento
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Não foi possível processar seu pagamento. Por favor, tente novamente.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-6 text-left">
              <p className="text-sm text-gray-700">
                <strong>Possíveis causas:</strong>
              </p>
              <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                <li>Dados do cartão incorretos</li>
                <li>Saldo insuficiente</li>
                <li>Problema temporário com o processador</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pagamento">
                <Button variant="primary" size="lg" icon={RefreshCw} iconPosition="left">
                  Tentar Novamente
                </Button>
              </Link>
              <Link href="/como-ajudar">
                <Button variant="outline" size="lg" icon={ArrowLeft} iconPosition="left">
                  Voltar
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
