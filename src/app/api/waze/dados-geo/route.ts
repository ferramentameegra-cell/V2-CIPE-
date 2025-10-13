import { NextResponse } from 'next/server';

// API para fornecer dados georreferenciados para as camadas do mapa

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const camada = searchParams.get('camada');
    const candidatoId = searchParams.get('candidatoId');

    // Em produção, buscar dados reais do banco e formatar em GeoJSON
    const dadosGeojson = gerarDadosCamada(camada || 'apoiadores');

    return NextResponse.json(dadosGeojson);
  } catch (error) {
    console.error('Erro ao buscar dados geográficos:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados' }, { status: 500 });
  }
}

function gerarDadosCamada(camada: string): any {
  const baseCoords = { lat: -30.0346, lon: -51.2177 };

  switch (camada) {
    case 'apoiadores':
      return {
        type: 'FeatureCollection',
        features: Array.from({ length: 50 }, (_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              baseCoords.lon + (Math.random() - 0.5) * 0.2,
              baseCoords.lat + (Math.random() - 0.5) * 0.2
            ]
          },
          properties: {
            id: `apoiador-${i}`,
            nome: `Apoiador ${i + 1}`,
            tipo: 'apoiador',
            engajamento: Math.floor(Math.random() * 100)
          }
        }))
      };

    case 'indecisos':
      return {
        type: 'FeatureCollection',
        features: Array.from({ length: 30 }, (_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              baseCoords.lon + (Math.random() - 0.5) * 0.2,
              baseCoords.lat + (Math.random() - 0.5) * 0.2
            ]
          },
          properties: {
            id: `indeciso-${i}`,
            nome: `Indeciso ${i + 1}`,
            tipo: 'indeciso'
          }
        }))
      };

    case 'eventos':
      return {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [baseCoords.lon, baseCoords.lat]
            },
            properties: {
              nome: 'Comício Central',
              tipo: 'comicio',
              data: '2024-02-15',
              participantes: 5000
            }
          }
        ]
      };

    case 'votos':
      return {
        type: 'FeatureCollection',
        features: Array.from({ length: 100 }, (_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              baseCoords.lon + (Math.random() - 0.5) * 0.2,
              baseCoords.lat + (Math.random() - 0.5) * 0.2
            ]
          },
          properties: {
            intensidade: Math.floor(Math.random() * 100)
          }
        }))
      };

    default:
      return { type: 'FeatureCollection', features: [] };
  }
}

