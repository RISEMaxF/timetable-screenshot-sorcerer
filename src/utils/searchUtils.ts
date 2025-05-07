
import { Train } from "@/types/train";

export const fuzzyMatch = (text: string | undefined | null, search: string, exactMatch: boolean): boolean => {
  if (!text) return false;
  if (!search.trim()) return true;
  
  const searchLower = search.toLowerCase();
  const textLower = text.toString().toLowerCase();
  
  // For exact match
  if (exactMatch) {
    return textLower.includes(searchLower);
  }
  
  // For fuzzy match - check if characters appear in sequence
  let searchIndex = 0;
  for (let i = 0; i < textLower.length && searchIndex < searchLower.length; i++) {
    if (textLower[i] === searchLower[searchIndex]) {
      searchIndex++;
    }
  }
  
  return searchIndex === searchLower.length;
};

export const filterTrains = (
  trains: Train[], 
  searchTerm: string, 
  filterStatus: "all" | "completed" | "pending",
  exactMatch: boolean,
  sortField: keyof Train | null,
  sortDirection: "asc" | "desc"
): Train[] => {
  let result = [...trains];
  
  // Apply search filter
  if (searchTerm.trim()) {
    result = result.filter(
      train => 
        fuzzyMatch(train.id, searchTerm, exactMatch) || 
        fuzzyMatch(train.operator, searchTerm, exactMatch) ||
        fuzzyMatch(train.track?.toString(), searchTerm, exactMatch) ||
        fuzzyMatch(train.notes, searchTerm, exactMatch)
    );
  }
  
  // Apply status filter
  if (filterStatus === "completed") {
    result = result.filter(train => train.completed);
  } else if (filterStatus === "pending") {
    result = result.filter(train => !train.completed);
  }
  
  // Apply sorting
  if (sortField) {
    result.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === undefined || aValue === null) return sortDirection === "asc" ? -1 : 1;
      if (bValue === undefined || bValue === null) return sortDirection === "asc" ? 1 : -1;
      
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return sortDirection === "asc" 
        ? (aValue > bValue ? 1 : -1)
        : (aValue > bValue ? -1 : 1);
    });
  }
  
  return result;
};
