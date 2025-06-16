
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input value changing:", e.target.value);
    setSearchTerm(e.target.value);
  };

  console.log("SearchBox render - searchTerm:", searchTerm);

  return (
    <div className="relative flex-1 flex items-center h-10">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-300 z-10">
        <Search className="h-4 w-4" />
      </div>
      <Input
        placeholder="Sök tåg, spår, destination..."
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="pl-10 pr-4 h-10 border-0 bg-white dark:bg-gray-700 text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0"
        style={{ backgroundColor: 'white', color: 'black' }}
      />
    </div>
  );
};

export default SearchBox;
