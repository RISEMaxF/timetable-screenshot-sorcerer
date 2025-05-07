
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import { Train } from "../../types/train";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info, RefreshCw } from "lucide-react";

interface TrainTableRowProps {
  train: Train;
  index: number;
  onRowClick: (train: Train) => void;
  isSelected: boolean;
  isMultiSelected?: boolean;
  onToggleSelection?: (trainId: string) => void;
}

const TrainTableRow = ({
  train,
  index,
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
        train.highlighted ? "bg-pink-50" : "",
        train.completed ? "bg-green-50" : "",
        isSelected ? "bg-blue-50" : "",
        isMultiSelected ? "bg-indigo-100" : ""
      )}
      onClick={handleRowClick}
      data-testid={`train-row-${train.id}`}
    >
      <TableCell className="w-10 p-2" onClick={handleCheckboxClick}>
        <Checkbox
          checked={isMultiSelected}
          onCheckedChange={() => onToggleSelection && onToggleSelection(train.id)}
          aria-label={`Select train ${train.id}`}
        />
      </TableCell>
      
      <TableCell className="font-medium border-r p-2 text-sm">
        <div className="flex items-center justify-between">
          <span>{train.id}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <RefreshCw className="h-3.5 w-3.5 text-gray-400 hover:text-gray-600 transition-colors" />
            </TooltipTrigger>
            <TooltipContent side="top">Uppdatera tåginformation</TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
      
      <TableCell className="border-r p-2 text-sm">{train.announcedTrainNumber || "-"}</TableCell>
      <TableCell className="border-r p-2 text-sm">{train.operator}</TableCell>
      <TableCell className="border-r p-2 text-sm">{train.from || "-"}</TableCell>
      <TableCell className="border-r p-2 text-sm">{train.to || "-"}</TableCell>
      <TableCell className="border-r p-2 text-sm">{train.latest || "-"}</TableCell>
      <TableCell className="p-2 text-sm">{train.updated || "-"}</TableCell>
    </TableRow>
  );
};

export default TrainTableRow;
