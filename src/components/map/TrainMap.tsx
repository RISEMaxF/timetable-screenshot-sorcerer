
import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import 'ol/ol.css';
import { Train } from '@/types/train';
import MapLegend from './MapLegend';
import { getTrainCoordinates, createTrainFeatures, getFeatureStyle } from './mapUtils';
import { Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MapTheaterMode from './MapTheaterMode';
import { fromLonLat } from 'ol/proj';

interface TrainMapProps {
  trains: Train[];
  selectedTrainId?: string;
  height?: string;
}

const TrainMap: React.FC<TrainMapProps> = ({ trains, selectedTrainId, height = '600px' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  
  useEffect(() => {
    if (!mapRef.current) return;

    // Create vector source for train routes
    const vectorSource = new VectorSource();
    
    // Add routes only for the selected train
    if (selectedTrainId) {
      // Find the selected train
      const selectedTrain = trains.find(train => train.id === selectedTrainId);
      const trainCoordinates = getTrainCoordinates();
      
      // Create features for the selected train
      createTrainFeatures(selectedTrain, trainCoordinates, vectorSource);
    }

    // Create OSM tile layer with dark mode styling
    const isDarkMode = document.documentElement.classList.contains('dark');
    const osmLayer = new TileLayer({
      source: new OSM()
    });

    // Apply dark mode filter to OSM tiles
    if (isDarkMode) {
      const canvas = osmLayer.getRenderer()?.getImage?.() as HTMLCanvasElement;
      if (canvas) {
        canvas.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.8) contrast(1.2)';
      }
    }

    // Create vector layer for train routes
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: getFeatureStyle
    });

    // Nordic countries center coordinates (approximate: Sweden, Norway, Finland, Denmark)
    const nordicCenter = fromLonLat([15.0, 62.0]);

    // Create map with OSM layer and vector layer
    const map = new Map({
      target: mapRef.current,
      layers: [
        osmLayer,
        vectorLayer
      ],
      view: new View({
        center: nordicCenter,
        zoom: 5,
        projection: 'EPSG:3857'
      })
    });

    // Apply dark mode styles to map container
    if (isDarkMode && mapRef.current) {
      mapRef.current.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.9) contrast(1.1)';
    }

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
  }, [trains, selectedTrainId]);

  const toggleTheaterMode = () => {
    setIsTheaterMode(prev => !prev);
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <div 
          ref={mapRef} 
          className="w-full rounded-lg border border-border shadow-inner bg-muted/30" 
          style={{ height }}
        />
        <Button 
          variant="outline"
          className="absolute top-3 right-3 bg-background hover:bg-accent z-10 rounded-full p-2 shadow-md border-border"
          onClick={toggleTheaterMode}
          title="Förstora kartan"
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      
      {!isTheaterMode && <MapLegend selectedTrainId={selectedTrainId} />}
      
      <MapTheaterMode 
        isOpen={isTheaterMode}
        onClose={() => setIsTheaterMode(false)}
        trains={trains}
        selectedTrainId={selectedTrainId}
      />
    </div>
  );
};

export default TrainMap;
