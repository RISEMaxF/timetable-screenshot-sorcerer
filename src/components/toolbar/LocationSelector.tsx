
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

  const getLocationIcon = () => {
    switch (location) {
      case "SE": return <Flag className="h-4 w-4" />;
      case "NO": return <Flag className="h-4 w-4" />;
      case "DK": return <Flag className="h-4 w-4" />;
      case "FI": return <Flag className="h-4 w-4" />;
      case "DE": return <Flag className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex items-center gap-3">
      <Select value={location} onValueChange={setLocation}>
        <SelectTrigger className="w-[140px]">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <SelectValue placeholder="Välj land" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">Alla länder</SelectItem>
          <SelectItem value="SE">Sverige</SelectItem>
          <SelectItem value="NO">Norge</SelectItem>
          <SelectItem value="DK">Danmark</SelectItem>
          <SelectItem value="FI">Finland</SelectItem>
          <SelectItem value="DE">Tyskland</SelectItem>
        </SelectContent>
      </Select>

      <Select value={station} onValueChange={setStation}>
        <SelectTrigger className="w-[180px]">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <SelectValue placeholder="Välj station" />
          </div>
        </SelectTrigger>
        <SelectContent>
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
