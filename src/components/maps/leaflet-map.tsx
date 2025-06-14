
"use client";

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
// Note: 'leaflet/dist/leaflet.css' is now imported via CDN in layout.tsx

// Custom hook to handle map view changes if needed, e.g. recentering
const ChangeView = ({ center, zoom }: { center: L.LatLngExpression, zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export interface MapMarker {
  position: L.LatLngExpression;
  popupContent?: React.ReactNode;
  iconUrl?: string; // Optional custom icon URL
  iconSize?: [number, number]; // Optional custom icon size [width, height]
}

interface LeafletMapProps {
  center: L.LatLngExpression;
  zoom?: number;
  markers?: MapMarker[];
  style?: React.CSSProperties;
  className?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  center,
  zoom = 13,
  markers = [],
  style = { height: '400px', width: '100%' },
  className,
}) => {

  // This effect runs once on the client after mount to fix potential icon path issues.
  useEffect(() => {
    // @ts-ignore
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer center={center} zoom={zoom} style={style} className={className}>
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers.map((marker, index) => {
        let customIcon;
        if (marker.iconUrl && marker.iconSize) {
          customIcon = new L.Icon({
            iconUrl: marker.iconUrl,
            iconSize: marker.iconSize,
            iconAnchor: [marker.iconSize[0] / 2, marker.iconSize[1]], // Point of the icon which will correspond to marker's location
            popupAnchor: [0, -marker.iconSize[1]] // Point from which the popup should open relative to the iconAnchor
          });
        }
        return (
          <Marker key={index} position={marker.position} icon={customIcon || undefined /* L.Icon.Default is used if undefined */}>
            {marker.popupContent && <Popup>{marker.popupContent}</Popup>}
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default LeafletMap;
