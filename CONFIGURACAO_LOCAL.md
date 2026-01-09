# 🏠 Configuração para Desenvolvimento Local

## ✅ Configuração Atual (Localhost)

O projeto já está configurado para funcionar localmente! 

### URLs Configuradas

- **Site:** http://localhost:3000
- **Webhook:** Não precisa configurar ainda (só funciona em produção)
- **Redirects:** Todos apontam para localhost

---

## 📝 Arquivo `.env.local`

Crie este arquivo na **raiz do projeto**:

```env
# Mercado Pago - Credenciais de TESTE
MERCADOPAGO_ACCESS_TOKEN=TEST-seu_token_aqui

# URL Local (já está assim por padrão)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Onde está a raiz?**
```
C:\Users\vinic\Desktop\Instituto fenix\
├── .env.local          ← CRIE AQUI
├── package.json
├── app/
├── components/
└── ...
```

---

## 🔧 Passos para Configurar

### 1. Pegar Credenciais (veja guia completo)
- Acesse: https://www.mercadopago.com.br/developers/panel
- Crie aplicação
- Copie Access Token de **TESTE**

### 2. Criar `.env.local`
```bash
# No terminal, na raiz do projeto:
cd "C:\Users\vinic\Desktop\Instituto fenix"
notepad .env.local
```

Cole:
```env
MERCADOPAGO_ACCESS_TOKEN=TEST-seu_token_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Instalar Dependência
```bash
npm install mercadopago
```

### 4. Reiniciar Servidor
```bash
# Pare (Ctrl+C) e inicie novamente:
npm run dev
```

---

## 🧪 Testar

1. Acesse: http://localhost:3000/como-ajudar
2. Preencha formulário
3. Selecione PIX
4. Deve aparecer QR Code!

---

## ⚠️ Importante

- **Webhook:** Não funciona em localhost. Configure só quando site estiver no ar
- **Credenciais:** Use sempre de TESTE para desenvolvimento
- **URL:** Mantenha `http://localhost:3000` enquanto estiver testando local

---

## 🚀 Quando For para Produção

Quando o site estiver no ar (fenixpe.org):

1. Troque para credenciais de **PRODUÇÃO**
2. Altere `NEXT_PUBLIC_SITE_URL` para `https://fenixpe.org`
3. Configure webhook no painel do Mercado Pago

Mas por enquanto, **use localhost** que está tudo certo! ✅
