
import React, { useState } from "react";
import { Button } from "../ui/button";
import { List, Train as TrainIcon } from "lucide-react";

interface TrainCarVisualizationProps {
  trainId: string;
}

const TrainCarVisualization = ({ trainId }: TrainCarVisualizationProps) => {
  const [viewMode, setViewMode] = useState<"train" | "list">("train");
  
  // Mock data for train cars - in real app this would come from props or API
  const trainCars = [
    { id: "A1", type: "locomotive", position: 1 },
    { id: "B2", type: "passenger", position: 2 },
    { id: "C3", type: "passenger", position: 3 },
    { id: "D4", type: "passenger", position: 4 },
    { id: "E5", type: "passenger", position: 5 },
    { id: "F6", type: "dining", position: 6 },
    { id: "G7", type: "passenger", position: 7 },
    { id: "H8", type: "passenger", position: 8 }
  ];

  const getCarColor = (type: string) => {
    switch (type) {
      case "locomotive":
        return "bg-red-500";
      case "dining":
        return "bg-yellow-500";
      case "passenger":
      default:
        return "bg-blue-500";
    }
  };

  const getCarIcon = (type: string) => {
    switch (type) {
      case "locomotive":
        return "🚂";
      case "dining":
        return "🍽️";
      case "passenger":
      default:
        return "🚋";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Tågsammansättning</h3>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "train" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("train")}
          >
            <TrainIcon className="h-4 w-4 mr-1" />
            Tågvy
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
          >
            <List className="h-4 w-4 mr-1" />
            Listvy
          </Button>
        </div>
      </div>

      {viewMode === "train" ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-1 overflow-x-auto pb-2">
            {trainCars.map((car, index) => (
              <div key={car.id} className="flex items-center">
                <div
                  className={`
                    flex flex-col items-center justify-center
                    w-16 h-12 rounded-md text-white text-xs font-medium
                    ${getCarColor(car.type)}
                    transition-transform hover:scale-105 cursor-pointer
                  `}
                  title={`Vagn ${car.id} - ${car.type}`}
                >
                  <div className="text-lg">{getCarIcon(car.type)}</div>
                  <div>{car.id}</div>
                </div>
                {index < trainCars.length - 1 && (
                  <div className="w-1 h-0.5 bg-gray-400 mx-0.5"></div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Lok</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Passagerare</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Restaurang</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="space-y-2">
            {trainCars.map((car) => (
              <div
                key={car.id}
                className="flex items-center justify-between p-3 bg-white rounded-md border hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      text-white font-medium text-sm
                      ${getCarColor(car.type)}
                    `}
                  >
                    {car.position}
                  </div>
                  <div>
                    <div className="font-medium">Vagn {car.id}</div>
                    <div className="text-sm text-gray-500 capitalize">{car.type}</div>
                  </div>
                </div>
                <div className="text-2xl">{getCarIcon(car.type)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainCarVisualization;
