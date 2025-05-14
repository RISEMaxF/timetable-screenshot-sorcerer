
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TrainMap from './TrainMap';
import { Train } from '@/types/train';
import MapLegend from './MapLegend';

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
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4 md:p-8">
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h2 className="text-xl font-bold">Tågkarta</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <div className="flex-1 p-4 overflow-hidden">
          <TrainMap 
            trains={trains} 
            selectedTrainId={selectedTrainId} 
            height="100%" 
          />
        </div>
        
        <div className="p-4 border-t border-gray-200">
          <MapLegend selectedTrainId={selectedTrainId} />
        </div>
      </div>
    </div>
  );
};

export default MapTheaterMode;
