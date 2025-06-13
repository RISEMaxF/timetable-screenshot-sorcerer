
import React, { useEffect, useRef } from 'react';
import { X, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Train } from '@/types/train';
import MapLegend from './MapLegend';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import 'ol/ol.css';
import { getTrainCoordinates, createTrainFeatures, getFeatureStyle } from './mapUtils';

interface MapTheaterModeProps {
  isOpen: boolean;
  onClose: () => void;
  trains: Train[];
  selectedTrainId?: string;
}

const MapTheaterMode: React.FC<MapTheaterModeProps> = ({ 
  isOpen, 
  onClose, 
  trains, 
  selectedTrainId 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  
  useEffect(() => {
    if (!isOpen || !mapRef.current) return;
    
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
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: nordicCenter,
        zoom: 5,
        projection: 'EPSG:3857'
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
  }, [isOpen, trains, selectedTrainId]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] bg-card rounded-lg shadow-xl flex flex-col border border-border">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-xl font-bold flex items-center gap-2 text-card-foreground">
            <MapIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Tågkarta
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="rounded-full hover:bg-accent"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex-1 p-4 overflow-hidden">
          <div 
            ref={mapRef} 
            className="w-full h-full rounded-lg border border-border shadow-inner bg-muted/30" 
          />
        </div>
        
        <div className="p-4 border-t border-border">
          <MapLegend selectedTrainId={selectedTrainId} />
        </div>
      </div>
    </div>
  );
};

export default MapTheaterMode;
