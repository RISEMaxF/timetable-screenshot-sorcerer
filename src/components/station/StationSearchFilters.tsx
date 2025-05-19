
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LocationSelector from "@/components/toolbar/LocationSelector";
import { DateRangePicker } from "@/components/datepicker/DateRangePicker";

type SearchMode = "station" | "route";
type RouteSearchType = "from" | "to" | "both";

interface StationSearchFiltersProps {
  searchMode: SearchMode;
  setSearchMode: (mode: SearchMode) => void;
  stationLocation: string;
  setStationLocation: (location: string) => void;
  selectedStation: string;
  setSelectedStation: (station: string) => void;
  fromLocation: string;
  setFromLocation: (location: string) => void;
  selectedFromStation: string;
  setSelectedFromStation: (station: string) => void;
  toLocation: string;
  setToLocation: (location: string) => void;
  selectedToStation: string;
  setSelectedToStation: (station: string) => void;
  searchDate: Date;
  setSearchDate: (date: Date) => void;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  routeSearchType: RouteSearchType;
  setRouteSearchType: (type: RouteSearchType) => void;
  handleSearch: () => void;
}

const StationSearchFilters = ({
  searchMode,
  setSearchMode,
  stationLocation,
  setStationLocation,
  selectedStation,
  setSelectedStation,
  fromLocation,
  setFromLocation,
  selectedFromStation,
  setSelectedFromStation,
  toLocation,
  setToLocation,
  selectedToStation,
  setSelectedToStation,
  searchDate,
  setSearchDate,
  selectedDates,
  setSelectedDates,
  routeSearchType,
  setRouteSearchType,
  handleSearch,
}: StationSearchFiltersProps) => {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex justify-center space-x-6 mb-4">
        <Button 
          variant={searchMode === "station" ? "default" : "outline"}
          onClick={() => setSearchMode("station")}
          className={searchMode === "station" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Sök efter station
        </Button>
        <Button 
          variant={searchMode === "route" ? "default" : "outline"}
          onClick={() => setSearchMode("route")}
          className={searchMode === "route" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Sök mellan stationer
        </Button>
      </div>
      
      {searchMode === "station" ? (
        <div className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <LocationSelector
              location={stationLocation}
              setLocation={setStationLocation}
              station={selectedStation}
              setStation={setSelectedStation} 
              showFlags={true}
            />
            
            <DateRangePicker 
              date={searchDate}
              setDate={setSearchDate}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
            />
          </div>
          
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSearch}
          >
            Sök avgångar
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6">
            <div className="flex-1">
              <div className="text-sm font-medium mb-2">Från station</div>
              <LocationSelector
                location={fromLocation}
                setLocation={setFromLocation}
                station={selectedFromStation}
                setStation={setSelectedFromStation} 
                showFlags={true}
              />
            </div>
            
            <div className="hidden md:flex items-center justify-center">
              <ArrowRight className="h-6 w-6 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <div className="text-sm font-medium mb-2">Till station</div>
              <LocationSelector
                location={toLocation}
                setLocation={setToLocation}
                station={selectedToStation}
                setStation={setSelectedToStation} 
                showFlags={true}
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium mb-2">Söktyp</div>
              <RadioGroup 
                defaultValue="both" 
                value={routeSearchType}
                onValueChange={(value) => setRouteSearchType(value as "from" | "to" | "both")}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="from" id="from" />
                  <label htmlFor="from" className="text-sm">Endast från</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="to" id="to" />
                  <label htmlFor="to" className="text-sm">Endast till</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="both" id="both" />
                  <label htmlFor="both" className="text-sm">Båda</label>
                </div>
              </RadioGroup>
            </div>
            
            <DateRangePicker 
              date={searchDate}
              setDate={setSearchDate}
              selectedDates={selectedDates}
              setSelectedDates={setSelectedDates}
            />
            
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleSearch}
            >
              Sök rutter
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default StationSearchFilters;
