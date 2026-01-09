'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { Testimonial } from '@/types'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

interface TestimonialsProps {
  testimonials: Testimonial[]
  title?: string
  description?: string
  showControls?: boolean
}

export function Testimonials({
  testimonials,
  title,
  description,
  showControls = true,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const approvedTestimonials = testimonials.filter((t) => t.approved !== false)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % approvedTestimonials.length)
  }

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + approvedTestimonials.length) % approvedTestimonials.length
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (approvedTestimonials.length === 0) return null

  return (
    <section className="section-padding bg-gradient-to-br from-gray-50 to-white">
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

        <div className="max-w-5xl mx-auto relative">
          {/* Main Testimonial */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                  <CardContent className="p-6 sm:p-8 md:p-12">
                    <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-center">
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-primary-200 shadow-lg">
                          <Image
                            src={
                              approvedTestimonials[currentIndex].image ||
                              '/placeholder-avatar.jpg'
                            }
                            alt={approvedTestimonials[currentIndex].name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 96px, 128px"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="mb-4">
                          <Quote className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-primary-300 mx-auto md:mx-0 mb-3 sm:mb-4" />
                          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed italic mb-4 sm:mb-6 px-2 sm:px-0">
                            "{approvedTestimonials[currentIndex].content}"
                          </p>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {approvedTestimonials[currentIndex].name}
                          </h3>
                          {approvedTestimonials[currentIndex].role && (
                            <p className="text-primary-600 font-medium mb-2">
                              {approvedTestimonials[currentIndex].role}
                            </p>
                          )}
                          {approvedTestimonials[currentIndex].project && (
                            <p className="text-sm text-gray-600 mb-3">
                              Projeto: {approvedTestimonials[currentIndex].project}
                            </p>
                          )}
                          {approvedTestimonials[currentIndex].rating && (
                            <div className="flex items-center gap-1 justify-center md:justify-start">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < (approvedTestimonials[currentIndex].rating || 0)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {showControls && approvedTestimonials.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 md:-translate-x-12 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors z-10 border-2 border-gray-200"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 md:translate-x-12 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 transition-colors z-10 border-2 border-gray-200"
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-primary-600" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {approvedTestimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {approvedTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Grid of All Testimonials (Optional) */}
          {approvedTestimonials.length > 1 && (
            <div className="mt-12 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {approvedTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => goToSlide(index)}
                  className={`cursor-pointer transition-all ${
                    index === currentIndex
                      ? 'ring-2 ring-primary-600'
                      : 'hover:shadow-lg'
                  }`}
                >
                  <Card className="h-full hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary-200">
                          <Image
                            src={testimonial.image || '/placeholder-avatar.jpg'}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 truncate">
                            {testimonial.name}
                          </h4>
                          {testimonial.role && (
                            <p className="text-sm text-primary-600 truncate">
                              {testimonial.role}
                            </p>
                          )}
                        </div>
                      </div>
                      <Quote className="h-6 w-6 text-primary-300 mb-2" />
                      <p className="text-sm text-gray-700 line-clamp-3 italic">
                        "{testimonial.content}"
                      </p>
                      {testimonial.rating && (
                        <div className="flex items-center gap-1 mt-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < (testimonial.rating || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

