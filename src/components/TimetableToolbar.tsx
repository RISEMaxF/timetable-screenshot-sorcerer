
import { useState } from "react";
import { Train } from "@/types/train";
import BatchActionButtons from "./toolbar/BatchActionButtons";
import TrackUpdateDialog from "./toolbar/TrackUpdateDialog";
import TimeUpdateDialog from "./toolbar/TimeUpdateDialog";
import StatusUpdateDialog from "./toolbar/StatusUpdateDialog";
import NotesUpdateDialog from "./toolbar/NotesUpdateDialog";
import DateSelector from "./toolbar/DateSelector";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Flag, Globe, Building2 } from "lucide-react";

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
    <div className="flex flex-row justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-gray-500" />
          <Select value={location} onValueChange={(val) => { setLocation(val); setStation("ALL"); }}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Välj region" />
            </SelectTrigger>
            <SelectContent>
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
        
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-gray-500" />
          <Select value={station} onValueChange={setStation}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Välj station" />
            </SelectTrigger>
            <SelectContent>
              {availableStations.map((station) => (
                <SelectItem key={station.value} value={station.value}>
                  {station.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <DateSelector date={date} setDate={setDate} />
        
        <BatchActionButtons 
          selectedCount={selectedCount} 
          onOpenDialog={handleOpenDialog} 
        />
      </div>

      {/* Dialogs */}
      <TrackUpdateDialog
        isOpen={openDialog === "track"}
        onClose={handleCloseDialog}
        selectedCount={selectedCount}
        onUpdate={handleBatchTrackUpdate}
      />
      
      <TimeUpdateDialog
        isOpen={openDialog === "time"}
        onClose={handleCloseDialog}
        selectedCount={selectedCount}
        onUpdate={handleBatchTimeUpdate}
      />
      
      <StatusUpdateDialog
        isOpen={openDialog === "completed"}
        onClose={handleCloseDialog}
        selectedCount={selectedCount}
        onUpdate={handleBatchStatusUpdate}
      />
      
      <NotesUpdateDialog
        isOpen={openDialog === "notes"}
        onClose={handleCloseDialog}
        selectedCount={selectedCount}
        onUpdate={handleBatchNotesUpdate}
      />
    </div>
  );
}
