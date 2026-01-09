# 🚀 Guia de Deploy no Netlify

## Passo 1: Criar Conta no Netlify

1. Acesse [https://www.netlify.com](https://www.netlify.com)
2. Clique em **"Sign up"** e faça login com sua conta do GitHub
3. Autorize o Netlify a acessar seus repositórios

## Passo 2: Conectar o Repositório

1. No painel do Netlify, clique em **"Add new site"** → **"Import an existing project"**
2. Selecione **"GitHub"** como provedor
3. Autorize o Netlify (se necessário)
4. Procure pelo repositório **"instituto-fenix"** e clique nele

## Passo 3: Configurar Build Settings

O Netlify deve detectar automaticamente as configurações do Next.js, mas verifique se está assim:

### Build command:
```
npm run build
```

### Publish directory:
```
.next
```

### Ou simplesmente deixe o Netlify detectar automaticamente usando o plugin Next.js (que já está configurado no `netlify.toml`)

## Passo 4: Configurar Variáveis de Ambiente

Antes de fazer o deploy, configure as variáveis de ambiente no Netlify:

1. No painel do site, vá em **"Site settings"** → **"Environment variables"**
2. Adicione as seguintes variáveis:

```
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=sua_public_key_aqui
MERCADOPAGO_ACCESS_TOKEN=seu_access_token_aqui
NEXT_PUBLIC_SITE_URL=https://seu-dominio.netlify.app
```

⚠️ **IMPORTANTE**: 
- Use as credenciais de **PRODUÇÃO** do Mercado Pago
- Não compartilhe essas chaves publicamente
- O `NEXT_PUBLIC_SITE_URL` será atualizado automaticamente pelo Netlify após o primeiro deploy

## Passo 5: Deploy

1. Clique em **"Deploy site"**
2. Aguarde o build completar (pode levar alguns minutos)
3. Quando terminar, seu site estará disponível em uma URL como: `https://seu-site-aleatorio.netlify.app`

## Passo 6: Configurar Webhook do Mercado Pago

Após o deploy, você precisará atualizar a URL do webhook no Mercado Pago:

1. Acesse o [Painel do Mercado Pago](https://www.mercadopago.com.br/developers/panel/app)
2. Vá em **Webhooks** ou **Notificações**
3. Configure a URL: `https://seu-dominio.netlify.app/api/webhooks/mercado-pago`

## Passo 7: Configurar Domínio Personalizado (Opcional)

1. No Netlify, vá em **"Domain settings"**
2. Clique em **"Add custom domain"**
3. Digite seu domínio (ex: `www.institutofenix.org.br`)
4. Configure os DNS conforme as instruções do Netlify
5. Aguarde a propagação (pode levar até 24 horas)

## Passo 8: Atualizar Variáveis de Ambiente com o Domínio Final

Depois de configurar o domínio personalizado:

1. Vá em **"Site settings"** → **"Environment variables"**
2. Atualize `NEXT_PUBLIC_SITE_URL` para seu domínio final
3. Faça um novo deploy (ou aguarde o próximo push)

## ✅ Verificações Pós-Deploy

Após o deploy, verifique:

- [ ] Site carrega corretamente
- [ ] Páginas principais funcionam
- [ ] Formulários estão funcionando
- [ ] Integração com Mercado Pago está ativa
- [ ] Webhook está configurado e respondendo
- [ ] SSL/HTTPS está ativo (Netlify faz isso automaticamente)

## 🔄 Deploys Automáticos

A partir de agora, **cada push para a branch `main`** no GitHub fará um deploy automático no Netlify!

## 🛠️ Comandos Úteis

### Fazer push de alterações:
```bash
git add .
git commit -m "Sua mensagem"
git push origin main
```

### Verificar logs do build:
- Acesse o painel do Netlify → **"Deploys"** → Clique no deploy desejado

### Fazer deploy manual:
- No Netlify, vá em **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**

## 📝 Notas Importantes

1. **Plugin Next.js**: O arquivo `netlify.toml` já configura o plugin oficial do Netlify para Next.js, que otimiza o build e o deploy automaticamente.

2. **Build Time**: O build pode levar 3-5 minutos na primeira vez. Deploys subsequentes são mais rápidos.

3. **Limites do Netlify**: O plano gratuito oferece:
   - 100 GB de bandwidth por mês
   - 300 minutos de build time por mês
   - Deploys ilimitados

4. **Backups**: O Netlify mantém histórico de deploys, então você pode reverter para versões anteriores se necessário.

## 🆘 Problemas Comuns

### Build falha
- Verifique os logs no painel do Netlify
- Certifique-se de que todas as dependências estão no `package.json`
- Verifique se as variáveis de ambiente estão configuradas

### Erro 404 nas rotas
- Certifique-se de que o plugin Next.js está instalado (já está no `netlify.toml`)
- Verifique se o `netlify.toml` está na raiz do projeto

### Mercado Pago não funciona
- Verifique se as variáveis de ambiente estão configuradas
- Confirme que está usando credenciais de produção
- Verifique se o webhook está configurado corretamente

## 📚 Links Úteis

- [Documentação Netlify](https://docs.netlify.com/)
- [Plugin Next.js Netlify](https://github.com/netlify/netlify-plugin-nextjs)
- [Painel Mercado Pago](https://www.mercadopago.com.br/developers/panel/app)

---

**Pronto!** Seu site está configurado para deploy no Netlify! 🎉
