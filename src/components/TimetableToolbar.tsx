
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Train } from "@/types/train";
import BatchActionButtons from "./toolbar/BatchActionButtons";
import TrackUpdateDialog from "./toolbar/TrackUpdateDialog";
import TimeUpdateDialog from "./toolbar/TimeUpdateDialog";
import StatusUpdateDialog from "./toolbar/StatusUpdateDialog";
import NotesUpdateDialog from "./toolbar/NotesUpdateDialog";
import DateSelector from "./toolbar/DateSelector";

interface TimetableToolbarProps {
  location: string;
  setLocation: (location: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  selectedCount?: number;
  onBatchUpdate?: (field: keyof Train, value: any) => void;
}

export function TimetableToolbar({ 
  location, 
  setLocation, 
  date, 
  setDate,
  selectedCount = 0,
  onBatchUpdate
}: TimetableToolbarProps) {
  const [openDialog, setOpenDialog] = useState("");

  const handleOpenDialog = (dialogType: string) => {
    setOpenDialog(dialogType);
  };

  const handleCloseDialog = () => {
    setOpenDialog("");
  };

  const handleBatchTrackUpdate = (value: string) => {
    if (onBatchUpdate) {
      onBatchUpdate("track", value);
    }
  };

  const handleBatchTimeUpdate = (value: string) => {
    if (onBatchUpdate) {
      onBatchUpdate("arrivalTime", value);
    }
  };

  const handleBatchStatusUpdate = (value: boolean) => {
    if (onBatchUpdate) {
      onBatchUpdate("completed", value);
    }
  };

  const handleBatchNotesUpdate = (value: string) => {
    if (onBatchUpdate) {
      onBatchUpdate("notes", value);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 border-b border-gray-200">
      <div className="w-full sm:w-auto">
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2 justify-between">
        <DateSelector date={date} setDate={setDate} />
        
        <BatchActionButtons 
          selectedCount={selectedCount} 
          onOpenDialog={handleOpenDialog} 
        />
      </div>

      {/* Dialogs */}
      <TrackUpdateDialog
        isOpen={openDialog === "track"}
        onClose={handleCloseDialog}
        selectedCount={selectedCount}
        onUpdate={handleBatchTrackUpdate}
      />
      
      <TimeUpdateDialog
        isOpen={openDialog === "time"}
        onClose={handleCloseDialog}
        selectedCount={selectedCount}
        onUpdate={handleBatchTimeUpdate}
      />
      
      <StatusUpdateDialog
        isOpen={openDialog === "completed"}
        onClose={handleCloseDialog}
        selectedCount={selectedCount}
        onUpdate={handleBatchStatusUpdate}
      />
      
      <NotesUpdateDialog
        isOpen={openDialog === "notes"}
        onClose={handleCloseDialog}
        selectedCount={selectedCount}
        onUpdate={handleBatchNotesUpdate}
      />
    </div>
  );
}
