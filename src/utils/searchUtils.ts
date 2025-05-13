
import { Train } from "../types/train";

export function filterTrains(
  trains: Train[],
  searchTerm: string,
  filterStatus: "all" | "completed" | "pending",
  exactMatch: boolean,
  sortField: keyof Train | null,
  sortDirection: "asc" | "desc",
  selectedCountry: string = "ALL",
  selectedStation: string = "ALL"
): Train[] {
  // First, filter by country if not ALL
  let filteredTrains = trains;
  if (selectedCountry !== "ALL") {
    filteredTrains = trains.filter((train) => train.country === selectedCountry);
  }
  
  // Then filter by station if not ALL
  if (selectedStation !== "ALL") {
    filteredTrains = filteredTrains.filter((train) => 
      train.from === selectedStation || train.to === selectedStation
    );
  }

  // Filter by search term
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredTrains = filteredTrains.filter((train) => {
      if (exactMatch) {
        return (
          train.id === searchTerm ||
          train.announcedTrainNumber === searchTerm ||
          train.operator === searchTerm
        );
      } else {
        return (
          train.id.toLowerCase().includes(searchLower) ||
          (train.announcedTrainNumber || "").toLowerCase().includes(searchLower) ||
          train.operator.toLowerCase().includes(searchLower) ||
          (train.from || "").toLowerCase().includes(searchLower) ||
          (train.to || "").toLowerCase().includes(searchLower)
        );
      }
    });
  }

  // Filter by status
  if (filterStatus !== "all") {
    filteredTrains = filteredTrains.filter((train) => {
      if (filterStatus === "completed") {
        return train.completed;
      } else {
        return !train.completed;
      }
    });
  }

  // Sort results if sortField is provided
  if (sortField) {
    filteredTrains = [...filteredTrains].sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (valueA === null || valueA === undefined) return sortDirection === "asc" ? 1 : -1;
      if (valueB === null || valueB === undefined) return sortDirection === "asc" ? -1 : 1;
      
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA;
      }
      
      if (typeof valueA === "boolean" && typeof valueB === "boolean") {
        return sortDirection === "asc"
          ? (valueA ? 1 : 0) - (valueB ? 1 : 0)
          : (valueB ? 1 : 0) - (valueA ? 1 : 0);
      }
      
      return 0;
    });
  }

  return filteredTrains;
}
