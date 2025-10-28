# 🔑 CRIAR TOKEN GITHUB CORRETO

## ❌ PROBLEMA ATUAL

O token que você criou **não tem permissão de escrita** no repositório.

Erro: `Permission denied`

---

## ✅ SOLUÇÃO: RECRIAR TOKEN COM PERMISSÕES CORRETAS

### **Passo 1: Deletar Token Antigo**

1. Acesse: https://github.com/settings/tokens
2. Encontre o token que você acabou de criar
3. Clique em **"Delete"**

### **Passo 2: Criar Novo Token (Classic)**

1. Acesse: https://github.com/settings/tokens
2. Clique **"Generate new token"** → **"Generate new token (classic)"**
3. Preencha:

   **Token name:**
   ```
   CIPE Deploy Token
   ```

   **Expiration:**
   ```
   90 days
   ```

   **Select scopes** (IMPORTANTE - marque estas opções):
   - ✅ **repo** (marque a caixa principal "repo")
     - Isso marca automaticamente:
       - ✅ repo:status
       - ✅ repo_deployment
       - ✅ public_repo
       - ✅ repo:invite
       - ✅ security_events
   
   **NÃO PRECISA marcar mais nada!**

4. Role até o final e clique **"Generate token"**

5. **COPIE O TOKEN** (começa com `ghp_...`)

---

## 📝 **RESUMO VISUAL:**

```
Nome: CIPE Deploy Token
Validade: 90 days

Permissões:
☑️ repo (MARCAR ESTA!)
   ☑️ repo:status
   ☑️ repo_deployment  
   ☑️ public_repo
   ☑️ repo:invite
   ☑️ security_events

☐ workflow (não precisa)
☐ write:packages (não precisa)
☐ admin:org (não precisa)
```

---

## ⚠️ **DIFERENÇA:**

### Token Antigo (Fine-grained):
- ❌ Permissões muito específicas
- ❌ Pode não ter acesso completo
- ❌ Mais complexo de configurar

### Token Novo (Classic):
- ✅ Permissões simples e diretas
- ✅ Acesso completo ao repo
- ✅ Funciona sempre

---

## 🚀 **DEPOIS DE CRIAR:**

Me envie o novo token (começa com `ghp_...`) e eu faço o push imediatamente!

---

**Está criando o token agora?**


