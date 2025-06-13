
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainHeader />
      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
            Favoritmarkeringar
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Här kan du se och hantera dina favoritmarkerade tåg och rutter.
          </p>
        </div>
        
        {favoriteTrains.length > 0 ? (
          <TrainTimetable />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Inga favoriter sparade än.
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
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
