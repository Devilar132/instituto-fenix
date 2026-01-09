import Link from 'next/link'
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { siteConfig, navigation, institutionalLinks } from '@/lib/constants'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark-500 text-gray-300">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Sobre */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Sobre o Instituto</h3>
            <p className="text-sm mb-4">
              Promovendo educação, cultura e assistência social através de artes cênicas, 
              projetos educacionais e ações sociais em Recife.
            </p>
            <div className="flex space-x-4">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={siteConfig.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {navigation.filter(item => item.href !== '/sobre').map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/sobre"
                  className="text-sm hover:text-white transition-colors font-medium"
                >
                  Sobre Nós
                </Link>
              </li>
              {institutionalLinks.map((link) => (
                <li key={link.href} className="ml-4">
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    • {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/faq"
                  className="text-sm hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/depoimentos"
                  className="text-sm hover:text-white transition-colors"
                >
                  Depoimentos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm">{siteConfig.links.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.links.phone}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {siteConfig.links.phone}
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.links.email}`}
                  className="text-sm hover:text-white transition-colors"
                >
                  {siteConfig.links.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-sm mb-4">
              Receba nossas novidades e informações sobre eventos e projetos.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="w-full px-4 py-2 bg-dark-400 border border-dark-300 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-all font-medium shadow-md hover:shadow-lg hover:scale-105"
              >
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-dark-400 text-center text-sm">
          <p>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            CNPJ: 45.985.647/0001-58
          </p>
        </div>
      </div>
    </footer>
  )
}

