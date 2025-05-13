
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Flag, Globe, Building2 } from "lucide-react";

interface LocationSelectorProps {
  location: string;
  setLocation: (location: string) => void;
  station: string;
  setStation: (station: string) => void;
}

const LocationSelector = ({ 
  location, 
  setLocation, 
  station, 
  setStation 
}: LocationSelectorProps) => {
  const stations = {
    "ALL": "Alla stationer",
    "SE": {
      "STO": "Stockholm C",
      "GOT": "Göteborg C",
      "MAL": "Malmö C",
      "UPP": "Uppsala C",
      "HAG": "Hagalund"
    },
    "NO": {
      "OSL": "Oslo S",
      "BER": "Bergen",
      "TRO": "Trondheim"
    },
    "DK": {
      "CPH": "København H",
      "ARH": "Aarhus H"
    },
    "FI": {
      "HEL": "Helsinki",
      "TAM": "Tampere"
    },
    "DE": {
      "BER": "Berlin Hbf",
      "HAM": "Hamburg Hbf",
      "MUN": "München Hbf"
    }
  };

  const getStationsForLocation = () => {
    if (location === "ALL") return [{ value: "ALL", label: "Alla stationer" }];
    
    const locationStations = stations[location as keyof typeof stations];
    if (typeof locationStations === 'object') {
      return [
        { value: "ALL", label: "Alla stationer" },
        ...Object.entries(locationStations).map(([value, label]) => ({ value, label }))
      ];
    }
    
    return [{ value: "ALL", label: "Alla stationer" }];
  };

  const availableStations = getStationsForLocation();

  return (
    <div className="flex items-center gap-3">
      <Select value={location} onValueChange={(val) => { setLocation(val); setStation("ALL"); }}>
        <SelectTrigger className="w-[180px] rounded-full bg-white border-gray-200 shadow-sm hover:bg-gray-50">
          <div className="flex items-center gap-2">
            {location === "ALL" ? (
              <Globe className="h-4 w-4 text-gray-500" />
            ) : (
              <Flag className="h-4 w-4 text-gray-500" />
            )}
            <SelectValue placeholder="Välj land" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-100 shadow-lg rounded-lg">
          <SelectItem value="ALL">
            <div className="flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" />
              <span>Alla länder</span>
            </div>
          </SelectItem>
          <SelectItem value="SE">
            <div className="flex items-center gap-2">
              <Flag className="h-3.5 w-3.5" />
              <span>Sverige</span>
            </div>
          </SelectItem>
          <SelectItem value="NO">
            <div className="flex items-center gap-2">
              <Flag className="h-3.5 w-3.5" />
              <span>Norge</span>
            </div>
          </SelectItem>
          <SelectItem value="DK">
            <div className="flex items-center gap-2">
              <Flag className="h-3.5 w-3.5" />
              <span>Danmark</span>
            </div>
          </SelectItem>
          <SelectItem value="FI">
            <div className="flex items-center gap-2">
              <Flag className="h-3.5 w-3.5" />
              <span>Finland</span>
            </div>
          </SelectItem>
          <SelectItem value="DE">
            <div className="flex items-center gap-2">
              <Flag className="h-3.5 w-3.5" />
              <span>Tyskland</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      <Select value={station} onValueChange={setStation}>
        <SelectTrigger className="w-[220px] rounded-full bg-white border-gray-200 shadow-sm hover:bg-gray-50">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-gray-500" />
            <SelectValue placeholder="Välj station" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-100 shadow-lg rounded-lg">
          {availableStations.map((station) => (
            <SelectItem key={station.value} value={station.value}>
              {station.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationSelector;
