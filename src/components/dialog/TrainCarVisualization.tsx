
import React, { useState } from "react";
import { Button } from "../ui/button";
import { List, Train as TrainIcon, ChevronRight, ChevronDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

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
  emptyWeight?: string;
  numAxles?: string;
  goodsWeight?: string;
  carryingUnits?: Array<{
    id: string;
    unitId: string;
  }>;
}

interface TrainCarVisualizationProps {
  trainId: string;
}

const TrainCarVisualization = ({ trainId }: TrainCarVisualizationProps) => {
  const [viewMode, setViewMode] = useState<"train" | "list">("list");
  const [selectedCar, setSelectedCar] = useState<TrainCar | null>(null);
  const [isCarDetailOpen, setIsCarDetailOpen] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  
  // Mock data for cargo train cars with realistic IDs and detailed information
  const trainCars: TrainCar[] = [
    { 
      id: "X2-72001", 
      type: "locomotive", 
      position: 1, 
      carNumber: "72001", 
      weight: "84t",
      emptyWeight: "84t",
      length: "19.5m",
      numAxles: "6",
      goodsWeight: "0kg",
      manufacturer: "Siemens",
      yearBuilt: "2018",
      maxLoad: "N/A",
      currentLoad: "N/A",
      status: "Operativ",
      carryingUnits: []
    },
    { 
      id: "Sgns-60001", 
      type: "flatcar", 
      position: 2, 
      carNumber: "731301427443090647", 
      weight: "22t",
      emptyWeight: "22t",
      length: "14.7m",
      numAxles: "4",
      goodsWeight: "45000kg",
      manufacturer: "Greenbrier",
      yearBuilt: "2019",
      maxLoad: "68t",
      currentLoad: "45t",
      status: "Lastad",
      carryingUnits: [
        { id: "1", unitId: "tcmf:grouping:train:id:6bc0848a-2615-4934-b599-014fa6f5d035" },
        { id: "2", unitId: "tcmf:grouping:train:id:1c2a2867-05e7-4acd-9426-372401ddeeee" },
        { id: "3", unitId: "tcmf:grouping:train:id:9a59f84a-c4df-40f8-ad9a-f16f0bbff57c" }
      ]
    },
    { 
      id: "Sgns-60002", 
      type: "flatcar", 
      position: 3, 
      carNumber: "378045665544", 
      weight: "22t",
      emptyWeight: "22t",
      length: "20m",
      numAxles: "20",
      goodsWeight: "52000kg",
      manufacturer: "Greenbrier",
      yearBuilt: "2019",
      maxLoad: "68t",
      currentLoad: "52t",
      status: "Lastad",
      carryingUnits: []
    },
    { 
      id: "Eanos-52003", 
      type: "hopper", 
      position: 4, 
      carNumber: "927400003434", 
      weight: "25t",
      emptyWeight: "25t",
      length: "15m",
      numAxles: "15",
      goodsWeight: "58000kg",
      manufacturer: "Tatravagónka",
      yearBuilt: "2020",
      maxLoad: "58t",
      currentLoad: "58t",
      status: "Full",
      carryingUnits: []
    },
    { 
      id: "Eanos-52004", 
      type: "hopper", 
      position: 5, 
      carNumber: "437443802545", 
      weight: "25t",
      emptyWeight: "25t",
      length: "31m",
      numAxles: "31",
      goodsWeight: "41000kg",
      manufacturer: "Tatravagónka",
      yearBuilt: "2020",
      maxLoad: "58t",
      currentLoad: "41t",
      status: "Delvis lastad",
      carryingUnits: []
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

  const toggleRowExpansion = (carId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(carId)) {
      newExpanded.delete(carId);
    } else {
      newExpanded.add(carId);
    }
    setExpandedRows(newExpanded);
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
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Wagons Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Vagnar</h3>
              <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                {trainCars.length}
              </span>
            </div>
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12"></TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Vagnnummer</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Typ</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Godsvikt</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Längd</TableHead>
                <TableHead className="text-gray-600 dark:text-gray-400">Antal axlar</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trainCars.map((car) => (
                <React.Fragment key={car.id}>
                  <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700">
                    <TableCell className="p-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleRowExpansion(car.id)}
                      >
                        {expandedRows.has(car.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                      {car.carNumber}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      -
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {car.goodsWeight || "-kg"}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {car.length}
                    </TableCell>
                    <TableCell className="text-gray-600 dark:text-gray-400">
                      {car.numAxles}
                    </TableCell>
                  </TableRow>
                  
                  {/* Expandable Content */}
                  {expandedRows.has(car.id) && (
                    <TableRow>
                      <TableCell colSpan={6} className="p-0">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Status</p>
                              <p className={`font-medium ${getStatusColor(car.status)}`}>
                                {car.status}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Tillverkare</p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {car.manufacturer}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Byggnadsår</p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {car.yearBuilt}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">Max last</p>
                              <p className="font-medium text-gray-900 dark:text-gray-100">
                                {car.maxLoad}
                              </p>
                            </div>
                          </div>
                          
                          {car.carryingUnits && car.carryingUnits.length > 0 && (
                            <div className="mt-4">
                              <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
                                Transporterar ({car.carryingUnits.length} enheter)
                              </p>
                              <div className="space-y-1">
                                {car.carryingUnits.map((unit) => (
                                  <div key={unit.id} className="bg-white dark:bg-gray-700 p-2 rounded border text-xs font-mono text-gray-600 dark:text-gray-300">
                                    {unit.unitId}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isCarDetailOpen} onOpenChange={setIsCarDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Vagn {selectedCar?.carNumber}
            </DialogTitle>
          </DialogHeader>
          
          {selectedCar && (
            <div className="mt-4">
              <Tabs defaultValue="information" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
                  <TabsTrigger 
                    value="information"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
                  >
                    INFORMATION
                  </TabsTrigger>
                  <TabsTrigger 
                    value="timeline"
                    className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
                  >
                    TIMELINE
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="information" className="mt-6 space-y-6">
                  {/* Basic Information */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Vagn ID</p>
                        <p className="text-base font-medium">{selectedCar.carNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Typ</p>
                        <p className="text-base font-medium">{getCarType(selectedCar.type)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Godsvikt</p>
                        <p className="text-base font-medium">{selectedCar.currentLoad}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Egenvikt</p>
                        <p className="text-base font-medium">{selectedCar.emptyWeight || selectedCar.weight}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Fordonsposition</p>
                        <p className="text-base font-medium">{selectedCar.position}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Längd</p>
                        <p className="text-base font-medium">{selectedCar.length}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Antal axlar</p>
                        <p className="text-base font-medium">{selectedCar.numAxles || "4"}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Carrying Section */}
                  {selectedCar.carryingUnits && selectedCar.carryingUnits.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold">Transporterar</h3>
                        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-medium">
                          {selectedCar.carryingUnits.length}
                        </span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Enhets-ID</p>
                          <div className="space-y-2">
                            {selectedCar.carryingUnits.map((unit, index) => (
                              <div key={unit.id} className="bg-gray-50 dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700">
                                <p className="text-sm font-mono text-gray-700 dark:text-gray-300 break-all">
                                  {unit.unitId}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Additional Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Övrig information</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tillverkare</p>
                        <p className="text-base font-medium">{selectedCar.manufacturer}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Byggnadsår</p>
                        <p className="text-base font-medium">{selectedCar.yearBuilt}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Max last</p>
                        <p className="text-base font-medium">{selectedCar.maxLoad}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                        <p className={`text-base font-medium ${getStatusColor(selectedCar.status)}`}>
                          {selectedCar.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="mt-6">
                  <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400">Timeline information skulle visas här</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainCarVisualization;
