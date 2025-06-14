
import { useState, useMemo } from "react";
import { TrainDataProvider, useTrainData } from "../providers/TrainDataProvider";
import MainHeader from "../components/MainHeader";
import { Table, TableBody } from "@/components/ui/table";
import { Train } from "../types/train";
import TrainTableHeader from "../components/table/TrainTableHeader";
import TrainTableRow from "../components/table/TrainTableRow";
import EmptyState from "../components/table/EmptyState";
import TrainDetailDialog from "../components/dialog/TrainDetailDialog";
import { filterTrains } from "@/utils/searchUtils";
import TrainMap from "../components/map/TrainMap";
import { Button } from "@/components/ui/button";
import { ChevronRight, AlarmClock, MapPin, Train as TrainIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const FavoritesContent = () => {
  const { trains, updateTrain } = useTrainData();
  const [selectedTrains, setSelectedTrains] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [exactMatch, setExactMatch] = useState(false);
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");
  const [sortField, setSortField] = useState<keyof Train | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [selectedCountry, setSelectedCountry] = useState("ALL");
  const [selectedStation, setSelectedStation] = useState("ALL");
  const [searchableColumns, setSearchableColumns] = useState<string[]>(["all"]);

  // State for detail dialog
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const handleRowClick = (train: Train) => {
    setSelectedTrain(train);
  };

  const handleOpenDetail = () => {
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const handleToggleSelection = (trainId: string) => {
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

  // For now, show all trains as favorites since we don't have a favorites system implemented
  // This can be expanded later to filter actual favorited trains
  const favoriteTrains = useMemo(() => 
    filterTrains(
      trains, 
      searchTerm, 
      filterStatus, 
      exactMatch, 
      sortField, 
      sortDirection, 
      selectedCountry, 
      selectedStation,
      searchableColumns
    ),
    [trains, searchTerm, filterStatus, exactMatch, sortField, sortDirection, selectedCountry, selectedStation, searchableColumns]
  );

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Favoritmarkeringar
          </h2>
          <p className="text-muted-foreground">
            Här kan du se och hantera dina favoritmarkerade tåg och rutter.
          </p>
        </div>
        
        {favoriteTrains.length > 0 ? (
          <>
            <div className="flex flex-col lg:flex-row gap-4 w-full">
              <div className="lg:w-2/3 xl:w-3/4 border rounded-md overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <Table className="border-collapse w-full">
                    <TrainTableHeader 
                      onSort={handleSort} 
                      sortField={sortField} 
                      sortDirection={sortDirection} 
                    />
                    <TableBody className="divide-y divide-gray-200">
                      {favoriteTrains.map((train, index) => (
                        <TrainTableRow
                          key={train.id}
                          train={train}
                          index={index}
                          onRowClick={handleRowClick}
                          isSelected={selectedTrain?.id === train.id}
                          isMultiSelected={selectedTrains.includes(train.id)}
                          onToggleSelection={handleToggleSelection}
                        />
                      ))}
                      {favoriteTrains.length === 0 && (
                        <EmptyState searchTerm={searchTerm} filterApplied={filterStatus !== "all" || selectedCountry !== "ALL" || selectedStation !== "ALL"} />
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              
              <div className="lg:w-1/3 xl:w-1/4 flex flex-col gap-4">
                {/* Card that always shows - either with train info or placeholder */}
                <Card className="border shadow-sm">
                  {selectedTrain ? (
                    <>
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
                      <CardFooter className="bg-muted p-4 flex justify-end border-t">
                        <Button 
                          variant="outline" 
                          onClick={handleOpenDetail} 
                          className="flex items-center gap-1"
                        >
                          Visa mer <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </>
                  ) : (
                    <CardContent className="p-6 text-center">
                      <TrainIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">Välj ett tåg för att se detaljinformation</p>
                    </CardContent>
                  )}
                </Card>

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
        ) : (
          <div className="bg-card rounded-lg shadow-sm border border-border p-8 text-center">
            <p className="text-muted-foreground text-lg">
              Inga favoriter sparade än.
            </p>
            <p className="text-muted-foreground mt-2">
              Markera tåg som favoriter från huvudsidan för att se dem här.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Favorites = () => {
  return (
    <TrainDataProvider>
      <FavoritesContent />
    </TrainDataProvider>
  );
};

export default Favorites;
