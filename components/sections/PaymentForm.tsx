'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CreditCard, Lock, Calendar, User, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(1, 'Número do cartão é obrigatório')
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, 'Número do cartão inválido'),
  cardName: z.string().min(1, 'Nome no cartão é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  expiryDate: z
    .string()
    .min(1, 'Data de validade é obrigatória')
    .regex(/^\d{2}\/\d{2}$/, 'Data inválida (use MM/AA)'),
  cvv: z.string().min(1, 'CVV é obrigatório').regex(/^\d{3,4}$/, 'CVV inválido'),
  installments: z.number().min(1).max(12),
})

type PaymentFormData = z.infer<typeof paymentSchema>

export function PaymentForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Obter dados da doação da URL
  const amount = parseFloat(searchParams.get('amount') || '0')
  const donorName = searchParams.get('name') || ''
  const donorEmail = searchParams.get('email') || ''

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, touchedFields },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    mode: 'onBlur',
    defaultValues: {
      installments: 1,
    },
  })

  const cardNumber = watch('cardNumber')
  const installments = watch('installments') || 1

  // Máscara para número do cartão
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const match = cleaned.match(/.{1,4}/g)
    return match ? match.join(' ') : cleaned
  }

  // Máscara para data de validade
  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    return cleaned
  }

  // Calcular valor da parcela
  const installmentValue = amount / installments

  const onSubmit = async (data: PaymentFormData) => {
    setIsProcessing(true)
    try {
      // Simulação de processamento de pagamento
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Aqui você integraria com gateway de pagamento (Stripe, PagSeguro, etc.)
      console.log('Dados do pagamento:', {
        ...data,
        amount,
        donorName,
        donorEmail,
      })

      setIsSuccess(true)

      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push('/como-ajudar?success=true')
      }, 3000)
    } catch (error) {
      console.error('Erro ao processar pagamento:', error)
      alert('Erro ao processar pagamento. Tente novamente.')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="mb-6"
          >
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pagamento Realizado com Sucesso!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Obrigado pela sua doação de <span className="font-bold text-primary-600">{formatCurrency(amount)}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Você receberá um e-mail de confirmação em breve. Redirecionando...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CreditCard className="h-6 w-6 text-primary-600 mr-2" />
          Dados do Cartão
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Resumo da Doação */}
        <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Valor da Doação</p>
              <p className="text-2xl font-bold text-primary-600">{formatCurrency(amount)}</p>
            </div>
            {installments > 1 && (
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  {installments}x de {formatCurrency(installmentValue)}
                </p>
                <p className="text-xs text-gray-500">sem juros</p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Número do Cartão */}
          <div>
            <Input
              label="Número do Cartão"
              placeholder="0000 0000 0000 0000"
              maxLength={19}
              {...register('cardNumber', {
                onChange: (e) => {
                  const formatted = formatCardNumber(e.target.value)
                  e.target.value = formatted
                },
              })}
              error={touchedFields.cardNumber && errors.cardNumber ? errors.cardNumber.message : undefined}
              icon={CreditCard}
            />
            {cardNumber && (
              <div className="mt-2 flex gap-2">
                {cardNumber.replace(/\s/g, '').startsWith('4') && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Visa</span>
                )}
                {cardNumber.replace(/\s/g, '').startsWith('5') && (
                  <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Mastercard</span>
                )}
              </div>
            )}
          </div>

          {/* Nome no Cartão */}
          <Input
            label="Nome no Cartão"
            placeholder="Nome como está no cartão"
            {...register('cardName')}
            error={touchedFields.cardName && errors.cardName ? errors.cardName.message : undefined}
            icon={User}
          />

          {/* Data de Validade e CVV */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Data de Validade"
              placeholder="MM/AA"
              maxLength={5}
              {...register('expiryDate', {
                onChange: (e) => {
                  const formatted = formatExpiryDate(e.target.value)
                  e.target.value = formatted
                },
              })}
              error={touchedFields.expiryDate && errors.expiryDate ? errors.expiryDate.message : undefined}
              icon={Calendar}
            />
            <Input
              label="CVV"
              placeholder="123"
              type="password"
              maxLength={4}
              {...register('cvv')}
              error={touchedFields.cvv && errors.cvv ? errors.cvv.message : undefined}
              icon={Lock}
            />
          </div>

          {/* Parcelas */}
          {amount >= 100 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parcelas</label>
              <select
                {...register('installments', { valueAsNumber: true })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {Array.from({ length: Math.min(12, Math.floor(amount / 10)) }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>
                    {num}x de {formatCurrency(amount / num)} {num === 1 ? '(à vista)' : 'sem juros'}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Informações do Doador */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">Dados do Doador</p>
            <p className="text-sm text-gray-600">Nome: {donorName}</p>
            <p className="text-sm text-gray-600">E-mail: {donorEmail}</p>
          </div>

          {/* Botão de Submit */}
          <Button
            type="submit"
            disabled={isProcessing || amount <= 0}
            size="lg"
            className="w-full"
            variant="primary"
            icon={Lock}
            iconPosition="right"
          >
            {isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Processando Pagamento...
              </>
            ) : (
              `Pagar ${formatCurrency(amount)}`
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Ao continuar, você concorda com nossos termos de uso e política de privacidade.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

