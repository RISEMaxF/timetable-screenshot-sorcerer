
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COUNTRIES } from "@/constants/countries";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface LocationSelectorProps {
  location: string;
  setLocation: (location: string) => void;
  station?: string;
  setStation?: (station: string) => void;
  showFlags?: boolean;
}

// Nordic station names
const STATIONS = [
  { id: "ALL", name: "Alla stationer" },
  { id: "TAGHOLM", name: "Tågholm" },
  { id: "RALSBY", name: "Rälsby" },
  { id: "ANGALUND", name: "Ångalund" },
  { id: "LOKFORBERG", name: "Lokförberg" },
  { id: "JARNVAGSHAVN", name: "Järnvägshavn" },
  { id: "STATIONSDAL", name: "Stationsdal" },
  { id: "SPARAVIK", name: "Spåravik" },
  { id: "VAGNSJO", name: "Vagnsjö" },
  { id: "PENDELTORP", name: "Pendeltorp" },
  { id: "BILJETTFORS", name: "Biljettfors" },
  { id: "VAXELLUNDA", name: "Växellunda" },
  { id: "PERRONGBERG", name: "Perrongberg" },
  { id: "SIGNALFALT", name: "Signalfält" },
  { id: "KONDUKTORSBY", name: "Konduktörsby" },
  { id: "TUNNELO", name: "Tunnelö" },
];

const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  setLocation,
  station = "ALL",
  setStation = () => {},
  showFlags = false,
}) => {
  const [openCountry, setOpenCountry] = useState(false);
  const [openStation, setOpenStation] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const [stationSearch, setStationSearch] = useState("");

  // Get current country
  const currentCountry = COUNTRIES[location] || COUNTRIES.ALL;
  
  // Get current station
  const currentStation = STATIONS.find(s => s.id === station) || STATIONS[0];

  // Filter countries based on search
  const filteredCountries = Object.values(COUNTRIES).filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Filter stations based on search
  const filteredStations = STATIONS.filter(s =>
    s.name.toLowerCase().includes(stationSearch.toLowerCase())
  );

  return (
    <div className="flex space-x-2">
      {/* Country dropdown */}
      <Popover open={openCountry} onOpenChange={setOpenCountry}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[180px] justify-between bg-white"
          >
            <div className="flex items-center">
              {showFlags && (
                <img
                  src={currentCountry.flagUrl}
                  alt={`${currentCountry.name} flag`}
                  className="w-5 h-auto mr-2"
                />
              )}
              <span>{currentCountry.name}</span>
            </div>
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2">
          <div className="space-y-2">
            <Input
              placeholder="Sök land..."
              value={countrySearch}
              onChange={(e) => setCountrySearch(e.target.value)}
              className="h-8"
            />
            <div className="max-h-[300px] overflow-y-auto">
              {filteredCountries.length === 0 ? (
                <div className="py-2 text-center text-sm text-muted-foreground">
                  Inga träffar.
                </div>
              ) : (
                filteredCountries.map((country) => (
                  <div
                    key={country.code}
                    className={cn(
                      "flex items-center justify-between px-2 py-2 cursor-pointer rounded-md",
                      country.code === location ? "bg-accent" : "hover:bg-muted"
                    )}
                    onClick={() => {
                      setLocation(country.code);
                      setCountrySearch("");
                      setOpenCountry(false);
                    }}
                  >
                    <div className="flex items-center">
                      {showFlags && (
                        <img
                          src={country.flagUrl}
                          alt={`${country.name} flag`}
                          className="w-5 h-auto mr-2"
                        />
                      )}
                      <span>{country.name}</span>
                    </div>
                    {country.code === location && <Check className="h-4 w-4" />}
                  </div>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Station dropdown */}
      <Popover open={openStation} onOpenChange={setOpenStation}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[180px] justify-between bg-white"
          >
            <span>{currentStation.name}</span>
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-2">
          <div className="space-y-2">
            <Input
              placeholder="Sök station..."
              value={stationSearch}
              onChange={(e) => setStationSearch(e.target.value)}
              className="h-8"
            />
            <div className="max-h-[300px] overflow-y-auto">
              {filteredStations.length === 0 ? (
                <div className="py-2 text-center text-sm text-muted-foreground">
                  Inga träffar.
                </div>
              ) : (
                filteredStations.map((stn) => (
                  <div
                    key={stn.id}
                    className={cn(
                      "flex items-center justify-between px-2 py-2 cursor-pointer rounded-md",
                      stn.id === station ? "bg-accent" : "hover:bg-muted"
                    )}
                    onClick={() => {
                      setStation(stn.id);
                      setStationSearch("");
                      setOpenStation(false);
                    }}
                  >
                    <span>{stn.name}</span>
                    {stn.id === station && <Check className="h-4 w-4" />}
                  </div>
                ))
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationSelector;
