
import { useState } from "react";
import { Search, Filter, Columns } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  exactMatch: boolean;
  setExactMatch: (value: boolean) => void;
  setFilterStatus?: (status: "all" | "completed" | "pending") => void;
  onSort?: (field: string) => void;
  searchableColumns?: string[];
  setSearchableColumns?: (columns: string[]) => void;
}

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  exactMatch,
  setExactMatch,
  setFilterStatus = () => {},
  onSort = () => {},
  searchableColumns = ["all"],
  setSearchableColumns = () => {},
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const allColumns = [
    { id: "id", label: "Tåg-ID" },
    { id: "from", label: "Från" },
    { id: "to", label: "Till" },
    { id: "track", label: "Spår" },
    { id: "operator", label: "Operatör" },
    { id: "announcedTrainNumber", label: "Annonserat Tågnummer" },
  ];

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
        newColumns = [...allColumns.map(c => c.id).filter(id => id !== columnId)];
      }

      // Toggle the selected column
      if (newColumns.includes(columnId)) {
        newColumns = newColumns.filter(c => c !== columnId);
      } else {
        newColumns.push(columnId);
      }

      // If all specific columns are selected, use "all" instead
      if (newColumns.length === allColumns.length) {
        setSearchableColumns(["all"]);
      } else {
        setSearchableColumns(newColumns);
      }
    }
  };

  return (
    <div className={cn(
      "flex-1 flex items-center transition-all duration-200 rounded-full border shadow-sm overflow-hidden",
      isFocused ? "ring-2 ring-blue-200 border-blue-300" : "border-gray-200"
    )}>
      <div className="relative flex-1 flex items-center h-10">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="h-4 w-4" />
        </div>
        <Input
          placeholder="Sök tåg, spår, destination..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="pl-10 pr-4 h-10 border-0 shadow-none focus-visible:ring-0 w-full"
        />
      </div>
      
      {/* Columns selector dropdown */}
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
              {allColumns.map(column => (
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
          
          <DropdownMenuSeparator />
          
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
      
      {/* Filter dropdown */}
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
    </div>
  );
};

export default SearchInput;
