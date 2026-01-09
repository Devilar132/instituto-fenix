'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, QrCode, Building2, CheckCircle, Copy, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/Card'
import { formatCurrency } from '@/lib/utils'
import { CardPayment } from './CardPayment'
import { PixPayment } from './PixPayment'
import { PixPaymentMercadoPago } from './PixPaymentMercadoPago'
import { CheckoutProPayment } from './CheckoutProPayment'
import { BankTransferPayment } from './BankTransferPayment'

type PaymentMethod = 'card' | 'pix' | 'transfer'

const paymentMethods = [
  {
    id: 'card' as PaymentMethod,
    name: 'Cartão',
    icon: CreditCard,
    description: 'Crédito ou Débito',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    id: 'pix' as PaymentMethod,
    name: 'PIX',
    icon: QrCode,
    description: 'Pagamento instantâneo',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    id: 'transfer' as PaymentMethod,
    name: 'Transferência',
    icon: Building2,
    description: 'Transferência bancária',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
]

export function PaymentMethods() {
  const searchParams = useSearchParams()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card')
  const [isSuccess, setIsSuccess] = useState(false)

  const amount = parseFloat(searchParams.get('amount') || '0')
  const donorName = searchParams.get('name') || ''
  const donorEmail = searchParams.get('email') || ''

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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Pagamento Confirmado!</h2>
          <p className="text-lg text-gray-600 mb-6">
            Obrigado pela sua doação de <span className="font-bold text-primary-600">{formatCurrency(amount)}</span>
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Você receberá um e-mail de confirmação em breve.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Métodos de Pagamento - Tabs */}
      <div className="bg-white rounded-lg shadow-md p-1.5 sm:p-2">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            const isSelected = selectedMethod === method.id
            return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`
                  relative p-2 sm:p-3 md:p-4 rounded-lg transition-all duration-300
                  ${isSelected 
                    ? `${method.bgColor} ${method.borderColor} border-2 shadow-md` 
                    : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }
                `}
              >
                <motion.div
                  initial={false}
                  animate={{
                    scale: isSelected ? 1.05 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center space-y-1 sm:space-y-2"
                >
                  <Icon className={`h-5 w-5 sm:h-6 sm:w-6 ${isSelected ? method.color : 'text-gray-400'}`} />
                  <div className="text-center">
                    <p className={`font-semibold text-xs sm:text-sm ${isSelected ? method.color : 'text-gray-600'}`}>
                      {method.name}
                    </p>
                    <p className={`text-[10px] sm:text-xs hidden sm:block ${isSelected ? 'text-gray-600' : 'text-gray-400'}`}>
                      {method.description}
                    </p>
                  </div>
                </motion.div>
                {isSelected && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute bottom-0 left-0 right-0 h-1 ${method.bgColor} rounded-b-lg`}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Conteúdo do Método Selecionado */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedMethod}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {selectedMethod === 'card' && (
            <CheckoutProPayment
              amount={amount}
              donorName={donorName}
              donorEmail={donorEmail}
              description="Doação para Instituto Fenix"
              paymentMethod="card"
            />
          )}
          {selectedMethod === 'pix' && (
            <CheckoutProPayment
              amount={amount}
              donorName={donorName}
              donorEmail={donorEmail}
              description="Doação para Instituto Fenix"
              paymentMethod="pix"
            />
          )}
          {selectedMethod === 'transfer' && (
            <BankTransferPayment
              amount={amount}
              donorName={donorName}
              donorEmail={donorEmail}
              onSuccess={() => setIsSuccess(true)}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

