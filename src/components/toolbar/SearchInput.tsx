
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
      "flex-1 flex items-center transition-all duration-200 rounded-full overflow-hidden",
      "bg-white dark:bg-gray-800 backdrop-blur-sm",
      "border border-gray-200 dark:border-gray-600",
      "shadow-sm hover:shadow-md dark:shadow-none",
      isFocused ? 
        "ring-2 ring-blue-200 dark:ring-blue-400/30 border-blue-300 dark:border-blue-400/50" : 
        "hover:border-gray-300 dark:hover:border-gray-500"
    )}>
      <SearchBox 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <div className="flex items-center h-10 border-l border-gray-200 dark:border-gray-600">
        <ColumnSelector 
          searchableColumns={searchableColumns} 
          setSearchableColumns={setSearchableColumns}
          exactMatch={exactMatch}
          setExactMatch={setExactMatch}
        />
        
        <FilterButton 
          setFilterStatus={setFilterStatus} 
          onSort={onSort} 
        />
      </div>
    </div>
  );
};

export default SearchInput;
