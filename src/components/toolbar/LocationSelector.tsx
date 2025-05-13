
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COUNTRIES } from "@/constants/countries";
import { cn } from "@/lib/utils";

interface LocationSelectorProps {
  location: string;
  setLocation: (location: string) => void;
  station: string;
  setStation: (station: string) => void;
  showFlags?: boolean;
}

const locations = Object.values(COUNTRIES);

const stations = [
  { value: "ALL", label: "Alla stationer" },
  { value: "Stockholm", label: "Stockholm" },
  { value: "Göteborg", label: "Göteborg" },
  { value: "Malmö", label: "Malmö" },
  { value: "Uppsala", label: "Uppsala" },
  { value: "Linköping", label: "Linköping" },
  { value: "Oslo", label: "Oslo" },
  { value: "Köpenhamn", label: "Köpenhamn" },
  { value: "Helsinki", label: "Helsinki" },
  // Add the requested placeholder stations
  { value: "Tågholm", label: "Tågholm" },
  { value: "Rälsby", label: "Rälsby" },
  { value: "Ångalund", label: "Ångalund" },
  { value: "Lokförberg", label: "Lokförberg" },
  { value: "Järnvägshavn", label: "Järnvägshavn" },
  { value: "Stationsdal", label: "Stationsdal" },
  { value: "Spåravik", label: "Spåravik" },
  { value: "Vagnsjö", label: "Vagnsjö" },
  { value: "Pendeltorp", label: "Pendeltorp" },
  { value: "Biljettfors", label: "Biljettfors" },
  { value: "Växellunda", label: "Växellunda" },
  { value: "Perrongberg", label: "Perrongberg" },
  { value: "Signalfält", label: "Signalfält" },
  { value: "Konduktörsby", label: "Konduktörsby" },
  { value: "Tunnelö", label: "Tunnelö" },
];

const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  setLocation,
  station,
  setStation,
  showFlags = false,
}) => {
  const [openLocation, setOpenLocation] = useState(false);
  const [openStation, setOpenStation] = useState(false);

  // Find the current country from our COUNTRIES object
  const currentCountry = COUNTRIES[location] || COUNTRIES.ALL;

  // Find the selected station or default to "Välj station"
  const selectedStation = stations.find((s) => s.value === station);
  const stationLabel = selectedStation ? selectedStation.label : "Välj station";

  return (
    <div className="flex space-x-2">
      <Popover open={openLocation} onOpenChange={setOpenLocation}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openLocation}
            aria-label="Select a country"
            className="w-[180px] justify-between bg-white"
          >
            <div className="flex items-center">
              {showFlags && currentCountry && (
                <img
                  src={currentCountry.flagUrl}
                  alt={`${currentCountry.name} flag`}
                  className="w-5 h-auto mr-2"
                />
              )}
              <span>{currentCountry ? currentCountry.name : "Välj ett land"}</span>
            </div>
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Sök land..." />
            <CommandEmpty>Inga träffar.</CommandEmpty>
            <CommandGroup heading="Länder">
              {locations.map((country) => (
                <CommandItem
                  key={country.code}
                  value={country.code}
                  onSelect={(currentValue) => {
                    setLocation(currentValue);
                    setOpenLocation(false);
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
                    {country.name}
                  </div>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      location === country.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openStation} onOpenChange={setOpenStation}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openStation}
            aria-label="Select a station"
            className="w-[180px] justify-between bg-white"
          >
            {stationLabel}
            <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Sök station..." />
            <CommandEmpty>Inga träffar.</CommandEmpty>
            <CommandGroup heading="Stationer">
              {stations.map((s) => (
                <CommandItem
                  key={s.value}
                  value={s.value}
                  onSelect={(currentValue) => {
                    setStation(currentValue);
                    setOpenStation(false);
                  }}
                >
                  {s.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      station === s.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationSelector;
