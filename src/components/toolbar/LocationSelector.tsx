
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

// Nordic station names by country
const STATIONS = {
  SE: [
    { id: "ALL", name: "Alla stationer" },
    { id: "Tågholm", name: "Tågholm" },
    { id: "Rälsby", name: "Rälsby" },
    { id: "Ångalund", name: "Ångalund" },
    { id: "Lokförberg", name: "Lokförberg" },
    { id: "Järnvägshavn", name: "Järnvägshavn" },
    { id: "Stationsdal", name: "Stationsdal" },
    { id: "Spåravik", name: "Spåravik" },
    { id: "Vagnsjö", name: "Vagnsjö" },
    { id: "Pendeltorp", name: "Pendeltorp" },
    { id: "Biljettfors", name: "Biljettfors" },
    { id: "Växellunda", name: "Växellunda" },
    { id: "Perrongberg", name: "Perrongberg" },
    { id: "Signalfält", name: "Signalfält" },
    { id: "Konduktörsby", name: "Konduktörsby" },
    { id: "Tunnelö", name: "Tunnelö" },
  ],
  DK: [
    { id: "ALL", name: "Alla stationer" },
    { id: "Togø", name: "Togø" },
    { id: "Skinnerup", name: "Skinnerup" },
    { id: "Dampholm", name: "Dampholm" },
    { id: "Lokomotivbjerg", name: "Lokomotivbjerg" },
    { id: "Jernbanehavn", name: "Jernbanehavn" },
    { id: "Stationsdal", name: "Stationsdal" },
    { id: "Sporvig", name: "Sporvig" },
    { id: "Vognssø", name: "Vognssø" },
    { id: "Pendlertorp", name: "Pendlertorp" },
    { id: "Billetfos", name: "Billetfos" },
    { id: "Skiftemark", name: "Skiftemark" },
    { id: "Perronbjerg", name: "Perronbjerg" },
    { id: "Signalmark", name: "Signalmark" },
    { id: "Konduktørby", name: "Konduktørby" },
    { id: "Tunnelø", name: "Tunnelø" },
  ],
  FI: [
    { id: "ALL", name: "Alla stationer" },
    { id: "Junasaari", name: "Junasaari" },
    { id: "Kiskoila", name: "Kiskoila" },
    { id: "Höyrylahti", name: "Höyrylahti" },
    { id: "Veturivuori", name: "Veturivuori" },
    { id: "Rautatiesatama", name: "Rautatiesatama" },
    { id: "Asemalaakso", name: "Asemalaakso" },
    { id: "Raideniemi", name: "Raideniemi" },
    { id: "Vaunujärvi", name: "Vaunujärvi" },
    { id: "Pendelöikylä", name: "Pendelöikylä" },
    { id: "Lippukoski", name: "Lippukoski" },
    { id: "Vaihdeniitty", name: "Vaihdeniitty" },
    { id: "Laiturikallio", name: "Laiturikallio" },
    { id: "Signaalipelto", name: "Signaalipelto" },
    { id: "Konduktöörikylä", name: "Konduktöörikylä" },
    { id: "Tunnelinluoto", name: "Tunnelinluoto" },
  ],
  NO: [
    { id: "ALL", name: "Alla stationer" },
    { id: "Oslo", name: "Oslo" },
    { id: "Bergen", name: "Bergen" },
    { id: "Trondheim", name: "Trondheim" },
    { id: "Stavanger", name: "Stavanger" },
    { id: "Drammen", name: "Drammen" },
    { id: "Kristiansand", name: "Kristiansand" },
    { id: "Bodø", name: "Bodø" },
    { id: "Narvik", name: "Narvik" },
    { id: "Fauske", name: "Fauske" },
    { id: "Tromsø", name: "Tromsø" },
    { id: "Halden", name: "Halden" },
    { id: "Moss", name: "Moss" },
  ],
  ALL: [
    { id: "ALL", name: "Alla stationer" },
  ]
};

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
  
  // Get station list based on selected country
  const stationList = STATIONS[location] || STATIONS.ALL;
  
  // Get current station
  const currentStation = stationList.find(s => s.id === station) || stationList[0];

  // Filter countries based on search
  const filteredCountries = Object.values(COUNTRIES).filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Filter stations based on search
  const filteredStations = stationList.filter(s =>
    s.name.toLowerCase().includes(stationSearch.toLowerCase())
  );

  // Handle country change - reset station to ALL when country changes
  const handleCountryChange = (countryCode: string) => {
    setLocation(countryCode);
    setStation("ALL");
    setCountrySearch("");
    setOpenCountry(false);
  };

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
                    onClick={() => handleCountryChange(country.code)}
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
