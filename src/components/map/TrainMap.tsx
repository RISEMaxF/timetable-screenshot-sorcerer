
import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import 'ol/ol.css';
import { Train } from '@/types/train';
import MapLegend from './MapLegend';
import { getTrainCoordinates, createTrainFeatures, getFeatureStyle, applyMapTheme } from './mapUtils';
import { Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MapTheaterMode from './MapTheaterMode';
import { fromLonLat } from 'ol/proj';
import { useTheme } from '../ThemeProvider';

interface TrainMapProps {
  trains: Train[];
  selectedTrainId?: string;
  height?: string;
}

const TrainMap: React.FC<TrainMapProps> = ({ trains, selectedTrainId, height = '600px' }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const { theme } = useTheme();
  
  const isDarkMode = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
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

    // Create OSM tile layer
    const osmLayer = new TileLayer({
      source: new OSM()
    });

    // Create vector layer for train routes with theme-aware styling
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: (feature) => getFeatureStyle(feature, isDarkMode)
    });

    vectorLayerRef.current = vectorLayer;

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

    // Apply theme to map container
    applyMapTheme(mapRef.current, isDarkMode);

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
  }, [trains, selectedTrainId, isDarkMode]);

  // Update map theme when theme changes
  useEffect(() => {
    if (mapRef.current) {
      applyMapTheme(mapRef.current, isDarkMode);
    }
    
    // Update vector layer styling when theme changes
    if (vectorLayerRef.current) {
      vectorLayerRef.current.setStyle((feature) => getFeatureStyle(feature, isDarkMode));
    }
  }, [isDarkMode]);

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
