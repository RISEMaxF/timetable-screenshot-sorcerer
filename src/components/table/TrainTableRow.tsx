
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Train } from "../../types/train";
import { Checkbox } from "../ui/checkbox";
import EditableCell from "./EditableCell";
import TrackChangeCell from "./TrackChangeCell";
import TimeCell from "./TimeCell";
import { cn } from "@/lib/utils";

interface TrainTableRowProps {
  train: Train;
  index: number;
  editingCell: {
    trainId: string;
    field: keyof Train | null;
  };
  startEditing: (trainId: string, field: keyof Train) => void;
  handleCellEdit: (train: Train, field: keyof Train, value: any) => void;
  onRowClick: (train: Train) => void;
  isSelected: boolean;
}

const TrainTableRow = ({
  train,
  index,
  editingCell,
  startEditing,
  handleCellEdit,
  onRowClick,
  isSelected
}: TrainTableRowProps) => {
  return (
    <TableRow 
      className={cn(
        "border-b hover:bg-gray-50 transition-colors cursor-pointer",
        index % 2 === 0 ? "bg-white" : "bg-gray-50",
        train.highlight ? "bg-red-50" : "",
        train.completed ? "bg-green-50" : "",
        isSelected ? "bg-blue-50" : ""
      )}
      onClick={() => onRowClick(train)}
    >
      <TableCell className="font-medium border-r p-2 text-sm">{train.id}</TableCell>
      <TableCell className="border-r p-2 text-sm">{train.otn || "-"}</TableCell>
      <TableCell className="border-r p-2 text-sm">{train.operator}</TableCell>
      
      <TimeCell
        time={train.arrivalTime}
        isEditing={editingCell.trainId === train.id && editingCell.field === "arrivalTime"}
        onStartEdit={(e) => {
          e.stopPropagation();
          startEditing(train.id, "arrivalTime");
        }}
        onEdit={(value) => handleCellEdit(train, "arrivalTime", value)}
        highlight={train.highlight}
      />

      <EditableCell
        value={train.track}
        field="track"
        trainId={train.id}
        editingCell={editingCell}
        onEdit={(value) => handleCellEdit(train, "track", value)}
        onStartEdit={(e) => {
          e.stopPropagation();
          startEditing(train.id, "track");
        }}
        inputWidth="w-12"
        className={cn(train.newTrack ? "line-through text-gray-500" : "")}
        formatDisplay={(value) => (
          <div className={cn("flex items-center", train.newTrack ? "line-through text-gray-500" : "")}>
            {value}
          </div>
        )}
      />

      <EditableCell
        value={train.notes}
        field="notes"
        trainId={train.id}
        editingCell={editingCell}
        onEdit={(value) => handleCellEdit(train, "notes", value)}
        onStartEdit={(e) => {
          e.stopPropagation();
          startEditing(train.id, "notes");
        }}
      />

      <EditableCell
        value={train.newOperator}
        field="newOperator"
        trainId={train.id}
        editingCell={editingCell}
        onEdit={(value) => handleCellEdit(train, "newOperator", value)}
        onStartEdit={(e) => {
          e.stopPropagation();
          startEditing(train.id, "newOperator");
        }}
      />

      <TimeCell
        time={train.newTime}
        isEditing={editingCell.trainId === train.id && editingCell.field === "newTime"}
        onStartEdit={(e) => {
          e.stopPropagation();
          startEditing(train.id, "newTime");
        }}
        onEdit={(value) => handleCellEdit(train, "newTime", value)}
      />

      <TrackChangeCell
        trainId={train.id}
        originalTrack={train.track}
        newTrack={train.newTrack}
        isEditing={editingCell.trainId === train.id && editingCell.field === "newTrack"}
        onStartEdit={(e) => {
          e.stopPropagation();
          startEditing(train.id, "newTrack");
        }}
        onEdit={(value) => handleCellEdit(train, "newTrack", value)}
      />

      <EditableCell
        value={train.newNotes}
        field="newNotes"
        trainId={train.id}
        editingCell={editingCell}
        onEdit={(value) => handleCellEdit(train, "newNotes", value)}
        onStartEdit={(e) => {
          e.stopPropagation();
          startEditing(train.id, "newNotes");
        }}
      />

      <TableCell className="p-2 text-center" onClick={(e) => e.stopPropagation()}>
        <Checkbox 
          checked={train.completed} 
          onCheckedChange={(checked) => handleCellEdit(train, "completed", checked)}
          className="border-gray-400"
        />
      </TableCell>
    </TableRow>
  );
};

export default TrainTableRow;
