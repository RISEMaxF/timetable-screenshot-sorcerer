
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
  showFlags?: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  setLocation,
  showFlags = false,
}) => {
  const [openLocation, setOpenLocation] = useState(false);
  const locations = Object.values(COUNTRIES);

  // Find the current country from our COUNTRIES object
  const currentCountry = COUNTRIES[location] || COUNTRIES.ALL;

  return (
    <div className="flex space-x-2">
      {/* Country dropdown */}
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
          <Command key={`country-${openLocation}`}>
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
    </div>
  );
};

export default LocationSelector;
