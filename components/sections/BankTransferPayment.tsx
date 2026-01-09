'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Copy, CheckCircle, FileText, Banknote } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

interface BankTransferPaymentProps {
  amount: number
  donorName: string
  donorEmail: string
  onSuccess: () => void
}

// Dados bancários (em produção, viriam de uma API/config)
const bankData = {
  bank: 'Banco do Brasil',
  agency: '1234-5',
  account: '12345-6',
  accountType: 'Conta Corrente',
  cnpj: '12.345.678/0001-90',
  name: 'INSTITUTO FENIX PE',
  pix: '12.345.678/0001-90',
}

export function BankTransferPayment({ amount, donorName, donorEmail, onSuccess }: BankTransferPaymentProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(null), 2000)
    } catch (err) {
      console.error('Erro ao copiar:', err)
    }
  }

  const handleDownloadVoucher = () => {
    // Em produção, geraria um comprovante PDF
    const voucherData = {
      donorName,
      donorEmail,
      amount,
      bankData,
      date: new Date().toLocaleDateString('pt-BR'),
    }
    console.log('Comprovante:', voucherData)
    alert('Comprovante gerado! (Em produção, seria um download PDF)')
  }

  const handleConfirmTransfer = () => {
    onSuccess()
  }

  const CopyButton = ({ text, field, label }: { text: string; field: string; label: string }) => (
    <Button
      variant="outline"
      size="sm"
      onClick={() => handleCopy(text, field)}
      icon={copiedField === field ? CheckCircle : Copy}
      iconPosition="left"
      className={copiedField === field ? 'bg-green-50 border-green-300 text-green-700' : ''}
    >
      {copiedField === field ? 'Copiado!' : label}
    </Button>
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building2 className="h-6 w-6 text-purple-600 mr-2" />
          Transferência Bancária
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Resumo */}
        <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Valor da Doação</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(amount)}</p>
            </div>
            <div className="flex items-center space-x-2 text-purple-600">
              <Banknote className="h-6 w-6" />
              <span className="text-sm font-semibold">Transferência</span>
            </div>
          </div>
        </div>

        {/* Dados Bancários */}
        <div className="space-y-4 mb-6">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="p-2 bg-primary-100 rounded-lg mr-2 sm:mr-3">
                <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900">Dados para Transferência</h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Banco */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Banco</label>
                  <CopyButton text={bankData.bank} field="bank" label="Copiar" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{bankData.bank}</p>
              </div>

              {/* Agência */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Agência</label>
                  <CopyButton text={bankData.agency} field="agency" label="Copiar" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{bankData.agency}</p>
              </div>

              {/* Conta */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Conta</label>
                  <CopyButton text={bankData.account} field="account" label="Copiar" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{bankData.account}</p>
                <p className="text-xs text-gray-500 mt-1">{bankData.accountType}</p>
              </div>

              {/* Nome da Conta */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Favorecido</label>
                  <CopyButton text={bankData.name} field="name" label="Copiar" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{bankData.name}</p>
              </div>

              {/* CNPJ */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">CNPJ</label>
                  <CopyButton text={bankData.cnpj} field="cnpj" label="Copiar" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{bankData.cnpj}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Instruções */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4 mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Como fazer a transferência:</h4>
          <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
            <li>Acesse o internet banking ou app do seu banco</li>
            <li>Vá em "Transferências" ou "TED/DOC"</li>
            <li>Preencha os dados acima</li>
            <li>Confirme o valor: <strong>{formatCurrency(amount)}</strong></li>
            <li>Realize a transferência</li>
            <li>Clique em "Já transferi" abaixo</li>
          </ol>
        </div>

        {/* Dados do Doador */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Dados do Doador</p>
          <p className="text-sm text-gray-600">Nome: {donorName}</p>
          <p className="text-sm text-gray-600">E-mail: {donorEmail}</p>
        </div>

        {/* Ações */}
        <div className="space-y-3">
          <Button
            size="lg"
            className="w-full"
            variant="primary"
            onClick={handleConfirmTransfer}
            icon={CheckCircle}
            iconPosition="right"
          >
            Já transferi o valor
          </Button>
          <Button
            size="lg"
            className="w-full"
            variant="outline"
            onClick={handleDownloadVoucher}
            icon={FileText}
            iconPosition="left"
          >
            Baixar Comprovante
          </Button>
        </div>

        <p className="text-xs text-gray-500 text-center mt-4">
          Após confirmar, verificaremos a transferência e enviaremos um e-mail de confirmação.
        </p>
      </CardContent>
    </Card>
  )
}

