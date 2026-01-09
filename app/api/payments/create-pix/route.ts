import { NextRequest, NextResponse } from 'next/server'
import { createPixPayment, DonationPaymentData } from '@/lib/mercado-pago'
import { createPixPaymentREST } from '@/lib/mercado-pago-rest'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body: DonationPaymentData = await request.json()

    // Validação básica
    if (!body.amount || body.amount < 10) {
      return NextResponse.json(
        { error: 'Valor mínimo é R$ 10,00' },
        { status: 400 }
      )
    }

    if (!body.donorEmail || !body.donorName) {
      return NextResponse.json(
        { error: 'Dados do doador são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar pagamento PIX
    // Para PIX, vamos usar a API REST direta que é mais confiável
    const payment = await createPixPaymentREST({
      amount: body.amount,
      donorName: body.donorName,
      donorEmail: body.donorEmail,
      donorPhone: body.donorPhone,
      description: body.description || 'Doação para Instituto Fenix',
      projectId: body.projectId,
      anonymous: body.anonymous,
    })

    // Extrair dados do PIX
    const pixData = payment.point_of_interaction?.transaction_data

    return NextResponse.json({
      success: true,
      paymentId: payment.id,
      status: payment.status,
      qrCode: pixData?.qr_code,
      qrCodeBase64: pixData?.qr_code_base64,
      ticketUrl: payment.point_of_interaction?.transaction_data?.ticket_url,
    })
  } catch (error: any) {
    console.error('Erro ao criar pagamento PIX:', error)
    console.error('Detalhes do erro:', {
      message: error.message,
      cause: error.cause,
      stack: error.stack,
      response: error.response?.data || error.response,
    })
    
    // Se for erro de credenciais, dar dica mais clara
    if (error.message?.includes('Unauthorized') || error.message?.includes('live credentials')) {
      return NextResponse.json(
        {
          error: 'Erro de autenticação com Mercado Pago',
          message: 'Verifique se o Access Token está correto e é de TESTE. Gere um novo token no painel do Mercado Pago se necessário.',
          hint: 'Acesse: https://www.mercadopago.com.br/developers/panel e gere um novo Access Token de TESTE',
        },
        { status: 401 }
      )
    }
    
    return NextResponse.json(
      {
        error: 'Erro ao processar pagamento PIX',
        message: error.message || 'Erro desconhecido',
        details: error.cause || error.response?.data,
      },
      { status: 500 }
    )
  }
}
