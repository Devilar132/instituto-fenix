'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { DonationFormData } from '@/types'
import { formatCurrency } from '@/lib/utils'

const donationSchema = z.object({
  amount: z.number({ required_error: 'Valor é obrigatório' }).min(10, 'Valor mínimo é R$ 10,00'),
  name: z.string().min(1, 'Nome é obrigatório').min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido'),
  phone: z.string().optional(),
  anonymous: z.boolean().default(false),
  project: z.string().optional(),
  message: z.string().optional(),
})

const presetAmounts = [50, 100, 250, 500, 1000]

export function DonationForm() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, touchedFields },
  } = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    mode: 'onBlur',
    shouldFocusError: false,
    defaultValues: {
      anonymous: false,
      name: '',
      email: '',
      amount: undefined,
    },
  })

  const amount = watch('amount')

  // Sincronizar selectedAmount com amount quando amount muda
  useEffect(() => {
    if (amount && presetAmounts.includes(amount)) {
      setSelectedAmount(amount)
    } else if (amount && !presetAmounts.includes(amount)) {
      setSelectedAmount(null)
    }
  }, [amount])

  const handlePresetClick = (value: number) => {
    setSelectedAmount(value)
    setValue('amount', value, { shouldValidate: false, shouldDirty: true })
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    
    // Se o campo está vazio, limpa tudo
    if (inputValue === '' || inputValue === null || inputValue === undefined) {
      setSelectedAmount(null)
      setValue('amount', undefined as any, { shouldValidate: false })
      return
    }
    
    const value = parseFloat(inputValue)
    
    // Se não é um número válido, limpa o valor
    if (isNaN(value) || !isFinite(value)) {
      setSelectedAmount(null)
      setValue('amount', undefined as any, { shouldValidate: false })
      return
    }
    
    // Atualiza o valor no form apenas se for um número válido
    setValue('amount', value, { shouldValidate: false })
    
    // Se o valor digitado corresponde a um preset, marca o botão
    if (presetAmounts.includes(value)) {
      setSelectedAmount(value)
    } else {
      // Se é um valor customizado, desmarca os botões preset
      setSelectedAmount(null)
    }
  }

  const onSubmit = async (data: DonationFormData) => {
    setIsSubmitting(true)
    try {
      // Preparar dados para redirecionamento
      const params = new URLSearchParams({
        amount: data.amount.toString(),
        name: data.name,
        email: data.email,
        ...(data.phone && { phone: data.phone }),
        ...(data.anonymous && { anonymous: 'true' }),
        ...(data.message && { message: data.message }),
      })

      // Redirecionar para página de pagamento
      window.location.href = `/pagamento?${params.toString()}`
    } catch (error) {
      console.error('Erro ao processar doação:', error)
      alert('Erro ao processar doação. Tente novamente.')
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="h-6 w-6 text-primary-600 mr-2" />
          Formulário de Doação
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Valor da Doação */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor da Doação (R$)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
              {presetAmounts.map((presetAmount) => (
                <button
                  key={presetAmount}
                  type="button"
                  onClick={() => handlePresetClick(presetAmount)}
                  className={`px-2 sm:px-4 py-2 border-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    selectedAmount === presetAmount
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 hover:border-primary-300 text-gray-700'
                  }`}
                >
                  R$ {presetAmount}
                </button>
              ))}
            </div>
            <Input
              type="number"
              step="0.01"
              min="10"
              placeholder="Ou digite outro valor (mínimo R$ 10,00)"
              {...register('amount', { 
                valueAsNumber: true,
                onChange: handleAmountChange,
              })}
              error={!!touchedFields.amount && errors.amount ? errors.amount.message : undefined}
            />
            {amount != null && typeof amount === 'number' && !isNaN(amount) && isFinite(amount) && amount >= 10 ? (
              <motion.p 
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-gray-600"
              >
                Valor selecionado: <span className="font-bold text-primary-600">{formatCurrency(amount)}</span>
              </motion.p>
            ) : null}
          </div>

          {/* Dados Pessoais */}
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Nome Completo"
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label="E-mail"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
          </div>

          <Input
            label="Telefone (opcional)"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
          />

          {/* Doação Anônima */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="anonymous"
              {...register('anonymous')}
              className="mr-2 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="text-sm text-gray-700">
              Fazer doação anônima
            </label>
          </div>

          {/* Mensagem (opcional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mensagem (opcional)
            </label>
            <textarea
              {...register('message')}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Deixe uma mensagem de apoio..."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting || !amount || amount < 10}
            size="lg"
            className="w-full"
            variant="primary"
            icon={Heart}
            iconPosition="right"
          >
            {isSubmitting ? 'Processando...' : 'Continuar para Pagamento'}
          </Button>

          <p className="text-xs text-gray-500 text-center">
            Seus dados estão seguros. Utilizamos criptografia SSL para proteger suas informações.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
