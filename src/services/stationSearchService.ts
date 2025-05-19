
import { trainData } from "@/data/trainData";
import { filterTrains } from "@/utils/searchUtils";

export interface Train {
  id: string;
  operator: string;
  from?: string;
  to?: string;
  arrivalTime?: string;
  track?: string;
  country: string;
  highlighted?: boolean;
}

/**
 * Performs a station-based search
 */
export const searchByStation = (
  stationLocation: string, 
  selectedStation: string
): Train[] => {
  return filterTrains(
    trainData,
    "",
    "all",
    false,
    null,
    "asc",
    stationLocation,
    selectedStation
  );
};

/**
 * Performs a route-based search
 */
export const searchByRoute = (
  fromLocation: string,
  selectedFromStation: string,
  toLocation: string,
  selectedToStation: string,
  routeSearchType: "from" | "to" | "both"
): Train[] => {
  let filteredTrains = [];
  
  // Filter trains based on route
  if (routeSearchType === "from" && selectedFromStation !== "ALL") {
    filteredTrains = trainData.filter(train => train.from === selectedFromStation);
  } else if (routeSearchType === "to" && selectedToStation !== "ALL") {
    filteredTrains = trainData.filter(train => train.to === selectedToStation);
  } else if (routeSearchType === "both" && selectedFromStation !== "ALL" && selectedToStation !== "ALL") {
    filteredTrains = trainData.filter(train => 
      train.from === selectedFromStation && train.to === selectedToStation
    );
  } else {
    // If no valid criteria, return all trains
    filteredTrains = trainData;
  }
  
  // Further filter by country if needed
  if (fromLocation !== "ALL" && routeSearchType !== "to") {
    filteredTrains = filteredTrains.filter(train => train.country === fromLocation);
  } else if (toLocation !== "ALL" && routeSearchType !== "from") {
    filteredTrains = filteredTrains.filter(train => train.country === toLocation);
  }
  
  return filteredTrains;
};
