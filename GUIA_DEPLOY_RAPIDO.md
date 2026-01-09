# 🚀 Deploy Rápido - Instituto Fenix

## ⚡ Opção Mais Rápida: Vercel (5 minutos)

### Passo 1: Preparar o Código
```bash
# Certifique-se que está tudo commitado
git status

# Se tiver alterações não commitadas:
git add .
git commit -m "Preparando para deploy"
```

### Passo 2: Criar Conta Vercel
1. Acesse: **https://vercel.com/signup**
2. Clique em **"Continue with GitHub"**
3. Autorize o acesso ao GitHub

### Passo 3: Fazer Deploy
1. Na Vercel, clique em **"Add New Project"**
2. Selecione seu repositório do GitHub
3. Clique em **"Import"**
4. **NÃO PRECISA MUDAR NADA** - Vercel detecta Next.js automaticamente
5. Clique em **"Deploy"**
6. Aguarde 2-3 minutos
7. **PRONTO!** Você terá uma URL como: `instituto-fenix-abc123.vercel.app`

### Passo 4: Compartilhar com seu Chefe
Envie a URL que apareceu após o deploy!

---

## 🔄 Como Funciona o Fluxo de Trabalho

### Quando seu chefe pedir uma alteração:

1. **Faça a alteração localmente:**
   ```bash
   npm run dev
   # Teste em http://localhost:3000
   ```

2. **Commit e push:**
   ```bash
   git add .
   git commit -m "Alteração: [descrição do que mudou]"
   git push origin main
   ```

3. **Deploy automático:**
   - Vercel detecta o push automaticamente
   - Faz build e deploy em 2-3 minutos
   - Seu chefe vê a alteração na URL

**É ISSO! Não precisa fazer mais nada!** 🎉

---

## 📋 Checklist Antes do Primeiro Deploy

- [ ] Testar localmente: `npm run build` funciona?
- [ ] Verificar se não tem erros: `npm run lint`
- [ ] Código commitado no GitHub

---

## 🔐 Variáveis de Ambiente (Se precisar)

Se você usar chaves do Mercado Pago ou outras APIs:

1. Na Vercel → Seu Projeto → **Settings** → **Environment Variables**
2. Adicione:
   - `NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY` = sua chave pública
   - `MERCADO_PAGO_ACCESS_TOKEN` = seu token
3. Clique em **Save**
4. Faça um novo deploy (ou aguarde o próximo push)

---

## 💡 Dicas Importantes

### Preview de Alterações
- Cada Pull Request gera um preview URL único
- Você pode mostrar ao chefe antes de publicar na versão principal

### Domínio Personalizado (Opcional)
- Vercel → Settings → Domains
- Adicione: `app.fenixpe.org` ou outro domínio
- Configure DNS conforme instruções

### Ver Logs de Erro
- Vercel → Seu Projeto → **Deployments**
- Clique no deployment → **View Function Logs**

---

## 🆘 Problemas Comuns

### Erro: "Build Failed"
- Verifique os logs na Vercel
- Teste localmente: `npm run build`
- Verifique se todas as dependências estão no `package.json`

### Site não atualiza
- Aguarde 2-3 minutos após o push
- Verifique se o push foi feito corretamente: `git log`
- Force um novo deploy na Vercel (Redeploy)

### Imagens não aparecem
- Verifique `next.config.js` - `remotePatterns`
- Use caminhos absolutos: `/images/logo.png`

---

## 📞 Precisa de Ajuda?

- Documentação Vercel: https://vercel.com/docs
- Suporte: dashboard da Vercel → Help

---

## ✅ Resumo Ultra-Rápido

1. **Criar conta Vercel** (GitHub)
2. **Importar repositório**
3. **Deploy** (automático)
4. **Compartilhar URL** com chefe
5. **Fazer alterações** → `git push` → Deploy automático!

**Tempo total: ~5 minutos** ⚡

