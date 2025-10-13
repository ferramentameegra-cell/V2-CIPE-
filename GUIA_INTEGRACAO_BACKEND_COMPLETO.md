# 🔗 GUIA COMPLETO - INTEGRAÇÃO BACKEND POSTGRESQL COM CIPE

## 📋 ÍNDICE
1. [Configuração Inicial do Banco](#1-configuração-inicial-do-banco)
2. [Integração da Tabela Eleitores](#2-integração-da-tabela-eleitores)
3. [APIs do Sistema](#3-apis-do-sistema)
4. [Integração com Módulos](#4-integração-com-módulos)
5. [Testes e Validação](#5-testes-e-validação)

---

## 1. CONFIGURAÇÃO INICIAL DO BANCO

### 📝 **PERGUNTA 1 PARA O CURSOR: Configuração Prisma + PostgreSQL**

```
Preciso configurar a integração completa do CIPE com PostgreSQL.

CONFIGURAÇÕES DO BANCO:
- Banco de dados: PostgreSQL
- Tabela principal existente: "eleitores"
- Chave primária: telefone (VARCHAR)

TAREFAS NECESSÁRIAS:
1. Configurar Prisma Client para PostgreSQL
2. Criar arquivo prisma/schema.prisma
3. Configurar variáveis de ambiente no .env
4. Instalar dependências necessárias:
   - @prisma/client
   - prisma
   - @types/node
   - postgres

ESTRUTURA DO .ENV:
DATABASE_URL="postgresql://[username]:[password]@[host]:[port]/[database]?schema=public"
NODE_ENV="development"

Por favor:
- Configure o Prisma para conectar com a tabela EXISTENTE (não criar nova)
- Use o modo "db pull" para importar a estrutura existente
- Gere o Prisma Client
- Crie um arquivo lib/prisma.ts com a conexão singleton
- Configure o middleware para logs e error handling
```

---

## 2. INTEGRAÇÃO DA TABELA ELEITORES

### 📝 **PERGUNTA 2 PARA O CURSOR: Schema Completo da Tabela Eleitores**

```
Preciso mapear a tabela PostgreSQL "eleitores" no Prisma Schema.

ESTRUTURA DA TABELA ELEITORES:

model Eleitor {
  // CHAVE PRIMÁRIA
  telefone                String   @id @db.VarChar(20)
  
  // DADOS PESSOAIS
  nome                    String   @db.VarChar(255)
  email                   String?  @db.VarChar(255)
  cpf                     String?  @unique @db.VarChar(14)
  data_nascimento         DateTime? @db.Date
  genero                  String?  @db.VarChar(20)
  estado_civil            String?  @db.VarChar(20)
  
  // ENDEREÇO
  cep                     String?  @db.VarChar(10)
  endereco                String?  @db.Text
  numero                  String?  @db.VarChar(10)
  complemento             String?  @db.VarChar(100)
  bairro                  String?  @db.VarChar(100)
  cidade                  String?  @db.VarChar(100)
  estado                  String?  @db.VarChar(2)
  regiao                  String?  @db.VarChar(20)
  zona_eleitoral          String?  @db.VarChar(10)
  secao_eleitoral         String?  @db.VarChar(10)
  
  // SOCIOECONÔMICO
  profissao               String?  @db.VarChar(100)
  escolaridade            String?  @db.VarChar(30)
  renda_familiar          String?  @db.VarChar(20)
  situacao_emprego        String?  @db.VarChar(30)
  tempo_residencia        Int?
  
  // PERFIL DIGITAL
  whatsapp                String?  @db.VarChar(20)
  instagram               String?  @db.VarChar(100)
  facebook                String?  @db.VarChar(100)
  twitter                 String?  @db.VarChar(100)
  linkedin                String?  @db.VarChar(100)
  tiktok                  String?  @db.VarChar(100)
  
  // CLASSIFICAÇÃO CRM
  status                  String   @default("LEAD") @db.VarChar(20)
  score                   Int      @default(0)
  nivel_engajamento       String   @default("BAIXO") @db.VarChar(15)
  probabilidade_voto      Decimal  @default(0.50) @db.Decimal(3,2)
  segmento                String?  @db.VarChar(100)
  
  // PREFERÊNCIAS POLÍTICAS
  espectro_ideologico     String?  @db.VarChar(20)
  temas_interesse         String[] @db.Text
  candidato_anterior      String?  @db.VarChar(100)
  partido_preferencia     String?  @db.VarChar(50)
  
  // COMPORTAMENTO
  canal_preferido         String?  @db.VarChar(20)
  melhor_horario          String?  @db.VarChar(10)
  frequencia_contato      String   @default("SEMANAL") @db.VarChar(20)
  
  // ENGAJAMENTO
  primeiro_contato        DateTime @default(now())
  ultima_interacao        DateTime @default(now())
  total_interacoes        Int      @default(0)
  total_cliques           Int      @default(0)
  total_compartilhamentos Int      @default(0)
  
  // ORIGEM
  fonte_origem            String?  @db.VarChar(50)
  campanha_origem         String?  @db.VarChar(100)
  custo_aquisicao         Decimal? @db.Decimal(10,2)
  data_conversao          DateTime?
  
  // GEOLOCALIZAÇÃO
  latitude                Decimal? @db.Decimal(10,8)
  longitude               Decimal? @db.Decimal(11,8)
  precisao_localizacao    Int?
  
  // METADADOS
  created_at              DateTime @default(now())
  updated_at              DateTime @default(now()) @updatedAt
  ativo                   Boolean  @default(true)
  
  @@map("eleitores")
  @@index([status])
  @@index([score])
  @@index([cidade, estado])
  @@index([segmento])
  @@index([nivel_engajamento])
  @@index([ultima_interacao])
}

Por favor:
1. Crie este schema no arquivo prisma/schema.prisma
2. Execute "npx prisma db pull" para sincronizar com o banco existente
3. Execute "npx prisma generate" para gerar o Prisma Client
4. Crie tipos TypeScript para os enums (Status, EspectroIdeologico, etc.)
5. Configure os índices para otimização de queries
```

---

## 3. APIS DO SISTEMA

### 📝 **PERGUNTA 3 PARA O CURSOR: APIs Essenciais do Backend**

```
Preciso criar TODAS as APIs necessárias para integração do CIPE com o PostgreSQL.

APIS A SEREM CRIADAS:

1. /api/eleitores/route.ts - CRUD COMPLETO
   - GET: Listar todos (com paginação, filtros, busca)
   - POST: Criar novo eleitor
   - PUT: Atualizar eleitor existente
   - DELETE: Desativar eleitor (soft delete)

2. /api/eleitores/[telefone]/route.ts - OPERAÇÕES INDIVIDUAIS
   - GET: Buscar eleitor por telefone
   - PATCH: Atualizar campos específicos
   - DELETE: Remover eleitor

3. /api/eleitores/metricas/route.ts - MÉTRICAS DO DASHBOARD
   - GET: Retornar todas as métricas agregadas:
     * Total de eleitores
     * Total por status (Lead, Apoiador, Embaixador, etc.)
     * Score médio
     * Probabilidade média de voto
     * Distribuição por espectro político
     * Crescimento temporal

4. /api/eleitores/segmentos/route.ts - ANÁLISE DE SEGMENTAÇÃO
   - GET: Segmentação por critérios múltiplos
   - POST: Criar novo segmento personalizado
   - Retornar: tamanho, score médio, taxa de conversão

5. /api/eleitores/geografico/route.ts - DADOS GEOGRÁFICOS
   - GET: Distribuição por estado/cidade/bairro
   - Retornar: contagem, apoiadores, score médio, coordenadas

6. /api/eleitores/embaixadores/route.ts - RANKING DE EMBAIXADORES
   - GET: Lista de embaixadores ordenados por score
   - Retornar: ranking, métricas individuais, performance

7. /api/eleitores/busca/route.ts - BUSCA AVANÇADA
   - POST: Busca com filtros complexos (nome, cidade, status, score, etc.)
   - Suporte para múltiplos filtros simultâneos
   - Paginação e ordenação

8. /api/eleitores/importar/route.ts - IMPORTAÇÃO EM MASSA
   - POST: Importar CSV/Excel
   - Validação de dados
   - Tratamento de duplicados
   - Relatório de sucesso/erros

9. /api/eleitores/exportar/route.ts - EXPORTAÇÃO
   - GET: Exportar dados filtrados em CSV/Excel
   - Aplicar filtros de segmentação

10. /api/eleitores/historico/route.ts - HISTÓRICO DE INTERAÇÕES
    - GET: Histórico completo de um eleitor
    - POST: Adicionar nova interação

REQUISITOS PARA TODAS AS APIS:
- Error handling robusto (try-catch)
- Validação de dados com Zod
- Rate limiting
- Logs estruturados
- Response padrão: { success: boolean, data?: any, error?: string }
- Status codes HTTP corretos (200, 201, 400, 404, 500)
- CORS configurado
- Autenticação JWT (opcional mas recomendado)

EXEMPLO DE ESTRUTURA DE API:

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    const eleitores = await prisma.eleitor.findMany({
      where: { ativo: true },
      skip,
      take: limit,
      orderBy: { score: 'desc' }
    });

    const total = await prisma.eleitor.count({ where: { ativo: true } });

    return NextResponse.json({
      success: true,
      data: {
        eleitores,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Erro ao buscar eleitores:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar eleitores' },
      { status: 500 }
    );
  }
}

Por favor, crie TODAS essas APIs com:
- Código completo e funcional
- Error handling
- Validação de dados
- Documentação inline
- Testes básicos
```

---

## 4. INTEGRAÇÃO COM MÓDULOS

### 📝 **PERGUNTA 4 PARA O CURSOR: Integração com Dashboard Executivo**

```
Preciso integrar o módulo "Dashboard Executivo" (Visão Geral) com o backend PostgreSQL.

COMPONENTE: src/app/dashboard/[candidateId]/page.tsx

MÓDULO ESPECÍFICO: case 'visao-geral'

DADOS NECESSÁRIOS DO BACKEND:

1. MÉTRICAS PRINCIPAIS (MetricasPrincipais component):
   - Total de eleitores
   - Total de apoiadores (status = 'APOIADOR' ou 'EMBAIXADOR')
   - Meta de votos (fixo ou configurável)
   - Estimativa de % da meta
   - Score médio
   - Faltam X dias para eleição (calcular dinamicamente)
   - Número de eleitores no CRM
   - Número de eleitores nos Grupos de WhatsApp (filtrar por canal_preferido)
   - Atendimentos feitos no dia (filtrar por ultima_interacao = hoje)

2. ORACLE CIPE (OracleCipe component):
   - Manter dados simulados atuais
   - (Futuramente conectar com IA)

3. GRÁFICOS ESTRATÉGICOS (GraficosEstrategicosGrid component):
   
   a) ESPECTRO POLÍTICO (Pie Chart):
      Query: SELECT espectro_ideologico, COUNT(*) FROM eleitores 
             WHERE ativo = true AND espectro_ideologico IS NOT NULL
             GROUP BY espectro_ideologico
   
   b) JORNADA DO ELEITOR (Funnel Chart):
      Query: SELECT status, COUNT(*) FROM eleitores 
             WHERE ativo = true GROUP BY status
             ORDER BY CASE status 
               WHEN 'LEAD' THEN 1
               WHEN 'INTERESSADO' THEN 2
               WHEN 'SIMPATIZANTE' THEN 3
               WHEN 'APOIADOR' THEN 4
               WHEN 'EMBAIXADOR' THEN 5
             END
   
   c) PANORAMA REGIONAL (Bar Chart):
      Query: SELECT estado, COUNT(*) as total,
             COUNT(*) FILTER (WHERE status IN ('APOIADOR', 'EMBAIXADOR')) as apoiadores
             FROM eleitores WHERE ativo = true
             GROUP BY estado ORDER BY apoiadores DESC LIMIT 10
   
   d) EVOLUÇÃO TEMPORAL (Line Chart):
      Query: SELECT DATE(created_at) as data, COUNT(*) as novos,
             SUM(COUNT(*)) OVER (ORDER BY DATE(created_at)) as acumulado
             FROM eleitores WHERE ativo = true
             GROUP BY DATE(created_at) ORDER BY data DESC LIMIT 30

4. INSIGHTS ORACLE (InsightsOracle component):
   - Calcular dinamicamente baseado em métricas reais:
     * Eleitor com maior score
     * Região com maior crescimento
     * Segmento mais engajado
     * Alertas de baixo engajamento

5. OPORTUNIDADES ESTRATÉGICAS (OportunidadesEstrategicas component):
   - Query para regiões com baixa penetração
   - Query para segmentos subaproveitados
   - Query para eleitores inativos recuperáveis

6. PRÓXIMOS 7 DIAS (Proximos7Dias component):
   - Query para eleitores que precisam de follow-up
   - Eventos agendados (se houver tabela relacionada)

ESTRUTURA ESPERADA DA API:
GET /api/dashboard/visao-geral?candidateId=1014

Response:
{
  "success": true,
  "data": {
    "metricas": {
      "totalEleitores": 125847,
      "apoiadores": 45230,
      "metaVotos": 150000,
      "percentualMeta": 30.15,
      "scoreMedio": 456,
      "diasParaEleicao": 543,
      "eleitoresCRM": 125847,
      "eleitoresWhatsApp": 89432,
      "atendimentosHoje": 234
    },
    "espectro": [
      { "nome": "Direita", "valor": 45230, "percentual": 35.9 },
      { "nome": "Centro-Direita", "valor": 38492, "percentual": 30.6 }
    ],
    "jornada": [
      { "status": "LEAD", "valor": 45230 },
      { "status": "INTERESSADO", "valor": 38492 }
    ],
    "regional": [
      { "estado": "RS", "total": 67234, "apoiadores": 23456 }
    ],
    "evolucao": [
      { "data": "2024-10-01", "novos": 234, "acumulado": 125847 }
    ]
  }
}

Por favor:
1. Crie a API /api/dashboard/visao-geral/route.ts
2. Implemente todas as queries SQL via Prisma
3. Otimize com Promise.all() para queries paralelas
4. Adicione cache (opcional, usando Redis ou Next.js cache)
5. Modifique o componente Dashboard para consumir esta API
6. Use SWR ou React Query para fetching de dados
7. Adicione loading states e error handling
```

### 📝 **PERGUNTA 5 PARA O CURSOR: Integração com Módulo Embaixadores**

```
Preciso integrar o módulo "Embaixadores" com o backend PostgreSQL.

COMPONENTE: src/components/modules/Embaixadores.tsx

DADOS NECESSÁRIOS:

1. DASHBOARD (Tab: Dashboard):
   
   a) Métricas Gerais:
      - Total de embaixadores (status = 'EMBAIXADOR')
      - Embaixadores ativos (ultima_interacao nos últimos 7 dias)
      - Score médio dos embaixadores
      - Total de compartilhamentos
   
   b) Top 5 Embaixadores:
      Query: SELECT telefone, nome, cidade, estado, score, 
             total_compartilhamentos, total_interacoes
             FROM eleitores WHERE status = 'EMBAIXADOR' AND ativo = true
             ORDER BY score DESC LIMIT 5
   
   c) Distribuição Geográfica:
      Query: SELECT estado, COUNT(*) as total
             FROM eleitores WHERE status = 'EMBAIXADOR' AND ativo = true
             GROUP BY estado ORDER BY total DESC

2. CADASTRO (Tab: Cadastro):
   - CRUD completo de embaixadores
   - API: POST /api/eleitores com status = 'EMBAIXADOR'

3. RANKING (Tab: Ranking):
   Query: SELECT telefone, nome, cidade, estado, score,
          total_interacoes, total_compartilhamentos,
          ROW_NUMBER() OVER (ORDER BY score DESC) as posicao
          FROM eleitores WHERE status = 'EMBAIXADOR' AND ativo = true
          ORDER BY score DESC

4. COMUNIDADES (Tab: Comunidades):
   - Embaixadores agrupados por cidade/bairro
   Query: SELECT cidade, bairro, COUNT(*) as embaixadores,
          AVG(score) as score_medio
          FROM eleitores WHERE status = 'EMBAIXADOR' AND ativo = true
          GROUP BY cidade, bairro

5. TREINAMENTO (Tab: Treinamento):
   - Embaixadores por nível de engajamento
   Query: SELECT nivel_engajamento, COUNT(*) as quantidade
          FROM eleitores WHERE status = 'EMBAIXADOR' AND ativo = true
          GROUP BY nivel_engajamento

API NECESSÁRIA:
GET /api/embaixadores?tab=dashboard&candidateId=1014

Response:
{
  "success": true,
  "data": {
    "metricas": {
      "total": 1247,
      "ativos": 892,
      "scoreMedio": 678,
      "compartilhamentos": 45230
    },
    "top5": [...],
    "distribuicao": [...],
    "ranking": [...]
  }
}

Por favor:
1. Crie API /api/embaixadores/route.ts
2. Implemente todas as queries
3. Modifique o componente Embaixadores para consumir a API
4. Adicione sistema de busca e filtros
5. Implemente paginação no ranking
```

### 📝 **PERGUNTA 6 PARA O CURSOR: Integração com Módulo CRM Eleitoral**

```
Preciso integrar o módulo "CRM Eleitoral" completamente funcional com PostgreSQL.

COMPONENTE: src/components/modules/CRMEleitoral.tsx (criar se não existir)

FUNCIONALIDADES NECESSÁRIAS:

1. LISTAGEM DE ELEITORES (Página Principal):
   - Tabela com paginação (50 por página)
   - Colunas: Nome, Telefone, Email, Cidade, Status, Score, Última Interação
   - Ordenação por qualquer coluna
   - Busca por nome/telefone/email
   
   Query Base:
   SELECT telefone, nome, email, whatsapp, cidade, estado,
          status, score, nivel_engajamento, probabilidade_voto,
          ultima_interacao, total_interacoes
   FROM eleitores WHERE ativo = true
   ORDER BY score DESC
   LIMIT 50 OFFSET ?

2. BUSCA AVANÇADA:
   Filtros múltiplos:
   - Status (dropdown: Lead, Interessado, Apoiador, etc.)
   - Cidade/Estado
   - Score (range: min-max)
   - Espectro político
   - Última interação (data range)
   - Segmento

3. CADASTRO DE NOVO ELEITOR (Modal/Drawer):
   Campos obrigatórios:
   - Nome, Telefone
   
   Campos opcionais:
   - Email, WhatsApp
   - Endereço completo
   - Dados socioeconômicos
   - Preferências políticas
   
   API: POST /api/eleitores
   Body: { nome, telefone, email, ... }

4. EDIÇÃO DE ELEITOR (Modal/Drawer):
   - Carregar dados existentes
   - Permitir edição de todos os campos
   - API: PATCH /api/eleitores/[telefone]

5. PERFIL DO ELEITOR (Página de Detalhes):
   - Todos os dados cadastrais
   - Histórico de interações
   - Gráfico de evolução do score
   - Timeline de atividades
   
   API: GET /api/eleitores/[telefone]
   Response: { ...todos os campos, historico: [...] }

6. AÇÕES RÁPIDAS:
   - Enviar mensagem WhatsApp (link para wa.me)
   - Enviar email (mailto:)
   - Alterar status
   - Adicionar nota/observação
   - Marcar como inativo

7. MÉTRICAS DO CRM (Cards superiores):
   - Total no CRM
   - Taxa de conversão (Lead → Apoiador)
   - Score médio
   - Eleitores adicionados hoje
   - Eleitores ativos (interação nos últimos 7 dias)

8. SEGMENTAÇÃO RÁPIDA (Sidebar):
   - Todos (total)
   - Leads (status = 'LEAD')
   - Interessados
   - Simpatizantes
   - Apoiadores
   - Embaixadores
   - Inativos (última interação > 30 dias)

9. IMPORTAÇÃO EM MASSA:
   - Upload de CSV/Excel
   - Mapeamento de colunas
   - Validação e preview
   - Importação com tratamento de duplicados
   - Relatório de sucesso/erros
   
   API: POST /api/eleitores/importar
   Body: FormData com arquivo

10. EXPORTAÇÃO:
    - Exportar filtros aplicados
    - Formato CSV/Excel
    - Escolher colunas a exportar
    
    API: GET /api/eleitores/exportar?filtros=...

APIS NECESSÁRIAS:
1. GET /api/crm/eleitores - Listagem com filtros e paginação
2. GET /api/crm/eleitores/[telefone] - Perfil completo
3. POST /api/crm/eleitores - Criar novo
4. PATCH /api/crm/eleitores/[telefone] - Atualizar
5. DELETE /api/crm/eleitores/[telefone] - Desativar
6. GET /api/crm/metricas - Métricas do dashboard
7. POST /api/crm/importar - Importação em massa
8. GET /api/crm/exportar - Exportação

ESTRUTURA DO COMPONENTE:

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Search, Filter, Download, Upload, Plus, 
  Phone, Mail, MoreVertical 
} from 'lucide-react';

export default function CRMEleitoral({ candidateId }: { candidateId: string }) {
  const [eleitores, setEleitores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchEleitores();
  }, [page, filters]);

  const fetchEleitores = async () => {
    try {
      const query = new URLSearchParams({
        page: page.toString(),
        limit: '50',
        ...filters
      });
      
      const response = await fetch(`/api/crm/eleitores?${query}`);
      const data = await response.json();
      
      if (data.success) {
        setEleitores(data.data.eleitores);
      }
    } catch (error) {
      console.error('Erro ao buscar eleitores:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com busca e ações */}
      {/* Métricas */}
      {/* Tabela de eleitores */}
      {/* Paginação */}
    </div>
  );
}

Por favor:
1. Crie TODAS as APIs necessárias
2. Implemente o componente CRMEleitoral completo
3. Adicione validação com Zod
4. Implemente importação CSV
5. Adicione exportação
6. Crie modais de cadastro/edição
7. Implemente busca e filtros avançados
8. Adicione tratamento de erros e loading states
```

### 📝 **PERGUNTA 7 PARA O CURSOR: Integração com Análise Ideológica**

```
Preciso integrar o módulo "Análise Ideológica" com PostgreSQL.

COMPONENTE: src/components/modules/AnaliseIdeologica.tsx

DADOS NECESSÁRIOS:

1. MAPEAMENTO DO ESPECTRO POLÍTICO:
   Query: SELECT espectro_ideologico,
          COUNT(*) as quantidade,
          AVG(score) as score_medio,
          AVG(probabilidade_voto) as probabilidade_media,
          COUNT(*) FILTER (WHERE status IN ('APOIADOR', 'EMBAIXADOR')) as apoiadores
          FROM eleitores 
          WHERE ativo = true AND espectro_ideologico IS NOT NULL
          GROUP BY espectro_ideologico
   
   Visualização: Radar Chart

2. SEGMENTAÇÃO AVANÇADA:
   Query: SELECT segmento,
          COUNT(*) as tamanho,
          AVG(score) as score_medio,
          COUNT(*) FILTER (WHERE status = 'APOIADOR') as apoiadores,
          AVG(probabilidade_voto) as probabilidade_media
          FROM eleitores 
          WHERE ativo = true AND segmento IS NOT NULL
          GROUP BY segmento
          ORDER BY tamanho DESC

3. ANÁLISE POR TEMAS DE INTERESSE:
   Query: SELECT unnest(temas_interesse) as tema,
          COUNT(*) as interessados,
          AVG(score) as score_medio,
          COUNT(*) FILTER (WHERE status = 'APOIADOR') as apoiadores
          FROM eleitores 
          WHERE ativo = true AND temas_interesse IS NOT NULL
          GROUP BY tema
          ORDER BY interessados DESC
   
   Visualização: Bar Chart horizontal

4. DISTRIBUIÇÃO MULTIDIMENSIONAL:
   - Cruzamento: Espectro x Escolaridade x Renda
   Query: SELECT espectro_ideologico, escolaridade, renda_familiar,
          COUNT(*) as quantidade
          FROM eleitores 
          WHERE ativo = true 
          GROUP BY espectro_ideologico, escolaridade, renda_familiar

5. EVOLUÇÃO DO ESPECTRO:
   Query: SELECT DATE_TRUNC('month', created_at) as mes,
          espectro_ideologico,
          COUNT(*) as quantidade
          FROM eleitores 
          WHERE ativo = true AND espectro_ideologico IS NOT NULL
          GROUP BY mes, espectro_ideologico
          ORDER BY mes DESC
   
   Visualização: Stacked Area Chart

API NECESSÁRIA:
GET /api/analise-ideologica?candidateId=1014

Response:
{
  "success": true,
  "data": {
    "espectro": [...],
    "segmentos": [...],
    "temas": [...],
    "multidimensional": [...],
    "evolucao": [...]
  }
}

Por favor:
1. Crie API /api/analise-ideologica/route.ts
2. Implemente todas as queries
3. Modifique o componente para consumir a API
4. Adicione gráficos interativos com Recharts
5. Implemente filtros por período
```

---

## 5. TESTES E VALIDAÇÃO

### 📝 **PERGUNTA 8 PARA O CURSOR: Testes e Validação**

```
Preciso implementar testes e validação para garantir que todas as integrações funcionem corretamente.

TAREFAS:

1. CRIAR DADOS DE TESTE (Seed):
   - Script para popular banco com dados fictícios
   - prisma/seed.ts com:
     * 1000 eleitores variados
     * Distribuição realista de status
     * Dados geográficos diversos
     * Scores variados (0-1000)
   
   Executar: npx prisma db seed

2. VALIDAÇÃO COM ZOD:
   - Criar schemas de validação para todos os endpoints
   - Exemplo:
   
   import { z } from 'zod';
   
   export const EleitorSchema = z.object({
     telefone: z.string().min(10).max(20),
     nome: z.string().min(3).max(255),
     email: z.string().email().optional(),
     cidade: z.string().optional(),
     status: z.enum(['LEAD', 'INTERESSADO', 'SIMPATIZANTE', 'APOIADOR', 'EMBAIXADOR']),
     score: z.number().min(0).max(1000).default(0)
   });

3. TESTES DE API:
   - Criar arquivo tests/api.test.ts
   - Testar todos os endpoints principais:
     * GET /api/eleitores (sucesso, paginação)
     * POST /api/eleitores (sucesso, erro de validação)
     * PATCH /api/eleitores/[telefone] (sucesso, não encontrado)
     * GET /api/dashboard/visao-geral (sucesso)
   
   Usar Jest ou Vitest

4. ERROR HANDLING GLOBAL:
   - Criar middleware src/middleware.ts
   - Capturar erros globais
   - Retornar responses padronizados

5. LOGS ESTRUTURADOS:
   - Implementar Winston ou Pino
   - Logar todas as requisições
   - Logar erros com stack trace

6. MONITORAMENTO:
   - Adicionar health check: GET /api/health
   - Verificar conexão com banco
   - Retornar status do sistema

Por favor:
1. Implemente todos os testes
2. Crie script de seed
3. Adicione validação com Zod em todas as APIs
4. Configure error handling global
5. Adicione sistema de logs
6. Crie endpoint de health check
```

---

## 📊 RESUMO DAS PERGUNTAS

### **ORDEM DE IMPLEMENTAÇÃO:**

1. ✅ **Configuração Prisma + PostgreSQL** (Pergunta 1)
2. ✅ **Schema da Tabela Eleitores** (Pergunta 2)
3. ✅ **APIs Essenciais** (Pergunta 3)
4. ✅ **Dashboard Executivo** (Pergunta 4)
5. ✅ **Módulo Embaixadores** (Pergunta 5)
6. ✅ **CRM Eleitoral** (Pergunta 6)
7. ✅ **Análise Ideológica** (Pergunta 7)
8. ✅ **Testes e Validação** (Pergunta 8)

### **DEPENDÊNCIAS A INSTALAR:**

```bash
npm install @prisma/client prisma zod swr
npm install -D @types/node
```

### **ARQUIVOS QUE SERÃO CRIADOS:**

```
prisma/
  schema.prisma
  seed.ts

src/
  lib/
    prisma.ts
    validations.ts
  
  app/
    api/
      eleitores/
        route.ts
        [telefone]/route.ts
        metricas/route.ts
        segmentos/route.ts
        geografico/route.ts
        embaixadores/route.ts
        busca/route.ts
        importar/route.ts
        exportar/route.ts
        historico/route.ts
      
      dashboard/
        visao-geral/route.ts
      
      embaixadores/
        route.ts
      
      crm/
        eleitores/route.ts
        metricas/route.ts
      
      analise-ideologica/
        route.ts
      
      health/
        route.ts

  components/
    modules/
      CRMEleitoral.tsx (criar)

tests/
  api.test.ts

.env
```

### **VARIÁVEIS DE AMBIENTE (.env):**

```env
# PostgreSQL
DATABASE_URL="postgresql://username:password@host:port/database?schema=public"

# Next.js
NODE_ENV="development"
NEXT_PUBLIC_API_URL="http://localhost:3000"

# Opcional: Redis para cache
REDIS_URL="redis://localhost:6379"

# Opcional: JWT
JWT_SECRET="seu-secret-aqui"
```

---

## 🎯 RESULTADO FINAL

Após implementar todas as perguntas, você terá:

✅ **Backend completo** integrado com PostgreSQL
✅ **APIs REST** funcionais para todos os módulos
✅ **CRUD completo** de eleitores
✅ **Dashboard com dados reais** do banco
✅ **Métricas calculadas** dinamicamente
✅ **Gráficos interativos** com dados reais
✅ **Sistema de importação/exportação**
✅ **Busca e filtros avançados**
✅ **Validação de dados** com Zod
✅ **Error handling** robusto
✅ **Logs estruturados**
✅ **Testes automatizados**
✅ **Performance otimizada** com índices

**O sistema CIPE estará 100% funcional e integrado com PostgreSQL!** 🚀✨

---

## 📞 PRÓXIMOS PASSOS

1. **Copie a Pergunta 1** e cole no Cursor
2. **Aguarde a implementação** completa
3. **Teste a conexão** com o banco
4. **Siga para a Pergunta 2** e assim por diante
5. **Valide cada etapa** antes de prosseguir

**Boa sorte com a implementação!** 💪🔥

