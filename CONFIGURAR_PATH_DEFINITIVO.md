# 🔧 Configurar PATH Definitivamente - Guia Passo a Passo

## ✅ Método 1: Script Automático (Mais Rápido)

### Passo a Passo:

1. **Feche todos os terminais abertos**

2. **Abra o PowerShell como Administrador:**
   - Pressione `Win + X`
   - Clique em **"Windows PowerShell (Admin)"** ou **"Terminal (Admin)"**
   - OU clique com botão direito no PowerShell e selecione **"Executar como administrador"**

3. **Navegue até o projeto:**
   ```powershell
   cd "C:\Users\vinic\Desktop\Instituto fenix"
   ```

4. **Execute o script:**
   ```powershell
   .\configurar-path.ps1
   ```

5. **Feche TODOS os terminais** (importante!)

6. **Abra um novo terminal normal** e teste:
   ```powershell
   npm -v
   ```

Pronto! Agora o `npm` funcionará em qualquer terminal! 🎉

---

## ✅ Método 2: Manual (Interface Gráfica)

### Passo a Passo Visual:

1. **Abra as Propriedades do Sistema:**
   - Pressione `Win + R`
   - Digite: `sysdm.cpl`
   - Pressione Enter

2. **Acesse Variáveis de Ambiente:**
   - Clique na aba **"Avançado"**
   - Clique no botão **"Variáveis de Ambiente"** (parte inferior)

3. **Edite a Variável PATH:**
   - Na seção **"Variáveis do sistema"** (parte de baixo da janela)
   - Procure pela variável chamada **"Path"**
   - Selecione e clique em **"Editar..."**

4. **Adicione o Caminho do Node.js:**
   - Clique no botão **"Novo"**
   - Cole este caminho exatamente: `C:\Program Files\nodejs\`
   - Clique em **"OK"**

5. **Salve as Alterações:**
   - Clique em **"OK"** na janela "Editar variável de ambiente"
   - Clique em **"OK"** na janela "Variáveis de Ambiente"
   - Clique em **"OK"** na janela "Propriedades do Sistema"

6. **Reinicie os Terminais:**
   - Feche TODOS os terminais abertos (PowerShell, CMD, etc.)
   - Abra um novo terminal
   - Teste: `npm -v`

---

## ✅ Método 3: Via CMD como Administrador

1. **Abra o CMD como Administrador:**
   - Pressione `Win + X`
   - Selecione **"Prompt de Comando (Admin)"**

2. **Execute este comando:**
   ```cmd
   setx PATH "%PATH%;C:\Program Files\nodejs\" /M
   ```

3. **Feche e reabra o terminal**

---

## 🔍 Verificar se Funcionou

Após configurar, **feche e reabra o terminal** e execute:

```powershell
node -v
npm -v
```

Se ambos mostrarem as versões, está funcionando! ✅

---

## ⚠️ Importante

- **Sempre feche e reabra o terminal** após configurar o PATH
- O PATH só é atualizado quando um novo terminal é aberto
- Se ainda não funcionar, **reinicie o computador**

---

## 🎯 Recomendação

Use o **Método 1 (Script Automático)** - é mais rápido e seguro!

Depois de configurar, você poderá usar:
```powershell
npm install
npm run dev
npm run build
```

Sem precisar configurar nada toda vez! 🚀
