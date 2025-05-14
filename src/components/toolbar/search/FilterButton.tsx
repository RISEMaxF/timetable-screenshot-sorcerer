
import React from "react";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FilterButtonProps {
  setFilterStatus: (status: "all" | "completed" | "pending") => void;
  onSort: (field: string) => void;
}

const FilterButton = ({ setFilterStatus, onSort }: FilterButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 px-3 border-l border-gray-200 text-gray-700 rounded-none hover:bg-gray-50">
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-100 shadow-lg rounded-lg p-1">
        <div className="p-2 border-b border-gray-100">
          <h3 className="text-xs font-medium text-gray-500 mb-2">STATUS</h3>
          <div className="space-y-1">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => setFilterStatus("all")}>
              Alla tåg
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => setFilterStatus("completed")}>
              Klara
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => setFilterStatus("pending")}>
              Väntande
            </DropdownMenuItem>
          </div>
        </div>
        
        <div className="p-2 border-b border-gray-100">
          <h3 className="text-xs font-medium text-gray-500 mb-2">SORTERA EFTER</h3>
          <div className="space-y-1">
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => onSort("id")}>
              Tåg-ID
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => onSort("arrivalTime")}>
              Ankomsttid
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => onSort("track")}>
              Spår
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md"
              onClick={() => onSort("completed")}>
              Status
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterButton;
