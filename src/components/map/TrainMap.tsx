
import React, { useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import 'ol/ol.css';
import { Train } from '@/types/train';
import MapLegend from './MapLegend';
import { getTrainCoordinates, createTrainFeatures, getFeatureStyle } from './mapUtils';

interface TrainMapProps {
  trains: Train[];
  selectedTrainId?: string;
}

const TrainMap: React.FC<TrainMapProps> = ({ trains, selectedTrainId }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  
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

    // Create vector layer for train routes
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: getFeatureStyle
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
        center: [15.5, 60.0], // Center on Nordic countries in WebMercator
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
  }, [trains, selectedTrainId]);

  return (
    <div className="flex flex-col">
      <div ref={mapRef} className="h-[600px] w-full rounded-lg border border-gray-200 shadow-inner" />
      <MapLegend selectedTrainId={selectedTrainId} />
    </div>
  );
};

export default TrainMap;
