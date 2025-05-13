import { useState } from "react";
import { Train } from "@/types/train";
import BatchActionButtons from "./toolbar/BatchActionButtons";
import LocationSelector from "./toolbar/LocationSelector";
import DialogManager from "./toolbar/DialogManager";
import { DateRangePicker } from "./datepicker/DateRangePicker";
import SearchInput from "./toolbar/SearchInput";
import CustomizeButton from "./toolbar/CustomizeButton";

interface TimetableToolbarProps {
  location: string;
  setLocation: (location: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  selectedCount?: number;
  onBatchUpdate?: (field: keyof Train, value: any) => void;
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  exactMatch?: boolean;
  setExactMatch?: (value: boolean) => void;
}

export function TimetableToolbar({ 
  location, 
  setLocation, 
  date, 
  setDate,
  selectedCount = 0,
  onBatchUpdate,
  searchTerm = "",
  setSearchTerm = () => {},
  exactMatch = false,
  setExactMatch = () => {}
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
    <div className="flex flex-col bg-gray-50 border-b border-gray-200">
      <div className="bg-white px-6 py-4 border-b border-gray-200 shadow-sm">
        <div className="flex flex-col gap-4">
          {/* Search row */}
          <div className="flex items-center gap-3">
            <SearchInput 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              exactMatch={exactMatch}
              setExactMatch={setExactMatch}
            />
            <CustomizeButton />
          </div>
          
          {/* Filters row */}
          <div className="flex flex-wrap gap-3 items-center">
            <LocationSelector 
              location={location}
              setLocation={setLocation}
              showFlags={true}
            />
            
            <DateRangePicker 
              date={date}
              setDate={setDate}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-col space-y-4 p-4">
        <div className="flex flex-wrap justify-between items-center">
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
