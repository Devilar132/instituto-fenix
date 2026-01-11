'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Play, Download, Loader2 } from 'lucide-react'
import { GalleryItem } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface GalleryProps {
  items: GalleryItem[]
  title?: string
  description?: string
}

export function Gallery({ items, title, description }: GalleryProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0)
  const [filter, setFilter] = useState<string>('all')
  const [imageLoading, setImageLoading] = useState<boolean>(true)

  const categories = Array.from(
    new Set(items.map((item) => item.category).filter((cat): cat is string => Boolean(cat)))
  )

  const filteredItems =
    filter === 'all'
      ? items
      : items.filter((item) => item.category === filter)

  const selectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null
  
  // Obter todas as imagens do item atual (suporta array ou imagem única)
  const getItemImages = (item: GalleryItem): string[] => {
    if (item.images && item.images.length > 0) {
      return item.images
    }
    return [item.image]
  }
  
  const currentImages = selectedItem ? getItemImages(selectedItem) : []
  const currentImage = currentImages[selectedImageIndex] || selectedItem?.image || ''

  // Preload das imagens próximas (anterior e próxima)
  useEffect(() => {
    if (!selectedItem || currentImages.length <= 1) return

    const preloadImages = () => {
      const prevIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : currentImages.length - 1
      const nextIndex = selectedImageIndex < currentImages.length - 1 ? selectedImageIndex + 1 : 0

      // Preload da imagem anterior
      if (currentImages[prevIndex]) {
        const img = new window.Image()
        img.src = currentImages[prevIndex]
      }

      // Preload da próxima imagem
      if (currentImages[nextIndex]) {
        const img = new window.Image()
        img.src = currentImages[nextIndex]
      }
    }

    preloadImages()
  }, [selectedItem, selectedImageIndex, currentImages])

  const openLightbox = (index: number) => {
    setSelectedItemIndex(index)
    setSelectedImageIndex(0) // Sempre começar na primeira imagem do álbum
    setImageLoading(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedItemIndex(null)
    setSelectedImageIndex(0)
    document.body.style.overflow = 'unset'
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedItemIndex === null || !selectedItem) return

    const images = getItemImages(selectedItem)
    
    if (images.length <= 1) return // Se só tem uma imagem, não navega

    setImageLoading(true) // Mostrar loading ao mudar de imagem

    if (direction === 'prev') {
      setSelectedImageIndex(
        selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1
      )
    } else {
      setSelectedImageIndex(
        selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0
      )
    }
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
  }

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-custom">
          {(title || description) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Filters */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
              <button
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === 'all'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todas
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    filter === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={item.thumbnail || item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-500/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <h3 className="font-bold text-sm mb-1 line-clamp-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs opacity-90 line-clamp-1">
                      {item.description}
                    </p>
                  )}
                </div>
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-primary-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhum item encontrado nesta categoria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedItem && selectedItemIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-dark-500/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <X className="h-5 w-5 text-gray-900" />
              </button>

              {/* Navigation Buttons - Navega entre imagens do mesmo item */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage('prev')
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg touch-manipulation"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-900" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage('next')
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg touch-manipulation"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-900" />
                  </button>
                </>
              )}

              {/* Content */}
              <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                <div className="relative flex-1 bg-dark-500 flex items-center justify-center min-h-[40vh] sm:min-h-[50vh] lg:min-h-0">
                  {selectedItem.type === 'video' && selectedItem.videoUrl ? (
                    <iframe
                      src={selectedItem.videoUrl}
                      className="w-full h-full min-h-[300px] sm:min-h-[400px]"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      {/* Loading Indicator */}
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                            <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
                          </div>
                        </div>
                      )}
                      <Image
                        src={currentImage}
                        alt={selectedItem.title}
                        width={1200}
                        height={800}
                        className={`object-contain w-full h-full transition-opacity duration-300 ${
                          imageLoading ? 'opacity-0' : 'opacity-100'
                        }`}
                        sizes="100vw"
                        priority
                        onLoad={handleImageLoad}
                        onError={handleImageError}
                        quality={90}
                      />
                    </>
                  )}
                </div>

                {/* Info Panel */}
                <div className="lg:w-96 w-full bg-white p-4 sm:p-6 overflow-y-auto max-h-[50vh] lg:max-h-none">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {selectedItem.title}
                      </h2>
                      {selectedItem.description && (
                        <p className="text-sm sm:text-base text-gray-600">{selectedItem.description}</p>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      {selectedItem.date && (
                        <div>
                          <strong>Data:</strong>{' '}
                          {format(new Date(selectedItem.date), "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })}
                        </div>
                      )}
                      {selectedItem.category && (
                        <div>
                          <strong>Categoria:</strong> {selectedItem.category}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                      <a
                        href={currentImage}
                        download
                        className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Baixar
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Counter - Mostra índice da imagem no álbum */}
              {currentImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 shadow-lg">
                  {selectedImageIndex + 1} / {currentImages.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

