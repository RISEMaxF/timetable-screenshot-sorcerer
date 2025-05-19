
import { Button } from "@/components/ui/button";
import { Check, Clock, LayoutGrid, Pencil, FileSpreadsheet } from "lucide-react";
import { Train } from "@/types/train";
import { exportTrainsToCSV } from "@/lib/utils";

interface BatchActionButtonsProps {
  selectedCount: number;
  onOpenDialog: (dialogType: string) => void;
  selectedTrains?: Train[]; // Add this prop to access the selected trains
}

const BatchActionButtons = ({ 
  selectedCount, 
  onOpenDialog, 
  selectedTrains = [] 
}: BatchActionButtonsProps) => {
  if (selectedCount === 0) return null;
  
  const handleExport = () => {
    if (selectedTrains.length > 0) {
      exportTrainsToCSV(selectedTrains, `train-export-${new Date().toISOString().slice(0,10)}.csv`);
    }
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
        {selectedCount} valda
      </span>
      
      <Button variant="outline" size="sm" onClick={() => onOpenDialog("track")}>
        <LayoutGrid className="h-4 w-4 mr-1" />
        Ange spår
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => onOpenDialog("time")}>
        <Clock className="h-4 w-4 mr-1" />
        Ange tid
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => onOpenDialog("completed")}>
        <Check className="h-4 w-4 mr-1" />
        Ange status
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => onOpenDialog("notes")}>
        <Pencil className="h-4 w-4 mr-1" />
        Lägg till anteckningar
      </Button>

      <Button variant="outline" size="sm" onClick={handleExport}>
        <FileSpreadsheet className="h-4 w-4 mr-1" />
        Exportera valda rader
      </Button>
    </div>
  );
};

export default BatchActionButtons;
