
import { Train } from "../types/train";
import { fuzzyMatch, partialWordMatch } from "./fuzzySearch";

export function filterTrains(
  trains: Train[],
  searchTerm: string,
  filterStatus: "all" | "completed" | "pending",
  exactMatch: boolean,
  sortField: keyof Train | null,
  sortDirection: "asc" | "desc",
  selectedCountry: string = "ALL",
  selectedStation: string = "ALL",
  searchableColumns: string[] = ["all"]
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

  // Filter by search term with improved fuzzy matching
  if (searchTerm) {
    const searchLower = searchTerm.toLowerCase();
    filteredTrains = filteredTrains.filter((train) => {
      // If we're searching in all columns or no columns are selected
      if (searchableColumns.includes("all") || searchableColumns.length === 0) {
        if (exactMatch) {
          return (
            train.id === searchTerm ||
            train.announcedTrainNumber === searchTerm ||
            train.operator === searchTerm
          );
        } else {
          // Enhanced flexible search - try multiple matching strategies
          const fieldsToSearch = [
            train.id,
            train.announcedTrainNumber || "",
            train.operator,
            train.from || "",
            train.to || "",
            train.track || ""
          ];

          return fieldsToSearch.some(field => {
            const fieldStr = field.toString();
            
            // Try exact substring match first (fastest)
            if (fieldStr.toLowerCase().includes(searchLower)) {
              return true;
            }
            
            // Try fuzzy matching for typos and variations
            if (fuzzyMatch(searchTerm, fieldStr)) {
              return true;
            }
            
            // Try partial word matching
            if (partialWordMatch(searchTerm, fieldStr)) {
              return true;
            }
            
            return false;
          });
        }
      } 
      
      // If specific columns are selected
      return searchableColumns.some(column => {
        const value = train[column as keyof Train];
        if (value === null || value === undefined) return false;
        
        const valueStr = value.toString();
        
        if (exactMatch) {
          return valueStr === searchTerm;
        } else {
          // Enhanced flexible search for specific columns
          return (
            valueStr.toLowerCase().includes(searchLower) ||
            fuzzyMatch(searchTerm, valueStr) ||
            partialWordMatch(searchTerm, valueStr)
          );
        }
      });
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
