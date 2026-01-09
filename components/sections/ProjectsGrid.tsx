'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Users, Calendar, Handshake } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Card3D } from '@/components/ui/Card3D'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { mockProjects } from '@/lib/data/mock'
import { Project } from '@/types'
import { formatDate } from '@/lib/utils'

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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <ScrollReveal delay={index * 0.1} direction="up" className="h-full">
      <Card3D hover className="h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              project.status === 'ativo'
                ? 'bg-green-100 text-green-800'
                : project.status === 'concluido'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {statusLabels[project.status]}
            </span>
          </div>
        </div>
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-primary-600">
              {categoryLabels[project.category]}
            </span>
          </div>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
        {project.impact && (
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              {project.impact.peopleReached && (
                <div>
                  <Users className="h-5 w-5 mx-auto mb-1 text-primary-600" />
                  <p className="text-2xl font-bold text-primary-600">
                    {project.impact.peopleReached.toLocaleString('pt-BR')}
                  </p>
                  <p className="text-xs text-gray-600">Pessoas</p>
                </div>
              )}
              {project.impact.events && (
                <div>
                  <Calendar className="h-5 w-5 mx-auto mb-1 text-secondary-600" />
                  <p className="text-2xl font-bold text-secondary-600">
                    {project.impact.events}
                  </p>
                  <p className="text-xs text-gray-600">Eventos</p>
                </div>
              )}
              {project.impact.partnerships && (
                <div>
                  <Handshake className="h-5 w-5 mx-auto mb-1 text-primary-600" />
                  <p className="text-2xl font-bold text-primary-600">
                    {project.impact.partnerships}
                  </p>
                  <p className="text-xs text-gray-600">Parcerias</p>
                </div>
              )}
            </div>
          </CardContent>
        )}
        <CardFooter>
          <Link href={`/projetos/${project.id}`} className="w-full">
            <Button variant="outline" className="w-full" icon={ArrowRight} iconPosition="right">
              Ver Detalhes
            </Button>
          </Link>
        </CardFooter>
      </Card3D>
    </ScrollReveal>
  )
}

export function ProjectsGrid() {
  const [filter, setFilter] = useState<string>('all')
  
  const categories = [
    { value: 'all', label: 'Todos' },
    { value: 'artes-cenicas', label: 'Artes Cênicas' },
    { value: 'educacao', label: 'Educação' },
    { value: 'assistencia-social', label: 'Assistência Social' },
    { value: 'cultura', label: 'Cultura' },
  ]

  const filteredProjects =
    filter === 'all'
      ? mockProjects
      : mockProjects.filter((p) => p.category === filter)

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nossos <span className="gradient-text">Projetos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conheça os projetos que transformam vidas através da arte, cultura e educação
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => setFilter(category.value)}
              className={`px-4 sm:px-6 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
                filter === category.value
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum projeto encontrado nesta categoria.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/projetos">
            <Button size="lg" variant="outline" icon={ArrowRight} iconPosition="right">
              Ver Todos os Projetos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

