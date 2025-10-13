'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { MapPin, Users, TrendingUp, Navigation, Search, Layers } from 'lucide-react';

// Importações dinâmicas do Mapbox (apenas no cliente)
let Map: any, Source: any, Layer: any, Marker: any, Popup: any, NavigationControl: any, GeolocateControl: any;

if (typeof window !== 'undefined') {
  const mapgl = require('react-map-gl/mapbox');
  Map = mapgl.Map;
  Source = mapgl.Source;
  Layer = mapgl.Layer;
  Marker = mapgl.Marker;
  Popup = mapgl.Popup;
  NavigationControl = mapgl.NavigationControl;
  GeolocateControl = mapgl.GeolocateControl;
  require('mapbox-gl/dist/mapbox-gl.css');
}

// Token do Mapbox (usar variável de ambiente)
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjazZqYW50ZWswNnFlM2VwZzVwZnBzZjVuIn0.example';

interface MapaInterativoProps {
  candidateId: string;
  onAreaClick?: (areaData: any) => void;
  onMarkerClick?: (markerData: any) => void;
}

interface CamadaConfig {
  id: string;
  nome: string;
  tipo: 'heatmap' | 'markers' | 'polygons' | 'lines';
  visivel: boolean;
  cor: string;
  icone?: any;
}

interface MembroEquipe {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  status: 'ativo' | 'pausado' | 'offline';
  velocidade?: number;
  bateria?: number;
}

export default function MapaInterativo({ candidateId, onAreaClick, onMarkerClick }: MapaInterativoProps) {
  const [viewState, setViewState] = useState({
    longitude: -51.2177,
    latitude: -30.0346,
    zoom: 11
  });

  const [camadasVisiveis, setCamadasVisiveis] = useState<Set<string>>(new Set(['equipes', 'apoiadores']));
  const [popup, setPopup] = useState<{ latitude: number; longitude: number; data: any } | null>(null);
  const [busca, setBusca] = useState('');
  const [membrosEquipe, setMembrosEquipe] = useState<MembroEquipe[]>([]);
  const [dadosCamadas, setDadosCamadas] = useState<any>({});

  // Configuração das camadas disponíveis
  const camadas: CamadaConfig[] = [
    { id: 'votos', nome: 'Votos Anteriores', tipo: 'heatmap', visivel: false, cor: '#FF6B6B', icone: TrendingUp },
    { id: 'densidade', nome: 'Densidade Pop.', tipo: 'heatmap', visivel: false, cor: '#4ECDC4' },
    { id: 'renda', nome: 'Renda Média', tipo: 'heatmap', visivel: false, cor: '#FFD93D' },
    { id: 'apoiadores', nome: 'Apoiadores', tipo: 'markers', visivel: true, cor: '#6BCF7F', icone: Users },
    { id: 'indecisos', nome: 'Indecisos', tipo: 'markers', visivel: false, cor: '#FFA726' },
    { id: 'adversarios', nome: 'Adversários', tipo: 'polygons', visivel: false, cor: '#EF5350' },
    { id: 'engajamento', nome: 'Engajamento Social', tipo: 'heatmap', visivel: false, cor: '#AB47BC' },
    { id: 'eventos', nome: 'Eventos', tipo: 'markers', visivel: false, cor: '#42A5F5', icone: MapPin },
    { id: 'equipes', nome: 'Equipes em Tempo Real', tipo: 'markers', visivel: true, cor: '#00D4FF', icone: Navigation },
    { id: 'secoes', nome: 'Seções Eleitorais', tipo: 'polygons', visivel: false, cor: '#8E24AA' }
  ];

  // Simular atualização de posição das equipes em tempo real
  useEffect(() => {
    const equipesSimuladas: MembroEquipe[] = [
      {
        id: '1',
        nome: 'Ana Silva',
        latitude: -30.0346 + (Math.random() - 0.5) * 0.1,
        longitude: -51.2177 + (Math.random() - 0.5) * 0.1,
        status: 'ativo',
        velocidade: 25,
        bateria: 85
      },
      {
        id: '2',
        nome: 'Carlos Lima',
        latitude: -30.0346 + (Math.random() - 0.5) * 0.1,
        longitude: -51.2177 + (Math.random() - 0.5) * 0.1,
        status: 'ativo',
        velocidade: 15,
        bateria: 60
      },
      {
        id: '3',
        nome: 'Maria Santos',
        latitude: -30.0346 + (Math.random() - 0.5) * 0.1,
        longitude: -51.2177 + (Math.random() - 0.5) * 0.1,
        status: 'pausado',
        velocidade: 0,
        bateria: 45
      }
    ];

    setMembrosEquipe(equipesSimuladas);

    // Simular movimento em tempo real
    const interval = setInterval(() => {
      setMembrosEquipe(prev =>
        prev.map(membro => {
          if (membro.status === 'ativo') {
            return {
              ...membro,
              latitude: membro.latitude + (Math.random() - 0.5) * 0.001,
              longitude: membro.longitude + (Math.random() - 0.5) * 0.001,
              velocidade: 10 + Math.random() * 30,
              bateria: Math.max(20, membro.bateria! - Math.random() * 0.5)
            };
          }
          return membro;
        })
      );
    }, 3000); // Atualizar a cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  // Carregar dados das camadas
  useEffect(() => {
    carregarDadosCamadas();
  }, [candidateId]);

  const carregarDadosCamadas = async () => {
    // Simular dados GeoJSON para diferentes camadas
    const dadosSimulados = {
      apoiadores: {
        type: 'FeatureCollection',
        features: Array.from({ length: 50 }, (_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              -51.2177 + (Math.random() - 0.5) * 0.2,
              -30.0346 + (Math.random() - 0.5) * 0.2
            ]
          },
          properties: {
            id: `apoiador-${i}`,
            nome: `Apoiador ${i + 1}`,
            tipo: 'apoiador',
            engajamento: Math.floor(Math.random() * 100)
          }
        }))
      },
      indecisos: {
        type: 'FeatureCollection',
        features: Array.from({ length: 30 }, (_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              -51.2177 + (Math.random() - 0.5) * 0.2,
              -30.0346 + (Math.random() - 0.5) * 0.2
            ]
          },
          properties: {
            id: `indeciso-${i}`,
            nome: `Indeciso ${i + 1}`,
            tipo: 'indeciso'
          }
        }))
      },
      votos: {
        type: 'FeatureCollection',
        features: Array.from({ length: 100 }, (_, i) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              -51.2177 + (Math.random() - 0.5) * 0.2,
              -30.0346 + (Math.random() - 0.5) * 0.2
            ]
          },
          properties: {
            intensidade: Math.floor(Math.random() * 100)
          }
        }))
      },
      eventos: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-51.2177, -30.0346]
            },
            properties: {
              nome: 'Comício Central',
              tipo: 'comicio',
              data: '2024-02-15',
              participantes: 5000
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-51.2077, -30.0246]
            },
            properties: {
              nome: 'Caminhada Bairro Norte',
              tipo: 'caminhada',
              data: '2024-02-18',
              participantes: 1000
            }
          }
        ]
      }
    };

    setDadosCamadas(dadosSimulados);
  };

  const toggleCamada = (camadaId: string) => {
    setCamadasVisiveis(prev => {
      const novo = new Set(prev);
      if (novo.has(camadaId)) {
        novo.delete(camadaId);
      } else {
        novo.add(camadaId);
      }
      return novo;
    });
  };

  const buscarEndereco = async () => {
    if (!busca.trim()) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(busca)}.json?access_token=${MAPBOX_TOKEN}&country=br&limit=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        setViewState({
          longitude,
          latitude,
          zoom: 14
        });
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ativo': return '#00FF00';
      case 'pausado': return '#FFA500';
      case 'offline': return '#FF0000';
      default: return '#CCCCCC';
    }
  };

  // Se estiver no servidor (SSR), mostrar placeholder
  if (typeof window === 'undefined' || !Map) {
    return (
      <div className="relative w-full h-full min-h-[600px] bg-slate-800/50 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-white/50 mx-auto mb-2" />
          <p className="text-white/70">Carregando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[600px]">
      {/* Controles do Mapa - Busca */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <Input
          placeholder="Buscar endereço..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && buscarEndereco()}
          className="w-64 bg-white/90 backdrop-blur-sm"
        />
        <Button onClick={buscarEndereco} size="sm">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {/* Seletor de Camadas */}
      <div className="absolute top-4 right-4 z-10">
        <Card className="glass-card p-3 max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Camadas do Mapa</span>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {camadas.map((camada) => (
              <div
                key={camada.id}
                className="flex items-center justify-between p-2 bg-white/5 rounded hover:bg-white/10 transition-all cursor-pointer"
                onClick={() => toggleCamada(camada.id)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: camada.cor }}
                  />
                  <span className="text-xs text-white">{camada.nome}</span>
                </div>
                <input
                  type="checkbox"
                  checked={camadasVisiveis.has(camada.id)}
                  onChange={() => {}}
                  className="rounded"
                />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Legenda de Status das Equipes */}
      {camadasVisiveis.has('equipes') && (
        <div className="absolute bottom-20 right-4 z-10">
          <Card className="glass-card p-3">
            <div className="text-xs font-semibold text-white mb-2">Status Equipes</div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-white">Ativo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-xs text-white">Pausado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs text-white">Offline</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Mapa Mapbox */}
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        onClick={(e) => {
          if (onAreaClick) {
            onAreaClick({
              latitude: e.lngLat.lat,
              longitude: e.lngLat.lng
            });
          }
        }}
      >
        {/* Controles de Navegação */}
        <NavigationControl position="bottom-left" />
        <GeolocateControl position="bottom-left" />

        {/* Camada de Votos (Heatmap) */}
        {camadasVisiveis.has('votos') && dadosCamadas.votos && (
          <Source id="votos-data" type="geojson" data={dadosCamadas.votos}>
            <Layer
              id="votos-heatmap"
              type="heatmap"
              paint={{
                'heatmap-intensity': 0.8,
                'heatmap-radius': 20,
                'heatmap-weight': ['get', 'intensidade'],
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(255,107,107,0)',
                  0.2, 'rgb(255,107,107)',
                  0.4, 'rgb(255,159,64)',
                  0.6, 'rgb(255,206,0)',
                  0.8, 'rgb(75,192,192)',
                  1, 'rgb(54,162,235)'
                ]
              }}
            />
          </Source>
        )}

        {/* Camada de Apoiadores (Markers) */}
        {camadasVisiveis.has('apoiadores') && dadosCamadas.apoiadores && (
          <Source id="apoiadores-data" type="geojson" data={dadosCamadas.apoiadores}>
            <Layer
              id="apoiadores-circles"
              type="circle"
              paint={{
                'circle-radius': 6,
                'circle-color': '#6BCF7F',
                'circle-opacity': 0.8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#FFFFFF'
              }}
            />
          </Source>
        )}

        {/* Camada de Indecisos (Markers) */}
        {camadasVisiveis.has('indecisos') && dadosCamadas.indecisos && (
          <Source id="indecisos-data" type="geojson" data={dadosCamadas.indecisos}>
            <Layer
              id="indecisos-circles"
              type="circle"
              paint={{
                'circle-radius': 6,
                'circle-color': '#FFA726',
                'circle-opacity': 0.8,
                'circle-stroke-width': 2,
                'circle-stroke-color': '#FFFFFF'
              }}
            />
          </Source>
        )}

        {/* Camada de Eventos (Markers) */}
        {camadasVisiveis.has('eventos') && dadosCamadas.eventos && (
          <>
            {dadosCamadas.eventos.features.map((feature: any, index: number) => (
              <Marker
                key={`evento-${index}`}
                latitude={feature.geometry.coordinates[1]}
                longitude={feature.geometry.coordinates[0]}
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  setPopup({
                    latitude: feature.geometry.coordinates[1],
                    longitude: feature.geometry.coordinates[0],
                    data: feature.properties
                  });
                }}
              >
                <div className="cursor-pointer transform hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-blue-500" fill="#42A5F5" />
                </div>
              </Marker>
            ))}
          </>
        )}

        {/* Camada de Equipes em Tempo Real (Markers Animados) */}
        {camadasVisiveis.has('equipes') &&
          membrosEquipe.map((membro) => (
            <Marker
              key={membro.id}
              latitude={membro.latitude}
              longitude={membro.longitude}
              onClick={(e) => {
                e.originalEvent.stopPropagation();
                setPopup({
                  latitude: membro.latitude,
                  longitude: membro.longitude,
                  data: membro
                });
              }}
            >
              <div className="relative cursor-pointer">
                <div
                  className="w-4 h-4 rounded-full animate-pulse"
                  style={{
                    backgroundColor: getStatusColor(membro.status),
                    boxShadow: `0 0 10px ${getStatusColor(membro.status)}`
                  }}
                />
                {membro.status === 'ativo' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
                )}
              </div>
            </Marker>
          ))}

        {/* Popup de Informações */}
        {popup && (
          <Popup
            latitude={popup.latitude}
            longitude={popup.longitude}
            onClose={() => setPopup(null)}
            closeButton={true}
            closeOnClick={false}
            className="custom-popup"
          >
            <div className="p-2 min-w-[200px]">
              {popup.data.nome && (
                <div className="font-semibold text-sm mb-1">{popup.data.nome}</div>
              )}
              {popup.data.tipo && (
                <Badge className="mb-2 text-xs">{popup.data.tipo}</Badge>
              )}
              {popup.data.status && (
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <Badge variant={popup.data.status === 'ativo' ? 'default' : 'secondary'}>
                      {popup.data.status}
                    </Badge>
                  </div>
                  {popup.data.velocidade !== undefined && (
                    <div className="flex justify-between">
                      <span>Velocidade:</span>
                      <span>{popup.data.velocidade.toFixed(0)} km/h</span>
                    </div>
                  )}
                  {popup.data.bateria !== undefined && (
                    <div className="flex justify-between">
                      <span>Bateria:</span>
                      <span>{popup.data.bateria.toFixed(0)}%</span>
                    </div>
                  )}
                </div>
              )}
              {popup.data.participantes && (
                <div className="text-xs mt-1">
                  Participantes: {popup.data.participantes.toLocaleString()}
                </div>
              )}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}

