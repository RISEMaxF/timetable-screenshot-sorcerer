
import { useState, useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Train } from "../types/train";
import TrainTableHeader from "./table/TrainTableHeader";
import TrainTableRow from "./table/TrainTableRow";
import EmptyState from "./table/EmptyState";
import TrainDetailDialog from "./dialog/TrainDetailDialog";
import { filterTrains } from "@/utils/searchUtils";
import TrainMap from "./map/TrainMap";
import { Button } from "./ui/button";
import { ChevronRight, AlarmClock, MapPin, Train as TrainIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";

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
    // We no longer automatically open the detail dialog
  };

  const handleOpenDetail = () => {
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
      
      <div className="lg:w-2/5 flex flex-col gap-4">
        {/* Basic info card shown when a train is selected */}
        {selectedTrain && (
          <Card className="border shadow-sm">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <TrainIcon className="h-5 w-5 text-blue-600" /> 
                  Tåg {selectedTrain.id}
                </h3>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {selectedTrain.operator}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Från</p>
                    <p className="font-medium">{selectedTrain.from || "-"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Till</p>
                    <p className="font-medium">{selectedTrain.to || "-"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <AlarmClock className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Ankomst</p>
                    <p className="font-medium">{selectedTrain.arrivalTime || "-"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Spår</p>
                  <p className="font-medium">{selectedTrain.track || "-"}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 p-4 flex justify-end border-t">
              <Button 
                variant="outline" 
                onClick={handleOpenDetail} 
                className="flex items-center gap-1"
              >
                Visa mer <ChevronRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

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
