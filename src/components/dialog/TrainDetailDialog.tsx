
import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Train } from "../../types/train";
import TrainDetailHeader from "./TrainDetailHeader";
import TrainInfoGrid from "./TrainInfoGrid";
import TrainHistoryTable from "./TrainHistoryTable";
import TrainDetailSections from "./TrainDetailSections";

interface TrainDetailDialogProps {
  train: Train | null;
  isOpen: boolean;
  onClose: () => void;
}

const TrainDetailDialog = ({ train, isOpen, onClose }: TrainDetailDialogProps) => {
  if (!train) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] w-[90vw] flex flex-col">
        <TrainDetailHeader train={train} />

        <div className="flex-1 overflow-hidden mt-4 mb-6">
          <TrainInfoGrid train={train} />
          <TrainHistoryTable train={train} />
          <TrainDetailSections trainId={train.id} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrainDetailDialog;
