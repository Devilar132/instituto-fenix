import { NextRequest, NextResponse } from 'next/server'
import { createPaymentPreference, DonationPaymentData } from '@/lib/mercado-pago'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { preferredPaymentMethod, ...donationData } = body

    // Validação básica
    if (!donationData.amount || donationData.amount < 10) {
      return NextResponse.json(
        { error: 'Valor mínimo é R$ 10,00' },
        { status: 400 }
      )
    }

    if (!donationData.donorEmail || !donationData.donorName) {
      return NextResponse.json(
        { error: 'Dados do doador são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar preferência de pagamento
    const preference = await createPaymentPreference(
      {
        amount: donationData.amount,
        donorName: donationData.donorName,
        donorEmail: donationData.donorEmail,
        donorPhone: donationData.donorPhone,
        description: donationData.description || 'Doação para Instituto Fenix',
        projectId: donationData.projectId,
        anonymous: donationData.anonymous,
      },
      {
        preferredPaymentMethod: preferredPaymentMethod || 'all',
      }
    )

    return NextResponse.json({
      success: true,
      preferenceId: preference.id,
      initPoint: preference.init_point,
      sandboxInitPoint: preference.sandbox_init_point,
    })
  } catch (error: any) {
    console.error('Erro ao criar preferência:', error)
    return NextResponse.json(
      {
        error: 'Erro ao processar pagamento',
        message: error.message || 'Erro desconhecido',
      },
      { status: 500 }
    )
  }
}
