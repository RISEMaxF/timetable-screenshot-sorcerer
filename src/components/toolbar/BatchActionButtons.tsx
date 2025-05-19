
import { Button } from "@/components/ui/button";
import { Pencil, FileSpreadsheet, Bookmark } from "lucide-react";
import { Train } from "@/types/train";
import { exportTrainsToCSV } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface BatchActionButtonsProps {
  selectedCount: number;
  onOpenDialog: (dialogType: string) => void;
  selectedTrains?: Train[];
}

const BatchActionButtons = ({ 
  selectedCount, 
  onOpenDialog, 
  selectedTrains = [] 
}: BatchActionButtonsProps) => {
  const [favoritedTrains, setFavoritedTrains] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  
  if (selectedCount === 0) return null;
  
  const handleExport = () => {
    if (selectedTrains.length > 0) {
      exportTrainsToCSV(selectedTrains, `tåg-export-${new Date().toISOString().slice(0,10)}.csv`);
      toast({
        title: "Export slutförd",
        description: `${selectedTrains.length} tåg exporterade till CSV`,
      });
    }
  };

  const handleAddToFavorites = () => {
    // Get IDs of selected trains
    const selectedIds = selectedTrains.map(train => train.id);
    
    // Update favorites list
    const updatedFavorites = new Set(favoritedTrains);
    let addedCount = 0;
    
    selectedIds.forEach(id => {
      if (!updatedFavorites.has(id)) {
        updatedFavorites.add(id);
        addedCount++;
      }
    });
    
    setFavoritedTrains(updatedFavorites);
    
    // Show success message
    toast({
      title: "Tillagda i favoriter",
      description: `${addedCount} tåg tillagda i favoriter`,
    });
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
        {selectedCount} valda
      </span>
      
      <Button variant="outline" size="sm" onClick={() => onOpenDialog("notes")}>
        <Pencil className="h-4 w-4 mr-1" />
        Lägg till anteckningar
      </Button>

      <Button variant="outline" size="sm" onClick={handleExport}>
        <FileSpreadsheet className="h-4 w-4 mr-1" />
        Exportera
      </Button>

      <Button variant="outline" size="sm" onClick={handleAddToFavorites}>
        <Bookmark className="h-4 w-4 mr-1" />
        Lägg till i favoriter
      </Button>
    </div>
  );
};

export default BatchActionButtons;
