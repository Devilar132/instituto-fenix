# 💳 Integração Mercado Pago - Guia Completo

## 📋 Visão Geral

Este guia explica como integrar o Mercado Pago no sistema de doações do Instituto Fenix, permitindo receber pagamentos via **PIX** e **Cartão de Crédito/Débito**.

---

## 🚀 Passo 1: Instalar Dependências

```bash
npm install mercadopago
```

---

## 🔑 Passo 2: Configurar Credenciais do Mercado Pago

### 2.1. Criar Conta no Mercado Pago

1. Acesse: https://www.mercadopago.com.br/
2. Crie uma conta (pode ser pessoa física ou jurídica)
3. Complete o cadastro e verificação

### 2.2. Obter Credenciais

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Crie uma aplicação (se ainda não tiver)
3. Obtenha suas credenciais:
   - **Access Token** (para backend)
   - **Public Key** (opcional, para frontend)

### 2.3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Mercado Pago - Credenciais
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui
MERCADOPAGO_PUBLIC_KEY=sua_public_key_aqui (opcional)

# URL do Site (para webhooks e redirects)
NEXT_PUBLIC_SITE_URL=https://fenixpe.org
# Para desenvolvimento local:
# NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**⚠️ IMPORTANTE:**
- **Sandbox (Teste):** Use credenciais de teste
- **Produção:** Use credenciais de produção
- **NUNCA** commite o arquivo `.env.local` no Git

---

## 🔧 Passo 3: Estrutura Implementada

### 3.1. Arquivos Criados

```
lib/
  └── mercado-pago.ts          # Funções utilitárias do Mercado Pago

app/api/
  ├── payments/
  │   ├── create-preference/   # Criar preferência (múltiplos métodos)
  │   ├── create-pix/          # Criar pagamento PIX
  │   ├── process-card/         # Processar pagamento com cartão
  │   └── status/[id]/         # Verificar status do pagamento
  └── webhooks/
      └── mercado-pago/        # Webhook para notificações
```

### 3.2. Componentes Atualizados

- `components/sections/PixPaymentMercadoPago.tsx` - Novo componente PIX integrado
- Componentes de cartão podem ser atualizados para usar Mercado Pago Checkout Pro

---

## 💰 Passo 4: Como Funciona

### 4.1. Pagamento PIX

**Fluxo:**
1. Usuário preenche formulário de doação
2. Seleciona método PIX
3. Sistema cria pagamento PIX via API
4. Mercado Pago retorna QR Code e código PIX
5. Usuário paga via app do banco
6. Sistema verifica pagamento automaticamente (polling)
7. Webhook confirma pagamento
8. Usuário recebe confirmação

**API Endpoint:**
```
POST /api/payments/create-pix
```

**Exemplo de uso:**
```typescript
const response = await fetch('/api/payments/create-pix', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    amount: 100,
    donorName: 'João Silva',
    donorEmail: 'joao@email.com',
    description: 'Doação para Instituto Fenix',
  }),
})
```

### 4.2. Pagamento com Cartão

**Opção 1: Checkout Pro (Recomendado)**
- Redireciona para página do Mercado Pago
- Mais seguro (PCI compliance)
- Suporta todos os métodos

**Opção 2: Checkout Transparente**
- Pagamento direto no site
- Requer tokenização do cartão
- Mais complexo de implementar

**API Endpoint:**
```
POST /api/payments/create-preference
```

---

## 🔔 Passo 5: Configurar Webhook

### 5.1. No Painel do Mercado Pago

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Vá em **Webhooks**
3. Adicione a URL:
   ```
   https://fenixpe.org/api/webhooks/mercado-pago
   ```
4. Selecione os eventos:
   - `payment`
   - `merchant_order`

### 5.2. Para Desenvolvimento Local

Use ngrok ou similar para expor sua URL local:

```bash
ngrok http 3000
```

Use a URL do ngrok no webhook.

---

## 📝 Passo 6: Atualizar Componentes

### 6.1. Atualizar PaymentMethods.tsx

Substitua o componente `PixPayment` pelo novo:

```tsx
import { PixPaymentMercadoPago } from './PixPaymentMercadoPago'

// No componente PaymentMethods:
{selectedMethod === 'pix' && (
  <PixPaymentMercadoPago
    amount={amount}
    donorName={donorName}
    donorEmail={donorEmail}
    onSuccess={() => setIsSuccess(true)}
  />
)}
```

### 6.2. Para Cartão (Checkout Pro)

Você pode usar o `initPoint` retornado pela API para redirecionar:

```tsx
const response = await fetch('/api/payments/create-preference', {
  method: 'POST',
  body: JSON.stringify({ /* dados */ }),
})

const { initPoint } = await response.json()
window.location.href = initPoint // Redireciona para checkout
```

---

## 🧪 Passo 7: Testar

### 7.1. Modo Sandbox (Teste)

Use credenciais de teste do Mercado Pago.

**Cartões de Teste:**
- Aprovado: `5031 4332 1540 6351`
- CVV: `123`
- Validade: qualquer data futura
- Nome: qualquer nome

**PIX de Teste:**
- Use valores pequenos (R$ 1,00)
- O pagamento será aprovado automaticamente em alguns segundos

### 7.2. Verificar Logs

Monitore o console do servidor para ver:
- Criação de pagamentos
- Webhooks recebidos
- Erros (se houver)

---

## 🔒 Passo 8: Segurança

### 8.1. Validações Implementadas

- ✅ Validação de valor mínimo (R$ 10,00)
- ✅ Validação de dados obrigatórios
- ✅ Sanitização de inputs
- ✅ Tratamento de erros

### 8.2. Recomendações

1. **Nunca** exponha o Access Token no frontend
2. Use HTTPS em produção
3. Valide webhooks (verificar assinatura)
4. Implemente rate limiting
5. Logue todas as transações

---

## 📊 Passo 9: Monitoramento

### 9.1. Painel do Mercado Pago

Acesse: https://www.mercadopago.com.br/activities/payments

Veja:
- Pagamentos recebidos
- Status de cada pagamento
- Estatísticas

### 9.2. Webhook Logs

O webhook loga todas as notificações. Implemente:
- Banco de dados para salvar transações
- Sistema de notificações
- Dashboard administrativo

---

## 🐛 Troubleshooting

### Erro: "Access Token inválido"
- Verifique se a variável `MERCADOPAGO_ACCESS_TOKEN` está configurada
- Confirme se está usando o token correto (sandbox vs produção)

### Erro: "QR Code não aparece"
- Verifique se o pagamento foi criado com sucesso
- Confirme se `qrCodeBase64` está sendo retornado

### Webhook não recebe notificações
- Verifique se a URL está acessível publicamente
- Confirme se está configurado no painel do Mercado Pago
- Use ngrok para desenvolvimento local

### Pagamento não é verificado
- O polling verifica a cada 10 segundos
- Webhook deve confirmar automaticamente
- Verifique logs do servidor

---

## 📚 Recursos Adicionais

### Documentação Oficial
- **SDK Node.js:** https://www.mercadopago.com.br/developers/pt/docs/sdks-library/client-side/sdk-js
- **API Reference:** https://www.mercadopago.com.br/developers/pt/reference
- **Webhooks:** https://www.mercadopago.com.br/developers/pt/docs/your-integrations/notifications/webhooks

### Exemplos
- **Checkout Pro:** https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/integration-test/test-cards
- **PIX:** https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-test/test-cards

---

## ✅ Checklist de Implementação

- [ ] Instalar dependência `mercadopago`
- [ ] Criar conta no Mercado Pago
- [ ] Obter credenciais (Access Token)
- [ ] Configurar variáveis de ambiente
- [ ] Testar criação de pagamento PIX
- [ ] Testar criação de preferência (cartão)
- [ ] Configurar webhook
- [ ] Atualizar componentes frontend
- [ ] Testar fluxo completo
- [ ] Implementar salvamento no banco de dados
- [ ] Implementar envio de emails
- [ ] Configurar para produção

---

## 🎯 Próximos Passos

1. **Salvar Transações no Banco**
   - Criar tabela de doações
   - Salvar quando webhook receber notificação
   - Atualizar status conforme pagamento

2. **Enviar Emails**
   - Confirmação de doação
   - Recibo fiscal
   - Agradecimento

3. **Dashboard Administrativo**
   - Listar doações
   - Estatísticas
   - Exportar relatórios

4. **Melhorias**
   - Notificações em tempo real
   - Retry automático para webhooks
   - Logs estruturados

---

**Dúvidas?** Consulte a documentação oficial do Mercado Pago ou abra uma issue no repositório.
