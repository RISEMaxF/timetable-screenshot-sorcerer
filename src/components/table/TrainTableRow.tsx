
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

  const cellClasses = "border-r border-border p-1 sm:p-2 text-xs sm:text-sm";

  // Determine row background and hover classes based on state
  const getRowClasses = () => {
    const baseClasses = "border-b border-border transition-colors cursor-pointer";
    
    // Priority order: multi-selected > selected > completed > highlighted > default
    if (isMultiSelected) {
      return cn(baseClasses, "bg-indigo-100 dark:bg-indigo-900/20 hover:bg-indigo-200 dark:hover:bg-indigo-900/30");
    }
    
    if (isSelected) {
      return cn(baseClasses, "bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30");
    }
    
    if (train.completed) {
      return cn(baseClasses, "bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30");
    }
    
    if (train.highlighted) {
      return cn(baseClasses, "bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30");
    }
    
    // Default alternating rows
    const defaultBg = index % 2 === 0 ? "bg-background" : "bg-muted/30";
    const defaultHover = index % 2 === 0 ? "hover:bg-muted/50" : "hover:bg-muted/40";
    
    return cn(baseClasses, defaultBg, defaultHover);
  };

  return (
    <TableRow 
      className={getRowClasses()}
      onClick={handleRowClick}
      data-testid={`train-row-${train.id}`}
    >
      <TableCell className="w-8 sm:w-10 px-1 sm:px-2 py-2">
        <div onClick={handleCheckboxClick}>
          <Checkbox
            checked={isMultiSelected || false}
            className="cursor-pointer h-3 w-3 sm:h-4 sm:w-4"
            aria-label={`Select train ${train.id}`}
          />
        </div>
      </TableCell>
      
      <TableCell className={`font-medium ${cellClasses}`}>
        <div className="flex items-center justify-between">
          <span className="truncate">{train.id}</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <RefreshCw className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 ml-1" />
            </TooltipTrigger>
            <TooltipContent side="top">Uppdatera tåginformation</TooltipContent>
          </Tooltip>
        </div>
      </TableCell>
      
      <TableCell className={`${cellClasses} hidden sm:table-cell`}>{train.announcedTrainNumber || "-"}</TableCell>
      <TableCell className={cellClasses}>
        <span className="truncate block">{train.operator}</span>
      </TableCell>
      <TableCell className={`${cellClasses} hidden md:table-cell`}>{train.from || "-"}</TableCell>
      <TableCell className={`${cellClasses} hidden md:table-cell`}>{train.to || "-"}</TableCell>
      <TableCell className={cellClasses}>{train.latest || "-"}</TableCell>
      <TableCell className="p-1 sm:p-2 text-xs sm:text-sm hidden lg:table-cell">{train.updated || "-"}</TableCell>
    </TableRow>
  );
};

export default TrainTableRow;
