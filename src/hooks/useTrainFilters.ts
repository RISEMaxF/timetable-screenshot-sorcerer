import { useState, useMemo } from "react";
import { Train } from "@/types/train";
import { filterTrains } from "@/utils/searchUtils";
import { useFavorites } from "@/contexts/FavoritesContext";
import { DEFAULT_VALUES, FilterStatus, SortDirection } from "@/constants/app";

export interface TrainFiltersState {
  searchTerm: string;
  exactMatch: boolean;
  filterStatus: FilterStatus;
  sortField: keyof Train | null;
  sortDirection: SortDirection;
  selectedCountry: string;
  selectedStation: string;
  searchableColumns: string[];
  location: string;
}

export const useTrainFilters = (trains: Train[], showFavorites: boolean) => {
  const { isFavoriteStation } = useFavorites();
  
  const [filters, setFilters] = useState<TrainFiltersState>({
    searchTerm: "",
    exactMatch: false,
    filterStatus: DEFAULT_VALUES.FILTER_STATUS,
    sortField: null,
    sortDirection: DEFAULT_VALUES.SORT_DIRECTION,
    selectedCountry: DEFAULT_VALUES.COUNTRY,
    selectedStation: DEFAULT_VALUES.STATION,
    searchableColumns: DEFAULT_VALUES.SEARCHABLE_COLUMNS,
    location: DEFAULT_VALUES.LOCATION,
  });

  const updateFilter = <K extends keyof TrainFiltersState>(
    key: K,
    value: TrainFiltersState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSort = (field: keyof Train) => {
    if (filters.sortField === field) {
      updateFilter("sortDirection", filters.sortDirection === "asc" ? "desc" : "asc");
    } else {
      updateFilter("sortField", field);
      updateFilter("sortDirection", "asc");
    }
  };

  const filteredTrains = useMemo(() => {
    let trainsToFilter = trains;
    
    if (showFavorites) {
      trainsToFilter = trains.filter(train => 
        train.from && isFavoriteStation(train.from, train.country)
      );
    }
    
    return filterTrains(
      trainsToFilter,
      filters.searchTerm,
      filters.filterStatus,
      filters.exactMatch,
      filters.sortField,
      filters.sortDirection,
      filters.selectedCountry,
      filters.selectedStation,
      filters.searchableColumns
    );
  }, [
    trains,
    filters.searchTerm,
    filters.filterStatus,
    filters.exactMatch,
    filters.sortField,
    filters.sortDirection,
    filters.selectedCountry,
    filters.selectedStation,
    filters.searchableColumns,
    showFavorites,
    isFavoriteStation
  ]);

  const hasActiveFilters = () => {
    return (
      filters.filterStatus !== DEFAULT_VALUES.FILTER_STATUS ||
      filters.selectedCountry !== DEFAULT_VALUES.COUNTRY ||
      filters.selectedStation !== DEFAULT_VALUES.STATION ||
      showFavorites
    );
  };

  return {
    filters,
    updateFilter,
    handleSort,
    filteredTrains,
    hasActiveFilters,
  };
};