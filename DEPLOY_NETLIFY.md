# 🚀 Deploy no Netlify - Guia Completo

## ✅ Por Que Netlify?

- ✅ **Gratuito** para projetos open source e pessoais
- ✅ **Deploy automático** a cada push no Git
- ✅ **SSL automático** (HTTPS)
- ✅ **URL personalizada** (ex: instituto-fenix.netlify.app)
- ✅ **Preview de cada alteração**
- ✅ **Bom suporte para Next.js**

---

## 📋 Pré-requisitos

1. ✅ Projeto funcionando localmente (`npm run build` funciona)
2. ✅ Conta no GitHub/GitLab/Bitbucket (ou Netlify CLI)
3. ✅ Projeto no Git (recomendado GitHub)

---

## 🎯 Método 1: Deploy via GitHub (RECOMENDADO - Mais Fácil)

### Passo 1: Colocar no GitHub

Se ainda não está no GitHub:

```bash
# Na pasta do projeto
git init
git add .
git commit -m "Initial commit - Site Instituto Fenix"

# Criar repositório no GitHub primeiro (github.com/new)
# Depois:
git remote add origin https://github.com/Devilar132/instituto-fenix.git
git branch -M main
git push -u origin main
```

### Passo 2: Criar Conta no Netlify

1. Acesse: **https://www.netlify.com**
2. Clique em **"Sign up"**
3. Escolha **"Continue with GitHub"** (mais fácil)
4. Autorize o acesso

### Passo 3: Conectar Repositório

1. No dashboard do Netlify, clique em **"Add new site"**
2. Escolha **"Import an existing project"**
3. Selecione **"GitHub"**
4. Autorize o Netlify a acessar seus repositórios
5. Procure e selecione o repositório **"instituto-fenix"**
6. Clique em **"Import"**

### Passo 4: Configurar Build (Importante!)

Na tela de configuração, certifique-se de:

- **Branch to deploy**: `main` (ou `master`)
- **Build command**: `npm run build`
- **Publish directory**: `.next` (ou deixe em branco - o Netlify detecta automaticamente)

**IMPORTANTE**: Como estamos usando Next.js 14, o Netlify vai detectar automaticamente. Mas se não detectar:

1. Clique em **"Show advanced"**
2. Adicione:
   - Build command: `npm run build`
   - Publish directory: `.next`

### Passo 5: Variáveis de Ambiente

Se você tem variáveis de ambiente (Mercado Pago, etc):

1. Antes de fazer deploy, clique em **"Show advanced"**
2. Clique em **"New variable"**
3. Adicione uma por uma:
   - `MERCADOPAGO_ACCESS_TOKEN` = `seu_token_aqui`
   - `NEXT_PUBLIC_SITE_URL` = `https://seu-site.netlify.app` (você pode ajustar depois)

**⚠️ IMPORTANTE**: 
- Use `MERCADOPAGO_ACCESS_TOKEN` para credenciais de **PRODUÇÃO** (não teste!)
- O token deve começar com `APP_USR-` para produção

### Passo 6: Deploy!

1. Clique em **"Deploy site"**
2. Aguarde 3-5 minutos
3. Pronto! Seu site estará em: `https://seu-site-aleatorio.netlify.app`

---

## 🎯 Método 2: Deploy via Netlify CLI (Alternativa)

### Passo 1: Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

### Passo 2: Login

```bash
netlify login
```

Isso abre o navegador para fazer login.

### Passo 3: Deploy

```bash
# Na pasta do projeto
npm run build
netlify deploy --prod
```

Siga as instruções na tela!

---

## ⚙️ Configurações Após o Deploy

### 1. Configurar Domínio Personalizado (Opcional)

1. Vá em **Site settings** → **Domain management**
2. Clique em **"Add custom domain"**
3. Digite seu domínio: `fenixpe.org` ou `www.fenixpe.org`
4. Siga as instruções de DNS

### 2. Configurar Variáveis de Ambiente

1. Vá em **Site settings** → **Environment variables**
2. Adicione/edite variáveis:
   - `MERCADOPAGO_ACCESS_TOKEN` (produção)
   - `NEXT_PUBLIC_SITE_URL` (sua URL do Netlify)
3. Clique em **"Trigger deploy"** para aplicar

### 3. Configurar Webhook do Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Vá em **Webhooks**
3. Adicione a URL: `https://seu-site.netlify.app/api/webhooks/mercado-pago`

---

## 🔄 Deploys Automáticos

### Funciona Automaticamente:

1. **A cada push no GitHub** → Netlify faz deploy automaticamente
2. **A cada Pull Request** → Gera um preview URL
3. **Deploy instantâneo** → Em 2-5 minutos

### Verificar Deploy:

1. Acesse o dashboard do Netlify
2. Veja o histórico de deploys
3. Clique em um deploy para ver logs detalhados

---

## 🐛 Troubleshooting

### Erro: "Build failed"

**Solução:**
```bash
# Teste localmente primeiro
npm run build

# Se der erro, veja os logs no Netlify
# Geralmente é:
# - Variáveis de ambiente faltando
# - Dependências não instaladas
# - Erro de TypeScript
```

### Erro: "Module not found"

**Solução:**
- Verifique se `package.json` está correto
- Certifique-se que todas as dependências estão listadas
- Netlify instala automaticamente, mas pode faltar alguma

### Erro: "Image optimization failed"

**Solução:**
- Verifique `next.config.js` - `remotePatterns`
- Imagens locais devem estar em `/public/`
- Use caminhos absolutos: `/partners/1.png`

### Variáveis de Ambiente Não Funcionam

**Solução:**
1. Verifique se adicionou no Netlify (Site settings → Environment variables)
2. Use `MERCADOPAGO_ACCESS_TOKEN` (não `MERCADOPAGO_ACCESS_TOKEN`)
3. Após adicionar, faça **"Trigger deploy"** novamente
4. Variáveis começando com `NEXT_PUBLIC_` são públicas (frontend)
5. Outras são privadas (server-side apenas)

---

## 📋 Checklist Antes do Deploy

- [ ] Testou `npm run build` localmente? (sem erros)
- [ ] Todas as dependências estão no `package.json`?
- [ ] `.env.local` está no `.gitignore`? (não deve ir para o Git)
- [ ] Imagens estão em `/public/`?
- [ ] Configurou variáveis de ambiente no Netlify?
- [ ] Webhook do Mercado Pago configurado? (depois do deploy)
- [ ] Testou todas as páginas localmente?

---

## 🔐 Segurança

### Arquivos Sensíveis

**NÃO SUBIR NO GIT:**
- `.env.local`
- `.env.production`
- Credenciais
- Tokens

**Está no `.gitignore`?** ✅ (Verifique!)

### Variáveis de Ambiente no Netlify

- Use **Environment variables** no Netlify
- Separe por ambiente (Production, Preview, Branch)
- Tokens de produção apenas em Production

---

## 🚀 Após o Deploy

### 1. Testar o Site

1. Acesse a URL do Netlify
2. Teste todas as páginas
3. Teste formulários
4. Teste pagamentos (em modo teste primeiro!)

### 2. Configurar Produção

1. **Mercado Pago**: Use credenciais de PRODUÇÃO
2. **Webhook**: Configure com URL do Netlify
3. **Domínio**: Configure domínio próprio (opcional)

### 3. Monitorar

- Dashboard do Netlify mostra:
  - Visitas
  - Erros
  - Performance
  - Logs

---

## 📊 URLs Úteis

- **Dashboard**: https://app.netlify.com
- **Documentação**: https://docs.netlify.com
- **Status**: https://www.netlify.com/status

---

## 💡 Dicas

1. **Preview Deploys**: Cada PR gera um preview URL único
2. **Rollback**: Pode voltar versões anteriores
3. **Split Testing**: Teste A/B (plano pago)
4. **Forms**: Netlify tem sistema de forms integrado (opcional)
5. **Analytics**: Plano pago, mas tem alternativas gratuitas

---

## ✅ Pronto!

Seu site está no ar! 🎉

**URL será algo como:**
`https://instituto-fenix-abc123.netlify.app`

Ou configure domínio próprio depois!

---

**Precisa de ajuda?** Veja os logs no Netlify ou teste localmente primeiro.
