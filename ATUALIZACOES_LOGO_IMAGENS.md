# 🎨 Atualizações: Logo e Imagens

## ✅ Logo Real Implementado

### Arquivo
- **Origem**: `Icons-Site.png`
- **Destino**: `public/logo-fenix.png`
- **Componente**: `components/ui/Logo.tsx`

### Características
- Logo real do Instituto Fênix
- Animações suaves no hover
- Responsivo (sm, md, lg)
- Otimizado com Next.js Image
- Efeito glow no hover

### Uso
```tsx
import { Logo } from '@/components/ui/Logo'

<Logo size="md" showText={false} />
```

### Onde Está Sendo Usado
- ✅ **Header**: Logo principal no topo
- ✅ **Responsivo**: Esconde texto em mobile

## 🖼️ Imagens Placeholder Adicionadas

### Projetos (3 imagens)
1. **Teatro na Comunidade**
   - URL: Unsplash - Teatro/Cultura
   - Tema: Artes cênicas

2. **Arte e Educação**
   - URL: Unsplash - Educação
   - Tema: Educação artística

3. **Casa de Acolhimento**
   - URL: Unsplash - Assistência social
   - Tema: Acolhimento

### Eventos (3 imagens)
1. **Oficina de Teatro**
   - URL: Unsplash - Teatro/Oficina
   - Tema: Workshop

2. **Espetáculo: A Vida em Cena**
   - URL: Unsplash - Apresentação teatral
   - Tema: Espetáculo

3. **Curso de Produção Cultural**
   - URL: Unsplash - Produção cultural
   - Tema: Curso

### Páginas
- ✅ **Sobre**: Imagem da sede/instituto
- ✅ **Eventos**: Imagens nos cards
- ✅ **Projetos**: Imagens nos cards

## 📝 Configurações Atualizadas

### next.config.js
- ✅ Permite imagens do Unsplash
- ✅ Otimização automática (WebP/AVIF)
- ✅ Lazy loading habilitado

### Componentes Atualizados
- ✅ `components/ui/Logo.tsx` - Novo componente
- ✅ `components/layout/Header.tsx` - Usa logo real
- ✅ `app/sobre/page.tsx` - Imagem adicionada
- ✅ `app/eventos/page.tsx` - Imagens nos cards
- ✅ `lib/data/mock.ts` - URLs de imagens atualizadas

## 🔄 Próximos Passos (Opcional)

1. **Substituir por Imagens Reais**
   - Quando tiver as imagens reais, substitua as URLs do Unsplash
   - Mantenha a estrutura atual

2. **Otimizar Imagens**
   - Converter para WebP/AVIF
   - Redimensionar para tamanhos apropriados
   - Adicionar blur placeholder

3. **Favicon**
   - Criar favicon a partir do logo
   - Adicionar em `public/favicon.ico`

## 📊 Status

- ✅ Logo real implementado
- ✅ Imagens placeholder adicionadas
- ✅ Configurações atualizadas
- ✅ Componentes funcionando
- ✅ Performance otimizada

