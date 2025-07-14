import { useState, useEffect, useMemo } from "react";
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
import { stationService, StationInfo } from "@/services/StationDataService";

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
  const [stationList, setStationList] = useState<StationInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const { favoriteStations } = useFavorites();

  // Load stations when location changes
  useEffect(() => {
    const loadStations = async () => {
      setLoading(true);
      try {
        const stations = await stationService.getStationsByCountry(location);
        setStationList(stations);
      } catch (error) {
        console.error('[StationDropdown] Failed to load stations:', error);
        // Fallback to empty list with "ALL" option
        setStationList([{ id: "ALL", name: "Alla stationer", country: location, isActive: true }]);
      } finally {
        setLoading(false);
      }
    };

    loadStations();
  }, [location]);

  // Get current station with memoization for performance
  const currentStation = useMemo(() => {
    return stationList.find(s => s.id === station) || stationList[0] || { id: "ALL", name: "Alla stationer", country: location, isActive: true };
  }, [stationList, station, location]);

  // Filter stations based on search with memoization for performance
  const filteredStations = useMemo(() => {
    if (!search) return stationList;
    
    return stationList.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.region?.toLowerCase().includes(search.toLowerCase())
    );
  }, [stationList, search]);

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
            disabled={loading}
          />
          <div className="max-h-[300px] overflow-y-auto">
            {loading ? (
              <div className="p-2 text-center text-sm text-muted-foreground">
                Laddar stationer...
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default StationDropdown;