
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal, Globe, Calendar, Building2, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface TimetableHeaderProps {
  location: string;
  setLocation: (location: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  exactMatch?: boolean;
  setExactMatch?: (value: boolean) => void;
  setFilterStatus?: (status: "all" | "completed" | "pending") => void;
  onSort?: (field: string) => void;
}

const TimetableHeader = ({ 
  location, 
  setLocation,
  date,
  setDate,
  searchTerm = "", 
  setSearchTerm = () => {}, 
  exactMatch = false,
  setExactMatch = () => {},
  setFilterStatus = () => {},
  onSort = () => {}
}: TimetableHeaderProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [station, setStation] = useState("ALL");
  const inputRef = useRef<HTMLInputElement>(null);
  
  const stations = {
    "ALL": "Alla stationer",
    "SE": {
      "STO": "Stockholm C",
      "GOT": "Göteborg C",
      "MAL": "Malmö C",
      "UPP": "Uppsala C",
      "HAG": "Hagalund"
    },
    "NO": {
      "OSL": "Oslo S",
      "BER": "Bergen",
      "TRO": "Trondheim"
    },
    "DK": {
      "CPH": "København H",
      "ARH": "Aarhus H"
    },
    "FI": {
      "HEL": "Helsinki",
      "TAM": "Tampere"
    },
    "DE": {
      "BER": "Berlin Hbf",
      "HAM": "Hamburg Hbf",
      "MUN": "München Hbf"
    }
  };

  const getStationsForLocation = () => {
    if (location === "ALL") return [{ value: "ALL", label: "Alla stationer" }];
    
    const locationStations = stations[location as keyof typeof stations];
    if (typeof locationStations === 'object') {
      return [
        { value: "ALL", label: "Alla stationer" },
        ...Object.entries(locationStations).map(([value, label]) => ({ value, label }))
      ];
    }
    
    return [{ value: "ALL", label: "Alla stationer" }];
  };

  const availableStations = getStationsForLocation();
  
  return (
    <div className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Search row */}
        <div className="flex items-center gap-3">
          <div className={cn(
            "flex-1 flex items-center transition-all duration-200 rounded-full border shadow-sm overflow-hidden",
            isFocused ? "ring-2 ring-blue-200 border-blue-300" : "border-gray-200"
          )}>
            <div className="relative flex-1 flex items-center h-10">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="h-4 w-4" />
              </div>
              <Input
                ref={inputRef}
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
          </div>

          <Button variant="outline" size="sm" className="h-10 px-3 rounded-full bg-white border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50">
            <SlidersHorizontal className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Anpassa</span>
          </Button>
        </div>
        
        {/* Filters row */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Location selector */}
          <div className="relative">
            <Select value={location} onValueChange={(val) => { setLocation(val); setStation("ALL"); }}>
              <SelectTrigger className="h-10 px-3 rounded-full bg-white border-gray-200 shadow-sm hover:bg-gray-50 w-[140px]">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Välj region" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-100 shadow-lg rounded-lg">
                <SelectItem value="ALL">
                  <div className="flex items-center gap-2">
                    <Globe className="h-3.5 w-3.5" />
                    <span>Alla länder</span>
                  </div>
                </SelectItem>
                <SelectItem value="SE">
                  <div className="flex items-center gap-2">
                    <Flag className="h-3.5 w-3.5" />
                    <span>Sverige</span>
                  </div>
                </SelectItem>
                <SelectItem value="NO">
                  <div className="flex items-center gap-2">
                    <Flag className="h-3.5 w-3.5" />
                    <span>Norge</span>
                  </div>
                </SelectItem>
                <SelectItem value="DK">
                  <div className="flex items-center gap-2">
                    <Flag className="h-3.5 w-3.5" />
                    <span>Danmark</span>
                  </div>
                </SelectItem>
                <SelectItem value="FI">
                  <div className="flex items-center gap-2">
                    <Flag className="h-3.5 w-3.5" />
                    <span>Finland</span>
                  </div>
                </SelectItem>
                <SelectItem value="DE">
                  <div className="flex items-center gap-2">
                    <Flag className="h-3.5 w-3.5" />
                    <span>Tyskland</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Station selector */}
          <div className="relative">
            <Select value={station} onValueChange={setStation}>
              <SelectTrigger className="h-10 px-3 rounded-full bg-white border-gray-200 shadow-sm hover:bg-gray-50 w-[180px]">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Välj station" />
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-100 shadow-lg rounded-lg">
                {availableStations.map((station) => (
                  <SelectItem key={station.value} value={station.value}>
                    {station.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Date selector */}
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="h-10 px-3 rounded-full bg-white border-gray-200 shadow-sm hover:bg-gray-50">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  {format(date, "PPP", { locale: sv })}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white border border-gray-100 shadow-lg rounded-lg">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  locale={sv}
                />
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="outline" 
              onClick={() => setDate(new Date())}
              className="h-10 px-3 rounded-full bg-white border-gray-200 shadow-sm hover:bg-gray-50"
            >
              Idag
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableHeader;
