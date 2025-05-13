
import { useState } from "react";
import { Link } from "react-router-dom";
import { Building2, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import LocationSelector from "@/components/toolbar/LocationSelector";
import { DateRangePicker } from "@/components/datepicker/DateRangePicker";

const StationSearch = () => {
  const [stationLocation, setStationLocation] = useState("ALL");
  const [searchDate, setSearchDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
  
  // Function to handle search
  const handleSearch = () => {
    console.log("Searching for trains at location:", stationLocation);
    console.log("Date:", searchDate);
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
                Tågtidtabell
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
          <div className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <LocationSelector
                location={stationLocation}
                setLocation={setStationLocation} 
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
          
          <div className="p-8 text-center text-gray-500">
            <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium mb-2">Välj land och datum</h3>
            <p>Välj ett land och datum för att visa avgångar</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StationSearch;
