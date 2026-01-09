import { Metadata } from 'next'
import { Suspense } from 'react'
import { CreditCard, Lock, Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PaymentMethods } from '@/components/sections/PaymentMethods'

export const metadata: Metadata = {
  title: 'Pagamento - Instituto Fenix',
  description: 'Finalize sua doação de forma segura e rápida.',
}

function PaymentFormSkeleton() {
  return (
    <div className="space-y-6">
      {/* Tabs Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-2">
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
      {/* Form Skeleton */}
      <div className="bg-white rounded-lg shadow-md p-8 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export default function PagamentoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center px-4">
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <CreditCard className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Pagamento Seguro</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100">
              Finalize sua doação de forma rápida e segura. Seus dados estão protegidos.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link
                href="/como-ajudar"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para o formulário de doação
              </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Main Payment Form */}
              <div className="lg:col-span-2">
                <Suspense fallback={<PaymentFormSkeleton />}>
                  <PaymentMethods />
                </Suspense>
              </div>

              {/* Security Info Sidebar */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-8 space-y-4 sm:space-y-6">
                  {/* Security Badge */}
                  <div className="bg-white rounded-lg shadow-md p-6 border-2 border-primary-100">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-primary-100 rounded-lg mr-3">
                        <Shield className="h-6 w-6 text-primary-600" />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">Pagamento Seguro</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Utilizamos criptografia SSL de 256 bits para proteger todas as suas informações.
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Lock className="h-4 w-4 mr-1" />
                      <span>Dados protegidos</span>
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Formas de Pagamento</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Cartão de Crédito</span>
                        <div className="flex gap-2">
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">Visa</span>
                          <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">Master</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">Cartão de Débito</span>
                        <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">Aceito</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-700">PIX</span>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Instantâneo</span>
                      </div>
                    </div>
                  </div>

                  {/* Support */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Precisa de Ajuda?</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Nossa equipe está pronta para ajudar você com qualquer dúvida sobre o pagamento.
                    </p>
                    <Link
                      href="/contato"
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                    >
                      Entre em contato →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

