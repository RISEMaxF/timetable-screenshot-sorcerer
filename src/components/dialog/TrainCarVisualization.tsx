import React, { useState } from "react";
import { Button } from "../ui/button";
import { List, Train as TrainIcon } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface TrainCar {
  id: string;
  type: string;
  position: number;
  carNumber: string;
  weight: string;
  length: string;
  manufacturer: string;
  yearBuilt: string;
  maxLoad: string;
  currentLoad: string;
  status: string;
}

interface TrainCarVisualizationProps {
  trainId: string;
}

const TrainCarVisualization = ({ trainId }: TrainCarVisualizationProps) => {
  const [viewMode, setViewMode] = useState<"train" | "list">("train");
  const [selectedCar, setSelectedCar] = useState<TrainCar | null>(null);
  const [isCarDetailOpen, setIsCarDetailOpen] = useState(false);
  
  // Mock data for cargo train cars with realistic IDs and detailed information
  const trainCars: TrainCar[] = [
    { 
      id: "X2-72001", 
      type: "locomotive", 
      position: 1, 
      carNumber: "72001", 
      weight: "84t",
      length: "19.5m",
      manufacturer: "Siemens",
      yearBuilt: "2018",
      maxLoad: "N/A",
      currentLoad: "N/A",
      status: "Operativ"
    },
    { 
      id: "Sgns-60001", 
      type: "flatcar", 
      position: 2, 
      carNumber: "60001", 
      weight: "22t",
      length: "14.7m",
      manufacturer: "Greenbrier",
      yearBuilt: "2019",
      maxLoad: "68t",
      currentLoad: "45t",
      status: "Lastad"
    },
    { 
      id: "Sgns-60002", 
      type: "flatcar", 
      position: 3, 
      carNumber: "60002", 
      weight: "22t",
      length: "14.7m",
      manufacturer: "Greenbrier",
      yearBuilt: "2019",
      maxLoad: "68t",
      currentLoad: "52t",
      status: "Lastad"
    },
    { 
      id: "Eanos-52003", 
      type: "hopper", 
      position: 4, 
      carNumber: "52003", 
      weight: "25t",
      length: "12.2m",
      manufacturer: "Tatravagónka",
      yearBuilt: "2020",
      maxLoad: "58t",
      currentLoad: "58t",
      status: "Full"
    },
    { 
      id: "Eanos-52004", 
      type: "hopper", 
      position: 5, 
      carNumber: "52004", 
      weight: "25t",
      length: "12.2m",
      manufacturer: "Tatravagónka",
      yearBuilt: "2020",
      maxLoad: "58t",
      currentLoad: "41t",
      status: "Delvis lastad"
    },
    { 
      id: "Shimmns-70005", 
      type: "tank", 
      position: 6, 
      carNumber: "70005", 
      weight: "28t",
      length: "16.8m",
      manufacturer: "VTG",
      yearBuilt: "2017",
      maxLoad: "65t",
      currentLoad: "63t",
      status: "Lastad"
    },
    { 
      id: "Sgns-60006", 
      type: "flatcar", 
      position: 7, 
      carNumber: "60006", 
      weight: "22t",
      length: "14.7m",
      manufacturer: "Greenbrier",
      yearBuilt: "2019",
      maxLoad: "68t",
      currentLoad: "0t",
      status: "Tom"
    },
    { 
      id: "Eanos-52007", 
      type: "hopper", 
      position: 8, 
      carNumber: "52007", 
      weight: "25t",
      length: "12.2m",
      manufacturer: "Tatravagónka",
      yearBuilt: "2021",
      maxLoad: "58t",
      currentLoad: "58t",
      status: "Full"
    }
  ];

  const getCarColor = (type: string) => {
    switch (type) {
      case "locomotive":
        return "bg-slate-700 dark:bg-slate-600";
      case "tank":
        return "bg-slate-500 dark:bg-slate-400";
      case "hopper":
        return "bg-gray-600 dark:bg-gray-500";
      case "flatcar":
      default:
        return "bg-gray-500 dark:bg-gray-600";
    }
  };

  const getCarType = (type: string) => {
    switch (type) {
      case "locomotive":
        return "Lok";
      case "tank":
        return "Tank";
      case "hopper":
        return "Hopper";
      case "flatcar":
      default:
        return "Flat";
    }
  };

  const handleCarClick = (car: TrainCar) => {
    setSelectedCar(car);
    setIsCarDetailOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "full":
      case "lastad":
        return "text-green-600 dark:text-green-400";
      case "tom":
        return "text-red-600 dark:text-red-400";
      case "delvis lastad":
        return "text-yellow-600 dark:text-yellow-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            variant={viewMode === "train" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("train")}
            className="bg-slate-600 hover:bg-slate-700 text-white dark:bg-slate-700 dark:hover:bg-slate-800"
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
                    w-24 h-20 rounded-lg text-white text-xs font-medium
                    ${getCarColor(car.type)}
                    transition-all duration-200 hover:scale-105 cursor-pointer
                    shadow-md hover:shadow-lg hover:ring-2 hover:ring-blue-400
                  `}
                  title={`Klicka för mer info - ${car.id}`}
                  onClick={() => handleCarClick(car)}
                >
                  <div className="font-bold text-sm">{car.id.split('-')[0]}</div>
                  <div className="text-xs opacity-90">#{car.carNumber}</div>
                  <div className="text-xs opacity-75">{car.weight}</div>
                </div>
                {index < trainCars.length - 1 && (
                  <div className="w-2 h-1 bg-gray-400 dark:bg-gray-500 mx-1 rounded"></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/20 rounded-lg border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-800 dark:text-slate-200 font-medium">
              Total längd: {trainCars.length} vagnar | Riktning: Västerut → | Total vikt: {trainCars.reduce((sum, car) => sum + parseInt(car.weight), 0)}t
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            {trainCars.map((car) => (
              <div
                key={car.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors shadow-sm cursor-pointer hover:shadow-md"
                onClick={() => handleCarClick(car)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                      w-12 h-12 rounded-lg flex items-center justify-center
                      text-white font-bold text-sm
                      ${getCarColor(car.type)}
                      shadow-md
                    `}
                  >
                    {car.position}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">
                      {car.id}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getCarType(car.type)} - Nummer {car.carNumber} - {car.weight}
                    </div>
                  </div>
                </div>
                <div className="text-sm font-mono text-gray-600 dark:text-gray-300">
                  {getCarType(car.type)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Dialog open={isCarDetailOpen} onOpenChange={setIsCarDetailOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              Vagndetaljer - {selectedCar?.id}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCar && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Typ</p>
                  <p className="text-base font-semibold">{getCarType(selectedCar.type)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Position</p>
                  <p className="text-base font-semibold">{selectedCar.position}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Vagnummer</p>
                  <p className="text-base font-semibold">{selectedCar.carNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Längd</p>
                  <p className="text-base font-semibold">{selectedCar.length}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Egenvikt</p>
                  <p className="text-base font-semibold">{selectedCar.weight}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Max last</p>
                  <p className="text-base font-semibold">{selectedCar.maxLoad}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Aktuell last</p>
                  <p className="text-base font-semibold">{selectedCar.currentLoad}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</p>
                  <p className={`text-base font-semibold ${getStatusColor(selectedCar.status)}`}>
                    {selectedCar.status}
                  </p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Tillverkare</p>
                    <p className="text-base">{selectedCar.manufacturer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Byggnadsår</p>
                    <p className="text-base">{selectedCar.yearBuilt}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainCarVisualization;
