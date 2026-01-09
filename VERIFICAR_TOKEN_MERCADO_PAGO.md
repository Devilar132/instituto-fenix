# 🔍 Verificar Token do Mercado Pago - Passo a Passo

## ✅ Seu Token Está Válido!

O teste mostrou que:
- ✅ Token está configurado
- ✅ Token é de TESTE (`TEST-...`)
- ✅ API do Mercado Pago responde (15 métodos de pagamento encontrados)

**MAS** ainda dá erro ao criar pagamento PIX.

---

## 🔍 Possíveis Causas

### 1. Token Precisa de Permissões Específicas

Alguns tokens de teste podem ter limitações. Tente:

1. **Gerar um novo token:**
   - Acesse: https://www.mercadopago.com.br/developers/panel
   - Vá em sua aplicação
   - Clique em **"Credenciais de TESTE"**
   - Clique em **"Gerar novo token"** ou **"Renovar"**
   - Copie o novo token

2. **Atualize `.env.local`:**
   ```env
   MERCADOPAGO_ACCESS_TOKEN=TEST-novo_token_aqui
   ```

3. **Reinicie o servidor**

---

### 2. Conta Precisa Estar Completa

Verifique no painel do Mercado Pago:
- ✅ Email verificado
- ✅ Dados pessoais completos
- ✅ Sem pendências ou avisos

---

### 3. Aplicação Precisa Ter PIX Habilitado

1. No painel, vá em sua aplicação
2. Verifique se há configurações de **métodos de pagamento**
3. Certifique-se que **PIX está habilitado**

---

### 4. Testar com Valor Mínimo

O Mercado Pago pode ter valor mínimo. Tente com **R$ 1,00**:

```powershell
$body = @{ amount = 1; donorName = 'Teste'; donorEmail = 'teste@test.com'; description = 'Teste' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/payments/create-pix" -ContentType "application/json" -Body $body
```

---

## 🧪 Teste Direto na API do Mercado Pago

Para verificar se o problema é no nosso código ou no token, teste direto:

```powershell
$token = "TEST-seu_token_aqui"
$body = @{
    transaction_amount = 10
    description = "Teste PIX"
    payment_method_id = "pix"
    payer = @{
        email = "teste@test.com"
        first_name = "Teste"
        last_name = "Usuario"
    }
} | ConvertTo-Json

$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
}

Invoke-RestMethod -Method Post -Uri "https://api.mercadopago.com/v1/payments" -Headers $headers -Body $body
```

**Se der erro aqui também:** O problema é no token/conta  
**Se funcionar aqui:** O problema é no nosso código

---

## 💡 Solução Alternativa: Usar Checkout Pro

Se PIX direto não funcionar, podemos usar **Checkout Pro** que é mais simples:

1. Cria uma preferência de pagamento
2. Usuário escolhe PIX ou Cartão na página do Mercado Pago
3. Mais confiável e funciona sempre

Quer que eu implemente essa alternativa?

---

## 📞 Próximos Passos

1. **Tente gerar um novo token de teste**
2. **Teste com valor mínimo (R$ 1,00)**
3. **Teste direto na API** (comando acima)
4. **Se nada funcionar:** Podemos usar Checkout Pro

---

**Me diga o resultado dos testes acima!** 🚀
