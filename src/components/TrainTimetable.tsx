
import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Train } from "../types/train";
import TrainTableHeader from "./table/TrainTableHeader";
import TrainTableRow from "./table/TrainTableRow";
import EmptyState from "./table/EmptyState";
import TrainDetailDialog from "./dialog/TrainDetailDialog";

interface TrainTimetableProps {
  trains: Train[];
  onTrainUpdate: (train: Train) => void;
}

const TrainTimetable = ({ trains, onTrainUpdate }: TrainTimetableProps) => {
  const [editingCell, setEditingCell] = useState<{
    trainId: string;
    field: keyof Train | null;
  }>({ trainId: "", field: null });

  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleCellEdit = (train: Train, field: keyof Train, value: any) => {
    const updatedTrain = { ...train, [field]: value };
    onTrainUpdate(updatedTrain);
    setEditingCell({ trainId: "", field: null });
  };

  const startEditing = (trainId: string, field: keyof Train) => {
    setEditingCell({ trainId, field });
  };

  const handleRowClick = (train: Train) => {
    setSelectedTrain(train);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <Table className="border-collapse w-full">
          <TrainTableHeader />
          <TableBody>
            {trains.map((train, index) => (
              <TrainTableRow
                key={train.id}
                train={train}
                index={index}
                editingCell={editingCell}
                startEditing={startEditing}
                handleCellEdit={handleCellEdit}
                onRowClick={handleRowClick}
                isSelected={selectedTrain?.id === train.id}
              />
            ))}
            {trains.length === 0 && <EmptyState />}
          </TableBody>
        </Table>
      </div>

      <TrainDetailDialog 
        train={selectedTrain}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default TrainTimetable;
