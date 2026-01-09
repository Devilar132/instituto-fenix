# 🔧 Solução: npm não é reconhecido

## ⚠️ Problema
O PowerShell mostra o erro:
```
npm : O termo 'npm' não é reconhecido como nome de cmdlet...
```

Isso acontece porque o Node.js não está no PATH do sistema.

---

## ✅ Solução Rápida (Temporária - Funciona AGORA)

Execute este script no PowerShell:

```powershell
.\corrigir-npm.ps1
```

Este script vai:
1. ✅ Procurar o Node.js instalado
2. ✅ Adicionar ao PATH desta sessão
3. ✅ Testar se funciona
4. ✅ Oferecer configurar permanentemente

**Depois de executar, você pode usar:**
```powershell
npm install
npm run dev
```

⚠️ **Nota:** Isso só funciona nesta sessão do terminal. Se fechar e abrir outro terminal, precisará executar de novo.

---

## ✅ Solução Permanente (Recomendada)

### Opção 1: Script Automático

1. **Abra PowerShell como Administrador:**
   - Pressione `Win + X`
   - Clique em "Windows PowerShell (Admin)" ou "Terminal (Admin)"
   - OU clique com botão direito no PowerShell e selecione "Executar como administrador"

2. **Navegue até o projeto:**
   ```powershell
   cd "C:\Users\vinic\Desktop\Instituto fenix"
   ```

3. **Execute o script:**
   ```powershell
   .\configurar-path.ps1
   ```

4. **Feche TODOS os terminais e abra um novo**

5. **Teste:**
   ```powershell
   npm -v
   ```

---

### Opção 2: Manual (Interface Gráfica)

1. **Abra Propriedades do Sistema:**
   - Pressione `Win + R`
   - Digite: `sysdm.cpl`
   - Pressione Enter

2. **Acesse Variáveis de Ambiente:**
   - Clique na aba "Avançado"
   - Clique em "Variáveis de Ambiente"

3. **Edite a Variável PATH:**
   - Na seção "Variáveis do sistema"
   - Procure "Path" e clique em "Editar..."

4. **Adicione o Caminho:**
   - Clique em "Novo"
   - Cole: `C:\Program Files\nodejs\`
   - Clique em "OK" em todas as janelas

5. **Feche e reabra o terminal**

---

### Opção 3: Comando Direto (PowerShell como Admin)

Execute no PowerShell como Administrador:

```powershell
[Environment]::SetEnvironmentVariable("Path", [Environment]::GetEnvironmentVariable("Path", "Machine") + ";C:\Program Files\nodejs\", "Machine")
```

Depois feche e reabra o terminal.

---

## 🚀 Usar o Script Melhorado

Se você não quiser configurar permanentemente, use o script `rodar-dev.ps1` que funciona mesmo sem Node.js no PATH:

```powershell
.\rodar-dev.ps1
```

Este script:
- ✅ Procura o Node.js automaticamente
- ✅ Adiciona ao PATH da sessão
- ✅ Instala dependências se necessário
- ✅ Inicia o servidor

---

## 🔍 Verificar se Funcionou

Após configurar, **feche e reabra o terminal** e execute:

```powershell
node -v
npm -v
```

Se ambos mostrarem versões, está funcionando! ✅

---

## 📋 Checklist

- [ ] Node.js está instalado? (Verifique em `C:\Program Files\nodejs\`)
- [ ] Executou o script `corrigir-npm.ps1`?
- [ ] Ou configurou o PATH permanentemente?
- [ ] Fechou e reabriu o terminal?
- [ ] Testou `npm -v`?

---

## 🆘 Se Ainda Não Funcionar

1. **Verifique se Node.js está instalado:**
   ```powershell
   Test-Path "C:\Program Files\nodejs\node.exe"
   ```
   Se retornar `False`, você precisa instalar o Node.js primeiro.

2. **Instale o Node.js:**
   - Acesse: https://nodejs.org/
   - Baixe a versão LTS
   - Execute o instalador
   - **IMPORTANTE:** Marque "Add to PATH" durante a instalação

3. **Reinicie o computador** (às vezes necessário)

---

## 📄 Arquivos Relacionados

- `corrigir-npm.ps1` - Script para corrigir temporariamente
- `configurar-path.ps1` - Script para configurar permanentemente
- `rodar-dev.ps1` - Script para rodar o servidor (funciona sem PATH)
- `INSTALAR_NODEJS.md` - Guia completo de instalação

---

**Depois de resolver, você poderá usar normalmente:**
```powershell
npm install
npm run dev
npm run build
```
