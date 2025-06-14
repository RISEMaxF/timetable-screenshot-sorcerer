
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
        <Button 
          variant="ghost" 
          className="h-10 px-3 border-l border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-none hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-gray-100"
        >
          <Filter className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg p-1"
      >
        <div className="p-2 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">STATUS</h3>
          <div className="space-y-1">
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100"
              onClick={() => setFilterStatus("all")}
            >
              Alla tåg
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100"
              onClick={() => setFilterStatus("completed")}
            >
              Klara
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100"
              onClick={() => setFilterStatus("pending")}
            >
              Väntande
            </DropdownMenuItem>
          </div>
        </div>
        
        <div className="p-2">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">SORTERA EFTER</h3>
          <div className="space-y-1">
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100"
              onClick={() => onSort("id")}
            >
              Tåg-ID
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100"
              onClick={() => onSort("arrivalTime")}
            >
              Ankomsttid
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100"
              onClick={() => onSort("track")}
            >
              Spår
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md text-gray-900 dark:text-gray-100"
              onClick={() => onSort("completed")}
            >
              Status
            </DropdownMenuItem>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterButton;
