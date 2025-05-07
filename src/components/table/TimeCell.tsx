
import React from "react";
import ClockIcon from "../icons/ClockIcon";
import { TableCell } from "../ui/table";
import TimeInput from "../TimeInput";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";

interface TimeCellProps {
  time: string | undefined;
  isEditing: boolean;
  onStartEdit: (e: React.MouseEvent) => void;
  onEdit: (time: string) => void;
  highlight?: boolean;
  placeholder?: string;
  tooltip?: string;
}

const TimeCell = ({
  time,
  isEditing,
  onStartEdit,
  onEdit,
  highlight = false,
  placeholder = "hh:mm",
  tooltip = "Click to edit time"
}: TimeCellProps) => {
  return (
    <TableCell 
      className={cn(
        "border-r p-2 text-sm cursor-pointer relative group",
        highlight ? "bg-red-100" : ""
      )}
      onClick={onStartEdit}
    >
      <div className="flex items-center">
        {isEditing ? (
          <TimeInput 
            value={time || ""} 
            onBlur={onEdit} 
          />
        ) : (
          <div className="flex items-center w-full justify-between">
            <div className="flex items-center">
              {time || <span className="text-gray-400">{placeholder}</span>}
              {time && <ClockIcon className="ml-1 h-4 w-4" />}
            </div>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Info 
                  className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={(e) => e.stopPropagation()}
                />
              </TooltipTrigger>
              <TooltipContent side="top">{tooltip}</TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </TableCell>
  );
};

export default TimeCell;
