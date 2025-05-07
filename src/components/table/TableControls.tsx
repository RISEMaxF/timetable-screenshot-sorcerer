
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Filter } from "lucide-react";
import { Train } from "@/types/train";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TableControlsProps {
  onSort: (field: keyof Train) => void;
  setFilterStatus: (status: "all" | "completed" | "pending") => void;
}

const TableControls = ({ onSort, setFilterStatus }: TableControlsProps) => {
  return (
    <div className="flex space-x-2 items-center h-10">
      {/* Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="default" className="h-10">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => setFilterStatus("all")} className="cursor-pointer">
            Alla tåg
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterStatus("completed")} className="cursor-pointer">
            Klara
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterStatus("pending")} className="cursor-pointer">
            Väntande
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="default" className="h-10">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sortera
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={() => onSort("id")} className="cursor-pointer">
            Tåg-ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSort("arrivalTime")} className="cursor-pointer">
            Ankomsttid
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSort("track")} className="cursor-pointer">
            Spår
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSort("completed")} className="cursor-pointer">
            Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableControls;
