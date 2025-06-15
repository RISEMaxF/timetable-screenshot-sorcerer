
import React from "react";
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Info } from "lucide-react";
import { Train } from "../../types/train";

interface TrainDetailHeaderProps {
  train: Train;
}

const TrainDetailHeader = ({ train }: TrainDetailHeaderProps) => {
  return (
    <DialogHeader className="border-b pb-4">
      <DialogTitle className="text-xl font-bold">
        Information för tåg {train.id}
      </DialogTitle>
      <DialogDescription className="text-base text-gray-900 dark:text-gray-100 flex justify-between items-center mt-4">
        <div className="flex items-center space-x-6">
          <div>
            {train.newTime ? (
              <div className="flex items-baseline">
                <span className="line-through text-gray-500 mr-2">{train.arrivalTime}</span>
                <span className="text-lg font-medium">{train.newTime}</span>
                <span className="text-green-600 text-sm ml-1">(+3)</span>
              </div>
            ) : (
              <span className="text-lg font-medium">{train.arrivalTime}</span>
            )}
          </div>
          <div className="flex items-center">
            <span className="bg-green-100 dark:bg-green-900 rounded-full p-2 inline-flex">
              <Info className="h-5 w-5 text-green-600 dark:text-green-400" />
            </span>
            <span className="ml-2">Ankomst station Hgl</span>
          </div>
        </div>
        <div className="text-gray-700 dark:text-gray-300">
          <span className="mr-1">Spår</span>
          {train.newTrack ? (
            <>
              <span className="line-through text-gray-500 mr-1">{train.track}</span>
              <span className="font-medium">{train.newTrack}</span>
            </>
          ) : (
            <span className="font-medium">{train.track}</span>
          )}
        </div>
      </DialogDescription>
    </DialogHeader>
  );
};

export default TrainDetailHeader;
