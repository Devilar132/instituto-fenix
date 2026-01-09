import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

function classifyToken(token?: string) {
  if (!token) return 'missing'
  if (token.startsWith('TEST-')) return 'test'
  if (token.startsWith('APP_USR-')) return 'production'
  return 'unknown'
}

export async function GET() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  return NextResponse.json({
    hasToken: Boolean(token),
    tokenType: classifyToken(token),
    hasSiteUrl: Boolean(siteUrl),
    siteUrlIsLocalhost: Boolean(siteUrl && siteUrl.includes('localhost')),
  })
}

