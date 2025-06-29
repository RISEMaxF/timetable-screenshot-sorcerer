
import React from 'react';

interface MapLegendProps {
  selectedTrainId?: string;
}

const MapLegend: React.FC<MapLegendProps> = ({ selectedTrainId }) => {
  return (
    <div className="mt-3 p-3 bg-card rounded-lg border border-border shadow-sm">
      <h3 className="text-sm font-medium text-card-foreground mb-3">Kartförklaring</h3>
      <div className="grid grid-cols-1 gap-2">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-blue-700 dark:bg-blue-400"></div>
          <span className="text-xs text-muted-foreground">Tågrutt</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white dark:bg-gray-900"></div>
          </div>
          <span className="text-xs text-muted-foreground">Avgångsstation</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white dark:bg-gray-900"></div>
          </div>
          <span className="text-xs text-muted-foreground">Ankomststation</span>
        </div>
        {!selectedTrainId && (
          <div className="text-xs text-muted-foreground italic mt-2 border-t border-border pt-2">
            Välj ett tåg för att visa dess rutt
          </div>
        )}
      </div>
    </div>
  );
};

export default MapLegend;
