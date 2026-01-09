# 📦 Como Instalar Node.js no Windows

## Problema
O comando `npm` não está sendo reconhecido porque o Node.js não está instalado ou não está no PATH do sistema.

## Solução: Instalar Node.js

### Opção 1: Instalação via Site Oficial (Recomendado)

1. **Baixe o Node.js:**
   - Acesse: https://nodejs.org/
   - Baixe a versão **LTS** (Long Term Support) - recomendada
   - Escolha o instalador para Windows (.msi)

2. **Execute o instalador:**
   - Clique duas vezes no arquivo baixado
   - Siga o assistente de instalação
   - **IMPORTANTE:** Marque a opção "Add to PATH" durante a instalação
   - Clique em "Install"

3. **Verifique a instalação:**
   - Abra um **novo** PowerShell ou CMD
   - Execute:
     ```bash
     node --version
     npm --version
     ```

### Opção 2: Instalação via Chocolatey (Se já tiver instalado)

```powershell
choco install nodejs-lts
```

### Opção 3: Instalação via Winget (Windows 10/11)

```powershell
winget install OpenJS.NodeJS.LTS
```

## Após a Instalação

1. **Feche e reabra o terminal** (PowerShell/CMD)
2. **Navegue até o projeto:**
   ```bash
   cd "C:\Users\vinic\Desktop\Instituto fenix"
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

4. **Execute o servidor:**
   ```bash
   npm run dev
   ```

## Verificação Rápida

Execute estes comandos para verificar se está tudo OK:

```bash
node --version    # Deve mostrar algo como: v20.x.x
npm --version     # Deve mostrar algo como: 10.x.x
```

## Se ainda não funcionar

1. **Reinicie o computador** (às vezes necessário para atualizar o PATH)
2. **Verifique o PATH manualmente:**
   - Pressione `Win + R`
   - Digite: `sysdm.cpl` e pressione Enter
   - Vá em "Avançado" > "Variáveis de Ambiente"
   - Verifique se `C:\Program Files\nodejs\` está em "Path"

## Versão Recomendada

- **Node.js:** 18.x ou superior (LTS)
- **npm:** Vem junto com o Node.js

---

**Depois de instalar, volte aqui e execute:**
```bash
npm install
npm run dev
```
