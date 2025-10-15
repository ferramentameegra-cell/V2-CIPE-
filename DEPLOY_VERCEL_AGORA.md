# 🚀 DEPLOY NO VERCEL - GUIA RÁPIDO

## ✅ COMMIT JÁ ESTÁ PRONTO!

O código está commitado localmente com:
- **33 arquivos**
- **+11.128 linhas**
- Sala de Guerra + Waze Eleitoral 100%

---

## 📤 OPÇÃO 1: VIA INTERFACE VERCEL (MAIS FÁCIL)

### Passo 1: Push para GitHub PRIMEIRO

Abra o Terminal:
```bash
cd /Users/danielmarczukbraun/V2-CIPE-

git push origin main
```

**Vai pedir:**
- Username: seu usuário GitHub
- Password: Personal Access Token (criar em https://github.com/settings/tokens)

### Passo 2: Deploy no Vercel

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique **"Add New Project"**
4. Selecione **"ferramentameegra-cell/V2-CIPE-"**
5. Clique **"Deploy"**

✅ **Pronto! Deploy automático!**

---

## 📤 OPÇÃO 2: VIA CLI (DIRETO)

### Passo 1: Login no Vercel

Abra o Terminal:
```bash
cd /Users/danielmarczukbraun/V2-CIPE-

npx vercel login
```

Vai abrir o navegador. Faça login e autorize.

### Passo 2: Deploy

```bash
npx vercel --prod
```

Responda as perguntas:
- Setup and deploy? **Y**
- Which scope? Escolha sua conta
- Link to existing project? **N**
- Project name? **v2-cipe** (ou deixe padrão)
- Directory? **./** (deixe padrão)

Aguarde 3-5 minutos.

✅ **Pronto! Receberá a URL do site!**

---

## ⚙️ CONFIGURAR VARIÁVEIS DE AMBIENTE

**IMPORTANTE**: Após o deploy, adicione no Vercel:

1. Vá em **Settings** → **Environment Variables**
2. Adicione:
   ```
   DATABASE_URL = postgresql://...
   NEXT_PUBLIC_MAPBOX_TOKEN = pk.seu_token_mapbox
   ```
3. Clique **"Redeploy"**

---

## 🎯 RECOMENDAÇÃO

**Use OPÇÃO 1** (via interface):
1. Mais visual
2. Mais fácil
3. Mais confiável

**Passos:**
1. Push para GitHub (terminal)
2. Deploy no Vercel (interface web)
3. Configurar variáveis
4. Pronto!

---

## 🆘 PRECISA DE AJUDA?

Me avise se tiver dúvida em qualquer passo!

---

**Status Atual**: 
- ✅ Código commitado localmente
- ❌ Aguardando push para GitHub
- ❌ Aguardando deploy Vercel

