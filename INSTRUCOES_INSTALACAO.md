# 🚀 Instruções de Instalação e Execução

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar em Desenvolvimento

```bash
npm run dev
```

O site estará disponível em: `http://localhost:3000`

### 3. Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura de Arquivos

### Arquivos de Configuração
- `package.json` - Dependências do projeto
- `tsconfig.json` - Configuração TypeScript
- `next.config.js` - Configuração Next.js
- `tailwind.config.js` - Configuração Tailwind CSS
- `.eslintrc.json` - Configuração ESLint

### Pastas Principais
- `app/` - Páginas e rotas (App Router)
- `components/` - Componentes React reutilizáveis
- `lib/` - Utilitários e helpers
- `public/` - Arquivos estáticos (imagens, ícones)
- `types/` - Definições TypeScript

## 🎨 Personalização

### Cores
Edite `tailwind.config.js` para alterar as cores do tema:
- `primary` - Cor primária (vermelho)
- `secondary` - Cor secundária (azul)

### Conteúdo
- Dados mockados: `lib/data/mock.ts`
- Configurações do site: `lib/constants.ts`

### Imagens
Adicione suas imagens em `public/images/`:
- Logo: `public/images/logo.png`
- Hero background: `public/images/hero-bg.jpg`
- Projetos: `public/images/projects/`
- OG Image: `public/images/og-image.jpg`

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter
- `npm run type-check` - Verifica tipos TypeScript

## 📝 Próximos Passos

1. **Adicionar Imagens Reais**
   - Substitua imagens placeholder por imagens reais
   - Otimize imagens (WebP, AVIF)

2. **Configurar API/Backend**
   - Integre com CMS (Strapi, Sanity, etc.)
   - Configure gateway de pagamento
   - Configure envio de e-mails

3. **Deploy**
   - Vercel (recomendado para Next.js)
   - Netlify
   - AWS Amplify

4. **SEO**
   - Configure Google Analytics
   - Configure Google Search Console
   - Adicione Google My Business

5. **PWA**
   - Gere ícones PWA (192x192, 512x512)
   - Configure service worker
   - Teste instalação

## 🐛 Troubleshooting

### Erro de módulos não encontrados
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro de TypeScript
```bash
npm run type-check
```

### Erro de build
```bash
npm run build
```

## 📚 Documentação

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

