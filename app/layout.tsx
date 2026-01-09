import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollProgress } from '@/components/effects/ScrollProgress'
import { organizationSchema } from '@/lib/constants'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Instituto Fenix - Arte, Cultura e Educação em Recife',
    template: '%s | Instituto Fenix',
  },
  description:
    'Instituto Fenix promove educação, cultura e assistência social através de artes cênicas, projetos educacionais e ações sociais em Recife, Pernambuco.',
  keywords: [
    'instituto fenix',
    'arte cênica',
    'cultura recife',
    'educação',
    'assistência social',
    'teatro recife',
    'projetos sociais',
  ],
  authors: [{ name: 'Instituto Fenix' }],
  creator: 'Instituto Fenix',
  publisher: 'Instituto Fenix',
  metadataBase: new URL('https://fenixpe.org'),
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://fenixpe.org',
    siteName: 'Instituto Fenix',
    title: 'Instituto Fenix - Arte, Cultura e Educação',
    description:
      'Transformando vidas através da arte e cultura em Recife, Pernambuco',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Instituto Fenix',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instituto Fenix',
    description: 'Arte, Cultura e Educação em Recife',
    images: ['/images/twitter-card.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://fenixpe.org',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <Header />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

