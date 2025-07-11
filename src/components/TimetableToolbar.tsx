import { useState } from "react";
import { Train } from "@/types/train";
import BatchActionButtons from "./toolbar/BatchActionButtons";
import LocationSelector from "./toolbar/LocationSelector";
import DialogManager from "./toolbar/DialogManager";
import { DateRangePicker } from "./datepicker/DateRangePicker";
import SearchInput from "./toolbar/SearchInput";
import CustomizeButton from "./toolbar/CustomizeButton";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface TimetableToolbarProps {
  location: string;
  setLocation: (location: string) => void;
  station?: string;
  setStation?: (station: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  selectedCount?: number;
  selectedTrains?: Train[]; // Added this prop
  onBatchUpdate?: (field: keyof Train, value: any) => void;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  exactMatch?: boolean;
  setExactMatch?: (value: boolean) => void;
  onSearch?: () => void;
  searchableColumns?: string[];
  setSearchableColumns?: (columns: string[]) => void;
  setFilterStatus?: (status: "all" | "completed" | "pending") => void;
}

export function TimetableToolbar({ 
  location, 
  setLocation,
  station = "ALL",
  setStation = () => {},
  date, 
  setDate,
  selectedCount = 0,
  selectedTrains = [], 
  onBatchUpdate,
  searchTerm = "",
  setSearchTerm = () => {},
  exactMatch = false,
  setExactMatch = () => {},
  onSearch = () => {},
  searchableColumns = ["all"],
  setSearchableColumns = () => {},
  setFilterStatus = () => {}
}: TimetableToolbarProps) {
  const [openDialog, setOpenDialog] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([date]);
  
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
    <div className="flex flex-col bg-gray-50 dark:bg-gray-900 border-b-2 border-gray-300 dark:border-gray-600">
      <div className="bg-white dark:bg-gray-800 px-6 py-4 border-b-2 border-gray-300 dark:border-gray-600">
        <div className="flex flex-col gap-4">
          {/* Search row */}
          <div className="flex items-center gap-3">
            <SearchInput 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              exactMatch={exactMatch}
              setExactMatch={setExactMatch}
              searchableColumns={searchableColumns}
              setSearchableColumns={setSearchableColumns}
              setFilterStatus={setFilterStatus}
            />
            <CustomizeButton />
          </div>
          
          {/* Filters row with search button */}
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-wrap gap-3 items-center">
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
            
            {/* Search button moved to this row */}
            <Button 
              onClick={onSearch} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Search className="mr-2 h-4 w-4" />
              Sök
            </Button>
          </div>
        </div>
      </div>
      
      {/* Removed visual styling, keeping only functional structure */}
      <div className="px-6 py-2">
        <BatchActionButtons 
          selectedCount={selectedCount} 
          onOpenDialog={handleOpenDialog}
          selectedTrains={selectedTrains} 
        />
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
