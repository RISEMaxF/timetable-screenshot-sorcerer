
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
    <div className="flex space-x-3 items-center">
      {/* Filter Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-10 bg-white border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 border border-gray-100 shadow-md rounded-md">
          <DropdownMenuItem onClick={() => setFilterStatus("all")} className="cursor-pointer hover:bg-gray-50">
            Alla tåg
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterStatus("completed")} className="cursor-pointer hover:bg-gray-50">
            Klara
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setFilterStatus("pending")} className="cursor-pointer hover:bg-gray-50">
            Väntande
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      {/* Sort Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-10 bg-white border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sortera
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 border border-gray-100 shadow-md rounded-md">
          <DropdownMenuItem onClick={() => onSort("id")} className="cursor-pointer hover:bg-gray-50">
            Tåg-ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSort("arrivalTime")} className="cursor-pointer hover:bg-gray-50">
            Ankomsttid
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSort("track")} className="cursor-pointer hover:bg-gray-50">
            Spår
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSort("completed")} className="cursor-pointer hover:bg-gray-50">
            Status
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TableControls;
