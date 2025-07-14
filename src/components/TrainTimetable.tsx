import { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Train } from "../types/train";
import TrainTableHeader from "./table/TrainTableHeader";
import TrainTableRow from "./table/TrainTableRow";
import EmptyState from "./table/EmptyState";
import TrainDetailDialog from "./dialog/TrainDetailDialog";
import TrainMap from "./map/TrainMap";
import { TrainInfoCard } from "./TrainInfoCard";
import { useTrainData } from "../providers/TrainDataProvider";
import { useFavorites } from "@/contexts/FavoritesContext";
import { TimetableToolbar } from "./TimetableToolbar";
import { useTrainFilters } from "@/hooks/useTrainFilters";
import { useTrainSelection } from "@/hooks/useTrainSelection";
import { getSelectedTrainsData, createBatchUpdateHandler, createFavoriteToggleHandler } from "@/utils/trainUtils";
import { DEFAULT_VALUES, LAYOUT_BREAKPOINTS } from "@/constants/app";

interface TrainTimetableProps {
  showFavorites: boolean;
}

const TrainTimetable = ({ showFavorites }: TrainTimetableProps) => {
  const { trains, updateTrain } = useTrainData();
  const { addFavoriteStation, removeFavoriteStation, isFavoriteStation } = useFavorites();
  const [date, setDate] = useState(new Date());

  // Use custom hooks for separation of concerns
  const {
    filters,
    updateFilter,
    handleSort,
    filteredTrains,
    hasActiveFilters,
  } = useTrainFilters(trains, showFavorites);

  const {
    selectedTrains,
    selectedTrain,
    isDetailOpen,
    handleRowClick,
    handleOpenDetail,
    handleCloseDetail,
    handleToggleSelection,
  } = useTrainSelection();

  // Create utility handlers using the utility functions
  const handleBatchUpdate = createBatchUpdateHandler(selectedTrains, trains, updateTrain);
  const handleToggleFavorite = createFavoriteToggleHandler(
    addFavoriteStation,
    removeFavoriteStation,
    isFavoriteStation
  );

  const handleSearch = () => {
    console.log("Search triggered with term:", filters.searchTerm);
  };

  const selectedTrainsData = getSelectedTrainsData(selectedTrains, trains);

  return (
    <>
      <TimetableToolbar 
        location={filters.location}
        setLocation={(location) => updateFilter("location", location)}
        date={date}
        setDate={setDate}
        selectedCount={selectedTrains.length}
        selectedTrains={selectedTrainsData}
        onBatchUpdate={handleBatchUpdate}
        searchTerm={filters.searchTerm}
        setSearchTerm={(searchTerm) => updateFilter("searchTerm", searchTerm)}
        exactMatch={filters.exactMatch}
        setExactMatch={(exactMatch) => updateFilter("exactMatch", exactMatch)}
        onSearch={handleSearch}
        searchableColumns={filters.searchableColumns}
        setSearchableColumns={(searchableColumns) => updateFilter("searchableColumns", searchableColumns)}
        setFilterStatus={(filterStatus) => updateFilter("filterStatus", filterStatus)}
      />
      
      <div className={`flex flex-col lg:flex-row ${LAYOUT_BREAKPOINTS.GAPS.MEDIUM} w-full`}>
        <div className={`${LAYOUT_BREAKPOINTS.TABLE_WIDTH.LARGE} border rounded-md overflow-hidden shadow-sm`}>
          <div className="overflow-x-auto">
            <Table className="border-collapse w-full">
              <TrainTableHeader 
                onSort={handleSort} 
                sortField={filters.sortField} 
                sortDirection={filters.sortDirection} 
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
                    onToggleSelection={handleToggleSelection}
                  />
                ))}
                {filteredTrains.length === 0 && (
                  <EmptyState 
                    searchTerm={filters.searchTerm} 
                    filterApplied={hasActiveFilters()} 
                  />
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className={`${LAYOUT_BREAKPOINTS.TABLE_WIDTH.SIDEBAR} flex flex-col ${LAYOUT_BREAKPOINTS.GAPS.MEDIUM}`}>
          <TrainInfoCard 
            train={selectedTrain}
            onOpenDetail={handleOpenDetail}
            onToggleFavorite={handleToggleFavorite}
          />

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