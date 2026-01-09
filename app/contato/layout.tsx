import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Entre em contato com o Instituto Fenix. Estamos localizados em Recife, Pernambuco. Telefone, e-mail e endereço.',
}

export default function ContatoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

