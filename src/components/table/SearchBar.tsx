
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  exactMatch: boolean;
  setExactMatch: (value: boolean) => void;
}

const SearchBar = ({ searchTerm, setSearchTerm, exactMatch, setExactMatch }: SearchBarProps) => {
  return (
    <div className="relative flex items-center gap-2">
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Search className="h-4 w-4" />
        </div>
        <Input
          placeholder="Sök tåg..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 h-9 border-gray-200 rounded-md focus-visible:ring-blue-500 w-full shadow-sm"
        />
      </div>
      <div className="flex items-center">
        <input 
          type="checkbox" 
          id="exactMatch" 
          checked={exactMatch}
          onChange={() => setExactMatch(!exactMatch)}
          className="mr-1.5 h-4 w-4 rounded text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="exactMatch" className="text-xs text-gray-600 whitespace-nowrap">Exakt matchning</label>
      </div>
    </div>
  );
};

export default SearchBar;
