'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ArrowLeft, Calendar, Users, Handshake, Loader2, Download } from 'lucide-react'
import { mockProjects } from '@/lib/data/mock'
import { Project } from '@/types'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface PageProps {
  params: { id: string }
}

const categoryLabels = {
  'artes-cenicas': 'Artes Cênicas',
  'educacao': 'Educação',
  'assistencia-social': 'Assistência Social',
  'cultura': 'Cultura',
}

const statusLabels = {
  'ativo': 'Ativo',
  'concluido': 'Concluído',
  'planejado': 'Planejado',
}

export default function ProjetoDetailPage({ params }: PageProps) {
  const project = mockProjects.find((p) => p.id === params.id)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [imageLoading, setImageLoading] = useState<boolean>(true)

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Projeto não encontrado</h1>
          <Link href="/projetos" className="text-primary-600 hover:text-primary-700 font-medium">
            Voltar para Projetos
          </Link>
        </div>
      </div>
    )
  }

  // Obter todas as imagens do projeto (gallery ou image)
  const getProjectImages = (proj: Project): string[] => {
    if (proj.gallery && proj.gallery.length > 0) {
      return proj.gallery
    }
    return [proj.image]
  }

  const projectImages = getProjectImages(project)
  const currentImage = selectedImageIndex !== null ? projectImages[selectedImageIndex] : project.image

  // Preload das imagens próximas
  useEffect(() => {
    if (selectedImageIndex === null || projectImages.length <= 1) return

    const preloadImages = () => {
      const prevIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : projectImages.length - 1
      const nextIndex = selectedImageIndex < projectImages.length - 1 ? selectedImageIndex + 1 : 0

      if (projectImages[prevIndex]) {
        const img = new window.Image()
        img.src = projectImages[prevIndex]
      }

      if (projectImages[nextIndex]) {
        const img = new window.Image()
        img.src = projectImages[nextIndex]
      }
    }

    preloadImages()
  }, [selectedImageIndex, projectImages])

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index)
    setImageLoading(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedImageIndex(null)
    document.body.style.overflow = 'unset'
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return
    if (projectImages.length <= 1) return

    setImageLoading(true)

    if (direction === 'prev') {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : projectImages.length - 1)
    } else {
      setSelectedImageIndex(selectedImageIndex < projectImages.length - 1 ? selectedImageIndex + 1 : 0)
    }
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
  }

  // Teclado navigation
  useEffect(() => {
    if (selectedImageIndex === null) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox()
      } else if (e.key === 'ArrowLeft') {
        navigateImage('prev')
      } else if (e.key === 'ArrowRight') {
        navigateImage('next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImageIndex])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Image */}
      <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden cursor-pointer" onClick={() => openLightbox(0)}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-500/90 via-dark-500/50 to-transparent" />
        <div className="absolute inset-0 container-custom flex items-end pb-12">
          <div className="max-w-4xl text-white">
            <div className="flex items-center gap-4 text-sm mb-4 opacity-90 flex-wrap">
              <span className={`px-3 py-1 rounded-full font-semibold ${
                project.status === 'ativo'
                  ? 'bg-green-500'
                  : project.status === 'concluido'
                  ? 'bg-blue-500'
                  : 'bg-gray-500'
              }`}>
                {statusLabels[project.status]}
              </span>
              <span className="px-3 py-1 bg-primary-500 rounded-full font-semibold">
                {categoryLabels[project.category]}
              </span>
              {project.startDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Desde {format(new Date(project.startDate), "dd 'de' MMMM 'de' yyyy", {
                    locale: ptBR,
                  })}
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-200">{project.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link href="/projetos" className="inline-flex items-center mb-8 text-primary-600 hover:text-primary-700 font-medium transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Projetos
            </Link>

            {/* Full Description */}
            {project.fullDescription && (
              <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 mb-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {project.fullDescription}
                  </p>
                </div>
              </div>
            )}

            {/* Impact Stats */}
            {project.impact && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {project.impact.peopleReached !== undefined && (
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <Users className="h-8 w-8 mx-auto mb-3 text-primary-600" />
                    <p className="text-3xl font-bold text-primary-600 mb-1">
                      {project.impact.peopleReached.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-sm text-gray-600">Pessoas Alcançadas</p>
                  </div>
                )}
                {project.impact.events !== undefined && (
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <Calendar className="h-8 w-8 mx-auto mb-3 text-secondary-600" />
                    <p className="text-3xl font-bold text-secondary-600 mb-1">
                      {project.impact.events}
                    </p>
                    <p className="text-sm text-gray-600">Eventos</p>
                  </div>
                )}
                {project.impact.partnerships !== undefined && (
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <Handshake className="h-8 w-8 mx-auto mb-3 text-primary-600" />
                    <p className="text-3xl font-bold text-primary-600 mb-1">
                      {project.impact.partnerships}
                    </p>
                    <p className="text-sm text-gray-600">Parcerias</p>
                  </div>
                )}
              </div>
            )}

            {/* Gallery Grid */}
            {projectImages.length > 1 && (
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6">Galeria do Projeto</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {projectImages.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => openLightbox(index)}
                    >
                      <Image
                        src={image}
                        alt={`${project.title} - Imagem ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark-500/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark-500/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-7xl h-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg touch-manipulation"
                aria-label="Fechar"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
              </button>

              {/* Navigation Buttons */}
              {projectImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage('prev')
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg touch-manipulation"
                    aria-label="Imagem anterior"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-900" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      navigateImage('next')
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg touch-manipulation"
                    aria-label="Próxima imagem"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-900" />
                  </button>
                </>
              )}

              {/* Image Container */}
              <div className="relative flex-1 bg-dark-500 flex items-center justify-center h-full min-h-[40vh] sm:min-h-[50vh]">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
                      <Loader2 className="h-8 w-8 text-primary-600 animate-spin" />
                    </div>
                  </div>
                )}
                <Image
                  src={currentImage}
                  alt={`${project.title} - Imagem ${selectedImageIndex !== null ? selectedImageIndex + 1 : 1}`}
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
              </div>

              {/* Counter */}
              {projectImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-900 shadow-lg">
                  {selectedImageIndex !== null ? selectedImageIndex + 1 : 1} / {projectImages.length}
                </div>
              )}

              {/* Download Button */}
              <div className="absolute bottom-4 right-4 z-20">
                <a
                  href={currentImage}
                  download
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-lg touch-manipulation"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Baixar imagem"
                >
                  <Download className="h-5 w-5 sm:h-6 sm:w-6 text-gray-900" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
