
"use client";

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type LType from 'leaflet';
import { cn } from "@/lib/utils";

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

// Define default style outside the component to ensure stable reference
const defaultMapStyle: React.CSSProperties = { height: '400px', width: '100%' };

const LeafletMap: React.FC<LeafletMapProps> = ({
  center,
  zoom = 13,
  markers = [],
  style = defaultMapStyle,
  className,
}) => {
  const [L, setL] = useState<typeof LType | null>(null);
  const mapRef = useRef<LType.Map | null>(null);

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
      console.error("Leaflet 'L' object not found on window. Ensure 'react-leaflet' and 'leaflet' are correctly installed and loaded, or that leaflet.css is properly linked if using CDN for core Leaflet JS too.");
    }
  }, []);

  useEffect(() => {
    // Cleanup function to remove the map instance
    return () => {
      if (mapRef.current) {
        const mapInstance = mapRef.current;
        // Get the container before removing the map, as getContainer might not work after remove()
        const container = mapInstance.getContainer(); 
        
        mapInstance.off(); // Remove all event listeners from the map
        mapInstance.remove(); // Remove the map from the DOM and invalidate its container
        mapRef.current = null; // Clear the ref

        // After removing, explicitly try to clear Leaflet's internal ID from the container
        if (container && (container as any)._leaflet_id) {
          (container as any)._leaflet_id = null;
        }
      }
    };
  }, []); // Empty dependency array ensures this runs on unmount

  if (!L) {
    return (
      <div
        style={style}
        className={cn("leaflet-map-wrapper flex items-center justify-center bg-muted", className)}
      >
        <p>Loading map library (L)...</p>
      </div>
    );
  }

  return (
    <div style={style} className={cn("leaflet-map-wrapper", className)}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(instance) => {
          mapRef.current = instance;
        }}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((marker, index) => {
          let customIcon: LType.Icon | undefined;
          if (marker.iconUrl && marker.iconSize && L) {
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
