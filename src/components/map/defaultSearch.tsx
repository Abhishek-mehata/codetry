import { FC, ReactNode } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

interface MapProps {
  center: [number, number]; // Tuple for Leaflet (lat, lng)
  children: ReactNode;
}

const defaultSearch: FC<MapProps> = ({ center, children }) => {
  return (
    <MapContainer
      zoom={5}
      center={center}
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

export default defaultSearch;