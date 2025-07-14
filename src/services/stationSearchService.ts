import { useTrainData } from "../providers/TrainDataProvider";
import { filterTrains } from "@/utils/searchUtils";
import { Train } from "../types/train";

/**
 * Performs a station-based search using the TrainDataProvider
 */
export const searchByStation = (
  stationLocation: string, 
  selectedStation: string
): Train[] => {
  // This function now needs to be called from within a component that has access to TrainDataProvider
  // We'll keep this as a utility function but it should be used with the trains from the provider
  return [];
};

/**
 * Performs a route-based search using the TrainDataProvider
 */
export const searchByRoute = (
  fromLocation: string,
  selectedFromStation: string,
  toLocation: string,
  selectedToStation: string,
  routeSearchType: "from" | "to" | "both"
): Train[] => {
  // This function now needs to be called from within a component that has access to TrainDataProvider
  // We'll keep this as a utility function but it should be used with the trains from the provider
  return [];
};

/**
 * Station search utility that works with provided trains data
 */
export const performStationSearch = (
  trains: Train[],
  stationLocation: string, 
  selectedStation: string
): Train[] => {
  return filterTrains(
    trains,
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
 * Route search utility that works with provided trains data
 */
export const performRouteSearch = (
  trains: Train[],
  fromLocation: string,
  selectedFromStation: string,
  toLocation: string,
  selectedToStation: string,
  routeSearchType: "from" | "to" | "both"
): Train[] => {
  let filteredTrains = trains;
  
  // Development logging (removed in production)
  if (import.meta.env.VITE_LOG_LEVEL === 'debug') {
    console.log("Route search parameters:", {
      fromLocation,
      selectedFromStation,
      toLocation,
      selectedToStation,
      routeSearchType
    });
  }
  
  // Filter trains based on route search type
  if (routeSearchType === "from") {
    // Show trains departing FROM the selected station
    if (selectedFromStation !== "ALL") {
      filteredTrains = filteredTrains.filter(train => train.from === selectedFromStation);
    }
    // Filter by country for from location
    if (fromLocation !== "ALL") {
      filteredTrains = filteredTrains.filter(train => train.country === fromLocation);
    }
  } else if (routeSearchType === "to") {
    // Show trains arriving TO the selected station
    if (selectedToStation !== "ALL") {
      filteredTrains = filteredTrains.filter(train => train.to === selectedToStation);
    }
    // Filter by country for to location
    if (toLocation !== "ALL") {
      filteredTrains = filteredTrains.filter(train => train.country === toLocation);
    }
  } else if (routeSearchType === "both") {
    // Show trains that match BOTH from and to criteria
    if (selectedFromStation !== "ALL" && selectedToStation !== "ALL") {
      filteredTrains = filteredTrains.filter(train => 
        train.from === selectedFromStation && train.to === selectedToStation
      );
    } else if (selectedFromStation !== "ALL") {
      // If only from is selected, show trains from that station
      filteredTrains = filteredTrains.filter(train => train.from === selectedFromStation);
      // Filter by from country
      if (fromLocation !== "ALL") {
        filteredTrains = filteredTrains.filter(train => train.country === fromLocation);
      }
    } else if (selectedToStation !== "ALL") {
      // If only to is selected, show trains to that station
      filteredTrains = filteredTrains.filter(train => train.to === selectedToStation);
      // Filter by to country
      if (toLocation !== "ALL") {
        filteredTrains = filteredTrains.filter(train => train.country === toLocation);
      }
    } else {
      // If neither station is selected, filter by country only
      if (fromLocation !== "ALL") {
        filteredTrains = filteredTrains.filter(train => train.country === fromLocation);
      } else if (toLocation !== "ALL") {
        filteredTrains = filteredTrains.filter(train => train.country === toLocation);
      }
    }
  }
  
  // Development logging (removed in production)
  if (import.meta.env.VITE_LOG_LEVEL === 'debug') {
    console.log("Filtered trains result:", filteredTrains.length);
  }
  
  return filteredTrains;
};
