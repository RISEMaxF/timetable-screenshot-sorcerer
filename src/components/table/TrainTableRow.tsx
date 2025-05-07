
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Train } from "../../types/train";
import { Checkbox } from "../ui/checkbox";
import EditableCell from "./EditableCell";
import TrackChangeCell from "./TrackChangeCell";
import TimeCell from "./TimeCell";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";

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
  isMultiSelected?: boolean;
  onToggleSelection?: (trainId: string) => void;
}

const TrainTableRow = ({
  train,
  index,
  editingCell,
  startEditing,
  handleCellEdit,
  onRowClick,
  isSelected,
  isMultiSelected = false,
  onToggleSelection
}: TrainTableRowProps) => {
  const handleRowClick = (e: React.MouseEvent) => {
    // Check if Ctrl/Cmd key is pressed for multi-select mode
    if ((e.ctrlKey || e.metaKey) && onToggleSelection) {
      e.preventDefault();
      onToggleSelection(train.id);
    } else {
      onRowClick(train);
    }
  };

  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleSelection) {
      onToggleSelection(train.id);
    }
  };

  return (
    <TableRow 
      className={cn(
        "border-b hover:bg-gray-50 transition-colors cursor-pointer",
        index % 2 === 0 ? "bg-white" : "bg-gray-50",
        train.highlight ? "bg-red-50" : "",
        train.completed ? "bg-green-50" : "",
        isSelected ? "bg-blue-50" : "",
        isMultiSelected ? "bg-indigo-100" : ""
      )}
      onClick={handleRowClick}
      data-testid={`train-row-${train.id}`}
    >
      {onToggleSelection && (
        <TableCell className="w-10 p-2" onClick={handleCheckboxClick}>
          <Checkbox
            checked={isMultiSelected}
            onCheckedChange={() => onToggleSelection(train.id)}
            aria-label={`Select train ${train.id}`}
          />
        </TableCell>
      )}
      
      <TableCell className="font-medium border-r p-2 text-sm">
        <div className="flex items-center justify-between">
          <span>{train.id}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </TooltipTrigger>
            <TooltipContent side="top">Train ID</TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
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
        tooltip="Scheduled arrival time (click to edit)"
      />

      <EditableCell
        value={train.track}
        field="track"
        trainId={train.id}
        editingCell={editingCell}
        onEdit={(value) => handleCellEdit(train, "track", value)}
        onStartEdit={() => {
          startEditing(train.id, "track");
        }}
        inputWidth="w-12"
        className={cn(train.newTrack ? "line-through text-gray-500" : "")}
        tooltip="Track number (click to edit)"
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
        onStartEdit={() => {
          startEditing(train.id, "notes");
        }}
        tooltip="Additional notes (click to edit)"
      />

      <EditableCell
        value={train.newOperator}
        field="newOperator"
        trainId={train.id}
        editingCell={editingCell}
        onEdit={(value) => handleCellEdit(train, "newOperator", value)}
        onStartEdit={() => {
          startEditing(train.id, "newOperator");
        }}
        tooltip="Updated operator information (click to edit)"
      />

      <TimeCell
        time={train.newTime}
        isEditing={editingCell.trainId === train.id && editingCell.field === "newTime"}
        onStartEdit={(e) => {
          e.stopPropagation();
          startEditing(train.id, "newTime");
        }}
        onEdit={(value) => handleCellEdit(train, "newTime", value)}
        tooltip="Updated arrival time (click to edit)"
      />

      <TrackChangeCell
        trainId={train.id}
        originalTrack={train.track}
        newTrack={train.newTrack}
        isEditing={editingCell.trainId === train.id && editingCell.field === "newTrack"}
        onStartEdit={() => {
          startEditing(train.id, "newTrack");
        }}
        onEdit={(value) => handleCellEdit(train, "newTrack", value)}
        tooltip="Track change information (click to edit)"
      />

      <EditableCell
        value={train.newNotes}
        field="newNotes"
        trainId={train.id}
        editingCell={editingCell}
        onEdit={(value) => handleCellEdit(train, "newNotes", value)}
        onStartEdit={() => {
          startEditing(train.id, "newNotes");
        }}
        tooltip="Update notes (click to edit)"
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
