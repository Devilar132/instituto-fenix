import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * Endpoint para testar se o token do Mercado Pago está válido
 * Faz uma requisição simples à API do Mercado Pago
 */
export async function GET() {
  const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

  if (!accessToken) {
    return NextResponse.json({
      hasToken: false,
      error: 'Token não configurado',
    })
  }

  // Verificar se é token de teste
  const isTestToken = accessToken.startsWith('TEST-')
  const isProductionToken = accessToken.startsWith('APP_USR-')

  // Testar token fazendo uma requisição simples à API do Mercado Pago
  try {
    const response = await fetch('https://api.mercadopago.com/v1/payment_methods', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (response.ok) {
      return NextResponse.json({
        success: true,
        hasToken: true,
        tokenType: isTestToken ? 'test' : isProductionToken ? 'production' : 'unknown',
        tokenPrefix: accessToken.substring(0, 10) + '...',
        tokenLength: accessToken.length,
        apiResponse: 'Token válido - API respondeu com sucesso',
        paymentMethodsCount: Array.isArray(data) ? data.length : 'N/A',
      })
    } else {
      return NextResponse.json({
        success: false,
        hasToken: true,
        tokenType: isTestToken ? 'test' : isProductionToken ? 'production' : 'unknown',
        tokenPrefix: accessToken.substring(0, 10) + '...',
        tokenLength: accessToken.length,
        error: 'Token inválido ou sem permissão',
        apiError: data.message || data.error || 'Erro desconhecido',
        statusCode: response.status,
      }, { status: 401 })
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      hasToken: true,
      tokenType: isTestToken ? 'test' : isProductionToken ? 'production' : 'unknown',
      tokenPrefix: accessToken.substring(0, 10) + '...',
      tokenLength: accessToken.length,
      error: 'Erro ao testar token',
      message: error.message,
    }, { status: 500 })
  }
}
