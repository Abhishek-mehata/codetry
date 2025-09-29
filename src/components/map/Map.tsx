import { FC, ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface MapProps {
  center: [number, number]; // Tuple for Leaflet (lat, lng)
  children: ReactNode;
  zoom?: number;
}

const Map: FC<MapProps> = ({ center, children, zoom = 10 }) => {
  return (
    <MapContainer
      zoom={zoom}
      center={center||[51.505, -0.09]}
      scrollWheelZoom={true}
      doubleClickZoom={true}
      zoomControl={true}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      {children}
    </MapContainer>
  );
};

export default Map;
