// Application-wide constants to eliminate magic strings and values

export const DEFAULT_VALUES = {
  LOCATION: "SE",
  STATION: "ALL",
  COUNTRY: "ALL",
  FILTER_STATUS: "all" as const,
  SEARCHABLE_COLUMNS: ["all"] as string[],
  SORT_DIRECTION: "asc" as const,
} as const;

export const FILTER_STATUS_OPTIONS = {
  ALL: "all",
  COMPLETED: "completed",
  PENDING: "pending",
} as const;

export const LAYOUT_BREAKPOINTS = {
  TABLE_WIDTH: {
    LARGE: "lg:w-2/3 xl:w-3/4",
    SIDEBAR: "lg:w-1/3 xl:w-1/4",
  },
  GAPS: {
    SMALL: "gap-2",
    MEDIUM: "gap-4", 
    LARGE: "gap-6",
  },
} as const;

export const UI_TEXT = {
  NO_TRAIN_SELECTED: "Välj ett tåg för att se detaljinformation",
  SHOW_ALL_TRAINS: "Visa alla tåg",
  SHOW_FAVORITES: "Visa favoriter",
  ALL_STATIONS: "Alla stationer",
  SEARCH_PLACEHOLDER: "Sök tåg...",
} as const;

export const ICON_SIZES = {
  SMALL: "h-4 w-4",
  MEDIUM: "h-5 w-5",
  LARGE: "h-12 w-12",
} as const;

export type FilterStatus = typeof FILTER_STATUS_OPTIONS[keyof typeof FILTER_STATUS_OPTIONS];
export type SortDirection = "asc" | "desc";