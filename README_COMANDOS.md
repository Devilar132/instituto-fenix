# 🚀 Comandos Rápidos para o Projeto

## ⚠️ Problema com PATH no PowerShell

Se o `npm` não for reconhecido no PowerShell, use uma das soluções abaixo:

---

## ✅ Solução 1: Script Automático (Recomendado)

Execute este script que configura tudo automaticamente:

```powershell
.\iniciar.ps1
```

Este script:
- ✅ Adiciona Node.js ao PATH
- ✅ Verifica se npm está funcionando
- ✅ Instala dependências se necessário
- ✅ Inicia o servidor de desenvolvimento

---

## ✅ Solução 2: Adicionar PATH Manualmente (Sessão Atual)

Execute no PowerShell:

```powershell
$env:Path += ";C:\Program Files\nodejs\"
```

Depois execute normalmente:
```powershell
npm install
npm run dev
```

**Nota:** Isso só funciona na sessão atual. Feche o terminal e terá que fazer de novo.

---

## ✅ Solução 3: Usar Caminho Completo

Use o caminho completo do npm:

```powershell
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npm.cmd" run dev
```

---

## ✅ Solução 4: Configurar PATH Permanentemente

Para configurar o PATH permanentemente (recomendado):

1. Pressione `Win + R`
2. Digite: `sysdm.cpl` e pressione Enter
3. Clique em "Avançado" > "Variáveis de Ambiente"
4. Em "Variáveis do sistema", encontre "Path" e clique em "Editar"
5. Clique em "Novo" e adicione: `C:\Program Files\nodejs\`
6. Clique em "OK" em todas as janelas
7. **Feche e reabra o terminal**

Depois disso, `npm` funcionará em qualquer terminal! 🎉

---

## 📋 Comandos Úteis

Depois que o npm estiver funcionando:

```powershell
# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Criar build de produção
npm run build

# Rodar servidor de produção
npm start

# Verificar erros TypeScript
npm run type-check

# Verificar código (linter)
npm run lint
```

---

## 🔍 Verificar se Está Funcionando

```powershell
node -v    # Deve mostrar: v24.12.0
npm -v     # Deve mostrar: 11.6.2
```

---

## 💡 Dica

Se você configurar o PATH permanentemente (Solução 4), não precisará mais fazer nada. O `npm` funcionará automaticamente em todos os terminais!
