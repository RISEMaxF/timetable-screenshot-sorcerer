
import { useState, useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Train } from "../types/train";
import TrainTableHeader from "./table/TrainTableHeader";
import TrainTableRow from "./table/TrainTableRow";
import EmptyState from "./table/EmptyState";
import TrainDetailDialog from "./dialog/TrainDetailDialog";
import { filterTrains } from "@/utils/searchUtils";
import TrainMap from "./map/TrainMap";

interface TrainTimetableProps {
  trains: Train[];
  onTrainUpdate: (train: Train) => void;
  selectedTrains: string[];
  onToggleSelection: (trainId: string) => void;
  searchTerm?: string;
  exactMatch?: boolean;
  filterStatus?: "all" | "completed" | "pending";
  sortField?: keyof Train | null;
  sortDirection?: "asc" | "desc";
  onSort?: (field: keyof Train) => void;
  selectedCountry?: string;
  selectedStation?: string;
}

const TrainTimetable = ({ 
  trains, 
  onTrainUpdate, 
  selectedTrains = [], 
  onToggleSelection,
  searchTerm = "",
  exactMatch = false,
  filterStatus = "all",
  sortField = null,
  sortDirection = "asc",
  onSort = () => {},
  selectedCountry = "ALL",
  selectedStation = "ALL"
}: TrainTimetableProps) => {
  // State for detail dialog
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const handleRowClick = (train: Train) => {
    setSelectedTrain(train);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  // Filter and sort trains
  const filteredTrains = useMemo(() => 
    filterTrains(
      trains, 
      searchTerm, 
      filterStatus, 
      exactMatch, 
      sortField, 
      sortDirection, 
      selectedCountry, 
      selectedStation
    ),
    [trains, searchTerm, filterStatus, exactMatch, sortField, sortDirection, selectedCountry, selectedStation]
  );

  return (
    <>
      <div className="lg:w-3/5 border rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table className="border-collapse w-full">
            <TrainTableHeader 
              onSort={onSort} 
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
                <EmptyState searchTerm={searchTerm} filterApplied={filterStatus !== "all" || selectedCountry !== "ALL" || selectedStation !== "ALL"} />
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

      <TrainDetailDialog 
        train={selectedTrain}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default TrainTimetable;
