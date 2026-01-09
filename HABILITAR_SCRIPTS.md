# 🔓 Habilitar Execução de Scripts no PowerShell

## ⚠️ Problema
O PowerShell bloqueia a execução de scripts por padrão por segurança. Você precisa habilitar primeiro.

---

## ✅ Solução 1: Habilitar Temporariamente (Só para esta sessão)

Execute no PowerShell como Administrador:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
```

Depois execute o script:
```powershell
.\configurar-path.ps1
```

**Nota:** Isso só funciona na sessão atual. Feche o terminal e terá que fazer de novo.

---

## ✅ Solução 2: Habilitar Permanentemente (Recomendado)

Execute no PowerShell como Administrador:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Depois execute o script:
```powershell
.\configurar-path.ps1
```

**Nota:** Isso habilita para seu usuário permanentemente.

---

## ✅ Solução 3: Comando Direto (Sem Script)

Se não quiser habilitar scripts, execute este comando diretamente no PowerShell como Administrador:

```powershell
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "Machine") + ";C:\Program Files\nodejs\", "Machine")
```

Depois:
1. Feche TODOS os terminais
2. Abra um novo terminal
3. Teste: `npm -v`

---

## ✅ Solução 4: Via Interface Gráfica (Mais Seguro)

Se preferir não mexer em políticas de execução:

1. Pressione `Win + R`
2. Digite: `sysdm.cpl` e pressione Enter
3. Clique em "Avançado" > "Variáveis de Ambiente"
4. Em "Variáveis do sistema", encontre "Path" e clique em "Editar"
5. Clique em "Novo" e adicione: `C:\Program Files\nodejs\`
6. Clique em "OK" em todas as janelas
7. Feche e reabra o terminal

---

## 🔍 Verificar Política Atual

Para ver qual é a política atual:

```powershell
Get-ExecutionPolicy
```

---

## 📋 Políticas de Execução

- **Restricted** - Nenhum script pode ser executado (padrão)
- **RemoteSigned** - Scripts locais podem ser executados, scripts baixados precisam de assinatura (recomendado)
- **Unrestricted** - Todos os scripts podem ser executados (não recomendado)

---

## 🎯 Recomendação

Use a **Solução 3 (Comando Direto)** ou **Solução 4 (Interface Gráfica)** se não quiser habilitar scripts.

Ou use a **Solução 2** se quiser habilitar scripts permanentemente (mais útil para desenvolvimento).
