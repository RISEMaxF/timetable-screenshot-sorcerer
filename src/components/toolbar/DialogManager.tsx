
import { Train } from "@/types/train";
import TrackUpdateDialog from "./TrackUpdateDialog";
import TimeUpdateDialog from "./TimeUpdateDialog";
import StatusUpdateDialog from "./StatusUpdateDialog";
import NotesUpdateDialog from "./NotesUpdateDialog";

interface DialogManagerProps {
  openDialog: string;
  onCloseDialog: () => void;
  selectedCount: number;
  onBatchTrackUpdate: (value: string) => void;
  onBatchTimeUpdate: (value: string) => void;
  onBatchStatusUpdate: (value: boolean) => void;
  onBatchNotesUpdate: (value: string) => void;
}

const DialogManager = ({
  openDialog,
  onCloseDialog,
  selectedCount,
  onBatchTrackUpdate,
  onBatchTimeUpdate,
  onBatchStatusUpdate,
  onBatchNotesUpdate
}: DialogManagerProps) => {
  return (
    <>
      <TrackUpdateDialog
        isOpen={openDialog === "track"}
        onClose={onCloseDialog}
        selectedCount={selectedCount}
        onUpdate={onBatchTrackUpdate}
      />
      
      <TimeUpdateDialog
        isOpen={openDialog === "time"}
        onClose={onCloseDialog}
        selectedCount={selectedCount}
        onUpdate={onBatchTimeUpdate}
      />
      
      <StatusUpdateDialog
        isOpen={openDialog === "completed"}
        onClose={onCloseDialog}
        selectedCount={selectedCount}
        onUpdate={onBatchStatusUpdate}
      />
      
      <NotesUpdateDialog
        isOpen={openDialog === "notes"}
        onClose={onCloseDialog}
        selectedCount={selectedCount}
        onUpdate={onBatchNotesUpdate}
      />
    </>
  );
};

export default DialogManager;
