# 🚀 COMO FAZER DEPLOY DO CIPE NO VERCEL

## ✅ **CÓDIGO JÁ ESTÁ COMMITADO!**

Já fiz o commit com todos os arquivos:
- **88 arquivos** modificados/criados
- **+23.494 linhas** de código
- Commit: `feat: Implementa Visão Geral 100%...`

---

## 📋 **PASSO A PASSO PARA DEPLOY:**

### **OPÇÃO 1: Via GitHub + Vercel (RECOMENDADO)**

#### **Passo 1: Push para GitHub**

Abra o Terminal e execute:

```bash
cd /Users/danielmarczukbraun/V2-CIPE-

# Fazer push (vai pedir usuário e senha do GitHub)
git push origin main
```

**Quando pedir:**
- **Username:** seu usuário do GitHub
- **Password:** use um **Personal Access Token** (não senha normal)
  - Vá em: https://github.com/settings/tokens
  - Clique "Generate new token (classic)"
  - Marque "repo"
  - Copie o token e use como senha

#### **Passo 2: Deploy no Vercel**

1. Acesse: https://vercel.com
2. Faça login (use GitHub)
3. Clique **"Add New Project"**
4. Selecione **"ferramentameegra-cell/V2-CIPE-"**
5. Configure:
   - **Framework Preset:** Next.js ✅ (auto-detectado)
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`
6. **Environment Variables** (importante!):
   ```
   DATABASE_URL=sua_url_do_postgres
   ```
7. Clique **"Deploy"**
8. Aguarde ~5 minutos

✅ **Pronto! Seu site estará no ar!**

---

### **OPÇÃO 2: Deploy Direto via CLI**

```bash
cd /Users/danielmarczukbraun/V2-CIPE-

# Login no Vercel (abrirá o navegador)
npx vercel login

# Deploy em produção
npx vercel --prod
```

Siga as instruções no terminal.

---

### **OPÇÃO 3: Arrastar e Soltar (Mais Fácil)**

1. **Crie um ZIP do projeto:**
   ```bash
   cd /Users/danielmarczukbraun
   zip -r CIPE-deploy.zip V2-CIPE- -x "*/node_modules/*" "*/.next/*" "*/.git/*"
   ```

2. Acesse: https://vercel.com/new
3. Arraste o arquivo `CIPE-deploy.zip`
4. Configure as variáveis de ambiente
5. Clique "Deploy"

---

## ⚙️ **VARIÁVEIS DE AMBIENTE NECESSÁRIAS:**

No Vercel, adicione:

```env
# Obrigatório
DATABASE_URL=postgresql://user:password@host:5432/database

# Opcional (se quiser IA real)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=AIza...
```

---

## 🎯 **APÓS O DEPLOY:**

Você receberá uma URL tipo:
```
https://v2-cipe.vercel.app
```

Acesse:
```
https://v2-cipe.vercel.app/dashboard/1014
```

---

## ⚠️ **SE DER ERRO NO BUILD:**

1. Vá em **Vercel Dashboard** → **Settings** → **General**
2. **Node.js Version:** 18.x ou 20.x
3. **Install Command:** `npm install`
4. **Build Command:** `npm run build`
5. Clique **"Save"** e **"Redeploy"**

---

## 🆘 **PRECISA DE AJUDA?**

**Me avise qual opção você escolheu e posso te guiar em tempo real!**

- Opção 1: Via GitHub (mais profissional)
- Opção 2: Via CLI (mais rápido)
- Opção 3: Arrastar ZIP (mais fácil)

**Todos os arquivos já estão prontos e commitados!** ✅


