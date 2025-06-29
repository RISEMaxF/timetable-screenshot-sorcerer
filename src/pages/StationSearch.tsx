
import { useState } from "react";
import { TrainDataProvider, useTrainData } from "../providers/TrainDataProvider";
import { FavoritesProvider } from "../contexts/FavoritesContext";
import StationHeader from "../components/station/StationHeader";
import StationSearchFilters from "../components/station/StationSearchFilters";
import StationSearchResults from "../components/station/StationSearchResults";
import { performStationSearch, performRouteSearch } from "../services/stationSearchService";

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
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const handleSearch = () => {
    let results: any[] = [];
    
    if (searchMode === "station") {
      results = performStationSearch(trains, stationLocation, selectedStation);
    } else {
      results = performRouteSearch(
        trains,
        fromLocation,
        selectedFromStation,
        toLocation,
        selectedToStation,
        routeSearchType
      );
    }
    
    setSearchResults(results);
    setHasSearched(true);
  };

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
