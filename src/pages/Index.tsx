
import { useState } from "react";
import TrainTimetable from "../components/TrainTimetable";
import TimetableHeader from "../components/TimetableHeader";
import { TimetableToolbar } from "../components/TimetableToolbar";
import { trainData } from "../data/trainData";
import { Train } from "../types/train";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useHotkeys } from "react-hotkeys-hook";
import HelpMenu from "../components/HelpMenu";
import { TrainFront } from "lucide-react";

const Index = () => {
  const [trains, setTrains] = useState(trainData);
  const [location, setLocation] = useState("ALL");
  const [date, setDate] = useState(new Date());
  const [selectedTrains, setSelectedTrains] = useState<string[]>([]);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [exactMatch, setExactMatch] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const [sortField, setSortField] = useState<keyof Train | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Initialize keyboard shortcuts
  useHotkeys('ctrl+f', (e) => {
    e.preventDefault();
    document.querySelector<HTMLInputElement>('input[placeholder="Sök tåg, spår, destination..."]')?.focus();
  }, { enableOnFormTags: ['INPUT'] });
  
  useHotkeys('escape', () => {
    setSelectedTrains([]);
  });

  const handleTrainUpdate = (updatedTrain: Train) => {
    setTrains(trains.map((train) => 
      train.id === updatedTrain.id ? updatedTrain : train
    ));
  };

  const handleBatchUpdate = (fieldName: keyof Train, value: any) => {
    if (!selectedTrains.length) return;
    
    const updatedTrains = trains.map(train => 
      selectedTrains.includes(train.id) ? { ...train, [fieldName]: value } : train
    );
    
    setTrains(updatedTrains);
  };

  const toggleTrainSelection = (trainId: string) => {
    setSelectedTrains(prev => 
      prev.includes(trainId) 
        ? prev.filter(id => id !== trainId) 
        : [...prev, trainId]
    );
  };

  const handleSort = (field: keyof Train) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <TrainFront className="h-8 w-8 mr-2 text-blue-600" />
            Tåginfo
          </h1>
          <div className="flex items-center gap-4">
            <HelpMenu />
            <img 
              src="https://www.ri.se/themes/rise/dist/images/rise-logo-black.svg" 
              alt="RISE Logo" 
              className="h-12"
            />
          </div>
        </div>
        
        <TooltipProvider>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
            <TimetableToolbar 
              location={location} 
              setLocation={setLocation} 
              date={date} 
              setDate={setDate} 
              selectedCount={selectedTrains.length}
              onBatchUpdate={handleBatchUpdate}
            />
            <TimetableHeader 
              location={location} 
              date={date} 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              exactMatch={exactMatch}
              setExactMatch={setExactMatch}
              setFilterStatus={setFilterStatus}
              onSort={(field) => handleSort(field as keyof Train)}
            />
            <div className="p-4">
              <div className="flex flex-col lg:flex-row gap-4">
                <TrainTimetable 
                  trains={trains} 
                  onTrainUpdate={handleTrainUpdate} 
                  selectedTrains={selectedTrains}
                  onToggleSelection={toggleTrainSelection}
                  searchTerm={searchTerm}
                  exactMatch={exactMatch}
                  filterStatus={filterStatus}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  onSort={handleSort}
                />
              </div>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Index;
