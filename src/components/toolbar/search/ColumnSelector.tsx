
import React from "react";
import { Columns } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

export interface ColumnOption {
  id: string;
  label: string;
}

interface ColumnSelectorProps {
  searchableColumns: string[];
  setSearchableColumns: (columns: string[]) => void;
  exactMatch: boolean;
  setExactMatch: (value: boolean) => void;
}

export const AVAILABLE_COLUMNS: ColumnOption[] = [
  { id: "id", label: "Tåg-ID" },
  { id: "from", label: "Från" },
  { id: "to", label: "Till" },
  { id: "track", label: "Spår" },
  { id: "operator", label: "Operatör" },
  { id: "announcedTrainNumber", label: "Annonserat Tågnummer" },
];

const ColumnSelector = ({
  searchableColumns,
  setSearchableColumns,
  exactMatch,
  setExactMatch,
}: ColumnSelectorProps) => {
  const isColumnSelected = (columnId: string) => {
    return searchableColumns.includes("all") || searchableColumns.includes(columnId);
  };

  const handleColumnToggle = (columnId: string) => {
    if (columnId === "all") {
      // If "all" is clicked, either select all or none
      if (searchableColumns.includes("all")) {
        setSearchableColumns([]);
      } else {
        setSearchableColumns(["all"]);
      }
    } else {
      // If a specific column is clicked
      let newColumns = [...searchableColumns];

      // Remove "all" from the list if it's present
      if (newColumns.includes("all")) {
        newColumns = newColumns.filter(c => c !== "all");
        // Add all column IDs except the one being toggled
        newColumns = [...AVAILABLE_COLUMNS.map(c => c.id).filter(id => id !== columnId)];
      }

      // Toggle the selected column
      if (newColumns.includes(columnId)) {
        newColumns = newColumns.filter(c => c !== columnId);
      } else {
        newColumns.push(columnId);
      }

      // If all specific columns are selected, use "all" instead
      if (newColumns.length === AVAILABLE_COLUMNS.length) {
        setSearchableColumns(["all"]);
      } else {
        setSearchableColumns(newColumns);
      }
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 px-3 border-l border-gray-200 text-gray-700 rounded-none hover:bg-gray-50">
          <Columns className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-100 shadow-lg rounded-lg p-1">
        <div className="p-2 border-b border-gray-100">
          <h3 className="text-xs font-medium text-gray-500 mb-2">SÖK I KOLUMNER</h3>
          <div className="space-y-1">
            <DropdownMenuCheckboxItem 
              checked={searchableColumns.includes("all")}
              onCheckedChange={() => handleColumnToggle("all")}
              className="cursor-pointer hover:bg-gray-50 rounded-md"
            >
              Alla kolumner
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            {AVAILABLE_COLUMNS.map(column => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={isColumnSelected(column.id)}
                onCheckedChange={() => handleColumnToggle(column.id)}
                className="cursor-pointer hover:bg-gray-50 rounded-md"
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </div>
        </div>
        
        <div className="p-2">
          <h3 className="text-xs font-medium text-gray-500 mb-2">SÖKALTERNATIV</h3>
          <div className="flex items-center px-2 py-1">
            <input 
              type="checkbox" 
              id="exactMatch" 
              checked={exactMatch}
              onChange={() => setExactMatch(!exactMatch)}
              className="mr-2 h-4 w-4 rounded text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="exactMatch" className="text-sm text-gray-700">Exakt matchning</label>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColumnSelector;
