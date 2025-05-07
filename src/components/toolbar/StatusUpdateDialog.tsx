
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StatusUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onUpdate: (value: boolean) => void;
}

const StatusUpdateDialog = ({ isOpen, onClose, selectedCount, onUpdate }: StatusUpdateDialogProps) => {
  const [statusValue, setStatusValue] = useState<boolean | undefined>(undefined);

  const handleUpdate = () => {
    if (statusValue !== undefined) {
      onUpdate(statusValue);
      setStatusValue(undefined);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Status for {selectedCount} Trains</DialogTitle>
          <DialogDescription>
            Mark all selected trains as completed or pending.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex gap-4">
          <Button 
            variant={statusValue === true ? "default" : "outline"}
            className="flex-1"
            onClick={() => setStatusValue(true)}
          >
            Mark as Completed
          </Button>
          <Button 
            variant={statusValue === false ? "default" : "outline"}
            className="flex-1"
            onClick={() => setStatusValue(false)}
          >
            Mark as Pending
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Apply to Selected</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateDialog;
