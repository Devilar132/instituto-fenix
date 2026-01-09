'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Input, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { GoogleMap } from '@/components/sections/GoogleMap'
import { siteConfig } from '@/lib/constants'
import { ContactFormData } from '@/types'

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Assunto deve ter no mínimo 5 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter no mínimo 10 caracteres'),
})

export default function ContatoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      // Aqui você integraria com sua API
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulação
      setSubmitSuccess(true)
      reset()
      setTimeout(() => setSubmitSuccess(false), 5000)
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-primary-600 to-secondary-700 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">Entre em Contato</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100">
              Estamos aqui para ajudar. Envie sua mensagem ou visite nossa sede.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <MapPin className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Endereço</h3>
                      <p className="text-gray-600">{siteConfig.links.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Phone className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Telefone</h3>
                      <a
                        href={`tel:${siteConfig.links.phone}`}
                        className="text-primary-600 hover:underline"
                      >
                        {siteConfig.links.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-100 rounded-lg">
                      <Mail className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">E-mail</h3>
                      <a
                        href={`mailto:${siteConfig.links.email}`}
                        className="text-primary-600 hover:underline"
                      >
                        {siteConfig.links.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Google Map */}
              <Card>
                <CardContent className="p-0">
                  <GoogleMap
                    address={siteConfig.links.address}
                    lat={-8.0476}
                    lng={-34.8770}
                    zoom={16}
                    className="h-64 sm:h-80 md:h-96 w-full rounded-lg"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Envie sua Mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                {submitSuccess && (
                  <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </div>
                )}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    label="Nome Completo"
                    {...register('name')}
                    error={errors.name?.message}
                  />

                  <Input
                    label="E-mail"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />

                  <Input
                    label="Telefone (opcional)"
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                  />

                  <Input
                    label="Assunto"
                    {...register('subject')}
                    error={errors.subject?.message}
                  />

                  <Textarea
                    label="Mensagem"
                    rows={6}
                    {...register('message')}
                    error={errors.message?.message}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full"
                    icon={Send}
                    iconPosition="right"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}

