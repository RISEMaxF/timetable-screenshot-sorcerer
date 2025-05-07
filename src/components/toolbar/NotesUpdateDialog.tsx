
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Notes for {selectedCount} Trains</DialogTitle>
          <DialogDescription>
            This will add notes to all selected trains.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <textarea
            value={notesValue}
            onChange={(e) => setNotesValue(e.target.value)}
            placeholder="Enter notes here"
            className="w-full h-24 p-2 border rounded-md"
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

export default NotesUpdateDialog;
