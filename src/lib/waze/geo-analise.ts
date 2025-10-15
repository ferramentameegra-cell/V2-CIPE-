// Biblioteca de Análise Geoespacial para Waze Eleitoral
// Funções para análise de território, clustering e manipulação de dados geográficos

import * as turf from '@turf/turf';

interface PontoGeografico {
  latitude: number;
  longitude: number;
  [key: string]: any;
}

interface AreaGeografica {
  nome: string;
  coordenadas: number[][][]; // GeoJSON Polygon coordinates
  [key: string]: any;
}

/**
 * Verifica se um ponto está dentro de um polígono
 */
export function pontoEmPoligono(
  latitude: number,
  longitude: number,
  poligono: number[][][]
): boolean {
  try {
    const ponto = turf.point([longitude, latitude]);
    const poly = turf.polygon(poligono);
    return turf.booleanPointInPolygon(ponto, poly);
  } catch (error) {
    console.error('Erro ao verificar ponto em polígono:', error);
    return false;
  }
}

/**
 * Calcula o centro geográfico (centroid) de um polígono
 */
export function calcularCentroPoligono(poligono: number[][][]): {
  latitude: number;
  longitude: number;
} {
  try {
    const poly = turf.polygon(poligono);
    const centroid = turf.centroid(poly);
    return {
      latitude: centroid.geometry.coordinates[1],
      longitude: centroid.geometry.coordinates[0]
    };
  } catch (error) {
    console.error('Erro ao calcular centro do polígono:', error);
    return { latitude: 0, longitude: 0 };
  }
}

/**
 * Calcula a área de um polígono em km²
 */
export function calcularAreaPoligono(poligono: number[][][]): number {
  try {
    const poly = turf.polygon(poligono);
    const area = turf.area(poly);
    return Math.round((area / 1000000) * 100) / 100; // Converter m² para km²
  } catch (error) {
    console.error('Erro ao calcular área:', error);
    return 0;
  }
}

/**
 * Cria um buffer (área de influência) ao redor de um ponto
 */
export function criarBuffer(
  latitude: number,
  longitude: number,
  raioKm: number
): number[][][] {
  try {
    const ponto = turf.point([longitude, latitude]);
    const buffer = turf.buffer(ponto, raioKm, { units: 'kilometers' });
    if (buffer && buffer.geometry.type === 'Polygon') {
      return buffer.geometry.coordinates;
    }
    return [];
  } catch (error) {
    console.error('Erro ao criar buffer:', error);
    return [];
  }
}

/**
 * Encontra todos os pontos dentro de um raio
 */
export function pontosNoRaio(
  centroLat: number,
  centroLon: number,
  raioKm: number,
  pontos: PontoGeografico[]
): PontoGeografico[] {
  const buffer = criarBuffer(centroLat, centroLon, raioKm);
  if (buffer.length === 0) return [];

  return pontos.filter(ponto =>
    pontoEmPoligono(ponto.latitude, ponto.longitude, buffer)
  );
}

/**
 * Agrupa pontos usando DBSCAN (Density-Based Spatial Clustering)
 * Simplificado para uso em aplicações web
 */
export function agruparPontos(
  pontos: PontoGeografico[],
  raioKm: number = 1,
  minPontos: number = 3
): PontoGeografico[][] {
  if (pontos.length === 0) return [];

  const visitados = new Set<number>();
  const clusters: PontoGeografico[][] = [];

  const encontrarVizinhos = (indice: number): number[] => {
    const vizinhos: number[] = [];
    const pontoAtual = pontos[indice];

    for (let i = 0; i < pontos.length; i++) {
      if (i === indice) continue;

      const distancia = calcularDistanciaHaversine(
        pontoAtual.latitude,
        pontoAtual.longitude,
        pontos[i].latitude,
        pontos[i].longitude
      );

      if (distancia <= raioKm) {
        vizinhos.push(i);
      }
    }

    return vizinhos;
  };

  const expandirCluster = (indice: number, vizinhos: number[]): PontoGeografico[] => {
    const cluster: PontoGeografico[] = [pontos[indice]];
    visitados.add(indice);

    const fila = [...vizinhos];

    while (fila.length > 0) {
      const atual = fila.shift()!;

      if (visitados.has(atual)) continue;
      visitados.add(atual);

      cluster.push(pontos[atual]);

      const novosVizinhos = encontrarVizinhos(atual);
      if (novosVizinhos.length >= minPontos) {
        fila.push(...novosVizinhos.filter(v => !visitados.has(v)));
      }
    }

    return cluster;
  };

  for (let i = 0; i < pontos.length; i++) {
    if (visitados.has(i)) continue;

    const vizinhos = encontrarVizinhos(i);

    if (vizinhos.length >= minPontos - 1) {
      const cluster = expandirCluster(i, vizinhos);
      clusters.push(cluster);
    } else {
      visitados.add(i);
    }
  }

  return clusters;
}

/**
 * Calcula a densidade de pontos em uma área (pontos por km²)
 */
export function calcularDensidade(
  pontos: PontoGeografico[],
  area: AreaGeografica
): number {
  const pontosNaArea = pontos.filter(ponto =>
    pontoEmPoligono(ponto.latitude, ponto.longitude, area.coordenadas)
  );

  const areaKm2 = calcularAreaPoligono(area.coordenadas);

  if (areaKm2 === 0) return 0;

  return Math.round((pontosNaArea.length / areaKm2) * 100) / 100;
}

/**
 * Cria um heatmap (mapa de calor) baseado em pontos
 * Retorna uma grade com intensidades
 */
export function criarHeatmap(
  pontos: PontoGeografico[],
  bounds: {
    norte: number;
    sul: number;
    leste: number;
    oeste: number;
  },
  resolucao: number = 20 // Número de células por lado
): number[][] {
  const heatmap: number[][] = Array.from({ length: resolucao }, () =>
    Array(resolucao).fill(0)
  );

  const latStep = (bounds.norte - bounds.sul) / resolucao;
  const lonStep = (bounds.leste - bounds.oeste) / resolucao;

  for (const ponto of pontos) {
    const latIndex = Math.floor((ponto.latitude - bounds.sul) / latStep);
    const lonIndex = Math.floor((ponto.longitude - bounds.oeste) / lonStep);

    if (
      latIndex >= 0 &&
      latIndex < resolucao &&
      lonIndex >= 0 &&
      lonIndex < resolucao
    ) {
      heatmap[latIndex][lonIndex]++;
    }
  }

  return heatmap;
}

/**
 * Converte um heatmap em formato GeoJSON para visualização
 */
export function heatmapParaGeoJSON(
  heatmap: number[][],
  bounds: {
    norte: number;
    sul: number;
    leste: number;
    oeste: number;
  }
): any {
  const features = [];
  const latStep = (bounds.norte - bounds.sul) / heatmap.length;
  const lonStep = (bounds.leste - bounds.oeste) / heatmap[0].length;

  for (let i = 0; i < heatmap.length; i++) {
    for (let j = 0; j < heatmap[i].length; j++) {
      if (heatmap[i][j] > 0) {
        const lat = bounds.sul + i * latStep;
        const lon = bounds.oeste + j * lonStep;

        features.push({
          type: 'Feature',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [lon, lat],
                [lon + lonStep, lat],
                [lon + lonStep, lat + latStep],
                [lon, lat + latStep],
                [lon, lat]
              ]
            ]
          },
          properties: {
            intensidade: heatmap[i][j]
          }
        });
      }
    }
  }

  return {
    type: 'FeatureCollection',
    features
  };
}

/**
 * Encontra a rota mais próxima entre dois pontos evitando áreas de risco
 */
export function encontrarRotaEvitandoAreas(
  inicio: { latitude: number; longitude: number },
  fim: { latitude: number; longitude: number },
  areasRisco: number[][][]
): number[][] {
  // Implementação simplificada: linha reta se não passar por áreas de risco
  const linhaReta: number[][] = [
    [inicio.longitude, inicio.latitude],
    [fim.longitude, fim.latitude]
  ];

  // Verificar se a linha reta passa por áreas de risco
  const linha = turf.lineString(linhaReta);

  for (const area of areasRisco) {
    try {
      const poly = turf.polygon(area as any);
      if (turf.booleanIntersects(linha, poly)) {
        // Se intersecta, criar rota alternativa (simplificado: desvio pelo centroide)
        const centroid = calcularCentroPoligono(area as any);
        return [
          [inicio.longitude, inicio.latitude],
          [centroid.longitude + 0.01, centroid.latitude + 0.01], // Pequeno offset
          [fim.longitude, fim.latitude]
        ];
      }
    } catch (error) {
      console.error('Erro ao verificar interseção:', error);
    }
  }

  return linhaReta;
}

/**
 * Calcula distância usando fórmula de Haversine (duplicado para independência)
 */
function calcularDistanciaHaversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Gera bounds automáticos a partir de uma lista de pontos
 */
export function calcularBounds(pontos: PontoGeografico[]): {
  norte: number;
  sul: number;
  leste: number;
  oeste: number;
} {
  if (pontos.length === 0) {
    return { norte: 0, sul: 0, leste: 0, oeste: 0 };
  }

  let norte = -90;
  let sul = 90;
  let leste = -180;
  let oeste = 180;

  for (const ponto of pontos) {
    if (ponto.latitude > norte) norte = ponto.latitude;
    if (ponto.latitude < sul) sul = ponto.latitude;
    if (ponto.longitude > leste) leste = ponto.longitude;
    if (ponto.longitude < oeste) oeste = ponto.longitude;
  }

  // Adicionar margem de 10%
  const margemLat = (norte - sul) * 0.1;
  const margemLon = (leste - oeste) * 0.1;

  return {
    norte: norte + margemLat,
    sul: sul - margemLat,
    leste: leste + margemLon,
    oeste: oeste - margemLon
  };
}

