'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { QrCode, Copy, CheckCircle, Download, Clock, Sparkles, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

interface PixPaymentMercadoPagoProps {
  amount: number
  donorName: string
  donorEmail: string
  donorPhone?: string
  description?: string
  projectId?: string
  anonymous?: boolean
  onSuccess: () => void
}

export function PixPaymentMercadoPago({
  amount,
  donorName,
  donorEmail,
  donorPhone,
  description,
  projectId,
  anonymous,
  onSuccess,
}: PixPaymentMercadoPagoProps) {
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30 * 60) // 30 minutos
  const [isPaid, setIsPaid] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pixData, setPixData] = useState<{
    qrCode: string
    qrCodeBase64: string
    paymentId: string
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  // Criar pagamento PIX ao montar o componente
  useEffect(() => {
    createPixPayment()
  }, [])

  const createPixPayment = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/payments/create-pix', {
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
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar pagamento PIX')
      }

      setPixData({
        qrCode: data.qrCode,
        qrCodeBase64: data.qrCodeBase64,
        paymentId: data.paymentId,
      })

      // Timer de 30 minutos
      setTimeLeft(30 * 60)
    } catch (err: any) {
      console.error('Erro ao criar PIX:', err)
      setError(err.message || 'Erro ao gerar código PIX. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  // Verificar status do pagamento
  const checkPaymentStatus = async () => {
    if (!pixData?.paymentId) return

    setIsChecking(true)
    try {
      const response = await fetch(`/api/payments/status/${pixData.paymentId}`)
      const data = await response.json()

      if (data.status === 'approved') {
        setIsPaid(true)
        setTimeout(() => {
          onSuccess()
        }, 2000)
      }
    } catch (err) {
      console.error('Erro ao verificar pagamento:', err)
    } finally {
      setIsChecking(false)
    }
  }

  useEffect(() => {
    if (timeLeft > 0 && !isPaid && pixData) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
        // Verificar pagamento a cada 10 segundos
        if (timeLeft % 10 === 0) {
          checkPaymentStatus()
        }
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [timeLeft, isPaid, pixData])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleCopy = async () => {
    if (!pixData?.qrCode) return
    try {
      await navigator.clipboard.writeText(pixData.qrCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const handleDownloadQR = () => {
    if (!pixData?.qrCodeBase64) return
    
    const link = document.createElement('a')
    link.href = `data:image/png;base64,${pixData.qrCodeBase64}`
    link.download = `pix-qrcode-${Date.now()}.png`
    link.click()
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
            Obrigado pela sua doação!
          </p>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Gerando código PIX...</p>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-800">{error}</p>
          </div>
          <Button onClick={createPixPayment} variant="primary" className="w-full">
            Tentar Novamente
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!pixData) {
    return null
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
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Valor da Doação</p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">{formatCurrency(amount)}</p>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-xs sm:text-sm font-semibold">Instantâneo</span>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Clock className="h-5 w-5 text-red-600" />
            <p className="text-xs sm:text-sm text-gray-700 text-center">
              Este QR Code expira em:{' '}
              <span className="font-bold text-red-600 text-base sm:text-lg">{formatTime(timeLeft)}</span>
            </p>
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="text-center mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Escaneie o QR Code</h3>
            <p className="text-xs sm:text-sm text-gray-600">Use o app do seu banco para escanear</p>
          </div>
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 sm:p-4 rounded-lg border-2 border-gray-300">
              {pixData.qrCodeBase64 ? (
                <img
                  src={`data:image/png;base64,${pixData.qrCodeBase64}`}
                  alt="QR Code PIX"
                  className="w-48 h-48 sm:w-64 sm:h-64"
                />
              ) : (
                <div className="w-48 h-48 sm:w-64 sm:h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <QrCode className="h-24 w-24 sm:h-32 sm:w-32 text-gray-400" />
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadQR}
              icon={Download}
              iconPosition="left"
              disabled={!pixData.qrCodeBase64}
            >
              Baixar QR Code
            </Button>
          </div>
        </div>

        {/* Código PIX */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
            <label className="text-xs sm:text-sm font-medium text-gray-700">Código PIX (Copiar e Colar)</label>
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
          <div className="bg-white border border-gray-300 rounded-lg p-2 sm:p-3">
            <p className="text-[10px] sm:text-xs font-mono text-gray-700 break-all">{pixData.qrCode}</p>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Como pagar:</h4>
          <ol className="list-decimal list-inside space-y-1 text-xs sm:text-sm text-gray-700">
            <li>Abra o app do seu banco</li>
            <li>Escaneie o QR Code ou cole o código PIX</li>
            <li>Confirme o pagamento</li>
            <li>O pagamento será verificado automaticamente</li>
          </ol>
        </div>

        {/* Dados do Doador */}
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Dados do Doador</p>
          <p className="text-xs sm:text-sm text-gray-600 break-words">Nome: {donorName}</p>
          <p className="text-xs sm:text-sm text-gray-600 break-words">E-mail: {donorEmail}</p>
        </div>

        {/* Botão de Verificação Manual */}
        <Button
          size="lg"
          className="w-full"
          variant="outline"
          onClick={checkPaymentStatus}
          disabled={isChecking}
          icon={isChecking ? RefreshCw : CheckCircle}
          iconPosition="right"
        >
          {isChecking ? 'Verificando...' : 'Verificar Pagamento'}
        </Button>

        <p className="text-xs text-gray-500 text-center mt-4">
          O pagamento é verificado automaticamente. Você receberá um e-mail de confirmação.
        </p>
      </CardContent>
    </Card>
  )
}
