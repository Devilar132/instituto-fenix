# 🔧 Problema: PATH Configurado mas Não Funciona

## ⚠️ Situação
Você configurou o PATH nas variáveis de ambiente, mas o PowerShell ainda não reconhece o `npm`.

## 🔍 Por Que Isso Acontece?

O PowerShell **não recarrega automaticamente** as variáveis de ambiente do sistema quando você as altera. Ele mantém o PATH que foi carregado quando o terminal foi aberto.

## ✅ Soluções

### Solução 1: Recarregar PATH no Terminal Atual (Rápido)

Execute este comando no PowerShell:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

Depois teste:
```powershell
npm -v
```

**Funciona imediatamente!** Mas só nesta sessão do terminal.

---

### Solução 2: Usar o Script de Recarregamento

Execute:
```powershell
.\recarregar-path.ps1
```

Este script:
- ✅ Recarrega o PATH do sistema
- ✅ Testa se npm funciona
- ✅ Mostra a versão

---

### Solução 3: Fechar e Reabrir o Terminal (Permanente)

1. **Feche TODOS os terminais** (PowerShell, CMD, VS Code, etc.)
2. **Abra um novo terminal**
3. Teste: `npm -v`

**Isso funciona permanentemente!** O novo terminal carregará o PATH atualizado.

---

### Solução 4: Reiniciar o Computador (Último Recurso)

Se nada funcionar:
1. Reinicie o computador
2. Abra um novo terminal
3. Teste: `npm -v`

---

## 🚀 Script Automático

Use o script `iniciar-rapido.ps1` que já faz tudo automaticamente:

```powershell
.\iniciar-rapido.ps1
```

Este script:
- ✅ Recarrega o PATH automaticamente
- ✅ Verifica se npm funciona
- ✅ Instala dependências se necessário
- ✅ Inicia o servidor

---

## 📋 Checklist de Verificação

- [ ] PATH está configurado nas variáveis de ambiente? ✅ (Você já fez isso)
- [ ] Executou o comando de recarregar PATH? 
- [ ] Ou fechou e reabriu o terminal?
- [ ] Testou `npm -v`?

---

## 💡 Por Que o PATH Estava Duplicado?

Você viu `C:\Program Files\nodejs\` aparecer **duas vezes** na lista. Isso pode acontecer se:
- Foi adicionado tanto nas variáveis de usuário quanto do sistema
- Foi adicionado duas vezes por engano

**Não é um problema!** O Windows ignora duplicatas. Mas se quiser limpar, pode remover uma das entradas.

---

## 🎯 Recomendação

**Para uso diário:**
1. Use o script `iniciar-rapido.ps1` - ele resolve tudo automaticamente
2. Ou simplesmente **feche e reabra o terminal** após configurar o PATH

**Para resolver permanentemente:**
- Feche e reabra o terminal após adicionar ao PATH
- Ou reinicie o computador (garantia total)

---

## 🔍 Verificar se Está Funcionando

Execute:
```powershell
npm -v
node -v
```

Se ambos mostrarem versões, está funcionando! ✅

---

**Agora você pode usar normalmente:**
```powershell
npm install
npm run dev
npm run build
```
