
import React from "react";
import { TableCell } from "../ui/table";
import { ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

interface TrackChangeCellProps {
  trainId: string;
  originalTrack: string | number;
  newTrack: string | number | undefined;
  isEditing: boolean;
  onStartEdit: () => void;
  onEdit: (value: string) => void;
}

const TrackChangeCell = ({
  trainId, 
  originalTrack, 
  newTrack, 
  isEditing, 
  onStartEdit, 
  onEdit
}: TrackChangeCellProps) => {
  return (
    <TableCell 
      className={cn(
        "border-r p-2 text-sm cursor-pointer",
        newTrack ? "bg-yellow-100" : ""
      )}
      onClick={onStartEdit}
    >
      {isEditing ? (
        <Input 
          value={newTrack as string || ""} 
          onChange={(e) => onEdit(e.target.value)}
          className="h-8 w-12 p-1 text-sm"
          autoFocus
        />
      ) : (
        newTrack ? (
          <div className="flex items-center gap-1 font-medium text-yellow-800">
            {originalTrack} <ArrowRight className="h-3.5 w-3.5" /> {newTrack}
          </div>
        ) : ""
      )}
    </TableCell>
  );
};

export default TrackChangeCell;
