
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
  let filteredTrains = trainData;
  
  console.log("Route search debug:", {
    fromLocation,
    selectedFromStation,
    toLocation,
    selectedToStation,
    routeSearchType
  });
  
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
  
  console.log("Filtered trains result:", filteredTrains.length);
  
  return filteredTrains;
};
