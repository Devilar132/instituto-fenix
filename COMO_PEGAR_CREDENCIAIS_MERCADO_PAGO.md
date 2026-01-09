# 🔑 Como Pegar Credenciais do Mercado Pago - Passo a Passo

## 📋 Passo a Passo Visual

### 1️⃣ Criar Conta no Mercado Pago

1. Acesse: **https://www.mercadopago.com.br/**
2. Clique em **"Criar conta"** (canto superior direito)
3. Preencha seus dados:
   - Email
   - Senha
   - CPF ou CNPJ
4. Confirme seu email

---

### 2️⃣ Acessar Painel de Desenvolvedores

1. Faça login na sua conta
2. Acesse: **https://www.mercadopago.com.br/developers/panel**
   - Ou clique no menu → **"Desenvolvedores"**

---

### 3️⃣ Criar uma Aplicação

1. No painel, clique em **"Suas integrações"** ou **"Aplicações"**
2. Clique em **"Criar aplicação"** ou **"Nova aplicação"**
3. Preencha:
   - **Nome:** Instituto Fenix (ou qualquer nome)
   - **Descrição:** Site de doações (opcional)
4. Clique em **"Criar"**

---

### 4️⃣ Obter as Credenciais

Após criar a aplicação, você verá duas abas:

#### 🔵 Credenciais de TESTE (Sandbox)
- Use para **desenvolvimento e testes**
- Não cobra taxas reais
- Pagamentos são simulados

#### 🟢 Credenciais de PRODUÇÃO
- Use apenas quando site estiver **no ar**
- Cobra taxas reais
- Pagamentos são reais

---

### 5️⃣ Copiar o Access Token

1. Na aplicação criada, você verá:
   - **Access Token** (para backend)
   - **Public Key** (opcional, para frontend)

2. **Clique em "Ver credenciais"** ou **"Revelar"**

3. **Copie o Access Token** (é uma string longa tipo: `TEST-1234567890-...`)

---

## 📝 Configurar no Projeto

### Criar arquivo `.env.local`

Na raiz do projeto, crie um arquivo chamado `.env.local`:

```env
# Mercado Pago - Use credenciais de TESTE primeiro
MERCADOPAGO_ACCESS_TOKEN=TEST-seu_token_aqui

# URL local (para desenvolvimento)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:**
- Substitua `TEST-seu_token_aqui` pelo Access Token que você copiou
- Se começar com `TEST-` = credenciais de teste
- Se começar com `APP_USR-` = credenciais de produção

---

## 🧪 Testar

### 1. Instalar dependência
```bash
npm install mercadopago
```

### 2. Reiniciar servidor
```bash
# Pare o servidor (Ctrl+C) e inicie novamente
npm run dev
```

### 3. Testar PIX
1. Acesse: http://localhost:3000/como-ajudar
2. Preencha o formulário de doação
3. Selecione PIX
4. Deve aparecer o QR Code

---

## 🎯 Onde Fica Cada Coisa

### No Painel do Mercado Pago:

```
Painel de Desenvolvedores
├── Suas Integrações
│   └── [Sua Aplicação]
│       ├── Credenciais de TESTE
│       │   ├── Access Token ← USE ESTE
│       │   └── Public Key (opcional)
│       │
│       ├── Credenciais de PRODUÇÃO
│       │   ├── Access Token
│       │   └── Public Key
│       │
│       └── Webhooks ← Configure depois
```

---

## 🔍 Exemplo Visual

Quando você abrir a aplicação, verá algo assim:

```
┌─────────────────────────────────────┐
│  Aplicação: Instituto Fenix         │
├─────────────────────────────────────┤
│  Credenciais de TESTE               │
│                                     │
│  Access Token:                      │
│  [TEST-1234567890-abc-def-...]      │
│  [👁️ Revelar] [📋 Copiar]          │
│                                     │
│  Public Key:                        │
│  [TEST-abc123...]                   │
│  [👁️ Revelar] [📋 Copiar]          │
└─────────────────────────────────────┘
```

---

## ⚠️ Dicas Importantes

### Para Desenvolvimento (AGORA):
- ✅ Use **Credenciais de TESTE**
- ✅ Access Token começa com `TEST-`
- ✅ Não precisa de webhook ainda
- ✅ Pode testar sem medo

### Para Produção (DEPOIS):
- ✅ Use **Credenciais de PRODUÇÃO**
- ✅ Access Token começa com `APP_USR-`
- ✅ Configure webhook
- ✅ Teste bem antes de usar

---

## 🐛 Problemas Comuns

### "Access Token inválido"
- Verifique se copiou o token completo
- Confirme se está usando o token de TESTE
- Veja se não tem espaços extras

### "Não encontrei onde criar aplicação"
- Acesse: https://www.mercadopago.com.br/developers/panel
- Procure por "Suas integrações" ou "Aplicações"
- Se não aparecer, complete seu cadastro primeiro

### "QR Code não aparece"
- Verifique se instalou: `npm install mercadopago`
- Confirme se o `.env.local` está na raiz do projeto
- Reinicie o servidor após criar `.env.local`

---

## 📞 Precisa de Ajuda?

- **Documentação:** https://www.mercadopago.com.br/developers/pt/docs
- **Suporte:** https://www.mercadopago.com.br/developers/pt/support

---

## ✅ Checklist

- [ ] Criou conta no Mercado Pago
- [ ] Acessou painel de desenvolvedores
- [ ] Criou uma aplicação
- [ ] Copiou o Access Token de TESTE
- [ ] Criou arquivo `.env.local`
- [ ] Colou o token no `.env.local`
- [ ] Instalou `npm install mercadopago`
- [ ] Reiniciou o servidor
- [ ] Testou o PIX

---

**Pronto!** Agora você tem tudo configurado para testar localmente! 🚀
