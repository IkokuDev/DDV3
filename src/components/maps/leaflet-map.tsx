
"use client";

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type LType from 'leaflet';
import { cn } from "@/lib/utils"; // Import cn utility

// Flag to ensure icon fix runs only once per application lifecycle
let leafletIconsFixed = false;

const ChangeView = ({ center, zoom }: { center: LType.LatLngExpression, zoom: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export interface MapMarker {
  position: LType.LatLngExpression;
  popupContent?: React.ReactNode;
  iconUrl?: string;
  iconSize?: [number, number];
}

interface LeafletMapProps {
  center: LType.LatLngExpression;
  zoom?: number;
  markers?: MapMarker[];
  style?: React.CSSProperties;
  className?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  center,
  zoom = 13,
  markers = [],
  style = { height: '400px', width: '100%' }, // Default style
  className,
}) => {
  const [L, setL] = useState<typeof LType | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).L) {
      const LInstance = (window as any).L as typeof LType;
      
      if (!leafletIconsFixed) {
        // Fix for default Leaflet marker icons not showing up
        // @ts-ignore
        delete LInstance.Icon.Default.prototype._getIconUrl;
        LInstance.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });
        leafletIconsFixed = true;
      }
      setL(LInstance);
    } else if (typeof window !== 'undefined') {
      // This console.error indicates a problem with Leaflet loading, separate from the re-initialization error
      console.error("Leaflet 'L' object not found on window. Ensure 'react-leaflet' and 'leaflet' are correctly installed and loaded.");
    }
  }, []); // Empty dependency array means this runs once after initial render (or twice in Strict Mode)

  if (!L) {
    // This placeholder is shown if L hasn't been set yet (e.g., Leaflet library not loaded)
    return (
      <div
        style={style} // Apply provided style to the placeholder
        className={cn(className, "flex items-center justify-center bg-muted")}
      >
        <p>Map library (L) not available...</p>
      </div>
    );
  }

  // The MapContainer should be rendered only once L is available.
  // The outer div takes the passed style and className, and MapContainer fills this div.
  return (
    <div style={style} className={className}>
      <MapContainer center={center} zoom={zoom} style={{ height: "100%", width: "100%" }} >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => {
          let customIcon: LType.Icon | undefined;
          if (marker.iconUrl && marker.iconSize && L) { // Ensure L is available for icon creation
            customIcon = new L.Icon({
              iconUrl: marker.iconUrl,
              iconSize: marker.iconSize,
              iconAnchor: [marker.iconSize[0] / 2, marker.iconSize[1]],
              popupAnchor: [0, -marker.iconSize[1]]
            });
          }
          return (
            <Marker key={index} position={marker.position} icon={customIcon || new L.Icon.Default()}>
              {marker.popupContent && <Popup>{marker.popupContent}</Popup>}
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
