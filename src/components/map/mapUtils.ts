import { Style, Stroke, Fill, Circle } from 'ol/style';
import { LineString, Point } from 'ol/geom';
import Feature from 'ol/Feature';
import { fromLonLat } from 'ol/proj';
import { Train } from '@/types/train';
import { Vector as VectorSource } from 'ol/source';
import { FeatureLike } from 'ol/Feature';

// Country-specific coordinates for trains
export const getTrainCoordinates = (): Record<string, {from: number[], to: number[]}> => ({
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
});

// Create features for a selected train
export const createTrainFeatures = (
  selectedTrain: Train | undefined, 
  trainCoordinates: Record<string, {from: number[], to: number[]}>,
  vectorSource: VectorSource
): void => {
  if (!selectedTrain || !selectedTrain.country) return;
  
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
};

// Style function for map features with dark mode support
export const getFeatureStyle = (feature: FeatureLike, isDarkMode: boolean): Style => {
  const id = feature.get('id') as string;
  
  if (id.endsWith('-start')) {
    // Style for departure station
    return new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: '#22c55e' // Green for departure
        }),
        stroke: new Stroke({
          color: isDarkMode ? '#1f2937' : '#ffffff',
          width: 3
        })
      })
    });
  } else if (id.endsWith('-end')) {
    // Style for arrival station
    return new Style({
      image: new Circle({
        radius: 8,
        fill: new Fill({
          color: '#ef4444' // Red for arrival
        }),
        stroke: new Stroke({
          color: isDarkMode ? '#1f2937' : '#ffffff',
          width: 3
        })
      })
    });
  } else {
    // Style for route lines - brighter colors for dark mode
    return new Style({
      stroke: new Stroke({
        color: isDarkMode ? '#60a5fa' : '#1e40af', // Brighter blue for dark mode
        width: 4,
        lineDash: undefined
      })
    });
  }
};

// Apply dark mode filter to map container
export const applyMapTheme = (mapContainer: HTMLElement, isDarkMode: boolean): void => {
  if (isDarkMode) {
    mapContainer.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.9) contrast(1.1)';
  } else {
    mapContainer.style.filter = '';
  }
};
