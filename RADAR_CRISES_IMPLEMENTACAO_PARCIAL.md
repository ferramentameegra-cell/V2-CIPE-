# 📡 RADAR DE CRISES - IMPLEMENTAÇÃO EM ANDAMENTO

## 🚧 STATUS ATUAL: 25% IMPLEMENTADO

---

## ✅ JÁ IMPLEMENTADO

### 1. Schema Prisma Completo ✅
**Arquivo**: `prisma/schema-radar-crises.prisma`

**Models criados (6)**:
- `AlertaCrise` - Alertas de crise com análise de IA
- `Mencao` - Menções individuais com sentimento
- `Vulnerabilidade` - Pontos fracos do candidato
- `PlaybookCrise` - Playbooks de resposta
- `TarefaCrise` - Tarefas de mitigação
- `FonteMonitoramento` - Fontes de dados

**Enums criados (4)**:
- `NivelAmeaca` (BAIXO, MEDIO, ALTO, CRITICO)
- `StatusAlertaCrise` (5 status)
- `StatusTarefa` (4 status)
- `TipoFonte` (10 tipos)

### 2. Biblioteca de Análise de Sentimento ✅
**Arquivo**: `src/lib/radar-crises/analise-sentimento.ts`

**Funções implementadas**:
- ✅ `analisarSentimento()` - Análise de sentimento (-1 a 1)
- ✅ `detectarFakeNews()` - Detecção de desinformação
- ✅ `detectarAtaqueCoordenado()` - Identificação de ataques
- ✅ `calcularIndiceImpacto()` - Índice 0-100
- ✅ `calcularPotencialViral()` - Potencial de viralização
- ✅ `extrairTopicos()` - Extração de tópicos
- ✅ `analisarMencaoCompleta()` - Análise completa
- ✅ `calcularNivelAmeacaGlobal()` - Nível geral de ameaça

### 3. Motor de Playbooks ✅
**Arquivo**: `src/lib/radar-crises/playbook-engine.ts`

**Funções implementadas**:
- ✅ `executarPlaybook()` - Execução de playbooks
- ✅ `verificarGatilhoPlaybook()` - Verificação de gatilhos
- ✅ `criarTarefasDePlaybook()` - Criação de tarefas

### 4. Componente Base ✅
**Arquivo**: `src/components/modules/RadarCrises.tsx`
- Dashboard básico com lista de crises

---

## 🚧 FALTAM IMPLEMENTAR (75%)

### Componentes React (7 componentes):

1. **IndicadorNivelAmeaca.tsx** - Velocímetro de ameaça
2. **FeedMonitoramento.tsx** - Feed tempo real com WebSocket
3. **PainelAlerta.tsx** - Gestão detalhada de crise
4. **GestaoPlaybook.tsx** - Editor de playbooks (react-flow)
5. **MapaVulnerabilidades.tsx** - Mapeamento de vulnerabilidades
6. **GraficoEvolucaoCrise.tsx** - Gráfico temporal
7. **RedeDeteccaoBots.tsx** - Grafo de disseminação (D3.js)

### APIs Backend (3 APIs):

1. **`/api/radar-crises/alertas/route.ts`** - CRUD de alertas
2. **`/api/radar-crises/playbooks/route.ts`** - CRUD de playbooks
3. **`/api/radar-crises/monitoramento/route.ts`** - Streaming de dados

### Integrações:

1. WebSocket para tempo real
2. Integração com Sala de Guerra
3. Integração com Waze Eleitoral
4. Integração com CRM
5. Integração com Oracle CIPE

### Dependências Adicionais:

- `react-flow` - Editor de fluxogramas
- `d3` - Visualização de grafos
- `recharts` - Gráficos (já instalado)

---

## 📊 ESTIMATIVA PARA 100%

### Arquivos Restantes: ~12 arquivos
### Linhas de Código: ~2.000 linhas
### Tempo Estimado: 150-200 tool calls

---

## 💡 SITUAÇÃO ATUAL

**Estou implementando 3 módulos simultaneamente:**

1. ✅ **Sala de Guerra** - 100% completo
2. ✅ **Waze Eleitoral** - 100% completo
3. 🚧 **Radar de Crises** - 25% completo

**E corrigindo erros do deploy do Vercel em paralelo.**

---

## ❓ DECISÃO NECESSÁRIA

**Você quer que eu:**

### Opção A: Continue Radar 100% AGORA ✅
- Criar todos os 7 componentes
- Criar 3 APIs
- Integrar tudo
- **Tempo**: +150-200 tool calls

### Opção B: Aguarde Deploy Vercel Terminar Primeiro
- Foco em corrigir erros do Vercel
- Depois implemento Radar 100%
- **Vantagem**: Site no ar mais rápido

### Opção C: Implementar Radar MVP 50%
- Apenas componentes essenciais
- Sem D3.js, sem react-flow
- **Tempo**: +50-80 tool calls

---

## 🎯 MINHA RECOMENDAÇÃO

**Opção B**: Aguardar deploy do Vercel terminar (está quase!), depois implementar Radar 100%.

**Motivo**: Você terá o site funcionando online primeiro, depois adicionamos o Radar completo.

**Qual opção você prefere: A, B ou C?**


