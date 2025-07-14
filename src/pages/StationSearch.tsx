
import { useState, useMemo, useCallback } from "react";
import { TrainDataProvider, useTrainData } from "../providers/TrainDataProvider";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import StationHeader from "../components/station/StationHeader";
import StationSearchFilters from "../components/station/StationSearchFilters";
import StationSearchResults from "../components/station/StationSearchResults";
import { performStationSearch, performRouteSearch } from "../services/stationSearchService";
import { Train } from "../types/train";
import { ApiErrorHandler } from "../services/ErrorHandlingService";

const StationSearchContent = () => {
  const { trains } = useTrainData();
  const [searchMode, setSearchMode] = useState<"station" | "route">("station");
  const [stationLocation, setStationLocation] = useState("ALL");
  const [selectedStation, setSelectedStation] = useState("ALL");
  const [fromLocation, setFromLocation] = useState("ALL");
  const [selectedFromStation, setSelectedFromStation] = useState("ALL");
  const [toLocation, setToLocation] = useState("ALL");
  const [selectedToStation, setSelectedToStation] = useState("ALL");
  const [routeSearchType, setRouteSearchType] = useState<"from" | "to" | "both">("both");
  const [searchResults, setSearchResults] = useState<Train[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Memoized search results to prevent unnecessary recalculations
  const memoizedSearchResults = useMemo(() => {
    if (!hasSearched) return [];
    
    if (searchMode === "station") {
      return performStationSearch(trains, stationLocation, selectedStation);
    } else {
      return performRouteSearch(
        trains,
        fromLocation,
        selectedFromStation,
        toLocation,
        selectedToStation,
        routeSearchType
      );
    }
  }, [
    trains,
    searchMode,
    stationLocation,
    selectedStation,
    fromLocation,
    selectedFromStation,
    toLocation,
    selectedToStation,
    routeSearchType,
    hasSearched
  ]);

  // Optimized search handler with useCallback to prevent unnecessary re-renders
  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API delay for realistic UX (as per frontend-only guidelines)
      const mockDelay = parseInt(import.meta.env.VITE_MOCK_DELAY_MS || '300');
      await new Promise(resolve => setTimeout(resolve, mockDelay));
      
      // Set search results using memoized calculation
      setSearchResults(memoizedSearchResults);
      setHasSearched(true);
    } catch (err) {
      const errorMessage = ApiErrorHandler.handleApiError(err);
      setError(errorMessage);
      ApiErrorHandler.logError('StationSearch.handleSearch', err);
    } finally {
      setIsLoading(false);
    }
  }, [memoizedSearchResults]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StationHeader />
      
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <StationSearchFilters
          searchMode={searchMode}
          setSearchMode={setSearchMode}
          stationLocation={stationLocation}
          setStationLocation={setStationLocation}
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
          fromLocation={fromLocation}
          setFromLocation={setFromLocation}
          selectedFromStation={selectedFromStation}
          setSelectedFromStation={setSelectedFromStation}
          toLocation={toLocation}
          setToLocation={setToLocation}
          selectedToStation={selectedToStation}
          setSelectedToStation={setSelectedToStation}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          routeSearchType={routeSearchType}
          setRouteSearchType={setRouteSearchType}
          handleSearch={handleSearch}
        />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mt-6">
          <StationSearchResults
            hasSearched={hasSearched}
            searchResults={searchResults}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

const StationSearch = () => {
  return (
    <TrainDataProvider>
      <FavoritesProvider>
        <StationSearchContent />
      </FavoritesProvider>
    </TrainDataProvider>
  );
};

export default StationSearch;
