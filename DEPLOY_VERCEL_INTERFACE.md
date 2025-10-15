# 🚀 DEPLOY NO VERCEL - VIA INTERFACE (MAIS FÁCIL)

## ✅ GITHUB JÁ ESTÁ ATUALIZADO!

O código já foi enviado para:
https://github.com/ferramentameegra-cell/V2-CIPE-

---

## 📝 PASSO A PASSO SIMPLES

### **1. Acesse o Vercel**
```
https://vercel.com
```

### **2. Faça Login**
- Clique **"Sign Up"** ou **"Login"**
- Escolha **"Continue with GitHub"**
- Autorize o acesso

### **3. Importar Projeto**
- Clique **"Add New..."** → **"Project"**
- Na lista de repositórios, procure: **V2-CIPE-**
- Clique **"Import"** ao lado de **ferramentameegra-cell/V2-CIPE-**

### **4. Configurar Projeto**

**Framework Preset:** Next.js ✅ (detectado automaticamente)

**Root Directory:** `./` (deixe padrão)

**Build Command:** `npm run build` (deixe padrão)

**Output Directory:** `.next` (deixe padrão)

### **5. Environment Variables (IMPORTANTE!)**

Clique em **"Environment Variables"** e adicione:

**Variável 1:**
```
Name: DATABASE_URL
Value: postgresql://user:password@host:5432/database
```
(Cole sua URL do PostgreSQL)

**Variável 2:**
```
Name: NEXT_PUBLIC_MAPBOX_TOKEN
Value: pk.seu_token_mapbox_aqui
```
(Deixe em branco por enquanto, pode adicionar depois)

### **6. Deploy**

Clique no botão azul **"Deploy"**

---

## ⏱️ AGUARDAR BUILD

O Vercel vai:
- 📦 Fazer upload dos arquivos
- 📥 Instalar dependências (npm install)
- 🔨 Fazer build (npm run build)
- 🚀 Deploy em produção

**Tempo**: 5-8 minutos

---

## 🎉 RESULTADO

Após o build, você receberá uma URL tipo:

```
https://v2-cipe.vercel.app
```

ou

```
https://v2-cipe-ferramentameegra-cell.vercel.app
```

---

## ⚙️ CONFIGURAR MAPBOX (DEPOIS)

Se quiser usar o Waze Eleitoral:

1. Crie conta Mapbox: https://account.mapbox.com/auth/signup/
2. Copie seu token (pk....)
3. No Vercel, vá em **Settings** → **Environment Variables**
4. Adicione:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN = pk.seu_token
   ```
5. Vá em **Deployments** → Clique nos 3 pontos → **"Redeploy"**

---

## ✅ PRONTO!

Seu CIPE estará no ar com:
- ✅ Sala de Guerra completa
- ✅ Waze Eleitoral completo
- ✅ Todos os 27 módulos
- ✅ Acessível de qualquer lugar!

---

**Acesse agora e importe o projeto:**
https://vercel.com/new

**Procure por**: ferramentameegra-cell/V2-CIPE-

