import { useState } from "react";
import { Train } from "@/types/train";

export const useTrainSelection = () => {
  const [selectedTrains, setSelectedTrains] = useState<string[]>([]);
  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleRowClick = (train: Train) => {
    setSelectedTrain(train);
  };

  const handleOpenDetail = () => {
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const handleToggleSelection = (trainId: string) => {
    setSelectedTrains(prev => 
      prev.includes(trainId) 
        ? prev.filter(id => id !== trainId)
        : [...prev, trainId]
    );
  };

  const clearSelection = () => {
    setSelectedTrains([]);
    setSelectedTrain(null);
  };

  const selectAll = (trainIds: string[]) => {
    setSelectedTrains(trainIds);
  };

  return {
    selectedTrains,
    selectedTrain,
    isDetailOpen,
    handleRowClick,
    handleOpenDetail,
    handleCloseDetail,
    handleToggleSelection,
    clearSelection,
    selectAll,
  };
};