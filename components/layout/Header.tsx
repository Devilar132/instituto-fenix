'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navigation, siteConfig, institutionalLinks } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { Logo } from '@/components/ui/Logo'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSobreOpen, setIsSobreOpen] = useState(false)
  const pathname = usePathname()
  const sobreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (sobreRef.current && !sobreRef.current.contains(event.target as Node)) {
        setIsSobreOpen(false)
      }
    }
    if (isSobreOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isSobreOpen])

  const isSobreActive = pathname === '/sobre' || institutionalLinks.some(link => pathname === link.href)

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-lg border-b border-primary-100'
          : 'bg-white/90 backdrop-blur-md'
      )}
      style={{
        WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'blur(12px)',
      }}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="md" showText={true} showSlogan={false} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navigation.map((item) => {
              if (item.href === '/sobre') {
                return (
                  <div key={item.href} ref={sobreRef} className="relative">
                    <button
                      onClick={() => setIsSobreOpen(!isSobreOpen)}
                      className={cn(
                        'flex items-center space-x-1 text-sm xl:text-base font-medium transition-colors hover:text-primary-600 whitespace-nowrap',
                        isSobreActive
                          ? 'text-primary-600 border-b-2 border-primary-600 pb-1'
                          : 'text-dark-400'
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          isSobreOpen && 'rotate-180'
                        )} 
                      />
                    </button>
                    {isSobreOpen && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-slide-down">
                        <Link
                          href="/sobre"
                          onClick={() => setIsSobreOpen(false)}
                          className={cn(
                            'block px-4 py-2 text-sm transition-colors',
                            pathname === '/sobre'
                              ? 'bg-primary-50 text-primary-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
                          )}
                        >
                          Sobre Nós
                        </Link>
                        {institutionalLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsSobreOpen(false)}
                            className={cn(
                              'block px-4 py-2 text-sm transition-colors',
                              pathname === link.href
                                ? 'bg-primary-50 text-primary-600 font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                            )}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm xl:text-base font-medium transition-colors hover:text-primary-600 whitespace-nowrap',
                    pathname === item.href
                      ? 'text-primary-600 border-b-2 border-primary-600'
                      : 'text-dark-400'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
            <Link
              href="/como-ajudar"
              className="px-3 xl:px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm xl:text-base whitespace-nowrap"
            >
              Doar
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-dark-400 hover:text-primary-600"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 animate-slide-down relative z-50">
            {navigation.map((item) => {
              if (item.href === '/sobre') {
                return (
                  <div key={item.href} className="relative">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setIsSobreOpen(!isSobreOpen)
                      }}
                      onTouchStart={(e) => {
                        e.stopPropagation()
                      }}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium transition-colors touch-manipulation',
                        isSobreActive
                          ? 'bg-primary-50 text-primary-600'
                          : 'text-dark-400 active:bg-primary-50'
                      )}
                    >
                      <span>{item.name}</span>
                      <ChevronDown 
                        className={cn(
                          'h-5 w-5 transition-transform duration-200',
                          isSobreOpen && 'rotate-180'
                        )} 
                      />
                    </button>
                    {isSobreOpen && (
                      <div className="pl-4 mt-2 space-y-1 border-l-2 border-primary-200 relative z-50">
                        <Link
                          href="/sobre"
                          onClick={(e) => {
                            e.stopPropagation()
                            setIsOpen(false)
                            setIsSobreOpen(false)
                          }}
                          onTouchStart={(e) => {
                            e.stopPropagation()
                          }}
                          className={cn(
                            'block px-4 py-3 rounded-lg text-sm transition-colors touch-manipulation',
                            pathname === '/sobre'
                              ? 'bg-primary-100 text-primary-600 font-medium'
                              : 'text-gray-600 active:bg-gray-50'
                          )}
                        >
                          Sobre Nós
                        </Link>
                        {institutionalLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsOpen(false)
                              setIsSobreOpen(false)
                            }}
                            onTouchStart={(e) => {
                              e.stopPropagation()
                            }}
                            className={cn(
                              'block px-4 py-3 rounded-lg text-sm transition-colors touch-manipulation',
                              pathname === link.href
                                ? 'bg-primary-100 text-primary-600 font-medium'
                                : 'text-gray-600 active:bg-gray-50'
                            )}
                          >
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                  onTouchStart={(e) => {
                    e.stopPropagation()
                  }}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-base font-medium transition-colors touch-manipulation',
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-dark-400 active:bg-primary-50'
                  )}
                >
                  {item.name}
                </Link>
              )
            })}
            <Link
              href="/como-ajudar"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
              onTouchStart={(e) => {
                e.stopPropagation()
              }}
              className="block px-4 py-3 bg-primary-600 text-white rounded-lg text-center font-medium mt-2 touch-manipulation active:bg-primary-700"
            >
              Doar
            </Link>
          </div>
        )}
      </nav>
    </header>
  )
}

