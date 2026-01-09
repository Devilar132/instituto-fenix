'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, QrCode, Loader2, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

interface CheckoutProPaymentProps {
  amount: number
  donorName: string
  donorEmail: string
  donorPhone?: string
  description?: string
  projectId?: string
  anonymous?: boolean
  paymentMethod?: 'pix' | 'card' | 'all'
}

export function CheckoutProPayment({
  amount,
  donorName,
  donorEmail,
  donorPhone,
  description,
  projectId,
  anonymous,
  paymentMethod = 'all',
}: CheckoutProPaymentProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePayment = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          donorName,
          donorEmail,
          donorPhone,
          description: description || 'Doação para Instituto Fenix',
          projectId,
          anonymous,
          preferredPaymentMethod: paymentMethod,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar pagamento')
      }

      // Redirecionar para Checkout Pro do Mercado Pago
      // Usa sandbox_init_point se estiver em localhost, senão init_point
      const checkoutUrl = 
        window.location.hostname === 'localhost' 
          ? data.sandboxInitPoint || data.initPoint
          : data.initPoint || data.sandboxInitPoint

      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        throw new Error('URL de checkout não disponível')
      }
    } catch (err: any) {
      console.error('Erro ao processar pagamento:', err)
      setError(err.message || 'Erro ao processar pagamento. Tente novamente.')
      setIsLoading(false)
    }
  }

  const getMethodInfo = () => {
    if (paymentMethod === 'pix') {
      return {
        icon: QrCode,
        title: 'Pagamento via PIX',
        description: 'Você será redirecionado para escolher PIX',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
      }
    }
    if (paymentMethod === 'card') {
      return {
        icon: CreditCard,
        title: 'Pagamento com Cartão',
        description: 'Você será redirecionado para inserir os dados do cartão',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
      }
    }
    return {
      icon: CreditCard,
      title: 'Escolher Método de Pagamento',
      description: 'Você será redirecionado para escolher PIX ou Cartão',
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    }
  }

  const methodInfo = getMethodInfo()
  const Icon = methodInfo.icon

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Icon className={`h-6 w-6 ${methodInfo.color} mr-2`} />
          {methodInfo.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Resumo */}
        <div className={`${methodInfo.bgColor} border-2 border-primary-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Valor da Doação</p>
              <p className="text-xl sm:text-2xl font-bold text-primary-600">{formatCurrency(amount)}</p>
            </div>
            <div className="flex items-center space-x-2 text-primary-600">
              <ExternalLink className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm font-semibold">Checkout Seguro</span>
            </div>
          </div>
        </div>

        {/* Descrição */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-700">
            {methodInfo.description}. O pagamento será processado de forma segura pelo Mercado Pago.
          </p>
        </div>

        {/* Dados do Doador */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Dados do Doador</p>
          <p className="text-xs sm:text-sm text-gray-600 break-words">Nome: {donorName}</p>
          <p className="text-xs sm:text-sm text-gray-600 break-words">E-mail: {donorEmail}</p>
        </div>

        {/* Erro */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}

        {/* Botão */}
        <Button
          onClick={handlePayment}
          disabled={isLoading || amount <= 0}
          size="lg"
          className="w-full"
          variant="primary"
          icon={isLoading ? Loader2 : ExternalLink}
          iconPosition="right"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Processando...
            </>
          ) : (
            `Pagar ${formatCurrency(amount)}`
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Você será redirecionado para a página segura do Mercado Pago.
        </p>
      </CardContent>
    </Card>
  )
}
