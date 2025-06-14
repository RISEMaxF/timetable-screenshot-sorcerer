
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import FavoriteStationsList from "./FavoriteStationsList";
import StationsList from "./StationsList";
import { useFavorites } from "@/contexts/FavoritesContext";

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

interface StationDropdownProps {
  location: string;
  station: string;
  onStationChange: (station: string) => void;
}

const StationDropdown: React.FC<StationDropdownProps> = ({
  location,
  station,
  onStationChange,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const { favoriteStations } = useFavorites();

  // Get station list based on selected country
  const stationList = STATIONS[location] || STATIONS.ALL;
  
  // Get current station
  const currentStation = stationList.find(s => s.id === station) || stationList[0];

  // Filter stations based on search
  const filteredStations = stationList.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  // Get favorite stations for current country
  const currentCountryFavorites = favoriteStations.filter(fav => fav.country === location);

  const handleStationSelect = (stationId: string) => {
    onStationChange(stationId);
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
          <span>{currentStation.name}</span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-2">
        <div className="space-y-2">
          <Input
            placeholder="Sök station..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
          <div className="max-h-[300px] overflow-y-auto">
            {/* Favorite stations section */}
            <FavoriteStationsList
              location={location}
              station={station}
              onStationSelect={handleStationSelect}
            />
            
            {currentCountryFavorites.length > 0 && (
              <Separator className="my-2" />
            )}

            {/* All stations section */}
            <StationsList
              stations={filteredStations}
              location={location}
              station={station}
              onStationSelect={handleStationSelect}
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StationDropdown;
