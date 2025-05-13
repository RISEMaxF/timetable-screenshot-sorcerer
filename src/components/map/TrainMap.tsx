
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
import { Circle as LucideCircle, Square, Layers, MapPin } from 'lucide-react';

interface TrainMapProps {
  trains: Train[];
  selectedTrainId?: string;
}

const TrainMap: React.FC<TrainMapProps> = ({ trains, selectedTrainId }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  
  useEffect(() => {
    if (!mapRef.current) return;

    // Country-specific coordinates for trains
    const trainCoordinates: Record<string, {from: number[], to: number[]}> = {
      // Sweden (around Stockholm, Gothenburg, Malmö)
      "SE": { from: [18.0686, 59.3293], to: [12.9814, 57.7089] },
      // Denmark (around Copenhagen, Aarhus)
      "DK": { from: [12.5683, 55.6761], to: [10.2039, 56.1629] },
      // Finland (around Helsinki, Tampere)
      "FI": { from: [24.9384, 60.1699], to: [23.7610, 61.4978] },
      // Norway (around Oslo, Bergen)
      "NO": { from: [10.7522, 59.9139], to: [5.3221, 60.3913] },
      // Default if no country is specified
      "default": { from: [15.2066, 59.2747], to: [16.1924, 58.5877] }
    };

    // Create vector source for train routes
    const vectorSource = new VectorSource();
    
    // Add routes only for the selected train or show a placeholder if no train is selected
    if (selectedTrainId) {
      // Find the selected train
      const selectedTrain = trains.find(train => train.id === selectedTrainId);
      
      if (selectedTrain && selectedTrain.country) {
        const coordinates = trainCoordinates[selectedTrain.country] || trainCoordinates.default;
        
        // Add small random offsets to make points slightly different
        const fromLon = coordinates.from[0] + (Math.random() - 0.5) * 0.5;
        const fromLat = coordinates.from[1] + (Math.random() - 0.5) * 0.5;
        const toLon = coordinates.to[0] + (Math.random() - 0.5) * 0.5;
        const toLat = coordinates.to[1] + (Math.random() - 0.5) * 0.5;
        
        // Create route as LineString feature
        const routeFeature = new Feature({
          geometry: new LineString([
            fromLonLat([fromLon, fromLat]),
            fromLonLat([toLon, toLat])
          ]),
          id: selectedTrain.id,
          name: `Train ${selectedTrain.id}`
        });

        // Create start point
        const startFeature = new Feature({
          geometry: new Point(fromLonLat([fromLon, fromLat])),
          id: `${selectedTrain.id}-start`,
          name: `Start of train ${selectedTrain.id} (${selectedTrain.from})`
        });
        
        // Create end point
        const endFeature = new Feature({
          geometry: new Point(fromLonLat([toLon, toLat])),
          id: `${selectedTrain.id}-end`,
          name: `End of train ${selectedTrain.id} (${selectedTrain.to})`
        });

        vectorSource.addFeature(routeFeature);
        vectorSource.addFeature(startFeature);
        vectorSource.addFeature(endFeature);
      }
    } else {
      // If no train is selected, we can add a placeholder or leave the map empty
      // Here we choose to leave it empty
    }

    // Create vector layer for train routes
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => {
        const id = feature.get('id') as string;
        
        if (id.endsWith('-start')) {
          // Style for departure station
          return new Style({
            image: new Circle({
              radius: 6,
              fill: new Fill({
                color: '#22c55e' // Green for departure
              }),
              stroke: new Stroke({
                color: '#ffffff',
                width: 2
              })
            })
          });
        } else if (id.endsWith('-end')) {
          // Style for arrival station
          return new Style({
            image: new Circle({
              radius: 6,
              fill: new Fill({
                color: '#ef4444' // Red for arrival
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
              color: '#1e40af',
              width: 3
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
        center: fromLonLat([15.5, 60.0]), // Center on Nordic countries
        zoom: 5
      })
    });

    // Fit view to the route if a train is selected
    if (selectedTrainId && vectorSource.getFeatures().length > 0) {
      const extent = vectorSource.getExtent();
      map.getView().fit(extent, {
        padding: [50, 50, 50, 50],
        maxZoom: 10
      });
    }

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [trains, selectedTrainId]); // Re-run effect when selectedTrainId changes

  return (
    <div className="flex flex-col">
      <div ref={mapRef} className="h-[600px] w-full rounded-lg border border-gray-200 shadow-inner" />
      
      <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Kartförklaring</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-blue-700"></div>
            <span className="text-xs text-gray-600">Tågrutt</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <span className="text-xs text-gray-600">Avgångsstation</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <span className="text-xs text-gray-600">Ankomststation</span>
          </div>
          {!selectedTrainId && (
            <div className="col-span-2 text-xs text-gray-500 italic">
              Välj ett tåg för att visa dess rutt
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainMap;
