# 🔧 Como Configurar o PATH do Windows para Node.js

## Método 1: Via Interface Gráfica (Recomendado)

### Passo a Passo:

1. **Abra as Variáveis de Ambiente:**
   - Pressione `Win + R`
   - Digite: `sysdm.cpl` e pressione Enter
   - OU vá em: **Painel de Controle** > **Sistema** > **Configurações avançadas do sistema**

2. **Acesse as Variáveis de Ambiente:**
   - Clique na aba **"Avançado"**
   - Clique no botão **"Variáveis de Ambiente"**

3. **Edite a Variável PATH:**
   - Na seção **"Variáveis do sistema"** (parte de baixo)
   - Procure pela variável chamada **"Path"**
   - Selecione e clique em **"Editar"**

4. **Adicione o Caminho do Node.js:**
   - Clique em **"Novo"**
   - Cole este caminho: `C:\Program Files\nodejs\`
   - Clique em **"OK"**

5. **Salve as Alterações:**
   - Clique em **"OK"** em todas as janelas abertas

6. **Reinicie o Terminal:**
   - Feche TODOS os terminais abertos (PowerShell, CMD, etc.)
   - Abra um novo terminal
   - Teste com: `npm -v`

---

## Método 2: Via PowerShell (Como Administrador)

### Execute este comando no PowerShell como Administrador:

```powershell
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\nodejs\", [EnvironmentVariableTarget]::Machine)
```

**Importante:** 
- Execute o PowerShell **como Administrador** (clique com botão direito > Executar como administrador)
- Depois de executar, feche e reabra o terminal

---

## Método 3: Via CMD (Como Administrador)

### Execute este comando no CMD como Administrador:

```cmd
setx PATH "%PATH%;C:\Program Files\nodejs\" /M
```

**Importante:**
- Execute o CMD **como Administrador**
- Depois de executar, feche e reabra o terminal

---

## Verificar se Funcionou

Após configurar, **feche e reabra o terminal** e execute:

```powershell
node -v
npm -v
```

Se ambos mostrarem as versões, está funcionando! ✅

---

## Caminho Alternativo (se o Node.js estiver em outro local)

Se o Node.js estiver instalado em outro lugar, encontre o caminho:

```powershell
where.exe node
```

Depois use esse caminho (sem o `node.exe` no final) nas instruções acima.

---

## Solução de Problemas

### Se ainda não funcionar:

1. **Verifique se o Node.js está instalado:**
   ```powershell
   Test-Path "C:\Program Files\nodejs\npm.cmd"
   ```
   Deve retornar `True`

2. **Verifique o PATH atual:**
   ```powershell
   $env:PATH -split ';' | Select-String -Pattern 'node'
   ```

3. **Reinicie o computador** (às vezes necessário)

4. **Use o caminho completo temporariamente:**
   ```powershell
   & "C:\Program Files\nodejs\npm.cmd" run dev
   ```

---

## Depois de Configurar

Você poderá usar normalmente:
```powershell
npm install
npm run dev
npm run build
```

Sem precisar do caminho completo! 🎉
