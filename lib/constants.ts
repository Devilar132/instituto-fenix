export const siteConfig = {
  name: 'Instituto Fenix',
  description: 'Instituto que promove educação, cultura e assistência social através de artes cênicas, projetos educacionais e ações sociais em Recife, Pernambuco.',
  url: 'https://fenixpe.org',
  ogImage: '/images/og-image.jpg',
  links: {
    email: 'contato@fenixpe.org',
    phone: '(81) 3033-5066',
    address: 'Rua dos Coelhos, 485, Casa 0485, Coelhos, Recife-PE, CEP 50070-545',
  },
  social: {
    facebook: 'https://www.facebook.com/institutofenix',
    instagram: 'https://www.instagram.com/institutofenixpe',
    youtube: 'https://www.youtube.com/@institutofenixpe',
  },
}

export const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Sobre', href: '/sobre' },
  { name: 'Projetos', href: '/projetos' },
  { name: 'Eventos', href: '/eventos' },
  { name: 'Notícias', href: '/noticias' },
  { name: 'Galeria', href: '/galeria' },
  { name: 'Como Ajudar', href: '/como-ajudar' },
  { name: 'Contato', href: '/contato' },
]

export const institutionalLinks = [
  { name: 'Teoria da Mudança', href: '/institucional/teoria-mudanca' },
  { name: 'Equipe', href: '/institucional/equipe' },
]

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Rua dos Coelhos, 485, Casa 0485',
    addressLocality: 'Recife',
    addressRegion: 'PE',
    postalCode: '50070-545',
    addressCountry: 'BR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-81-8608-9100',
    contactType: 'customer service',
    email: 'contato@fenixpe.org',
  },
}

