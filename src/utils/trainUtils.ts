import { Train } from "@/types/train";

/**
 * Utility functions for train operations
 */

export const getSelectedTrainsData = (selectedTrainIds: string[], allTrains: Train[]): Train[] => {
  return selectedTrainIds
    .map(id => allTrains.find(t => t.id === id))
    .filter(Boolean) as Train[];
};

export const createBatchUpdateHandler = (
  selectedTrainIds: string[],
  allTrains: Train[],
  updateTrain: (train: Train) => void
) => {
  return (field: keyof Train, value: any) => {
    selectedTrainIds.forEach(trainId => {
      const train = allTrains.find(t => t.id === trainId);
      if (train) {
        const updatedTrain = { ...train, [field]: value };
        updateTrain(updatedTrain);
      }
    });
  };
};

export const createFavoriteToggleHandler = (
  addFavoriteStation: (station: { id: string; name: string; country: string }) => void,
  removeFavoriteStation: (stationId: string, country: string) => void,
  isFavoriteStation: (stationId: string, country: string) => boolean
) => {
  return (train: Train) => {
    if (!train.from) return;
    
    const stationId = train.from;
    const stationName = train.from;
    const country = train.country;
    
    if (isFavoriteStation(stationId, country)) {
      removeFavoriteStation(stationId, country);
    } else {
      addFavoriteStation({ id: stationId, name: stationName, country });
    }
  };
};