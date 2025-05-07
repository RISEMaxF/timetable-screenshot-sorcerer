
import { useState, useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Train } from "../types/train";
import TrainTableHeader from "./table/TrainTableHeader";
import TrainTableRow from "./table/TrainTableRow";
import EmptyState from "./table/EmptyState";
import TrainDetailDialog from "./dialog/TrainDetailDialog";
import SearchBar from "./table/SearchBar";
import TableControls from "./table/TableControls";
import { filterTrains } from "@/utils/searchUtils";
import TrainMap from "./map/TrainMap";

interface TrainTimetableProps {
  trains: Train[];
  onTrainUpdate: (train: Train) => void;
  selectedTrains: string[];
  onToggleSelection: (trainId: string) => void;
}

type SortField = keyof Train | null;
type SortDirection = "asc" | "desc";

const TrainTimetable = ({ trains, onTrainUpdate, selectedTrains = [], onToggleSelection }: TrainTimetableProps) => {
  // State for detail dialog
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [exactMatch, setExactMatch] = useState(false);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");

  const handleRowClick = (train: Train) => {
    setSelectedTrain(train);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const toggleSort = (field: keyof Train) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Filter and sort trains
  const filteredTrains = useMemo(() => 
    filterTrains(trains, searchTerm, filterStatus, exactMatch, sortField, sortDirection),
    [trains, searchTerm, filterStatus, exactMatch, sortField, sortDirection]
  );

  return (
    <>
      <div className="mb-6 p-3 bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between gap-4">
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            exactMatch={exactMatch}
            setExactMatch={setExactMatch}
          />
          
          <TableControls 
            onSort={toggleSort}
            setFilterStatus={setFilterStatus}
          />
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="lg:w-3/5 border rounded-md overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <Table className="border-collapse w-full">
              <TrainTableHeader 
                onSort={toggleSort} 
                sortField={sortField} 
                sortDirection={sortDirection} 
              />
              <TableBody className="divide-y divide-gray-200">
                {filteredTrains.map((train, index) => (
                  <TrainTableRow
                    key={train.id}
                    train={train}
                    index={index}
                    onRowClick={handleRowClick}
                    isSelected={selectedTrain?.id === train.id}
                    isMultiSelected={selectedTrains.includes(train.id)}
                    onToggleSelection={onToggleSelection}
                  />
                ))}
                {filteredTrains.length === 0 && (
                  <EmptyState searchTerm={searchTerm} filterApplied={filterStatus !== "all"} />
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="lg:w-2/5">
          <TrainMap 
            trains={trains} 
            selectedTrainId={selectedTrain?.id}
          />
        </div>
      </div>

      <TrainDetailDialog 
        train={selectedTrain}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default TrainTimetable;
