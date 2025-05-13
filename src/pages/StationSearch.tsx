
import { useState } from "react";
import { TrainFront, Building2 } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import LocationSelector from "@/components/toolbar/LocationSelector";

const StationSearch = () => {
  const [stationLocation, setStationLocation] = useState("ALL");
  const [stationName, setStationName] = useState("ALL");
  const [searchDate, setSearchDate] = useState(new Date());

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Building2 className="h-8 w-8 mr-2 text-blue-600" />
            Stationsök
          </h1>
          <div className="flex items-center gap-4">
            <img 
              src="https://www.ri.se/themes/rise/dist/images/rise-logo-black.svg" 
              alt="RISE Logo" 
              className="h-12"
            />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <LocationSelector
                location={stationLocation}
                setLocation={setStationLocation} 
                station={stationName}
                setStation={setStationName}
                showFlags={true}
              />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-10 px-3 rounded-full bg-white border-gray-200 shadow-sm hover:bg-gray-50">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    {format(searchDate, "PPP", { locale: sv })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border border-gray-100 shadow-lg rounded-lg">
                  <Calendar
                    mode="single"
                    selected={searchDate}
                    onSelect={(newDate) => newDate && setSearchDate(newDate)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    locale={sv}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              Sök avgångar
            </Button>
          </div>
          
          <div className="p-8 text-center text-gray-500">
            <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Ingen station vald</h3>
            <p>Välj en station och datum för att visa avgångar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationSearch;
