import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function Mapa() {
  return (
    <div className="flex gap-5 p-5">
      <MapContainer center={[-15, -50]} zoom={4} className="h-96 w-3/4">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
        />
      </MapContainer>
    </div>
  );
}
