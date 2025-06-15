
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

interface NotesUpdateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCount: number;
  onUpdate: (value: string) => void;
}

const NotesUpdateDialog = ({ isOpen, onClose, selectedCount, onUpdate }: NotesUpdateDialogProps) => {
  const [notesValue, setNotesValue] = useState("");

  const handleUpdate = () => {
    onUpdate(notesValue);
    setNotesValue("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">Add Notes for {selectedCount} Trains</DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            This will add notes to all selected trains.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <textarea
            value={notesValue}
            onChange={(e) => setNotesValue(e.target.value)}
            placeholder="Enter notes here"
            className="w-full h-24 p-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

export default NotesUpdateDialog;
