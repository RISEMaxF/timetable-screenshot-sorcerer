
import React from "react";
import { Input } from "@/components/ui/input";
import TimeInput from "../TimeInput";
import { TableCell } from "../ui/table";

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
  formatDisplay = (val) => val || "-",
}: EditableCellProps) => {
  const isEditing = editingCell.trainId === trainId && editingCell.field === field;

  return (
    <TableCell
      className={`border-r p-2 text-sm cursor-pointer ${className}`}
      onClick={onStartEdit}
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
        formatDisplay(value)
      )}
    </TableCell>
  );
};

export default EditableCell;
