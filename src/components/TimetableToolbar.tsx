
import { useState } from "react";
import { Train } from "@/types/train";
import BatchActionButtons from "./toolbar/BatchActionButtons";
import LocationSelector from "./toolbar/LocationSelector";
import DialogManager from "./toolbar/DialogManager";
import TimetableHeader from "./timetable/TimetableHeader";
import { DateRangePicker } from "./datepicker/DateRangePicker";

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
      
      <div className="flex flex-col sm:flex-row justify-between items-center p-4">
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <DateRangePicker 
            date={date} 
            setDate={setDate} 
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </div>
        
        <div className="flex items-center gap-2">
          <LocationSelector 
            location={location} 
            setLocation={setLocation}
            station={station}
            setStation={setStation}
            showFlags={true}
          />
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
