"use client";

import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

type LatLngTuple = [number, number];

interface MapComponentProps {
  route: LatLngTuple[];
}

export default function MapComponent({ route }: MapComponentProps) {
  useEffect(() => {
    // Fix para íconos de Leaflet (Next.js no encuentra las rutas por defecto)
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    });
  }, []);

  // Evitar errores si no hay coordenadas
  if (!route || route.length === 0) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-200 rounded-2xl">
        <p className="text-gray-500">No route data available</p>
      </div>
    );
  }

  const positionStart = route[0];
  const positionEnd = route[route.length - 1];

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-inner">
      <MapContainer
        center={positionStart}
        zoom={15}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Ruta en amarillo */}
        <Polyline positions={route} pathOptions={{ color: "#f59e0b", weight: 5, opacity: 0.9 }} />

        {/* Marcadores de inicio y fin */}
        <Marker position={positionStart}></Marker>
        <Marker position={positionEnd}></Marker>
      </MapContainer>
    </div>
  );
}
