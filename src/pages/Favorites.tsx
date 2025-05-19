
import { useState, useEffect } from "react";
import { Table, TableBody } from "@/components/ui/table";
import TrainTableHeader from "@/components/table/TrainTableHeader";
import TrainTableRow from "@/components/table/TrainTableRow";
import EmptyState from "@/components/table/EmptyState";
import { Train } from "@/types/train";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favoriteTrains, setFavoriteTrains] = useState<Train[]>([]);
  const [selectedTrainIds, setSelectedTrainIds] = useState<string[]>([]);
  const [sortField, setSortField] = useState<keyof Train | null>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Load favorite trains from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favoriteTrains");
    if (storedFavorites) {
      try {
        const favoriteIds = JSON.parse(storedFavorites);
        
        // Fetch the full train data for these IDs from another source
        // For now, we'll simulate this with dummy data
        const dummyTrains: Train[] = favoriteIds.map((id: string) => ({
          id,
          operator: "SJ",
          country: "SE",
          from: "Stockholm",
          to: "Göteborg"
        }));
        
        setFavoriteTrains(dummyTrains);
      } catch (error) {
        console.error("Error parsing favorite trains:", error);
      }
    }
  }, []);

  const handleSort = (field: keyof Train) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleRowClick = (train: Train) => {
    // Handle row click - could open detail view
    console.log("Selected train:", train);
  };

  const toggleSelection = (trainId: string) => {
    setSelectedTrainIds(prev => 
      prev.includes(trainId) 
        ? prev.filter(id => id !== trainId) 
        : [...prev, trainId]
    );
  };

  const removeFromFavorites = (trainId: string) => {
    const updatedFavorites = favoriteTrains.filter(train => train.id !== trainId);
    setFavoriteTrains(updatedFavorites);
    
    // Update localStorage
    const favoriteIds = updatedFavorites.map(train => train.id);
    localStorage.setItem("favoriteTrains", JSON.stringify(favoriteIds));
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Tillbaka
            </Button>
          </Link>
          <h1 className="text-2xl font-bold flex items-center">
            <Bookmark className="mr-2 h-5 w-5 text-blue-600" />
            Favoritmarkerade tåg
          </h1>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <Table className="border-collapse w-full">
            <TrainTableHeader
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
            <TableBody className="divide-y divide-gray-200">
              {favoriteTrains.length > 0 ? (
                favoriteTrains.map((train, index) => (
                  <TrainTableRow
                    key={train.id}
                    train={train}
                    index={index}
                    onRowClick={handleRowClick}
                    isSelected={false}
                    isMultiSelected={selectedTrainIds.includes(train.id)}
                    onToggleSelection={toggleSelection}
                  />
                ))
              ) : (
                <EmptyState />
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {favoriteTrains.length === 0 && (
        <div className="mt-8 text-center">
          <p className="text-gray-500">
            Du har inga favoritmarkerade tåg ännu. Gå tillbaka och markera några tåg som favoriter.
          </p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
