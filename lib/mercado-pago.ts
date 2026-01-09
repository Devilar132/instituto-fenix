/**
 * Configuração e utilitários do Mercado Pago
 * 
 * IMPORTANTE: Configure as variáveis de ambiente:
 * - MERCADOPAGO_ACCESS_TOKEN (Access Token do Mercado Pago)
 * - MERCADOPAGO_PUBLIC_KEY (Public Key para frontend - opcional)
 */

// @ts-ignore - Mercado Pago SDK types podem estar desatualizados
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago'

// Configuração do cliente Mercado Pago
export function getMercadoPagoClient() {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN não configurado')
  }

  const client = new MercadoPagoConfig({
    accessToken,
    options: {
      timeout: 5000,
      idempotencyKey: 'abc',
    },
  })

  return client
}

// Tipos para pagamento
export interface DonationPaymentData {
  amount: number
  donorName: string
  donorEmail: string
  donorPhone?: string
  description: string
  projectId?: string
  anonymous?: boolean
}

// Criar preferência de pagamento (PIX e Cartão)
export async function createPaymentPreference(
  data: DonationPaymentData,
  options?: {
    preferredPaymentMethod?: 'pix' | 'card' | 'all'
  }
) {
  const client = getMercadoPagoClient()
  const preference = new Preference(client)

  // Configurar métodos de pagamento baseado na preferência
  const paymentMethodsConfig: any = {
    installments: 12, // Máximo de parcelas
  }

  // Se quiser apenas PIX, excluir outros métodos
  if (options?.preferredPaymentMethod === 'pix') {
    paymentMethodsConfig.excluded_payment_types = [
      { id: 'credit_card' },
      { id: 'debit_card' },
      { id: 'bank_transfer' },
    ]
  }
  // Se quiser apenas Cartão, excluir PIX
  else if (options?.preferredPaymentMethod === 'card') {
    paymentMethodsConfig.excluded_payment_methods = [
      { id: 'pix' },
    ]
  }

  const preferenceData = {
    items: [
      {
        id: data.projectId || 'donation',
        title: data.description,
        description: `Doação para ${data.description}`,
        quantity: 1,
        currency_id: 'BRL',
        unit_price: data.amount,
      },
    ],
    payer: {
      name: data.anonymous ? 'Doador Anônimo' : data.donorName,
      email: data.donorEmail,
      phone: data.donorPhone ? { number: data.donorPhone } : undefined,
    },
    payment_methods: paymentMethodsConfig,
    back_urls: {
      success: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/pagamento/sucesso`,
      failure: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/pagamento/erro`,
      pending: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/pagamento/pendente`,
    },
    // Webhook só funciona em produção ou com ngrok. Para local, deixe vazio ou use ngrok
    notification_url: process.env.NEXT_PUBLIC_SITE_URL && !process.env.NEXT_PUBLIC_SITE_URL.includes('localhost')
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhooks/mercado-pago`
      : undefined,
    statement_descriptor: 'INSTITUTO FENIX',
    external_reference: `donation-${Date.now()}-${data.donorEmail}`,
    metadata: {
      donor_name: data.donorName,
      donor_email: data.donorEmail,
      anonymous: data.anonymous || false,
      project_id: data.projectId || null,
    },
  }

  try {
    const response = await preference.create({ body: preferenceData })
    return response
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error)
    throw error
  }
}

// Criar pagamento PIX
export async function createPixPayment(data: DonationPaymentData) {
  const client = getMercadoPagoClient()
  const payment = new Payment(client)

  const paymentData = {
    transaction_amount: data.amount,
    description: data.description,
    payment_method_id: 'pix',
    payer: {
      email: data.donorEmail,
      first_name: data.anonymous ? 'Doador' : data.donorName.split(' ')[0],
      last_name: data.anonymous ? 'Anônimo' : data.donorName.split(' ').slice(1).join(' ') || '',
    },
    metadata: {
      donor_name: data.donorName,
      donor_email: data.donorEmail,
      anonymous: data.anonymous || false,
      project_id: data.projectId || null,
    },
    external_reference: `donation-pix-${Date.now()}-${data.donorEmail}`,
  }

  try {
    const response = await payment.create({ body: paymentData })
    return response
  } catch (error) {
    console.error('Erro ao criar pagamento PIX:', error)
    throw error
  }
}

// Processar pagamento com cartão
export async function processCardPayment(
  data: DonationPaymentData,
  cardData: {
    token: string
    installments: number
    payment_method_id: string
  }
) {
  const client = getMercadoPagoClient()
  const payment = new Payment(client)

  const paymentData = {
    transaction_amount: data.amount,
    token: cardData.token,
    description: data.description,
    installments: cardData.installments,
    payment_method_id: cardData.payment_method_id,
    payer: {
      email: data.donorEmail,
      identification: {
        type: 'CPF', // Você pode coletar o CPF se necessário
        number: '', // Coletar se necessário para valores maiores
      },
    },
    metadata: {
      donor_name: data.donorName,
      donor_email: data.donorEmail,
      anonymous: data.anonymous || false,
      project_id: data.projectId || null,
    },
    external_reference: `donation-card-${Date.now()}-${data.donorEmail}`,
  }

  try {
    const response = await payment.create({ body: paymentData })
    return response
  } catch (error) {
    console.error('Erro ao processar pagamento com cartão:', error)
    throw error
  }
}

// Verificar status do pagamento
export async function getPaymentStatus(paymentId: string) {
  const client = getMercadoPagoClient()
  const payment = new Payment(client)

  try {
    const response = await payment.get({ id: paymentId })
    return response
  } catch (error) {
    console.error('Erro ao verificar status do pagamento:', error)
    throw error
  }
}
