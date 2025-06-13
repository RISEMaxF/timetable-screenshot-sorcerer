
import { useState, useEffect } from "react";
import { TrainDataProvider, useTrainData } from "../providers/TrainDataProvider";
import { useTrainOperations } from "../hooks/useTrainOperations";
import { TrainTimetable } from "../components/TrainTimetable";
import { Button } from "../components/ui/button";
import { ArrowLeft, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Train } from "../types/train";

const FavoritesContent = () => {
  const { trains } = useTrainData();
  const { handleTrainUpdate } = useTrainOperations();
  const [favoriteTrains, setFavoriteTrains] = useState<Train[]>([]);
  const [selectedTrains, setSelectedTrains] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteTrains");
    if (storedFavorites) {
      try {
        const favoriteIds = JSON.parse(storedFavorites);
        const favorites = trains.filter(train => favoriteIds.includes(train.id));
        setFavoriteTrains(favorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
        setFavoriteTrains([]);
      }
    }
  }, [trains]);

  const handleToggleSelection = (trainId: string) => {
    setSelectedTrains(prev => 
      prev.includes(trainId) 
        ? prev.filter(id => id !== trainId)
        : [...prev, trainId]
    );
  };

  const handleRemoveFromFavorites = () => {
    const storedFavorites = localStorage.getItem("favoriteTrains");
    if (storedFavorites && selectedTrains.length > 0) {
      try {
        const favoriteIds = JSON.parse(storedFavorites);
        const updatedFavorites = favoriteIds.filter((id: string) => !selectedTrains.includes(id));
        localStorage.setItem("favoriteTrains", JSON.stringify(updatedFavorites));
        
        setFavoriteTrains(prev => prev.filter(train => !selectedTrains.includes(train.id)));
        setSelectedTrains([]);
      } catch (error) {
        console.error("Error updating favorites:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Tillbaka
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-blue-600" />
              <h1 className="text-xl font-semibold">Favoriter</h1>
              <span className="text-sm text-gray-500">({favoriteTrains.length} tåg)</span>
            </div>
          </div>
          
          {selectedTrains.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleRemoveFromFavorites}
              className="text-red-600 hover:text-red-700"
            >
              Ta bort från favoriter ({selectedTrains.length})
            </Button>
          )}
        </div>
      </div>

      <div className="p-6">
        {favoriteTrains.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Inga favoriter än</h3>
            <p className="text-gray-500 mb-4">Lägg till tåg i favoriter för att se dem här</p>
            <Link to="/">
              <Button>Gå till tågschema</Button>
            </Link>
          </div>
        ) : (
          <TrainTimetable
            trains={favoriteTrains}
            onTrainUpdate={handleTrainUpdate}
            selectedTrains={selectedTrains}
            onToggleSelection={handleToggleSelection}
          />
        )}
      </div>
    </div>
  );
};

const Favorites = () => {
  return (
    <TrainDataProvider>
      <FavoritesContent />
    </TrainDataProvider>
  );
};

export default Favorites;
