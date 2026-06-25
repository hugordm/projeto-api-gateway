import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Mapa() {
  const [clima, setClima] = useState(null);
  const [posicao, setPosicao] = useState(null);

  function CliqueNoMapa() {
    useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;
        setPosicao([lat, lng]);

        try {
          const resposta = await fetch(
            `http://localhost:8000/api/clima?lat=${lat}&lon=${lng}`,
          );
          const dados = await resposta.json();
          setClima(dados.dados);
        } catch (erro) {
          console.log("Erro ao buscar dados do clima:", erro);
        }
      },
    });
    return posicao ? <Marker position={posicao} /> : null;
  }
  return(
    <div className="flex gap-5 p-5">

        {/*Container do Mapa*/}
        <MapContainer center={[-15, -50]} zoom={4} className="h-96 w-3/4">
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution= '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        />
        <CliqueNoMapa/>
        </MapContainer>

        <div className="w-1/2 border border-solid border-gray-300 p-4 rounder-lg">
        <h3>Dados Meteorológicos</h3>
        {clima ? (
            <div>
            <p><strong>🌡️ Temperatura Atual:</strong> {clima.atual.temperatura}°C</p>
            <p><strong>💧 Umidade:</strong> {clima.atual.umidade}%</p>
            <p><strong>💨 Vento:</strong> {clima.atual.vento} km/h</p>
            <h4>🔮 Previsão para Amanhã</h4>
            <p>📈 Mín: {clima.previsao.min}°C | Max: {clima.previsao.max}°C</p>
          </div>
        ) : (
            <p>Clique em qualquer lugar no mapa para carregar as informações.</p>
        )}
        </div>
    </div>
  );
}
