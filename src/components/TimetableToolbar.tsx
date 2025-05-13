
import { useState } from "react";
import { Train } from "@/types/train";
import BatchActionButtons from "./toolbar/BatchActionButtons";
import LocationSelector from "./toolbar/LocationSelector";
import DialogManager from "./toolbar/DialogManager";
import TimetableHeader from "./timetable/TimetableHeader";
import { DateRangePicker } from "./datepicker/DateRangePicker";
import { Input } from "@/components/ui/input";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface TimetableToolbarProps {
  location: string;
  setLocation: (location: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  selectedCount?: number;
  onBatchUpdate?: (field: keyof Train, value: any) => void;
}

export function TimetableToolbar({ 
  location, 
  setLocation, 
  date, 
  setDate,
  selectedCount = 0,
  onBatchUpdate
}: TimetableToolbarProps) {
  const [openDialog, setOpenDialog] = useState("");
  const [station, setStation] = useState("ALL");
  const [selectedDates, setSelectedDates] = useState<Date[]>([date]);
  const [searchTerm, setSearchTerm] = useState("");
  const [exactMatch, setExactMatch] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const handleOpenDialog = (dialogType: string) => {
    setOpenDialog(dialogType);
  };

  const handleCloseDialog = () => {
    setOpenDialog("");
  };

  const handleBatchTrackUpdate = (value: string) => {
    if (onBatchUpdate) {
      onBatchUpdate("track", value);
    }
  };

  const handleBatchTimeUpdate = (value: string) => {
    if (onBatchUpdate) {
      onBatchUpdate("arrivalTime", value);
    }
  };

  const handleBatchStatusUpdate = (value: boolean) => {
    if (onBatchUpdate) {
      onBatchUpdate("completed", value);
    }
  };

  const handleBatchNotesUpdate = (value: string) => {
    if (onBatchUpdate) {
      onBatchUpdate("notes", value);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 border-b border-gray-200">
      <TimetableHeader />
      
      <div className="flex flex-col space-y-4 p-4">
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
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md">
                      Alla tåg
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md">
                      Klara
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md">
                      Väntande
                    </DropdownMenuItem>
                  </div>
                </div>
                
                <div className="p-2 border-b border-gray-100">
                  <h3 className="text-xs font-medium text-gray-500 mb-2">SORTERA EFTER</h3>
                  <div className="space-y-1">
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md">
                      Tåg-ID
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md">
                      Ankomsttid
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md">
                      Spår
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 rounded-md">
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
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex items-center gap-2 flex-wrap">
            <LocationSelector 
              location={location} 
              setLocation={setLocation}
              station={station}
              setStation={setStation}
              showFlags={true}
            />
            
            <DateRangePicker 
              date={date} 
              setDate={setDate} 
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
            />
          </div>
          
          <BatchActionButtons 
            selectedCount={selectedCount} 
            onOpenDialog={handleOpenDialog} 
          />
        </div>
      </div>

      <DialogManager 
        openDialog={openDialog}
        onCloseDialog={handleCloseDialog}
        selectedCount={selectedCount}
        onBatchTrackUpdate={handleBatchTrackUpdate}
        onBatchTimeUpdate={handleBatchTimeUpdate}
        onBatchStatusUpdate={handleBatchStatusUpdate}
        onBatchNotesUpdate={handleBatchNotesUpdate}
      />
    </div>
  );
}
