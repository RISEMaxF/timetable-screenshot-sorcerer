
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
      <DialogContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Set Status for {selectedCount} Trains</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Mark all selected trains as completed or pending.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 flex gap-4">
          <Button 
            variant={statusValue === true ? "default" : "outline"}
            className={`flex-1 ${
              statusValue === true 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => setStatusValue(true)}
          >
            Mark as Completed
          </Button>
          <Button 
            variant={statusValue === false ? "default" : "outline"}
            className={`flex-1 ${
              statusValue === false 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
            onClick={() => setStatusValue(false)}
          >
            Mark as Pending
          </Button>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</Button>
          <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700 text-white">Apply to Selected</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusUpdateDialog;
