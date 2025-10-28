# 🗺️ CONFIGURAÇÃO DO MAPBOX - WAZE ELEITORAL

## 📋 PASSO A PASSO

### 1. Criar Conta no Mapbox (Grátis)

1. Acesse: https://account.mapbox.com/auth/signup/
2. Crie uma conta gratuita
3. Confirme seu email

### 2. Obter o Token de Acesso

1. Após login, você será direcionado para: https://account.mapbox.com/
2. Role até a seção **"Access tokens"**
3. Copie o **Default public token** que começa com `pk.`

Exemplo:
```
pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazZqYW50ZWswNnFlM2VwZzVwZnBzZjVuIn0.dGVzdA
```

### 3. Adicionar no Arquivo .env

1. Abra o arquivo `.env` na raiz do projeto
2. Adicione a linha:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=pk.SEU_TOKEN_AQUI
```

**IMPORTANTE**: O token DEVE começar com `NEXT_PUBLIC_` para funcionar no cliente.

### 4. Reiniciar o Servidor

```bash
cd /Users/danielmarczukbraun/V2-CIPE-

# Parar servidor (Ctrl+C no terminal onde está rodando)

# Reiniciar
npm run dev
```

---

## ✅ VERIFICAÇÃO

Após configurar, acesse:
```
http://localhost:3000/dashboard/1014
```

Clique em **"Waze Eleitoral"** no menu lateral.

Você deverá ver o mapa Mapbox funcionando!

---

## 🆓 PLANO GRATUITO DO MAPBOX

O plano gratuito do Mapbox inclui:
- ✅ 50.000 carregamentos de mapa por mês
- ✅ Todos os estilos de mapa
- ✅ Geocoding API (100.000 requests/mês)
- ✅ Directions API (100.000 requests/mês)

**Mais que suficiente para uma campanha eleitoral!**

---

## 🔧 TROUBLESHOOTING

### Problema: "Failed to initialize Mapbox GL"

**Solução**: Verificar se o token está correto no `.env`

```bash
# Verificar variável de ambiente
echo $NEXT_PUBLIC_MAPBOX_TOKEN
```

### Problema: Mapa não aparece

**Solução**: Limpar cache e reiniciar

```bash
rm -rf .next
npm run dev
```

### Problema: "Access token invalid"

**Solução**: Gerar novo token no Mapbox e atualizar `.env`

---

## 📦 DEPENDÊNCIAS JÁ INSTALADAS

```json
{
  "react-map-gl": "^7.x.x",
  "mapbox-gl": "^2.x.x",
  "@turf/turf": "^6.x.x"
}
```

---

## 🎨 ESTILOS DE MAPA DISPONÍVEIS

Você pode alterar o estilo em `MapaInterativo.tsx`:

```tsx
mapStyle="mapbox://styles/mapbox/ESTILO"
```

**Estilos disponíveis**:
- `dark-v11` - Escuro (atual) ✅
- `light-v11` - Claro
- `streets-v12` - Ruas
- `satellite-v9` - Satélite
- `satellite-streets-v12` - Satélite + Ruas
- `outdoors-v12` - Outdoor

---

## ✅ PRONTO!

Após seguir esses passos, o Waze Eleitoral estará **100% funcional** com:
- ✅ Mapa interativo
- ✅ 10 camadas de dados
- ✅ Otimização de rotas
- ✅ Rastreamento de equipes
- ✅ Alertas geográficos
- ✅ Análise territorial

🚀 **Boa campanha!**


