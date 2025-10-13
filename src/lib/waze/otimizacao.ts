// Biblioteca de Otimização de Rotas para Waze Eleitoral
// Implementa algoritmos TSP (Traveling Salesman Problem) e VRP (Vehicle Routing Problem)

interface Ponto {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  duracao?: number; // Tempo de parada em minutos
  prioridade?: number; // 1-10
}

interface RotaOtimizada {
  ordem: string[]; // IDs dos pontos na ordem otimizada
  distanciaTotal: number; // em km
  tempoTotal: number; // em minutos
  pontosOrdenados: Ponto[];
}

/**
 * Calcula a distância entre dois pontos usando a fórmula de Haversine
 */
export function calcularDistancia(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance;
}

/**
 * Otimiza a rota usando o algoritmo Nearest Neighbor (vizinho mais próximo)
 * Este é um algoritmo guloso que funciona bem para problemas pequenos e médios
 */
export function otimizarRotaNearestNeighbor(
  pontos: Ponto[],
  pontoInicial?: Ponto
): RotaOtimizada {
  if (pontos.length === 0) {
    return {
      ordem: [],
      distanciaTotal: 0,
      tempoTotal: 0,
      pontosOrdenados: []
    };
  }

  if (pontos.length === 1) {
    return {
      ordem: [pontos[0].id],
      distanciaTotal: 0,
      tempoTotal: pontos[0].duracao || 0,
      pontosOrdenados: pontos
    };
  }

  const pontosRestantes = [...pontos];
  const rota: Ponto[] = [];
  let distanciaTotal = 0;
  let tempoTotal = 0;

  // Começar do ponto inicial ou do primeiro ponto
  let atual = pontoInicial || pontosRestantes[0];
  pontosRestantes.splice(pontosRestantes.indexOf(atual), 1);
  rota.push(atual);
  tempoTotal += atual.duracao || 0;

  // Encontrar o próximo ponto mais próximo iterativamente
  while (pontosRestantes.length > 0) {
    let maisProximo: Ponto | null = null;
    let menorDistancia = Infinity;

    for (const ponto of pontosRestantes) {
      const distancia = calcularDistancia(
        atual.latitude,
        atual.longitude,
        ponto.latitude,
        ponto.longitude
      );

      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        maisProximo = ponto;
      }
    }

    if (maisProximo) {
      rota.push(maisProximo);
      distanciaTotal += menorDistancia;
      tempoTotal += (menorDistancia / 40) * 60; // Assumindo 40 km/h de velocidade média
      tempoTotal += maisProximo.duracao || 0;
      pontosRestantes.splice(pontosRestantes.indexOf(maisProximo), 1);
      atual = maisProximo;
    }
  }

  return {
    ordem: rota.map(p => p.id),
    distanciaTotal: Math.round(distanciaTotal * 10) / 10,
    tempoTotal: Math.round(tempoTotal),
    pontosOrdenados: rota
  };
}

/**
 * Otimiza a rota usando algoritmo 2-opt
 * Melhora uma rota existente através de trocas de segmentos
 */
export function otimizarRota2Opt(pontos: Ponto[]): RotaOtimizada {
  if (pontos.length < 3) {
    return otimizarRotaNearestNeighbor(pontos);
  }

  // Começar com a solução do Nearest Neighbor
  let melhorRota = otimizarRotaNearestNeighbor(pontos);
  let melhorou = true;
  let iteracoes = 0;
  const maxIteracoes = 100;

  while (melhorou && iteracoes < maxIteracoes) {
    melhorou = false;
    iteracoes++;

    for (let i = 0; i < melhorRota.pontosOrdenados.length - 1; i++) {
      for (let j = i + 2; j < melhorRota.pontosOrdenados.length; j++) {
        // Tentar inverter o segmento entre i+1 e j
        const novaRota = [...melhorRota.pontosOrdenados];
        const segmento = novaRota.slice(i + 1, j + 1).reverse();
        novaRota.splice(i + 1, j - i, ...segmento);

        // Calcular nova distância
        let novaDistancia = 0;
        for (let k = 0; k < novaRota.length - 1; k++) {
          novaDistancia += calcularDistancia(
            novaRota[k].latitude,
            novaRota[k].longitude,
            novaRota[k + 1].latitude,
            novaRota[k + 1].longitude
          );
        }

        if (novaDistancia < melhorRota.distanciaTotal) {
          melhorRota = {
            ordem: novaRota.map(p => p.id),
            distanciaTotal: Math.round(novaDistancia * 10) / 10,
            tempoTotal: Math.round(
              (novaDistancia / 40) * 60 +
                novaRota.reduce((acc, p) => acc + (p.duracao || 0), 0)
            ),
            pontosOrdenados: novaRota
          };
          melhorou = true;
        }
      }
    }
  }

  return melhorRota;
}

/**
 * Divide pontos em múltiplas rotas para múltiplos veículos/equipes (VRP simplificado)
 */
export function otimizarRotasMultiplas(
  pontos: Ponto[],
  numeroVeiculos: number
): RotaOtimizada[] {
  if (numeroVeiculos <= 1 || pontos.length <= numeroVeiculos) {
    return [otimizarRota2Opt(pontos)];
  }

  // Dividir pontos em clusters usando k-means simplificado
  const clusters = dividirEmClusters(pontos, numeroVeiculos);

  // Otimizar cada cluster
  return clusters.map(cluster => otimizarRota2Opt(cluster));
}

/**
 * Divide pontos em clusters usando k-means simplificado
 */
function dividirEmClusters(pontos: Ponto[], k: number): Ponto[][] {
  // Inicializar centroides aleatoriamente
  const centroides = pontos
    .sort(() => Math.random() - 0.5)
    .slice(0, k)
    .map(p => ({ lat: p.latitude, lon: p.longitude }));

  let clusters: Ponto[][] = Array.from({ length: k }, () => []);
  let iteracoes = 0;
  const maxIteracoes = 50;

  while (iteracoes < maxIteracoes) {
    // Limpar clusters
    clusters = Array.from({ length: k }, () => []);

    // Atribuir cada ponto ao centroide mais próximo
    for (const ponto of pontos) {
      let menorDistancia = Infinity;
      let clusterIndex = 0;

      for (let i = 0; i < centroides.length; i++) {
        const distancia = calcularDistancia(
          ponto.latitude,
          ponto.longitude,
          centroides[i].lat,
          centroides[i].lon
        );

        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          clusterIndex = i;
        }
      }

      clusters[clusterIndex].push(ponto);
    }

    // Recalcular centroides
    const novosCentroides = clusters.map(cluster => {
      if (cluster.length === 0) {
        return centroides[0]; // Manter o centroide anterior se o cluster está vazio
      }

      const lat = cluster.reduce((acc, p) => acc + p.latitude, 0) / cluster.length;
      const lon = cluster.reduce((acc, p) => acc + p.longitude, 0) / cluster.length;
      return { lat, lon };
    });

    // Verificar convergência
    let converged = true;
    for (let i = 0; i < centroides.length; i++) {
      if (
        Math.abs(centroides[i].lat - novosCentroides[i].lat) > 0.0001 ||
        Math.abs(centroides[i].lon - novosCentroides[i].lon) > 0.0001
      ) {
        converged = false;
        break;
      }
    }

    if (converged) break;

    centroides.splice(0, centroides.length, ...novosCentroides);
    iteracoes++;
  }

  return clusters.filter(cluster => cluster.length > 0);
}

/**
 * Estima o tempo de viagem entre dois pontos considerando velocidade média
 */
export function estimarTempoViagem(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  velocidadeMedia: number = 40 // km/h
): number {
  const distancia = calcularDistancia(lat1, lon1, lat2, lon2);
  return Math.round((distancia / velocidadeMedia) * 60); // em minutos
}

/**
 * Calcula o custo estimado de uma rota
 */
export function calcularCustoRota(
  distanciaKm: number,
  tempominutos: number,
  parametros: {
    custoPorKm?: number;
    custoPorHora?: number;
    custoFixo?: number;
  } = {}
): number {
  const {
    custoPorKm = 2.5, // R$ por km (combustível + manutenção)
    custoPorHora = 50, // R$ por hora (equipe)
    custoFixo = 100 // R$ (material, logística)
  } = parametros;

  const custoDistancia = distanciaKm * custoPorKm;
  const custoTempo = (tempominutos / 60) * custoPorHora;
  
  return Math.round(custoFixo + custoDistancia + custoTempo);
}

