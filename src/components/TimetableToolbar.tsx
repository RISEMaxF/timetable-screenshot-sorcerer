
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Check, Pencil, Clock, LayoutGrid } from "lucide-react";
import { Train } from "@/types/train";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  const [batchTrack, setBatchTrack] = useState("");
  const [batchTime, setBatchTime] = useState("");
  const [batchCompleted, setBatchCompleted] = useState<boolean | undefined>(undefined);
  const [batchNotes, setBatchNotes] = useState("");
  const [openDialog, setOpenDialog] = useState("");

  const handleBatchUpdate = () => {
    if (openDialog === "track" && batchTrack && onBatchUpdate) {
      onBatchUpdate("track", batchTrack);
    } else if (openDialog === "time" && batchTime && onBatchUpdate) {
      onBatchUpdate("arrivalTime", batchTime);
    } else if (openDialog === "completed" && batchCompleted !== undefined && onBatchUpdate) {
      onBatchUpdate("completed", batchCompleted);
    } else if (openDialog === "notes" && onBatchUpdate) {
      onBatchUpdate("notes", batchNotes);
    }
    
    setOpenDialog("");
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-gray-50 border-b border-gray-200">
      <div className="w-full sm:w-auto">
        <Input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-64"
        />
      </div>
      
      <div className="flex flex-wrap items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-start text-left font-normal">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {format(date, "PPP")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        
        <Button variant="outline" onClick={() => setDate(new Date())}>
          Today
        </Button>

        {selectedCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {selectedCount} selected
            </span>
            
            <Dialog open={openDialog === "track"} onOpenChange={(open) => {
              if (open) setOpenDialog("track");
              else setOpenDialog("");
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <LayoutGrid className="h-4 w-4 mr-1" />
                  Set Track
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set Track for {selectedCount} Trains</DialogTitle>
                  <DialogDescription>
                    This will update the track for all selected trains.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input 
                    value={batchTrack} 
                    onChange={(e) => setBatchTrack(e.target.value)}
                    placeholder="Enter track number"
                    className="w-full"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog("")}>Cancel</Button>
                  <Button onClick={handleBatchUpdate}>Apply to Selected</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={openDialog === "time"} onOpenChange={(open) => {
              if (open) setOpenDialog("time");
              else setOpenDialog("");
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Clock className="h-4 w-4 mr-1" />
                  Set Time
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set Time for {selectedCount} Trains</DialogTitle>
                  <DialogDescription>
                    This will update the arrival time for all selected trains.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Input 
                    value={batchTime} 
                    onChange={(e) => setBatchTime(e.target.value)}
                    placeholder="HH:MM format"
                    className="w-full"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog("")}>Cancel</Button>
                  <Button onClick={handleBatchUpdate}>Apply to Selected</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={openDialog === "completed"} onOpenChange={(open) => {
              if (open) setOpenDialog("completed");
              else setOpenDialog("");
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Check className="h-4 w-4 mr-1" />
                  Set Status
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Set Status for {selectedCount} Trains</DialogTitle>
                  <DialogDescription>
                    Mark all selected trains as completed or pending.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 flex gap-4">
                  <Button 
                    variant={batchCompleted === true ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setBatchCompleted(true)}
                  >
                    Mark as Completed
                  </Button>
                  <Button 
                    variant={batchCompleted === false ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setBatchCompleted(false)}
                  >
                    Mark as Pending
                  </Button>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog("")}>Cancel</Button>
                  <Button onClick={handleBatchUpdate}>Apply to Selected</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog open={openDialog === "notes"} onOpenChange={(open) => {
              if (open) setOpenDialog("notes");
              else setOpenDialog("");
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Pencil className="h-4 w-4 mr-1" />
                  Add Notes
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Notes for {selectedCount} Trains</DialogTitle>
                  <DialogDescription>
                    This will add notes to all selected trains.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <textarea
                    value={batchNotes}
                    onChange={(e) => setBatchNotes(e.target.value)}
                    placeholder="Enter notes here"
                    className="w-full h-24 p-2 border rounded-md"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpenDialog("")}>Cancel</Button>
                  <Button onClick={handleBatchUpdate}>Apply to Selected</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </div>
  );
}
