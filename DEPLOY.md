# 🚀 Guia de Deploy - Instituto Fenix

## Opção 1: Vercel (RECOMENDADO - Mais Fácil)

### Por que Vercel?
- ✅ **Gratuito** para projetos pessoais
- ✅ **Deploy automático** a cada push no GitHub
- ✅ **Otimizado para Next.js** (criado pela mesma equipe)
- ✅ **URL personalizada** (ex: instituto-fenix.vercel.app)
- ✅ **Preview de cada alteração** antes de publicar
- ✅ **SSL automático** (HTTPS)

### Passo a Passo:

#### 1. Criar conta na Vercel
1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"** (recomendado)

#### 2. Conectar seu repositório GitHub
1. Se ainda não tem o projeto no GitHub:
   ```bash
   # No terminal, na pasta do projeto:
   git init
   git add .
   git commit -m "Initial commit"
   
   # Criar repositório no GitHub primeiro, depois:
   git remote add origin https://github.com/SEU_USUARIO/instituto-fenix.git
   git push -u origin main
   ```

2. Na Vercel:
   - Clique em **"Add New Project"**
   - Selecione seu repositório do GitHub
   - Clique em **"Import"**

#### 3. Configurar o projeto
- **Framework Preset**: Next.js (detectado automaticamente)
- **Root Directory**: `./` (deixe padrão)
- **Build Command**: `npm run build` (automático)
- **Output Directory**: `.next` (automático)
- **Install Command**: `npm install` (automático)

#### 4. Variáveis de Ambiente (se necessário)
Se você tiver variáveis de ambiente (como chaves do Mercado Pago):
- Na página do projeto → **Settings** → **Environment Variables**
- Adicione:
  - `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY`
  - `MERCADO_PAGO_ACCESS_TOKEN`
  - etc.

#### 5. Deploy!
- Clique em **"Deploy"**
- Aguarde 2-3 minutos
- Pronto! Você terá uma URL como: `instituto-fenix-xyz.vercel.app`

### Atualizações Automáticas
- **A cada push no GitHub**, a Vercel faz deploy automaticamente
- Você pode ver o progresso em tempo real
- Cada commit gera um preview URL único

### Compartilhar com seu Chefe
1. Envie a URL principal: `https://instituto-fenix.vercel.app`
2. Ou configure um domínio personalizado (opcional):
   - Settings → Domains
   - Adicione: `app.fenixpe.org` (ou outro)

---

## Opção 2: Netlify (Alternativa)

### Passo a Passo:
1. Acesse: https://netlify.com
2. **Sign Up** com GitHub
3. **New site from Git** → Selecione repositório
4. Configurações:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
5. Deploy!

---

## Opção 3: Railway (Para Backend também)

### Passo a Passo:
1. Acesse: https://railway.app
2. **Start a New Project** → **Deploy from GitHub repo**
3. Selecione seu repositório
4. Railway detecta Next.js automaticamente
5. Deploy!

---

## ⚙️ Configurações Importantes

### Arquivo `.env.local` (NÃO SUBIR NO GIT)
Crie um arquivo `.env.local` na raiz do projeto:
```env
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=sua_chave_publica
MERCADO_PAGO_ACCESS_TOKEN=seu_token
NEXT_PUBLIC_SITE_URL=https://seu-site.vercel.app
```

### Verificar `.gitignore`
Certifique-se que `.gitignore` contém:
```
.env.local
.env*.local
node_modules
.next
```

---

## 🔄 Fluxo de Trabalho Recomendado

### 1. Desenvolvimento Local
```bash
npm run dev
# Trabalhe em http://localhost:3000
```

### 2. Fazer Alterações
```bash
git add .
git commit -m "Descrição da alteração"
git push origin main
```

### 3. Deploy Automático
- Vercel detecta o push
- Faz build automaticamente
- Deploy em 2-3 minutos
- Seu chefe vê as alterações na URL

### 4. Preview de Alterações (Opcional)
- Cada Pull Request gera um preview URL
- Você pode mostrar ao chefe antes de publicar

---

## 📋 Checklist Antes do Deploy

- [ ] Testar localmente: `npm run build` funciona?
- [ ] Variáveis de ambiente configuradas na Vercel
- [ ] `.env.local` não está no Git
- [ ] Imagens estão otimizadas
- [ ] Links e rotas funcionando
- [ ] Formulários testados

---

## 🐛 Troubleshooting

### Erro de Build
- Verifique os logs na Vercel
- Teste localmente: `npm run build`
- Verifique variáveis de ambiente

### Imagens não aparecem
- Verifique `next.config.js` - `remotePatterns`
- Use caminhos absolutos: `/images/logo.png`

### API Routes não funcionam
- Verifique se está usando `process.env.VARIAVEL`
- Configure variáveis na Vercel

---

## 💡 Dicas

1. **Preview Deploys**: Cada branch gera um preview URL
2. **Rollback**: Pode voltar versões anteriores na Vercel
3. **Analytics**: Vercel tem analytics integrado (gratuito)
4. **Domínio**: Pode usar domínio próprio depois

---

## 📞 Suporte

- Vercel Docs: https://vercel.com/docs
- Next.js Deploy: https://nextjs.org/docs/deployment

