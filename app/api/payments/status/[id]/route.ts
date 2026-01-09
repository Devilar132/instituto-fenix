import { NextRequest, NextResponse } from 'next/server'
import { getPaymentStatus } from '@/lib/mercado-pago'

export const runtime = 'nodejs'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const paymentId = params.id

    if (!paymentId) {
      return NextResponse.json(
        { error: 'ID do pagamento é obrigatório' },
        { status: 400 }
      )
    }

    const payment = await getPaymentStatus(paymentId)

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      statusDetail: payment.status_detail,
      transactionAmount: payment.transaction_amount,
      dateCreated: payment.date_created,
      dateApproved: payment.date_approved,
    })
  } catch (error: any) {
    console.error('Erro ao verificar status:', error)
    return NextResponse.json(
      {
        error: 'Erro ao verificar status do pagamento',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
