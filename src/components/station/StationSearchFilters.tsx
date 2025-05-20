
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LocationSelector from "@/components/toolbar/LocationSelector";
import { DateRangePicker } from "@/components/datepicker/DateRangePicker";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

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
    <div className="bg-white">
      <Tabs 
        defaultValue={searchMode} 
        value={searchMode} 
        onValueChange={(value) => setSearchMode(value as SearchMode)}
        className="flex flex-col"
      >
        <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
          <TabsTrigger 
            value="station" 
            className="text-base py-4 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white text-gray-600 data-[state=active]:text-blue-600 relative z-10"
          >
            Sök efter station
          </TabsTrigger>
          <TabsTrigger 
            value="route" 
            className="text-base py-4 px-6 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white text-gray-600 data-[state=active]:text-blue-600 relative z-10"
          >
            Sök mellan stationer
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-16 px-6 pb-6 pt-4 border-t border-gray-100 relative -top-1 z-0">
          <TabsContent value="station" className="m-0 p-0">
            <div className="flex flex-row items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3 flex-wrap">
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
                variant="search"
                onClick={handleSearch}
                className="whitespace-nowrap"
              >
                Sök avgångar
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="route" className="m-0 p-0">
            <div className="space-y-6">
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
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-sm font-medium mb-2">Söktyp</div>
                  <RadioGroup 
                    defaultValue={routeSearchType}
                    value={routeSearchType}
                    onValueChange={(value) => setRouteSearchType(value as RouteSearchType)}
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
                
                <div className="flex flex-col md:flex-row items-center gap-4">
                  <DateRangePicker 
                    date={searchDate}
                    setDate={setSearchDate}
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                  />
                  
                  <Button 
                    variant="search"
                    onClick={handleSearch}
                    className="whitespace-nowrap w-full md:w-auto"
                  >
                    Sök rutter
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

export default StationSearchFilters;
