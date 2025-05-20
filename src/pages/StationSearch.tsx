
import { useState } from "react";
import StationHeader from "@/components/station/StationHeader";
import StationSearchFilters from "@/components/station/StationSearchFilters";
import StationSearchResults from "@/components/station/StationSearchResults";
import { searchByStation, searchByRoute } from "@/services/stationSearchService";
import { trainData } from "@/data/trainData";

type SearchMode = "station" | "route";

const StationSearch = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>("route");
  const [stationLocation, setStationLocation] = useState("ALL");
  const [selectedStation, setSelectedStation] = useState("ALL");
  const [fromLocation, setFromLocation] = useState("ALL");
  const [selectedFromStation, setSelectedFromStation] = useState("ALL");
  const [toLocation, setToLocation] = useState("ALL");
  const [selectedToStation, setSelectedToStation] = useState("ALL");
  const [searchDate, setSearchDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
  const [searchResults, setSearchResults] = useState(trainData);
  const [hasSearched, setHasSearched] = useState(false);
  const [routeSearchType, setRouteSearchType] = useState<"from" | "to" | "both">("both");
  const [searchTerm, setSearchTerm] = useState("");
  
  // Function to handle search
  const handleSearch = () => {
    let filteredTrains = [];
    
    if (searchMode === "station") {
      console.log("Searching for trains at location:", stationLocation);
      console.log("Selected station:", selectedStation);
      
      // Filter trains based on selected country and station
      filteredTrains = searchByStation(stationLocation, selectedStation);
    } else {
      // Route search mode
      console.log("Searching for route from:", selectedFromStation, "to:", selectedToStation);
      console.log("Route search type:", routeSearchType);
      
      // Filter trains based on route
      filteredTrains = searchByRoute(
        fromLocation,
        selectedFromStation,
        toLocation,
        selectedToStation,
        routeSearchType
      );
    }
    
    setSearchResults(filteredTrains);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-6 max-w-[1400px]">
        <StationHeader />
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
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
}

export default StationSearch;
