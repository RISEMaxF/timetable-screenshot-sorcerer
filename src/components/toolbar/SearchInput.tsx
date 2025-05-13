
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  exactMatch: boolean;
  setExactMatch: (value: boolean) => void;
  setFilterStatus?: (status: "all" | "completed" | "pending") => void;
  onSort?: (field: string) => void;
}

const SearchInput = ({
  searchTerm,
  setSearchTerm,
  exactMatch,
  setExactMatch,
  setFilterStatus = () => {},
  onSort = () => {},
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

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
