import { NextRequest, NextResponse } from 'next/server'
import { processCardPayment, DonationPaymentData } from '@/lib/mercado-pago'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const donationData: DonationPaymentData = {
      amount: body.amount,
      donorName: body.donorName,
      donorEmail: body.donorEmail,
      donorPhone: body.donorPhone,
      description: body.description || 'Doação para Instituto Fenix',
      projectId: body.projectId,
      anonymous: body.anonymous,
    }

    const cardData = {
      token: body.token,
      installments: body.installments || 1,
      payment_method_id: body.payment_method_id,
    }

    // Validação
    if (!donationData.amount || donationData.amount < 10) {
      return NextResponse.json(
        { error: 'Valor mínimo é R$ 10,00' },
        { status: 400 }
      )
    }

    if (!cardData.token) {
      return NextResponse.json(
        { error: 'Token do cartão é obrigatório' },
        { status: 400 }
      )
    }

    // Processar pagamento
    const payment = await processCardPayment(donationData, cardData)

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      status: payment.status,
      statusDetail: payment.status_detail,
      transactionAmount: payment.transaction_amount,
    })
  } catch (error: any) {
    console.error('Erro ao processar pagamento com cartão:', error)
    
    // Tratar erros específicos do Mercado Pago
    const errorMessage = error.cause?.[0]?.description || error.message || 'Erro desconhecido'
    
    return NextResponse.json(
      {
        error: 'Erro ao processar pagamento',
        message: errorMessage,
        details: error.cause,
      },
      { status: 400 }
    )
  }
}
