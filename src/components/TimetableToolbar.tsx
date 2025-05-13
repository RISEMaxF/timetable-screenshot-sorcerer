
import { useState } from "react";
import { Train } from "@/types/train";
import BatchActionButtons from "./toolbar/BatchActionButtons";
import LocationSelector from "./toolbar/LocationSelector";
import DialogManager from "./toolbar/DialogManager";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, TrainFront, Building2 } from "lucide-react";
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface TimetableToolbarProps {
  location: string;
  setLocation: (location: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  selectedCount?: number;
  onBatchUpdate?: (field: keyof Train, value: any) => void;
}

export function TimetableToolbar({ 
  location, 
  setLocation, 
  date, 
  setDate,
  selectedCount = 0,
  onBatchUpdate
}: TimetableToolbarProps) {
  const [openDialog, setOpenDialog] = useState("");
  const [station, setStation] = useState("ALL");
  const [activeTab, setActiveTab] = useState("timetable");

  const handleOpenDialog = (dialogType: string) => {
    setOpenDialog(dialogType);
  };

  const handleCloseDialog = () => {
    setOpenDialog("");
  };

  const handleBatchTrackUpdate = (value: string) => {
    if (onBatchUpdate) {
      onBatchUpdate("track", value);
    }
  };

  const handleBatchTimeUpdate = (value: string) => {
    if (onBatchUpdate) {
      onBatchUpdate("arrivalTime", value);
    }
  };

  const handleBatchStatusUpdate = (value: boolean) => {
    if (onBatchUpdate) {
      onBatchUpdate("completed", value);
    }
  };

  const handleBatchNotesUpdate = (value: string) => {
    if (onBatchUpdate) {
      onBatchUpdate("notes", value);
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 border-b border-gray-200">
      <Tabs 
        defaultValue="timetable" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="border-b border-gray-200">
          <div className="px-4">
            <TabsList className="bg-transparent h-12 border-b-0 p-0">
              <TabsTrigger 
                value="timetable" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-12 px-6"
              >
                <TrainFront className="mr-2 h-4 w-4" />
                Tågtidtabell
              </TabsTrigger>
              <TabsTrigger 
                value="station" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 rounded-none h-12 px-6"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Stationsök
              </TabsTrigger>
            </TabsList>
          </div>
        </div>
        
        <TabsContent value="timetable" className="mt-0">
          <div className="flex flex-row justify-between items-center p-4">
            <div></div> {/* Empty div to maintain layout */}
            
            <div className="flex items-center gap-2">
              <BatchActionButtons 
                selectedCount={selectedCount} 
                onOpenDialog={handleOpenDialog} 
              />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="station" className="mt-0">
          <div className="flex flex-row items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <LocationSelector
                location={location}
                setLocation={setLocation} 
                station={station}
                setStation={setStation}
              />
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="h-10 px-3 rounded-full bg-white border-gray-200 shadow-sm hover:bg-gray-50">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    {format(date, "PPP", { locale: sv })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border border-gray-100 shadow-lg rounded-lg">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    locale={sv}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              Sök avgångar
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <DialogManager 
        openDialog={openDialog}
        onCloseDialog={handleCloseDialog}
        selectedCount={selectedCount}
        onBatchTrackUpdate={handleBatchTrackUpdate}
        onBatchTimeUpdate={handleBatchTimeUpdate}
        onBatchStatusUpdate={handleBatchStatusUpdate}
        onBatchNotesUpdate={handleBatchNotesUpdate}
      />
    </div>
  );
}
