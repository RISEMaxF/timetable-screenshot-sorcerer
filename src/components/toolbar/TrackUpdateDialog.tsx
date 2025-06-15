
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
      <DialogContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Set Track for {selectedCount} Trains</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            This will update the track for all selected trains.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Input 
            value={trackValue} 
            onChange={(e) => setTrackValue(e.target.value)}
            placeholder="Enter track number"
            className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</Button>
          <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white">Apply to Selected</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrackUpdateDialog;
