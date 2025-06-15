
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
    { id: "A1", type: "locomotive", position: 1, carNumber: "001" },
    { id: "B2", type: "passenger", position: 2, carNumber: "102" },
    { id: "C3", type: "passenger", position: 3, carNumber: "103" },
    { id: "D4", type: "passenger", position: 4, carNumber: "104" },
    { id: "E5", type: "passenger", position: 5, carNumber: "105" },
    { id: "F6", type: "dining", position: 6, carNumber: "201" },
    { id: "G7", type: "passenger", position: 7, carNumber: "106" },
    { id: "H8", type: "passenger", position: 8, carNumber: "107" }
  ];

  const getCarColor = (type: string) => {
    switch (type) {
      case "locomotive":
        return "bg-red-500 dark:bg-red-600";
      case "dining":
        return "bg-yellow-500 dark:bg-yellow-600";
      case "passenger":
      default:
        return "bg-blue-500 dark:bg-blue-600";
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Tågsammansättning för Tåg {trainId}
        </h3>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "train" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("train")}
            className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <TrainIcon className="h-4 w-4 mr-1" />
            Tågvy
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <List className="h-4 w-4 mr-1" />
            Listvy
          </Button>
        </div>
      </div>

      {viewMode === "train" ? (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1 overflow-x-auto pb-4">
            {trainCars.map((car, index) => (
              <div key={car.id} className="flex items-center">
                <div
                  className={`
                    flex flex-col items-center justify-center
                    w-20 h-16 rounded-lg text-white text-xs font-medium
                    ${getCarColor(car.type)}
                    transition-all duration-200 hover:scale-105 cursor-pointer
                    shadow-md hover:shadow-lg
                  `}
                  title={`Vagn ${car.id} - ${car.type} - Nummer ${car.carNumber}`}
                >
                  <div className="text-lg mb-1">{getCarIcon(car.type)}</div>
                  <div className="font-bold">{car.id}</div>
                  <div className="text-xs opacity-90">#{car.carNumber}</div>
                </div>
                {index < trainCars.length - 1 && (
                  <div className="w-2 h-1 bg-gray-400 dark:bg-gray-500 mx-1 rounded"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 dark:bg-red-600 rounded"></div>
              <span>Lok</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 dark:bg-blue-600 rounded"></div>
              <span>Passagerare</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 dark:bg-yellow-600 rounded"></div>
              <span>Restaurang</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">
              Total längd: {trainCars.length} vagnar | Riktning: Västerut →
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            {trainCars.map((car) => (
              <div
                key={car.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      text-white font-bold text-sm
                      ${getCarColor(car.type)}
                      shadow-md
                    `}
                  >
                    {car.position}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      Vagn {car.id}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {car.type} - Nummer {car.carNumber}
                    </div>
                  </div>
                </div>
                <div className="text-3xl">{getCarIcon(car.type)}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainCarVisualization;
