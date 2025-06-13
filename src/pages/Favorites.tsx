
import { useState, useMemo } from "react";
import { TrainDataProvider, useTrainData } from "../providers/TrainDataProvider";
import MainHeader from "../components/MainHeader";
import TrainTimetable from "../components/TrainTimetable";
import { Train } from "../types/train";

const FavoritesContent = () => {
  const { trains, updateTrain } = useTrainData();

  // For now, show all trains as favorites since we don't have a favorites system implemented
  // This can be expanded later to filter actual favorited trains
  const favoriteTrains = useMemo(() => trains, [trains]);

  return (
    <div className="min-h-screen bg-background">
      <MainHeader />
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Favoritmarkeringar
          </h2>
          <p className="text-muted-foreground">
            Här kan du se och hantera dina favoritmarkerade tåg och rutter.
          </p>
        </div>
        
        {favoriteTrains.length > 0 ? (
          <TrainTimetable />
        ) : (
          <div className="bg-card rounded-lg shadow-sm border border-border p-8 text-center">
            <p className="text-muted-foreground text-lg">
              Inga favoriter sparade än.
            </p>
            <p className="text-muted-foreground mt-2">
              Markera tåg som favoriter från huvudsidan för att se dem här.
            </p>
          </div>
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
