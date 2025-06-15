
import React from "react";
import { ChevronDown } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Train } from "../../types/train";

interface TrainHistoryItem {
  actor: string;
  time: string;
  type: string;
  reportedAt: string;
  details?: string;
}

interface TrainHistoryTableProps {
  train: Train;
}

// Mock history data generator based on the train info
const generateMockHistory = (train: Train): TrainHistoryItem[] => {
  const baseTime = train.arrivalTime ? train.arrivalTime : "08:00";
  const [hours, minutes] = baseTime.split(':').map(Number);
  
  const history: TrainHistoryItem[] = [
    {
      actor: "trv_dagligfärdplan",
      time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
      type: "Planerad",
      reportedAt: "2024-09-12 00:40"
    }
  ];

  // Add some simulated change history
  for (let i = 1; i <= 15; i++) {
    const newMinutes = (minutes + i * 2) % 60;
    const newHours = (hours + Math.floor((minutes + i * 2) / 60)) % 24;
    const timeStr = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    
    history.push({
      actor: "PlankanSJ",
      time: train.arrivalTime,
      type: "Beraknad",
      reportedAt: timeStr,
      details: i % 3 === 0 ? "Försenad p.g.a. signalfel" : undefined
    });
  }

  // Add a "Faktisk" entry as the last item
  history.push({
    actor: "trv",
    time: train.newTime || train.arrivalTime,
    type: "Faktisk",
    reportedAt: train.newTime || "08:50"
  });

  return history;
};

const TrainHistoryTable = ({ train }: TrainHistoryTableProps) => {
  const history = generateMockHistory(train);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="bg-gray-50 dark:bg-gray-800 p-3 border-b border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-4 gap-4 font-medium text-gray-700 dark:text-gray-300">
          <div>Aktör</div>
          <div>Tid</div>
          <div>Tidtyp</div>
          <div>Rapporterad</div>
        </div>
      </div>
      
      {/* Adding visual indicator for scrollable content */}
      <div className="relative">
        <ScrollArea className="max-h-[300px] overflow-auto">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {history.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "grid grid-cols-4 gap-4 p-3",
                  index % 2 === 0 
                    ? "bg-white dark:bg-gray-900" 
                    : "bg-gray-50 dark:bg-gray-800",
                  item.type === "Faktisk" ? "bg-green-50 dark:bg-green-900/20" : ""
                )}
              >
                <div className="text-sm text-gray-900 dark:text-gray-100">{item.actor}</div>
                <div className="text-sm font-medium text-amber-500">{item.time}</div>
                <div className="text-sm text-gray-900 dark:text-gray-100">{item.type}</div>
                <div className="text-sm text-gray-900 dark:text-gray-100">
                  {item.reportedAt}
                  {item.details && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.details}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        {/* Scroll indicator */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center py-1 bg-gradient-to-t from-gray-100 dark:from-gray-800 to-transparent pointer-events-none">
          <div className="bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 flex items-center shadow-sm">
            <span className="text-xs text-gray-600 dark:text-gray-300 mr-1">Scroll</span>
            <ChevronDown className="h-3 w-3 text-gray-600 dark:text-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock history data generator based on the train info
const generateMockHistory = (train: Train): TrainHistoryItem[] => {
  const baseTime = train.arrivalTime ? train.arrivalTime : "08:00";
  const [hours, minutes] = baseTime.split(':').map(Number);
  
  const history: TrainHistoryItem[] = [
    {
      actor: "trv_dagligfärdplan",
      time: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
      type: "Planerad",
      reportedAt: "2024-09-12 00:40"
    }
  ];

  // Add some simulated change history
  for (let i = 1; i <= 15; i++) {
    const newMinutes = (minutes + i * 2) % 60;
    const newHours = (hours + Math.floor((minutes + i * 2) / 60)) % 24;
    const timeStr = `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    
    history.push({
      actor: "PlankanSJ",
      time: train.arrivalTime,
      type: "Beraknad",
      reportedAt: timeStr,
      details: i % 3 === 0 ? "Försenad p.g.a. signalfel" : undefined
    });
  }

  // Add a "Faktisk" entry as the last item
  history.push({
    actor: "trv",
    time: train.newTime || train.arrivalTime,
    type: "Faktisk",
    reportedAt: train.newTime || "08:50"
  });

  return history;
};

export default TrainHistoryTable;
