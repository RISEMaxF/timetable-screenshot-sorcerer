
import { useState } from 'react';
import { useTrainData } from '../providers/TrainDataProvider';
import { Train } from '../types/train';
import { toast } from '../hooks/use-toast';

export const useTrainOperations = () => {
  const { updateTrain, batchUpdateTrains } = useTrainData();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleTrainUpdate = async (train: Train) => {
    try {
      setIsUpdating(true);
      await updateTrain(train);
      toast({
        title: "Success",
        description: "Train updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update train",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBatchTrackUpdate = async (trainIds: string[], track: string) => {
    try {
      setIsUpdating(true);
      await batchUpdateTrains(trainIds, { newTrack: track });
      toast({
        title: "Success",
        description: `Updated track for ${trainIds.length} trains`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update tracks",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBatchTimeUpdate = async (trainIds: string[], time: string) => {
    try {
      setIsUpdating(true);
      await batchUpdateTrains(trainIds, { newTime: time });
      toast({
        title: "Success",
        description: `Updated time for ${trainIds.length} trains`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update times",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBatchStatusUpdate = async (trainIds: string[], completed: boolean) => {
    try {
      setIsUpdating(true);
      await batchUpdateTrains(trainIds, { completed });
      toast({
        title: "Success",
        description: `Updated status for ${trainIds.length} trains`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleBatchNotesUpdate = async (trainIds: string[], notes: string) => {
    try {
      setIsUpdating(true);
      await batchUpdateTrains(trainIds, { notes });
      toast({
        title: "Success",
        description: `Updated notes for ${trainIds.length} trains`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update notes",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    handleTrainUpdate,
    handleBatchTrackUpdate,
    handleBatchTimeUpdate,
    handleBatchStatusUpdate,
    handleBatchNotesUpdate,
    isUpdating
  };
};
