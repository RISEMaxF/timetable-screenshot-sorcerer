
import { useState } from "react";
import { cn } from "@/lib/utils";
import SearchBox from "./search/SearchBox";
import ColumnSelector from "./search/ColumnSelector";
import FilterButton from "./search/FilterButton";

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

  return (
    <div className={cn(
      "flex-1 flex items-center transition-all duration-200 rounded-full border shadow-sm overflow-hidden bg-white dark:bg-gray-700",
      isFocused ? "ring-2 ring-blue-200 dark:ring-blue-400/50 border-blue-300 dark:border-blue-400" : "border-gray-200 dark:border-gray-600"
    )}>
      <SearchBox 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      {/* Columns selector dropdown - ONLY SHOWS COLUMN OPTIONS */}
      <ColumnSelector 
        searchableColumns={searchableColumns} 
        setSearchableColumns={setSearchableColumns}
        exactMatch={exactMatch}
        setExactMatch={setExactMatch}
      />
      
      {/* Filter dropdown */}
      <FilterButton 
        setFilterStatus={setFilterStatus} 
        onSort={onSort} 
      />
    </div>
  );
};

export default SearchInput;
