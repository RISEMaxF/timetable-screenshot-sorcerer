
import { Button } from "@/components/ui/button";
import { Check, Clock, LayoutGrid, Pencil } from "lucide-react";

interface BatchActionButtonsProps {
  selectedCount: number;
  onOpenDialog: (dialogType: string) => void;
}

const BatchActionButtons = ({ selectedCount, onOpenDialog }: BatchActionButtonsProps) => {
  if (selectedCount === 0) return null;
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
        {selectedCount} selected
      </span>
      
      <Button variant="outline" size="sm" onClick={() => onOpenDialog("track")}>
        <LayoutGrid className="h-4 w-4 mr-1" />
        Set Track
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => onOpenDialog("time")}>
        <Clock className="h-4 w-4 mr-1" />
        Set Time
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => onOpenDialog("completed")}>
        <Check className="h-4 w-4 mr-1" />
        Set Status
      </Button>
      
      <Button variant="outline" size="sm" onClick={() => onOpenDialog("notes")}>
        <Pencil className="h-4 w-4 mr-1" />
        Add Notes
      </Button>
    </div>
  );
};

export default BatchActionButtons;
