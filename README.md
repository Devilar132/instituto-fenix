# Instituto Fenix - Website

Site oficial do Instituto Fenix, desenvolvido com as melhores práticas de desenvolvimento web moderno.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Framer Motion** - Animações fluidas
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schemas
- **date-fns** - Manipulação de datas
- **Lucide React** - Ícones modernos

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🏗️ Estrutura do Projeto

```
/
├── app/                    # App Router (Next.js 14)
│   ├── layout.tsx         # Layout raiz
│   ├── page.tsx           # Homepage
│   ├── sobre/             # Página Sobre
│   ├── projetos/          # Página de Projetos
│   ├── eventos/           # Página de Eventos
│   └── contato/           # Página de Contato
├── components/            # Componentes React
│   ├── ui/               # Componentes base
│   ├── layout/           # Componentes de layout
│   └── sections/         # Seções da página
├── lib/                  # Utilitários e helpers
├── public/               # Arquivos estáticos
└── types/                # Definições TypeScript
```

## 🎨 Design System

O projeto utiliza um design system consistente com:
- Paleta de cores primária e secundária
- Tipografia hierárquica
- Componentes reutilizáveis
- Animações suaves

## 📱 Features

- ✅ Design responsivo (mobile-first)
- ✅ SEO otimizado
- ✅ Acessibilidade (WCAG 2.1)
- ✅ Performance otimizada
- ✅ PWA ready
- ✅ Dark mode (em desenvolvimento)

## 🔧 Scripts

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter
- `npm run type-check` - Verifica tipos TypeScript

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (veja `.env.example` para referência):

```env
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ IMPORTANTE**: Nunca commite arquivos `.env.local` no Git.

## 🚀 Deploy

### Deploy no Netlify

O projeto está configurado para deploy automático no Netlify. Veja o guia completo em [`DEPLOY_NETLIFY.md`](./DEPLOY_NETLIFY.md).

**Passos rápidos:**
1. Faça push do código para o GitHub
2. Acesse [Netlify](https://www.netlify.com) e conecte seu repositório
3. Configure as variáveis de ambiente no painel do Netlify
4. Deploy automático a cada push para `main`!

### Variáveis de Ambiente no Netlify

Configure estas variáveis no painel do Netlify (Settings → Environment variables):

- `MERCADOPAGO_ACCESS_TOKEN` - Access Token do Mercado Pago (produção)
- `NEXT_PUBLIC_SITE_URL` - URL do site (será atualizado automaticamente após primeiro deploy)

## 📄 Licença

Este projeto é propriedade do Instituto Fenix.

