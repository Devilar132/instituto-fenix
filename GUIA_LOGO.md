# 🎨 Guia de Uso do Logo - Instituto Fênix

## Logo Implementado

O logo da Fênix foi implementado como componente SVG animado, baseado na descrição do logo original.

## Componente: AnimatedLogo

### Localização
`components/ui/AnimatedLogo.tsx`

### Uso Básico
```tsx
import { AnimatedLogo } from '@/components/ui/AnimatedLogo'

<AnimatedLogo size="md" animated={true} />
```

### Props
- `size`: 'sm' | 'md' | 'lg' (padrão: 'md')
- `animated`: boolean (padrão: true)
- `className`: string (classes CSS adicionais)

### Tamanhos
- `sm`: 32x32px (w-8 h-8)
- `md`: 48x48px (w-12 h-12)
- `lg`: 64x64px (w-16 h-16)

## Onde Está Sendo Usado

### 1. Header (Navegação)
- Logo animado no topo esquerdo
- Animação suave ao carregar
- Hover effect com glow
- Tamanho: md

### 2. Favicon (Recomendado)
Para usar o logo como favicon:
1. Exporte o SVG do componente
2. Converta para ICO/PNG
3. Adicione em `public/favicon.ico`

## Personalização

### Cores
O logo usa a cor primária do tema:
- Cor principal: `#FF6B35` (primary-500)
- Cor escura: `#E55A2B` (primary-600)

### Animações
- **Entrada**: Path animation (1.5s)
- **Hover**: Scale + rotate suave
- **Idle**: Pulsação sutil (2s loop)

## Substituir por Logo Real

Se você tiver o logo em formato SVG/PNG:

1. **SVG**: Substitua o conteúdo do componente
2. **PNG**: Use Image do Next.js
3. **Mantenha**: As animações e props

### Exemplo com Imagem Real
```tsx
import Image from 'next/image'

<Image
  src="/images/logo-fenix.svg"
  alt="Instituto Fênix"
  width={48}
  height={48}
  className="animate-pulse"
/>
```

## Otimizações

- ✅ SVG inline (sem requests)
- ✅ GPU accelerated
- ✅ Lazy loading ready
- ✅ Acessível (alt text)

## Acessibilidade

- Alt text automático
- Contraste adequado
- Focus states
- Reduced motion support

