
import { useState } from "react";
import TrainTimetable from "../components/TrainTimetable";
import { TimetableToolbar } from "../components/TimetableToolbar";
import { TrainDataProvider, useTrainData } from "../providers/TrainDataProvider";
import { useTrainOperations } from "../hooks/useTrainOperations";
import { Train } from "../types/train";

const IndexContent = () => {
  const { trains, loading, error } = useTrainData();
  const { handleTrainUpdate, handleBatchTrackUpdate, handleBatchTimeUpdate, handleBatchStatusUpdate, handleBatchNotesUpdate } = useTrainOperations();
  
  const [selectedTrains, setSelectedTrains] = useState<string[]>([]);
  const [location, setLocation] = useState("ALL");
  const [station, setStation] = useState("ALL");
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [exactMatch, setExactMatch] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const [sortField, setSortField] = useState<keyof Train | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchableColumns, setSearchableColumns] = useState<string[]>(["all"]);

  const handleToggleSelection = (trainId: string) => {
    setSelectedTrains(prev => 
      prev.includes(trainId) 
        ? prev.filter(id => id !== trainId)
        : [...prev, trainId]
    );
  };

  const handleSort = (field: keyof Train) => {
    if (sortField === field) {
      setSortDirection(prev => prev === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleBatchUpdate = async (field: keyof Train, value: any) => {
    if (selectedTrains.length === 0) return;

    try {
      switch (field) {
        case "track":
          await handleBatchTrackUpdate(selectedTrains, value);
          break;
        case "arrivalTime":
          await handleBatchTimeUpdate(selectedTrains, value);
          break;
        case "completed":
          await handleBatchStatusUpdate(selectedTrains, value);
          break;
        case "notes":
          await handleBatchNotesUpdate(selectedTrains, value);
          break;
      }
      setSelectedTrains([]);
    } catch (error) {
      console.error("Batch update failed:", error);
    }
  };

  const selectedTrainObjects = trains.filter(train => selectedTrains.includes(train.id));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading trains...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TimetableToolbar
        location={location}
        setLocation={setLocation}
        station={station}
        setStation={setStation}
        date={date}
        setDate={setDate}
        selectedCount={selectedTrains.length}
        selectedTrains={selectedTrainObjects}
        onBatchUpdate={handleBatchUpdate}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        exactMatch={exactMatch}
        setExactMatch={setExactMatch}
        searchableColumns={searchableColumns}
        setSearchableColumns={setSearchableColumns}
        setFilterStatus={setFilterStatus}
      />
      
      <div className="p-6">
        <TrainTimetable
          trains={trains}
          onTrainUpdate={handleTrainUpdate}
          selectedTrains={selectedTrains}
          onToggleSelection={handleToggleSelection}
          searchTerm={searchTerm}
          exactMatch={exactMatch}
          filterStatus={filterStatus}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          selectedCountry={location}
          selectedStation={station}
          searchableColumns={searchableColumns}
        />
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <TrainDataProvider>
      <IndexContent />
    </TrainDataProvider>
  );
};

export default Index;
