
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

interface CountryDropdownProps {
  location: string;
  onLocationChange: (location: string) => void;
  showFlags?: boolean;
}

const CountryDropdown: React.FC<CountryDropdownProps> = ({
  location,
  onLocationChange,
  showFlags = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  // Get current country
  const currentCountry = COUNTRIES[location] || COUNTRIES.ALL;

  // Filter countries based on search
  const filteredCountries = Object.values(COUNTRIES).filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleCountryChange = (countryCode: string) => {
    onLocationChange(countryCode);
    setSearch("");
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[180px] justify-between bg-background"
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
  );
};

export default CountryDropdown;
