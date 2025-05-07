import React, { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Style, Stroke, Fill, Circle } from 'ol/style';
import { LineString, Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { Train } from '@/types/train';

interface TrainMapProps {
  trains: Train[];
  selectedTrainId?: string;
}

const TrainMap: React.FC<TrainMapProps> = ({ trains, selectedTrainId }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;

    // Sample train coordinates in Sweden (major cities)
    const trainLocations = {
      // Stockholm
      "90817": { from: [18.0686, 59.3293], to: [16.5528, 59.6173] }, 
      // Göteborg-Malmö
      "99402": { from: [11.9746, 57.7089], to: [13.0359, 55.6050] },
      // Uppsala-Stockholm
      "90703": { from: [17.6389, 59.8586], to: [18.0686, 59.3293] },
      // Stockholm-Linköping
      "90785": { from: [18.0686, 59.3293], to: [15.6195, 58.4158] },
      // Sundsvall-Umeå
      "90620": { from: [17.3063, 62.3908], to: [20.2597, 63.8258] },
      // Default for other trains
      "default": { from: [15.2066, 59.2747], to: [16.1924, 58.5877] }
    };

    // Create vector source for train routes
    const vectorSource = new VectorSource();
    
    // Add routes for each train
    trains.forEach(train => {
      const locations = trainLocations[train.id as keyof typeof trainLocations] || trainLocations.default;
      
      // Create route as LineString feature
      const routeFeature = new Feature({
        geometry: new LineString([
          fromLonLat(locations.from),
          fromLonLat(locations.to)
        ]),
        id: train.id,
        name: `Train ${train.id}`
      });

      // Create start point
      const startFeature = new Feature({
        geometry: new Point(fromLonLat(locations.from)),
        id: `${train.id}-start`,
        name: `Start of train ${train.id}`
      });
      
      // Create end point
      const endFeature = new Feature({
        geometry: new Point(fromLonLat(locations.to)),
        id: `${train.id}-end`,
        name: `End of train ${train.id}`
      });

      vectorSource.addFeature(routeFeature);
      vectorSource.addFeature(startFeature);
      vectorSource.addFeature(endFeature);
    });

    // Create vector layer for train routes
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const id = feature.get('id') as string;
        const isSelected = id.includes(selectedTrainId || '');
        
        if (id.endsWith('-start') || id.endsWith('-end')) {
          // Style for station points
          return new Style({
            image: new Circle({
              radius: 5,
              fill: new Fill({
                color: isSelected ? '#1e40af' : '#404040'
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 2
              })
            })
          });
        } else {
          // Style for route lines
          return new Style({
            stroke: new Stroke({
              color: isSelected ? '#1e40af' : '#666666',
              width: isSelected ? 3 : 2
            })
          });
        }
      }
    });

    // Create map with OSM layer and vector layer
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([15.5, 60.0]), // Center of Sweden approximately
        zoom: 5
      })
    });

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [trains, selectedTrainId]);

  return (
    <div ref={mapRef} className="h-full w-full rounded-lg border border-gray-200 shadow-inner" />
  );
};

export default TrainMap;
