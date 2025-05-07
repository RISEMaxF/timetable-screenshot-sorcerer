import React from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose 
} from "../ui/dialog";
import { Train } from "../../types/train";
import { X, ChevronDown, ChevronUp, Info, ScrollIcon } from "lucide-react";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

interface TrainDetailDialogProps {
  train: Train | null;
  isOpen: boolean;
  onClose: () => void;
}

interface TrainHistoryItem {
  actor: string;
  time: string;
  type: string;
  reportedAt: string;
  details?: string;
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

const TrainDetailDialog = ({ train, isOpen, onClose }: TrainDetailDialogProps) => {
  if (!train) return null;
  
  const history = generateMockHistory(train);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] w-[90vw] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              Information för tåg {train.id}
            </DialogTitle>
            {/* Keeping only one close button */}
            <DialogClose className="hover:bg-gray-100 rounded-full p-1">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>
          <DialogDescription className="text-base text-black flex justify-between items-center mt-4">
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
                <span className="bg-green-100 rounded-full p-2 inline-flex">
                  <Info className="h-5 w-5 text-green-600" />
                </span>
                <span className="ml-2">Ankomst station Hgl</span>
              </div>
            </div>
            <div className="text-gray-700">
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

        <div className="flex-1 overflow-hidden mt-4 mb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <InfoCard label="Tåg ID" value={train.id} />
            <InfoCard label="OTN" value={train.otn || "-"} />
            <InfoCard label="Beräknad ankomst" value={train.newTime || train.arrivalTime} />
            
            <InfoCard label="Faktisk ankomst" value={train.newTime || train.arrivalTime} />
            <InfoCard label="Operatör" value={train.newOperator || train.operator} />
            <InfoCard label="Planerad loktyp" value="RC6" />
            
            <InfoCard label="Planerad fordonslängd (m)" value="263" />
            <InfoCard label="Planerad fordonstyp" value="500" />
            <InfoCard label="Individer" value="44" />
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-3 border-b">
              <div className="grid grid-cols-4 gap-4 font-medium text-gray-700">
                <div>Aktör</div>
                <div>Tid</div>
                <div>Tidtyp</div>
                <div>Rapporterad</div>
              </div>
            </div>
            
            {/* Adding visual indicator for scrollable content */}
            <div className="relative">
              <ScrollArea className="max-h-[300px] overflow-auto">
                <div className="divide-y">
                  {history.map((item, index) => (
                    <div 
                      key={index} 
                      className={cn(
                        "grid grid-cols-4 gap-4 p-3",
                        index % 2 === 0 ? "bg-white" : "bg-gray-50",
                        item.type === "Faktisk" ? "bg-green-50" : ""
                      )}
                    >
                      <div className="text-sm">{item.actor}</div>
                      <div className="text-sm font-medium text-amber-500">{item.time}</div>
                      <div className="text-sm">{item.type}</div>
                      <div className="text-sm">
                        {item.reportedAt}
                        {item.details && (
                          <div className="text-xs text-gray-500 mt-1">{item.details}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              {/* Scroll indicator */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-center py-1 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none">
                <div className="bg-gray-200 rounded-full px-3 py-1 flex items-center shadow-sm">
                  <span className="text-xs text-gray-600 mr-1">Scroll</span>
                  <ChevronDown className="h-3 w-3 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="karta" className="border-b border-t-0 border-x-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <span className="text-base font-medium">Karta</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  <div className="h-24 flex items-center justify-center bg-gray-100 rounded-md">
                    Kartinformation skulle visas här
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rutt-kpi" className="border-b border-t-0 border-x-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <span className="text-base font-medium">Rutt KPI</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  <div className="h-24 flex items-center justify-center bg-gray-100 rounded-md">
                    KPI statistik skulle visas här
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="tagsammansattning" className="border-b border-t-0 border-x-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <span className="text-base font-medium">Tågsammansättning</span>
                </AccordionTrigger>
                <AccordionContent className="text-sm">
                  <div className="h-24 flex items-center justify-center bg-gray-100 rounded-md">
                    Tågsammansättnings information skulle visas här
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-gray-50 p-3 rounded-md border">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="font-medium mt-1">{value}</div>
  </div>
);

export default TrainDetailDialog;
