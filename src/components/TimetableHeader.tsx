
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TimetableHeaderProps {
  location: string;
  date: Date;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  exactMatch?: boolean;
  setExactMatch?: (value: boolean) => void;
  setFilterStatus?: (status: "all" | "completed" | "pending") => void;
  onSort?: (field: string) => void;
}

const TimetableHeader = ({ 
  location, 
  date, 
  searchTerm = "", 
  setSearchTerm = () => {}, 
  exactMatch = false,
  setExactMatch = () => {},
  setFilterStatus = () => {},
  onSort = () => {}
}: TimetableHeaderProps) => {
  const formattedDate = format(date, "EEEE d MMMM yyyy", { locale: sv });
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50 px-6 py-4 border-b border-gray-200 shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Tåg info
          </h2>
          <span className="text-sm text-gray-500 font-medium">
            {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder="Sök tåg, spår, destination..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 h-9 rounded-full border-gray-200 bg-white focus-visible:ring-blue-500 w-full shadow-sm transition-all"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3 rounded-full bg-white border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-100 shadow-lg rounded-lg p-1">
              <div className="p-2 border-b border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 mb-2">STATUS</h3>
                <div className="space-y-1">
                  <DropdownMenuItem onClick={() => setFilterStatus("all")} className="cursor-pointer hover:bg-gray-50 rounded-md">
                    Alla tåg
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("completed")} className="cursor-pointer hover:bg-gray-50 rounded-md">
                    Klara
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")} className="cursor-pointer hover:bg-gray-50 rounded-md">
                    Väntande
                  </DropdownMenuItem>
                </div>
              </div>
              
              <div className="p-2 border-b border-gray-100">
                <h3 className="text-xs font-medium text-gray-500 mb-2">SORTERA EFTER</h3>
                <div className="space-y-1">
                  <DropdownMenuItem onClick={() => onSort("id")} className="cursor-pointer hover:bg-gray-50 rounded-md">
                    Tåg-ID
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSort("arrivalTime")} className="cursor-pointer hover:bg-gray-50 rounded-md">
                    Ankomsttid
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSort("track")} className="cursor-pointer hover:bg-gray-50 rounded-md">
                    Spår
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSort("completed")} className="cursor-pointer hover:bg-gray-50 rounded-md">
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
          
          <Button variant="outline" size="sm" className="h-9 px-3 rounded-full bg-white border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50">
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Anpassa</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimetableHeader;
