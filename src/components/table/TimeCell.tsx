
import React from "react";
import ClockIcon from "../icons/ClockIcon";
import { TableCell } from "../ui/table";
import TimeInput from "../TimeInput";
import { cn } from "@/lib/utils";

interface TimeCellProps {
  time: string | undefined;
  isEditing: boolean;
  onStartEdit: (e: React.MouseEvent) => void;
  onEdit: (time: string) => void;
  highlight?: boolean;
  placeholder?: string;
}

const TimeCell = ({
  time,
  isEditing,
  onStartEdit,
  onEdit,
  highlight = false,
  placeholder = "hh:mm"
}: TimeCellProps) => {
  return (
    <TableCell 
      className={cn(
        "border-r p-2 text-sm cursor-pointer",
        highlight ? "bg-red-100" : ""
      )}
      onClick={onStartEdit}
    >
      {isEditing ? (
        <TimeInput 
          value={time || ""} 
          onBlur={onEdit} 
        />
      ) : (
        <div className="flex items-center">
          {time || <span className="text-gray-400">{placeholder}</span>}
          {time && <ClockIcon className="ml-1 h-4 w-4" />}
        </div>
      )}
    </TableCell>
  );
};

export default TimeCell;
