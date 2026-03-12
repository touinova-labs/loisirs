'use client'

import React, { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

interface MapProps {
    lat?: number;
    lng?: number;
    showArea?: boolean; 
}

export default function Map({ lat = 48.8566, lng = 2.3522, showArea = true }: MapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<maplibregl.Map | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        // Initialisation de la carte
        mapInstance.current = new maplibregl.Map({
            container: mapContainer.current,
            style: `https://api.maptiler.com/maps/darkmatter/style.json?key=JlXNIrNe1UkHQBWYytZt`, 
            center: [lng, lat],
            zoom: showArea ? 13 : 15,
            attributionControl: false
        });

        const map = mapInstance.current;
        const accentGold = 'rgba(251, 191, 36, 0.8)';

        map.on('load', () => {
            if (showArea) {
                // --- MODE SECTEUR (CERCLE) ---
                map.addSource('circleData', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        geometry: { type: 'Point', coordinates: [lng, lat] },
                        properties: {}
                    }
                });

                map.addLayer({
                    id: 'circle-fill',
                    type: 'circle',
                    source: 'circleData',
                    paint: {
                        'circle-radius': 60, 
                        'circle-color': 'rgba(251, 191, 36, 0.8)',
                        'circle-opacity': 0.15,
                        'circle-stroke-width': 2,
                        'circle-stroke-color': 'rgba(251, 191, 36, 0.8)',
                        'circle-stroke-opacity': 0.4
                    }
                });

                map.addLayer({
                    id: 'circle-center',
                    type: 'circle',
                    source: 'circleData',
                    paint: {
                        'circle-radius': 4,
                        'circle-color': 'rgba(251, 191, 36, 0.8)',
                        'circle-opacity': 0.8
                    }
                });
            } else {
                // --- MODE PRÉCIS (PIN) ---
                new maplibregl.Marker({ color: "rgba(251, 191, 36, 0.8)" })
                    .setLngLat([lng, lat])
                    .addTo(map);
            }
        });

        return () => {
            map.remove();
        };
    }, [lat, lng, showArea]);

    return (
        <div className="relative w-full h-full group">
            {/* Overlay pour le look premium */}
            <div className="absolute inset-0 z-10 pointer-events-none ring-1 ring-inset ring-white/10 rounded-[2rem]" />
            <div ref={mapContainer} className="w-full h-full rounded-[2rem] grayscale-[0.6] contrast-[1.2] brightness-[0.8]" />

            {/* Badge de localisation dynamique */}
            <div className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 italic">
                    {showArea ? "Zone de l'expérience" : "Localisation exacte"}
                </p>
            </div>
        </div>
    );
}