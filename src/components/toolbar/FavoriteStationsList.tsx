
import { Star, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/contexts/FavoritesContext";

interface FavoriteStationsListProps {
  location: string;
  station: string;
  onStationSelect: (stationId: string) => void;
}

const FavoriteStationsList: React.FC<FavoriteStationsListProps> = ({
  location,
  station,
  onStationSelect,
}) => {
  const { favoriteStations } = useFavorites();

  // Get favorite stations for current country
  const currentCountryFavorites = favoriteStations.filter(fav => fav.country === location);

  // Don't render anything if there are no favorites
  if (currentCountryFavorites.length === 0) {
    return null;
  }

  return (
    <>
      <div className="px-2 py-1 text-xs font-medium text-muted-foreground">
        Favoriter
      </div>
      {currentCountryFavorites.map((fav) => (
        <div
          key={`fav-${fav.id}`}
          className={cn(
            "flex items-center justify-between px-2 py-2 cursor-pointer rounded-md",
            fav.id === station ? "bg-accent" : "hover:bg-muted"
          )}
          onClick={() => onStationSelect(fav.id)}
        >
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-500 mr-2" />
            <span>{fav.name}</span>
          </div>
          {fav.id === station && <Check className="h-4 w-4" />}
        </div>
      ))}
    </>
  );
};

export default FavoriteStationsList;
