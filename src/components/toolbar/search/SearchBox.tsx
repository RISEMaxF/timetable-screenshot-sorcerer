
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

const SearchBox = ({ searchTerm, setSearchTerm }: SearchBoxProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative flex-1 flex items-center h-10">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 z-10">
        <Search className="h-4 w-4" />
      </div>
      <Input
        placeholder="Sök tåg, spår, destination..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "pl-10 pr-4 h-10 border-0 w-full",
          "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100",
          "placeholder:text-gray-500 dark:placeholder:text-gray-400",
          "focus:bg-white dark:focus:bg-gray-800",
          "focus-visible:ring-0 focus-visible:ring-offset-0"
        )}
      />
    </div>
  );
};

export default SearchBox;
