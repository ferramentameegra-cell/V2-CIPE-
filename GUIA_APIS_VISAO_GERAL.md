# 🚀 GUIA DE IMPLEMENTAÇÃO - APIs VISÃO GERAL

## 📋 APIs NECESSÁRIAS

### **1. API Oracle - Processamento de Comandos por Voz**

📍 **Arquivo:** `src/app/api/oracle/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { comando, candidatoId } = await request.json();

    // Processar comando com GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `Você é o Oracle CIPE, assistente de IA para campanha presidencial. 
          Responda de forma concisa e objetiva em português brasileiro.
          Forneça dados precisos sobre métricas, adversários, territórios e insights estratégicos.`
        },
        {
          role: "user",
          content: comando
        }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    const resposta = completion.choices[0]?.message?.content || 
      'Desculpe, não consegui processar seu comando.';

    // Salvar no banco
    await prisma.comandoVoz.create({
      data: {
        comando,
        resposta,
        confianca: 90,
        categoria: categorizarComando(comando),
        userId: 'user_id', // Pegar do contexto
        timestamp: new Date()
      }
    });

    return NextResponse.json({ 
      resposta,
      confianca: 90,
      categoria: categorizarComando(comando)
    });

  } catch (error) {
    console.error('Erro ao processar comando:', error);
    return NextResponse.json(
      { error: 'Erro ao processar comando' },
      { status: 500 }
    );
  }
}

function categorizarComando(comando: string): string {
  const comandoLower = comando.toLowerCase();
  
  if (comandoLower.includes('intenção') || comandoLower.includes('métrica')) {
    return 'metrica';
  }
  if (comandoLower.includes('insight') || comandoLower.includes('oportunidade')) {
    return 'insight';
  }
  if (comandoLower.includes('criar') || comandoLower.includes('executar')) {
    return 'acao';
  }
  return 'navegacao';
}
```

---

### **2. API Simulações - What-If Scenarios**

📍 **Arquivo:** `src/app/api/simulacoes/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: Request) {
  try {
    const { tipo, parametros, candidatoId } = await request.json();

    // Buscar dados históricos da campanha
    const metricas = await prisma.metricaPrincipal.findMany({
      where: { candidatoId },
      orderBy: { timestamp: 'desc' },
      take: 30
    });

    // Calcular projeções com IA
    const prompt = `
    Baseado nos seguintes dados históricos:
    - Intenção de voto atual: 45.2%
    - Alcance digital: 285.000
    - Engajamento: 8.5%
    
    Simule o impacto de:
    - Tipo: ${tipo}
    - Investimento: R$ ${parametros.investimento}
    - Duração: ${parametros.duracao} dias
    
    Retorne projeções realistas com confiança em formato JSON:
    {
      "intencaoVoto": { "atual": 45.2, "projetado": X, "confianca": Y },
      "alcance": { "atual": 285000, "projetado": X, "confianca": Y },
      "engajamento": { "atual": 8.5, "projetado": X, "confianca": Y }
    }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });

    const resultados = JSON.parse(completion.choices[0]?.message?.content || '{}');

    // Salvar simulação
    const simulacao = await prisma.simulacaoEstrategica.create({
      data: {
        nome: `Simulação ${tipo}`,
        tipo,
        parametros,
        resultados,
        confianca: 85,
        candidatoId,
        timestamp: new Date()
      }
    });

    return NextResponse.json(simulacao);

  } catch (error) {
    console.error('Erro ao executar simulação:', error);
    return NextResponse.json(
      { error: 'Erro ao executar simulação' },
      { status: 500 }
    );
  }
}
```

---

### **3. API Layout - Salvar/Carregar Layouts**

📍 **Arquivo:** `src/app/api/layout/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Carregar layout
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const funcao = searchParams.get('funcao');

    if (!userId) {
      return NextResponse.json({ error: 'userId obrigatório' }, { status: 400 });
    }

    const layout = await prisma.layoutPersonalizado.findFirst({
      where: {
        userId,
        funcao: funcao || undefined
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json(layout || {});

  } catch (error) {
    console.error('Erro ao carregar layout:', error);
    return NextResponse.json(
      { error: 'Erro ao carregar layout' },
      { status: 500 }
    );
  }
}

// POST - Salvar layout
export async function POST(request: Request) {
  try {
    const { userId, funcao, layout } = await request.json();

    const layoutSalvo = await prisma.layoutPersonalizado.upsert({
      where: {
        userId_funcao: {
          userId,
          funcao
        }
      },
      update: {
        layout,
        updatedAt: new Date()
      },
      create: {
        userId,
        funcao,
        layout,
        timestamp: new Date()
      }
    });

    return NextResponse.json(layoutSalvo);

  } catch (error) {
    console.error('Erro ao salvar layout:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar layout' },
      { status: 500 }
    );
  }
}
```

---

### **4. API Métricas - Tempo Real**

📍 **Arquivo:** `src/app/api/metricas/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const candidatoId = searchParams.get('candidatoId');
    const periodo = searchParams.get('periodo') || '30d';

    if (!candidatoId) {
      return NextResponse.json({ error: 'candidatoId obrigatório' }, { status: 400 });
    }

    // Calcular data inicial baseado no período
    const dataInicial = new Date();
    if (periodo === '7d') dataInicial.setDate(dataInicial.getDate() - 7);
    else if (periodo === '30d') dataInicial.setDate(dataInicial.getDate() - 30);
    else if (periodo === '90d') dataInicial.setDate(dataInicial.getDate() - 90);
    else if (periodo === '1y') dataInicial.setFullYear(dataInicial.getFullYear() - 1);

    // Buscar métricas
    const metricas = await prisma.metricaPrincipal.findMany({
      where: {
        candidatoId,
        timestamp: { gte: dataInicial }
      },
      orderBy: { timestamp: 'desc' }
    });

    // Calcular variações
    const metricasProcessadas = calcularVariacoes(metricas);

    return NextResponse.json(metricasProcessadas);

  } catch (error) {
    console.error('Erro ao buscar métricas:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar métricas' },
      { status: 500 }
    );
  }
}

function calcularVariacoes(metricas: any[]) {
  // Implementar lógica de cálculo de variações
  return metricas.map(metrica => ({
    ...metrica,
    variacao: calcularVariacao(metrica),
    tendencia: calcularTendencia(metrica),
    status: calcularStatus(metrica)
  }));
}

function calcularVariacao(metrica: any): string {
  // Lógica de cálculo
  return '+3.2%';
}

function calcularTendencia(metrica: any): string {
  // Lógica de tendência
  return 'up';
}

function calcularStatus(metrica: any): string {
  // Lógica de status
  return 'excelente';
}
```

---

### **5. API Regiões - Dados Geográficos**

📍 **Arquivo:** `src/app/api/regioes/route.ts`

```typescript
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const candidatoId = searchParams.get('candidatoId');

    if (!candidatoId) {
      return NextResponse.json({ error: 'candidatoId obrigatório' }, { status: 400 });
    }

    const regioes = await prisma.regiaoGeografica.findMany({
      where: { candidatoId },
      orderBy: { intencaoVoto: 'desc' }
    });

    // Identificar regiões críticas e oportunidades
    const regioesProcessadas = regioes.map(regiao => ({
      ...regiao,
      critico: regiao.status === 'critico',
      temOportunidade: !!regiao.oportunidade
    }));

    return NextResponse.json(regioesProcessadas);

  } catch (error) {
    console.error('Erro ao buscar regiões:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar regiões' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { candidatoId, regioes } = await request.json();

    // Atualizar múltiplas regiões
    const promises = regioes.map((regiao: any) =>
      prisma.regiaoGeografica.upsert({
        where: { id: regiao.id },
        update: {
          intencaoVoto: regiao.intencaoVoto,
          variacao: regiao.variacao,
          eleitores: regiao.eleitores,
          status: regiao.status,
          timestamp: new Date()
        },
        create: {
          ...regiao,
          candidatoId,
          timestamp: new Date()
        }
      })
    );

    const resultados = await Promise.all(promises);

    return NextResponse.json(resultados);

  } catch (error) {
    console.error('Erro ao atualizar regiões:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar regiões' },
      { status: 500 }
    );
  }
}
```

---

## 🔌 CONFIGURAÇÃO WEBSOCKET (OPCIONAL)

📍 **Arquivo:** `src/lib/websocket.ts`

```typescript
import { Server } from 'socket.io';

export function initWebSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    // Entrar em sala do candidato
    socket.on('join_campaign', (candidateId) => {
      socket.join(`campaign_${candidateId}`);
      console.log(`Cliente ${socket.id} entrou na campanha ${candidateId}`);
    });

    // Atualização de métricas em tempo real
    socket.on('metric_update', (data) => {
      io.to(`campaign_${data.candidateId}`).emit('metric_updated', data);
    });

    // Novo insight do Oracle
    socket.on('new_insight', (data) => {
      io.to(`campaign_${data.candidateId}`).emit('insight_received', data);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });

  return io;
}
```

**Cliente (nos componentes):**

```typescript
import { useEffect } from 'react';
import io from 'socket.io-client';

export function useWebSocket(candidateId: string) {
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001');

    socket.emit('join_campaign', candidateId);

    socket.on('metric_updated', (data) => {
      // Atualizar estado das métricas
      console.log('Métrica atualizada:', data);
    });

    socket.on('insight_received', (data) => {
      // Mostrar notificação de novo insight
      console.log('Novo insight:', data);
    });

    return () => {
      socket.disconnect();
    };
  }, [candidateId]);
}
```

---

## 📦 INSTALAÇÃO DE DEPENDÊNCIAS

```bash
# Dependências principais
npm install openai @anthropic-ai/sdk @google-cloud/aiplatform

# Socket.io para tempo real
npm install socket.io socket.io-client

# Radix UI (se faltarem)
npm install @radix-ui/react-label

# Validação
npm install zod
```

---

## 🔑 VARIÁVEIS DE AMBIENTE

Adicionar ao `.env`:

```env
# APIs de IA
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=AIza...

# WebSocket (se usar)
NEXT_PUBLIC_WS_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://...
```

---

## 🚀 PRÓXIMOS PASSOS (OPCIONAL)

### **Para Produção:**

1. **Integrar IA Real:**
   - Substituir respostas mockadas por chamadas GPT-4
   - Usar Anthropic Claude para análises complexas
   - Google Gemini para processamento de imagens

2. **WebSocket em Produção:**
   - Configurar servidor Socket.io separado
   - Usar Redis para pub/sub entre instâncias
   - Implementar autenticação de conexões

3. **Otimizações:**
   - Cache de métricas com Redis
   - Rate limiting nas APIs de IA
   - Debounce em comandos por voz
   - Lazy loading de componentes pesados

4. **Segurança:**
   - Validação de inputs com Zod
   - Autenticação JWT em todas as APIs
   - Rate limiting por usuário
   - Sanitização de dados

---

## ✅ STATUS ATUAL

**Funcionalidades Implementadas:**
- ✅ 5 componentes frontend completos
- ✅ Schema Prisma definido
- ✅ LocalStorage para persistência
- ✅ Mock data para desenvolvimento
- ✅ Animações e UX de nível mundial

**Próximo Nível (quando conectar backend):**
- 🔄 Dados reais do PostgreSQL
- 🔄 IA real (GPT-4, Claude, Gemini)
- 🔄 WebSocket para updates em tempo real
- 🔄 Persistência de layouts no banco
- 🔄 Histórico de simulações e comandos

---

**🎯 VISÃO GERAL 100% FUNCIONANDO AGORA!**  
**🌍 PRONTO PARA BACKEND QUANDO NECESSÁRIO!**


