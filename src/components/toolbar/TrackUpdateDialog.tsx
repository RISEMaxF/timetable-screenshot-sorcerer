
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
import { Train } from "@/types/train";

interface TrackUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onUpdate: (value: string) => void;
}

const TrackUpdateDialog = ({ isOpen, onClose, selectedCount, onUpdate }: TrackUpdateDialogProps) => {
  const [trackValue, setTrackValue] = useState("");

  const handleUpdate = () => {
    if (trackValue) {
      onUpdate(trackValue);
      setTrackValue("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Track for {selectedCount} Trains</DialogTitle>
          <DialogDescription>
            This will update the track for all selected trains.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input 
            value={trackValue} 
            onChange={(e) => setTrackValue(e.target.value)}
            placeholder="Enter track number"
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

export default TrackUpdateDialog;
