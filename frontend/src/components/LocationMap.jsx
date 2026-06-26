import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { useEffect } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function CentralizarMapa({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) {
      map.setView([lat, lon], 10);
    }
  }, [lat, lon, map]);
  return null;
}

function CliqueNoMapa({ onCidade }) {
  const urlBase = import.meta.env.VITE_API_URL;

  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      try {
        const resposta = await fetch(
          `${urlBase}/api/reverseGeocoding?lat=${lat}&lon=${lng}`,
        );
        const dados = await resposta.json();
        if (dados.name) {
          onCidade(dados.name, lat, lng);
        }
      } catch (erro) {
        console.log('Erro ao buscar cidade:', erro);
      }
    },
  });
  return null;
}

export default function LocationMap({ coordenadas, setCity, setCoordenadas }) {
  return (
    <div className="h-24 sm:h-28 md:h-32 w-full rounded-lg mt-2 overflow-hidden border border-gray-200 isolation-blur relative z-0">
      <MapContainer
        center={coordenadas ? [coordenadas.lat, coordenadas.lon] : [-15, -50]}
        zoom={coordenadas ? 10 : 4}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        />
        {coordenadas && (
          <>
            <CentralizarMapa lat={coordenadas.lat} lon={coordenadas.lon} />
            <Marker position={[coordenadas.lat, coordenadas.lon]} />
          </>
        )}
        <CliqueNoMapa
          onCidade={(nome, lat, lng) => {
            setCity(nome);
            setCoordenadas({ lat, lon: lng });
          }}
        />
      </MapContainer>
    </div>
  );
}
