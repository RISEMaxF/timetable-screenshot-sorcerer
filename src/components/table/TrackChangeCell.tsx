
import React from "react";
import { TableCell } from "../ui/table";
import { ArrowRight, Info } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface TrackChangeCellProps {
  trainId: string;
  originalTrack: string | number;
  newTrack: string | number | undefined;
  isEditing: boolean;
  onStartEdit: () => void;
  onEdit: (value: string) => void;
  tooltip?: string;
}

const TrackChangeCell = ({
  trainId, 
  originalTrack, 
  newTrack, 
  isEditing, 
  onStartEdit, 
  onEdit,
  tooltip = "Track change information"
}: TrackChangeCellProps) => {
  return (
    <TableCell 
      className={cn(
        "border-r p-2 text-sm cursor-pointer relative group",
        newTrack ? "bg-yellow-100" : ""
      )}
      onClick={(e) => {
        e.stopPropagation();
        onStartEdit();
      }}
    >
      {isEditing ? (
        <Input 
          value={newTrack as string || ""} 
          onChange={(e) => onEdit(e.target.value)}
          className="h-8 w-12 p-1 text-sm"
          autoFocus
        />
      ) : (
        <div className="flex items-center w-full justify-between">
          {newTrack ? (
            <div className="flex items-center gap-1 font-medium text-yellow-800">
              {originalTrack} <ArrowRight className="h-3.5 w-3.5" /> {newTrack}
            </div>
          ) : (
            <span>-</span>
          )}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-3.5 w-3.5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
            </TooltipTrigger>
            <TooltipContent side="top">{tooltip}</TooltipContent>
          </Tooltip>
        </div>
      )}
    </TableCell>
  );
};

export default TrackChangeCell;
