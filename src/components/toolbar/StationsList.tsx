
import { Star, StarOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/contexts/FavoritesContext";

interface Station {
  id: string;
  name: string;
}

interface StationsListProps {
  stations: Station[];
  location: string;
  station: string;
  onStationSelect: (stationId: string) => void;
}

const StationsList: React.FC<StationsListProps> = ({
  stations,
  location,
  station,
  onStationSelect,
}) => {
  const { addFavoriteStation, removeFavoriteStation, isFavoriteStation } = useFavorites();

  const toggleFavorite = (stationId: string, stationName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (stationId === "ALL") return; // Don't allow favoriting "All stations"
    
    if (isFavoriteStation(stationId, location)) {
      removeFavoriteStation(stationId, location);
    } else {
      addFavoriteStation({
        id: stationId,
        name: stationName,
        country: location
      });
    }
  };

  return (
    <>
      <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
        Alla stationer
      </div>
      {stations.length === 0 ? (
        <div className="py-2 text-center text-sm text-muted-foreground">
          Inga träffar.
        </div>
      ) : (
        stations.map((stn) => (
          <div
            key={stn.id}
            className={cn(
              "flex items-center justify-between px-2 py-2 cursor-pointer rounded-md",
              stn.id === station ? "bg-accent" : "hover:bg-muted"
            )}
            onClick={() => onStationSelect(stn.id)}
          >
            <div className="flex items-center">
              <span>{stn.name}</span>
            </div>
            <div className="flex items-center">
              {stn.id !== "ALL" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 p-0 hover:bg-transparent"
                  onClick={(e) => toggleFavorite(stn.id, stn.name, e)}
                >
                  {isFavoriteStation(stn.id, location) ? (
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                  ) : (
                    <StarOff className="h-3 w-3 text-muted-foreground" />
                  )}
                </Button>
              )}
              {stn.id === station && <Check className="h-4 w-4 ml-1" />}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default StationsList;
