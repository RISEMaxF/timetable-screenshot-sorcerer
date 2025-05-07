
import React from "react";
import { Input } from "@/components/ui/input";
import TimeInput from "../TimeInput";
import { TableCell } from "../ui/table";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Info } from "lucide-react";

type EditableCellProps = {
  value: string | number | null;
  field: string;
  trainId: string;
  editingCell: { trainId: string; field: string | null };
  onEdit: (value: any) => void;
  onStartEdit: () => void;
  className?: string;
  inputType?: "text" | "time";
  inputWidth?: string;
  placeholder?: string;
  tooltip?: string;
  formatDisplay?: (value: any) => React.ReactNode;
};

const EditableCell = ({
  value,
  field,
  trainId,
  editingCell,
  onEdit,
  onStartEdit,
  className = "",
  inputType = "text",
  inputWidth = "w-full",
  placeholder = "",
  tooltip = "",
  formatDisplay = (val) => val || "-",
}: EditableCellProps) => {
  const isEditing = editingCell.trainId === trainId && editingCell.field === field;

  return (
    <TableCell
      className={`border-r p-2 text-sm cursor-pointer relative group ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        onStartEdit();
      }}
    >
      {isEditing ? (
        inputType === "time" ? (
          <TimeInput 
            value={value as string || ""} 
            onBlur={(newValue) => onEdit(newValue)} 
          />
        ) : (
          <Input 
            value={value as string || ""} 
            onChange={(e) => onEdit(e.target.value)}
            className={`h-8 ${inputWidth} p-1 text-sm`}
            autoFocus
          />
        )
      ) : (
        <div className="flex items-center w-full justify-between">
          <div className="flex-1">{formatDisplay(value)}</div>
          
          {tooltip && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
              </TooltipTrigger>
              <TooltipContent side="top">{tooltip}</TooltipContent>
            </Tooltip>
          )}
        </div>
      )}
    </TableCell>
  );
};

export default EditableCell;
