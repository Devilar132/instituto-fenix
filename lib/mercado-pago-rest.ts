/**
 * Versão alternativa usando API REST diretamente (sem SDK)
 * Pode funcionar melhor em alguns casos
 */

export interface DonationPaymentData {
  amount: number
  donorName: string
  donorEmail: string
  donorPhone?: string
  description: string
  projectId?: string
  anonymous?: boolean
}

// Criar pagamento PIX usando API REST direta
export async function createPixPaymentREST(data: DonationPaymentData) {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

  if (!accessToken) {
    throw new Error('MERCADOPAGO_ACCESS_TOKEN não configurado')
  }

  // Separar nome em first_name e last_name
  const nameParts = data.donorName.trim().split(' ')
  const firstName = nameParts[0] || 'Doador'
  const lastName = nameParts.slice(1).join(' ') || (data.anonymous ? 'Anônimo' : 'Doador')

  const paymentData = {
    transaction_amount: data.amount,
    description: data.description,
    payment_method_id: 'pix',
    payer: {
      email: data.donorEmail,
      first_name: data.anonymous ? 'Doador' : firstName,
      last_name: data.anonymous ? 'Anônimo' : lastName,
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
    const response = await fetch('https://api.mercadopago.com/v1/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'X-Idempotency-Key': `pix-${Date.now()}-${data.donorEmail}`,
      },
      body: JSON.stringify(paymentData),
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('Erro na API do Mercado Pago:', responseData)
      throw new Error(responseData.message || responseData.error || 'Erro ao criar pagamento')
    }

    return responseData
  } catch (error: any) {
    console.error('Erro ao criar pagamento PIX (REST):', error)
    throw error
  }
}
