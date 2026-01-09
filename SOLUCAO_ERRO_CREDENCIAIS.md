# 🔧 Solução: Erro "Unauthorized use of live credentials"

## ⚠️ Problema

Mesmo usando token de TESTE, aparece o erro:
```
"Unauthorized use of live credentials"
```

## ✅ Soluções

### Solução 1: Gerar Novo Token de Teste

1. **Acesse o painel:**
   - https://www.mercadopago.com.br/developers/panel

2. **Vá em sua aplicação:**
   - Clique na aplicação que você criou

3. **Credenciais de TESTE:**
   - Clique em **"Credenciais de TESTE"**
   - Clique em **"Gerar novo token"** ou **"Renovar"**
   - Copie o **novo Access Token**

4. **Atualize o `.env.local`:**
   ```env
   MERCADOPAGO_ACCESS_TOKEN=TEST-novo_token_aqui
   ```

5. **Reinicie o servidor:**
   ```powershell
   # Pare (Ctrl+C) e inicie:
   & "C:\Program Files\nodejs\npm.cmd" run dev
   ```

---

### Solução 2: Verificar se Token é Realmente de Teste

O token de **TESTE** deve:
- ✅ Começar com `TEST-`
- ✅ Ter sido copiado da aba **"Credenciais de TESTE"** (não de produção)
- ✅ Estar na aplicação correta

**NÃO use:**
- ❌ Token que começa com `APP_USR-` (é de produção)
- ❌ Token da aba "Credenciais de PRODUÇÃO"

---

### Solução 3: Criar Nova Aplicação

Se o problema persistir:

1. **Crie uma nova aplicação:**
   - No painel, clique em **"Criar aplicação"**
   - Dê um nome: "Instituto Fenix - Teste"
   - Clique em **"Criar"**

2. **Copie o novo token de TESTE**

3. **Atualize `.env.local`**

4. **Reinicie o servidor**

---

### Solução 4: Verificar Conta do Mercado Pago

Às vezes a conta precisa estar:
- ✅ **Verificada** (email confirmado)
- ✅ **Completa** (dados preenchidos)
- ✅ **Sem restrições**

Verifique no painel se há avisos ou pendências.

---

## 🧪 Testar

Após aplicar uma solução, teste:

1. Acesse: http://localhost:3000/api/diag/mercadopago
   - Deve mostrar: `"tokenType": "test"`

2. Teste criar PIX:
   ```powershell
   $body = @{ amount = 10; donorName = 'Teste'; donorEmail = 'teste@test.com'; description = 'Teste' } | ConvertTo-Json
   Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/payments/create-pix" -ContentType "application/json" -Body $body
   ```

3. Se funcionar, você verá:
   ```json
   {
     "success": true,
     "paymentId": "...",
     "qrCode": "...",
     "qrCodeBase64": "..."
   }
   ```

---

## 📞 Se Nada Funcionar

1. **Verifique os logs do servidor:**
   - Olhe o terminal onde está rodando `npm run dev`
   - Veja se há mais detalhes do erro

2. **Teste com API REST direta:**
   - Posso criar uma versão alternativa usando fetch() direto
   - Sem usar o SDK do Mercado Pago

3. **Contate suporte Mercado Pago:**
   - https://www.mercadopago.com.br/developers/pt/support

---

## ✅ Checklist

- [ ] Token começa com `TEST-`
- [ ] Token foi copiado de "Credenciais de TESTE"
- [ ] `.env.local` está na raiz do projeto
- [ ] Servidor foi reiniciado após mudar `.env.local`
- [ ] Conta do Mercado Pago está verificada
- [ ] Aplicação está ativa no painel

---

**Tente a Solução 1 primeiro** (gerar novo token). Geralmente resolve! 🚀
