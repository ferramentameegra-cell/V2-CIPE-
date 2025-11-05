# 🔥 COMO FAZER DEPLOY NO VERCEL AGORA

## ✅ CÓDIGO JÁ ESTÁ NO GITHUB!

- **Repositório**: https://github.com/ferramentameegra-cell/V2-CIPE-
- **Commit**: 04e4592
- **Status**: 100% sincronizado

---

## 🚀 OPÇÃO 1: USAR PROJETO EXISTENTE "v2-cipe"

Como você já tem o projeto na Vercel, siga:

### Passo 1: Acesse sua Dashboard Vercel
```
https://vercel.com/dashboard
```

### Passo 2: Conecte o Repositório GitHub

1. Entre no projeto **v2-cipe**
2. Vá em **Settings** → **Git**
3. Clique em **"Connect Git Repository"**
4. Selecione: `ferramentameegra-cell/V2-CIPE-`
5. Deixe como está: **Production Branch: main**
6. Salve

### Passo 3: Deploy Automático!
✅ **O Vercel vai fazer deploy automaticamente!**

O deploy começa em poucos segundos e leva ~5 minutos.

---

## 🚀 OPÇÃO 2: CRIAR NOVO PROJETO

Se preferir criar um projeto novo:

### Passo 1: Acesse
```
https://vercel.com/new
```

### Passo 2: Importe o Repositório
1. Clique em **"Import Git Repository"**
2. Selecione: `V2-CIPE-` da organização `ferramentameegra-cell`
3. Clique em **Import**

### Passo 3: Configure o Projeto

**Project Name**: `v2-cipe-completo` (ou outro nome disponível)

**Build Settings**:
- Framework Preset: **Next.js** (já detectado)
- Root Directory: `./` (padrão)
- Build Command: `npm run build` (padrão)
- Output Directory: `.next` (padrão)
- Install Command: `npm install` (padrão)

### Passo 4: Environment Variables (Importante!)

Adicione essas variáveis de ambiente:

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.SEU_TOKEN_AQUI
```

**Como obter token Mapbox:**
1. Acesse: https://account.mapbox.com/auth/signup/
2. Crie conta (grátis)
3. Copie o token que começa com `pk.`

### Passo 5: Deploy!
Clique em **"Deploy"**

---

## 🎯 RECOMENDAÇÃO

**Use OPÇÃO 1** (conectar repositório ao projeto existente):
- ✅ Mais rápido
- ✅ Mantém histórico de deploys
- ✅ Mais simples

---

## ⏱️ TEMPO DE DEPLOY

- Build: ~3-5 minutos
- URL: Aparece automaticamente no dashboard
- Domínio: `v2-cipe.vercel.app` ou similar

---

## 🔍 MONITORAR DEPLOY

Durante o deploy, você pode ver:
- Build logs em tempo real
- Progresso da compilação
- Qualquer erro que aparecer

---

## 🎉 DEPLOY COMPLETO

Quando terminar, você verá:

✅ **SUCCESS!**
- URL de produção: `https://v2-cipe.vercel.app`
- Pronto para usar!

---

## 📱 ACESSO LOCAL vs PRODUÇÃO

- **Local**: http://localhost:3000/dashboard/1014
- **Produção**: https://v2-cipe.vercel.app/dashboard/1014

**IMPORTANTE**: 
- Módulo **Waze Eleitoral** precisa do token Mapbox configurado
- Demais módulos funcionam sem configuração adicional

---

## 🆘 PRECISA DE AJUDA?

Se tiver erro durante o deploy, me avise!

---

**Status**: ✅ Pronto para deploy via Vercel Dashboard! 🚀

