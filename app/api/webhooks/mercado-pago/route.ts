import { NextRequest, NextResponse } from 'next/server'
import { getPaymentStatus } from '@/lib/mercado-pago'

export const runtime = 'nodejs'

/**
 * Webhook do Mercado Pago
 * 
 * Este endpoint recebe notificações do Mercado Pago sobre mudanças
 * no status dos pagamentos.
 * 
 * Configure no painel do Mercado Pago:
 * https://www.mercadopago.com.br/developers/panel/app/{APP_ID}/webhooks
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Mercado Pago envia diferentes tipos de notificações
    const { type, data } = body

    if (type === 'payment') {
      const paymentId = data.id

      // Buscar informações completas do pagamento
      const payment = await getPaymentStatus(paymentId)

      // Aqui você pode:
      // 1. Salvar no banco de dados
      // 2. Enviar email de confirmação
      // 3. Atualizar status da doação
      // 4. Notificar o doador

      console.log('Pagamento recebido:', {
        id: payment.id,
        status: payment.status,
        statusDetail: payment.status_detail,
        amount: payment.transaction_amount,
        email: payment.payer?.email,
        metadata: payment.metadata,
      })

      // Exemplo: Salvar no banco de dados (implementar conforme sua necessidade)
      // await saveDonation({
      //   paymentId: payment.id,
      //   amount: payment.transaction_amount,
      //   status: payment.status,
      //   donorEmail: payment.payer?.email,
      //   metadata: payment.metadata,
      // })

      // Exemplo: Enviar email (implementar conforme sua necessidade)
      // if (payment.status === 'approved') {
      //   await sendConfirmationEmail(payment.payer?.email, payment)
      // }
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('Erro ao processar webhook:', error)
    return NextResponse.json(
      { error: 'Erro ao processar webhook' },
      { status: 500 }
    )
  }
}

// GET para validação do webhook (Mercado Pago pode fazer GET)
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}
