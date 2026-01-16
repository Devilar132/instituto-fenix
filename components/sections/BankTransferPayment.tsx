'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Building2, Copy, CheckCircle, FileText, Banknote, MessageCircle, Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

interface BankTransferPaymentProps {
  amount: number
  donorName: string
  donorEmail: string
  onSuccess: () => void
}

interface BankData {
  code: string
  name: string
  logo: string
  agency: string
  account: string
  accountType: string
  beneficiary: string
}

const banks: BankData[] = [
  {
    code: '001',
    name: 'Banco do Brasil',
    logo: '/banks/banco-do-brasil.jpg',
    agency: '0007-8',
    account: '459856-3',
    accountType: 'Conta Corrente',
    beneficiary: 'Instituto Fênix PE',
  },
  {
    code: '323',
    name: 'Mercado Pago',
    logo: '/banks/mercado-pago.webp',
    agency: '0001',
    account: '9102290034-6',
    accountType: 'Conta Corrente',
    beneficiary: 'Instituto Fênix PE',
  },
  {
    code: '403',
    name: 'CORA SCFI',
    logo: '/banks/cora.png',
    agency: '0001',
    account: '4042835-4',
    accountType: 'Conta Corrente',
    beneficiary: 'Instituto Fênix PE',
  },
]

export function BankTransferPayment({ amount, donorName, donorEmail, onSuccess }: BankTransferPaymentProps) {
  const [selectedBank, setSelectedBank] = useState<BankData>(banks[0])
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
    const voucherData = {
      donorName,
      donorEmail,
      amount,
      bankData: selectedBank,
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

        {/* Seleção de Banco */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Selecione o Banco:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {banks.map((bank) => (
              <button
                key={bank.code}
                onClick={() => setSelectedBank(bank)}
                className={`relative p-4 rounded-lg border-2 transition-all ${
                  selectedBank.code === bank.code
                    ? 'border-primary-600 bg-primary-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className={`relative w-16 h-16 rounded-lg overflow-hidden ${selectedBank.code === bank.code ? 'ring-2 ring-primary-600' : ''}`}>
                    <Image
                      src={bank.logo}
                      alt={bank.name}
                      fill
                      className="object-contain p-2"
                      sizes="64px"
                    />
                  </div>
                  <div className="text-center">
                    <p className={`text-xs font-medium ${selectedBank.code === bank.code ? 'text-primary-600' : 'text-gray-600'}`}>
                      {bank.name}
                    </p>
                    <p className={`text-xs ${selectedBank.code === bank.code ? 'text-primary-500' : 'text-gray-500'}`}>
                      {bank.code}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dados Bancários */}
        <div className="space-y-4 mb-6">
          <div className="bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-lg p-4 sm:p-6">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="relative w-12 h-12 rounded-lg overflow-hidden mr-3 bg-white p-2 border border-gray-200">
                <Image
                  src={selectedBank.logo}
                  alt={selectedBank.name}
                  fill
                  className="object-contain"
                  sizes="48px"
                />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900">Dados para Transferência</h3>
                <p className="text-xs sm:text-sm text-gray-600">{selectedBank.name} - {selectedBank.code}</p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {/* Agência */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Agência</label>
                  <CopyButton text={selectedBank.agency} field={`agency-${selectedBank.code}`} label="Copiar" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{selectedBank.agency}</p>
              </div>

              {/* Conta */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Conta</label>
                  <CopyButton text={selectedBank.account} field={`account-${selectedBank.code}`} label="Copiar" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 break-words">{selectedBank.account}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedBank.accountType}</p>
              </div>

              {/* Favorecido */}
              <div className="bg-white rounded-lg p-3 sm:p-4 border border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Favorecido</label>
                  <CopyButton text={selectedBank.beneficiary} field={`beneficiary-${selectedBank.code}`} label="Copiar" />
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-900 break-words uppercase">{selectedBank.beneficiary}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Aviso Importante */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <MessageCircle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Importante:</h4>
              <p className="text-sm text-gray-700">
                Após a transferência, envie o comprovante para nosso{' '}
                <a href="https://wa.me/558186089100" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700 font-medium underline">
                  WhatsApp
                </a>{' '}
                ou{' '}
                <a href="mailto:contato@fenixpe.org" className="text-primary-600 hover:text-primary-700 font-medium underline">
                  e-mail
                </a>{' '}
                para confirmarmos sua doação.
              </p>
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
            <li>Envie o comprovante via WhatsApp ou e-mail</li>
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
