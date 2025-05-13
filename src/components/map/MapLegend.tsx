
import React from 'react';

interface MapLegendProps {
  selectedTrainId?: string;
}

const MapLegend: React.FC<MapLegendProps> = ({ selectedTrainId }) => {
  return (
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
  );
};

export default MapLegend;
