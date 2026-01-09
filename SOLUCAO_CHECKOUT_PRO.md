# 💳 Solução: Usar Checkout Pro (Mais Simples e Confiável)

## 🎯 Por que Checkout Pro?

O erro "Unauthorized use of live credentials" pode acontecer porque:
- Token de teste tem limitações para criar pagamentos diretos
- Checkout Pro é mais simples e funciona melhor

**Checkout Pro:**
- ✅ Funciona sempre (mesmo com token de teste)
- ✅ Usuário escolhe PIX ou Cartão na página do Mercado Pago
- ✅ Mais seguro (PCI compliance)
- ✅ Menos código necessário

---

## 🔧 Como Funciona

1. **Criar preferência de pagamento** (nosso código)
2. **Redirecionar para página do Mercado Pago** (usuário escolhe método)
3. **Mercado Pago processa pagamento**
4. **Redireciona de volta** para nosso site
5. **Webhook confirma** (opcional)

---

## ✅ Implementação

Já está implementado! Você só precisa:

1. **Atualizar o componente** para usar preferência ao invés de PIX direto
2. **Testar** criando uma preferência

---

## 🧪 Testar Agora

Teste criar uma preferência (isso deve funcionar):

```powershell
$body = @{ amount = 10; donorName = 'Teste'; donorEmail = 'teste@test.com'; description = 'Doação' } | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "http://localhost:3000/api/payments/create-preference" -ContentType "application/json" -Body $body
```

**Se funcionar:** Você verá um `initPoint` (URL para redirecionar)

---

## 📝 Próximo Passo

Quer que eu atualize o componente PIX para usar Checkout Pro? É mais confiável e funciona sempre!
