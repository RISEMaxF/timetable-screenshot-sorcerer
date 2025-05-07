
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TimeUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onUpdate: (value: string) => void;
}

const TimeUpdateDialog = ({ isOpen, onClose, selectedCount, onUpdate }: TimeUpdateDialogProps) => {
  const [timeValue, setTimeValue] = useState("");

  const handleUpdate = () => {
    if (timeValue) {
      onUpdate(timeValue);
      setTimeValue("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Time for {selectedCount} Trains</DialogTitle>
          <DialogDescription>
            This will update the arrival time for all selected trains.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input 
            value={timeValue} 
            onChange={(e) => setTimeValue(e.target.value)}
            placeholder="HH:MM format"
            className="w-full"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Apply to Selected</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TimeUpdateDialog;
