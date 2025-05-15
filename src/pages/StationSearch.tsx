
import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, TrainFront, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import LocationSelector from "@/components/toolbar/LocationSelector";
import { DateRangePicker } from "@/components/datepicker/DateRangePicker";
import { trainData } from "@/data/trainData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { filterTrains } from "@/utils/searchUtils";
import { cn } from "@/lib/utils";

type SearchMode = "station" | "route";

const StationSearch = () => {
  const [searchMode, setSearchMode] = useState<SearchMode>("station");
  const [stationLocation, setStationLocation] = useState("ALL");
  const [selectedStation, setSelectedStation] = useState("ALL");
  const [fromLocation, setFromLocation] = useState("ALL");
  const [selectedFromStation, setSelectedFromStation] = useState("ALL");
  const [toLocation, setToLocation] = useState("ALL");
  const [selectedToStation, setSelectedToStation] = useState("ALL");
  const [searchDate, setSearchDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
  const [searchResults, setSearchResults] = useState(trainData);
  const [hasSearched, setHasSearched] = useState(false);
  const [routeSearchType, setRouteSearchType] = useState<"from" | "to" | "both">("both");
  
  // Function to handle search
  const handleSearch = () => {
    let filteredTrains = [];
    
    if (searchMode === "station") {
      console.log("Searching for trains at location:", stationLocation);
      console.log("Selected station:", selectedStation);
      
      // Filter trains based on selected country and station
      filteredTrains = filterTrains(
        trainData,
        "",
        "all",
        false,
        null,
        "asc",
        stationLocation,
        selectedStation
      );
    } else {
      // Route search mode
      console.log("Searching for route from:", selectedFromStation, "to:", selectedToStation);
      console.log("Route search type:", routeSearchType);
      
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
    }
    
    setSearchResults(filteredTrains);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Building2 className="h-8 w-8 mr-2 text-blue-600" />
            Stationsök
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2">
                <TrainFront className="h-4 w-4" />
                Tåginfo
              </Button>
            </Link>
            <img 
              src="https://www.ri.se/themes/rise/dist/images/rise-logo-black.svg" 
              alt="RISE Logo" 
              className="h-12"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
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
          
          {!hasSearched ? (
            <div className="p-8 text-center text-gray-500">
              <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">
                {searchMode === "station" ? "Välj land och station" : "Välj sträcka"}
              </h3>
              <p>
                {searchMode === "station" 
                  ? "Välj ett land, station och datum för att visa avgångar"
                  : "Välj från och till stationer för att visa tåg mellan dem"}
              </p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium mb-2">Inga resultat</h3>
              <p>Inga tåg hittades för de valda kriterierna</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Tåg ID</TableHead>
                    <TableHead>Operator</TableHead>
                    <TableHead>Från</TableHead>
                    <TableHead>Till</TableHead>
                    <TableHead>Ankomsttid</TableHead>
                    <TableHead>Spår</TableHead>
                    <TableHead>Land</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {searchResults.map((train, index) => (
                    <TableRow 
                      key={train.id}
                      className={cn(
                        index % 2 === 0 ? "bg-white" : "bg-gray-50",
                        train.highlighted ? "bg-pink-50" : ""
                      )}
                    >
                      <TableCell className="font-medium">{train.id}</TableCell>
                      <TableCell>{train.operator}</TableCell>
                      <TableCell>{train.from || "-"}</TableCell>
                      <TableCell>{train.to || "-"}</TableCell>
                      <TableCell>{train.arrivalTime || "-"}</TableCell>
                      <TableCell>{train.track || "-"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img 
                            src={`https://flagcdn.com/w20/${train.country.toLowerCase()}.png`} 
                            alt={train.country} 
                            className="w-5 h-auto"
                          />
                          {train.country}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StationSearch;
