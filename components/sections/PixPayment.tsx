'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { QrCode, Copy, CheckCircle, Download, Clock, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

interface PixPaymentProps {
  amount: number
  donorName: string
  donorEmail: string
  onSuccess: () => void
}

// Dados do PIX (em produção, viriam de uma API)
const pixData = {
  qrCode: '00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5925INSTITUTO FENIX PE6009RECIFE61087200000062250521***6304ABCD',
  code: '00020126580014BR.GOV.BCB.PIX0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5925INSTITUTO FENIX PE6009RECIFE61087200000062250521***6304ABCD',
  expirationMinutes: 30,
}

export function PixPayment({ amount, donorName, donorEmail, onSuccess }: PixPaymentProps) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(pixData.expirationMinutes * 60)
  const [isPaid, setIsPaid] = useState(false)

  useEffect(() => {
    if (timeLeft > 0 && !isPaid) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, isPaid])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixData.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const handleDownloadQR = () => {
    // Em produção, baixaria o QR Code real
    alert('Download do QR Code iniciado!')
  }

  const handleConfirmPayment = () => {
    setIsPaid(true)
    setTimeout(() => {
      onSuccess()
    }, 2000)
  }

  if (isPaid) {
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Pagamento Confirmado!</h2>
          <p className="text-lg text-gray-600">
            Verificando o pagamento PIX...
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <QrCode className="h-6 w-6 text-green-600 mr-2" />
          Pagamento via PIX
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Resumo */}
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valor da Doação</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(amount)}</p>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <Sparkles className="h-6 w-6" />
              <span className="text-sm font-semibold">Instantâneo</span>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center space-x-2">
            <Clock className="h-5 w-5 text-red-600" />
            <p className="text-sm text-gray-700">
              Este QR Code expira em:{' '}
              <span className="font-bold text-red-600 text-lg">{formatTime(timeLeft)}</span>
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Escaneie o QR Code</h3>
            <p className="text-sm text-gray-600">Use o app do seu banco para escanear</p>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
              {/* QR Code Placeholder - Em produção, seria uma imagem real */}
              <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                <QrCode className="h-32 w-32 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadQR}
              icon={Download}
              iconPosition="left"
            >
              Baixar QR Code
            </Button>
          </div>
        </div>

        {/* Código PIX */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700">Código PIX (Copiar e Colar)</label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              icon={copied ? CheckCircle : Copy}
              iconPosition="left"
              className={copied ? 'bg-green-50 border-green-300 text-green-700' : ''}
            >
              {copied ? 'Copiado!' : 'Copiar'}
            </Button>
          </div>
          <div className="bg-white border border-gray-300 rounded-lg p-3">
            <p className="text-xs font-mono text-gray-700 break-all">{pixData.code}</p>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Como pagar:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Abra o app do seu banco</li>
            <li>Escaneie o QR Code ou cole o código PIX</li>
            <li>Confirme o pagamento</li>
            <li>Clique em "Já paguei" abaixo</li>
          </ol>
        </div>

        {/* Dados do Doador */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Dados do Doador</p>
          <p className="text-sm text-gray-600">Nome: {donorName}</p>
          <p className="text-sm text-gray-600">E-mail: {donorEmail}</p>
        </div>

        {/* Botão de Confirmação */}
        <Button
          size="lg"
          className="w-full"
          variant="primary"
          onClick={handleConfirmPayment}
          icon={CheckCircle}
          iconPosition="right"
        >
          Já paguei com PIX
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          Após confirmar, verificaremos o pagamento e enviaremos um e-mail de confirmação.
        </p>
      </CardContent>
    </Card>
  )
}

