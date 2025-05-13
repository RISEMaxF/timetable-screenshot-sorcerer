
import { useState } from "react";
import { Train } from "@/types/train";
import BatchActionButtons from "./toolbar/BatchActionButtons";
import LocationSelector from "./toolbar/LocationSelector";
import DialogManager from "./toolbar/DialogManager";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CalendarIcon, TrainFront, Building2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, subDays } from "date-fns";
import { sv } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface TimetableToolbarProps {
  location: string;
  setLocation: (location: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  selectedCount?: number;
  onBatchUpdate?: (field: keyof Train, value: any) => void;
}

type DateRangeType = 'single' | 'range' | 'multi';

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
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('single');
  const [daysCount, setDaysCount] = useState(3);
  const [direction, setDirection] = useState<'future' | 'past' | 'both'>('future');

  // For range selection
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: date,
    to: direction === 'past' ? undefined : addDays(date, daysCount - 1),
  });

  // For multi-day selection
  const [selectedDates, setSelectedDates] = useState<Date[]>([date]);

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

  // Function to handle direction change and update date ranges accordingly
  const handleDirectionChange = (newDirection: 'future' | 'past' | 'both') => {
    setDirection(newDirection);
    
    if (dateRangeType === 'range') {
      if (newDirection === 'future') {
        setDateRange({
          from: date,
          to: addDays(date, daysCount - 1)
        });
      } else if (newDirection === 'past') {
        setDateRange({
          from: subDays(date, daysCount - 1),
          to: date
        });
      } else { // both
        const middlePoint = Math.floor(daysCount / 2);
        setDateRange({
          from: subDays(date, middlePoint),
          to: addDays(date, daysCount - 1 - middlePoint)
        });
      }
    } else if (dateRangeType === 'multi') {
      updateMultiDaySelection(date, daysCount, newDirection);
    }
  };

  // Function to handle days count change and update ranges
  const handleDaysCountChange = (newCount: number) => {
    setDaysCount(newCount);
    
    if (dateRangeType === 'range') {
      if (direction === 'future') {
        setDateRange({
          ...dateRange,
          to: addDays(dateRange.from, newCount - 1)
        });
      } else if (direction === 'past') {
        setDateRange({
          ...dateRange,
          from: subDays(dateRange.to || date, newCount - 1)
        });
      } else { // both
        const middlePoint = Math.floor(newCount / 2);
        setDateRange({
          from: subDays(date, middlePoint),
          to: addDays(date, newCount - 1 - middlePoint)
        });
      }
    } else if (dateRangeType === 'multi') {
      updateMultiDaySelection(date, newCount, direction);
    }
  };

  // Function to update multi-day selection based on center date, count, and direction
  const updateMultiDaySelection = (centerDate: Date, count: number, dir: 'future' | 'past' | 'both') => {
    const newDates: Date[] = [];
    
    if (dir === 'future') {
      for (let i = 0; i < count; i++) {
        newDates.push(addDays(centerDate, i));
      }
    } else if (dir === 'past') {
      for (let i = count - 1; i >= 0; i--) {
        newDates.push(subDays(centerDate, i));
      }
    } else { // both
      const middlePoint = Math.floor(count / 2);
      for (let i = -middlePoint; i < count - middlePoint; i++) {
        newDates.push(addDays(centerDate, i));
      }
    }
    
    setSelectedDates(newDates);
  };

  // Function to handle date range type change
  const handleDateRangeTypeChange = (value: DateRangeType) => {
    setDateRangeType(value);
    
    if (value === 'single') {
      // Keep the current date
    } else if (value === 'range') {
      // Initialize range based on current direction and days count
      if (direction === 'future') {
        setDateRange({
          from: date,
          to: addDays(date, daysCount - 1)
        });
      } else if (direction === 'past') {
        setDateRange({
          from: subDays(date, daysCount - 1),
          to: date
        });
      } else { // both
        const middlePoint = Math.floor(daysCount / 2);
        setDateRange({
          from: subDays(date, middlePoint),
          to: addDays(date, daysCount - 1 - middlePoint)
        });
      }
    } else if (value === 'multi') {
      // Initialize multi-day selection
      updateMultiDaySelection(date, daysCount, direction);
    }
  };

  // Function to format the date display based on the current selection mode
  const formatDateDisplay = () => {
    if (dateRangeType === 'single') {
      return format(date, "PPP", { locale: sv });
    } else if (dateRangeType === 'range' && dateRange.from && dateRange.to) {
      return `${format(dateRange.from, "d MMM", { locale: sv })} - ${format(dateRange.to, "d MMM", { locale: sv })}`;
    } else if (dateRangeType === 'multi' && selectedDates.length > 0) {
      if (selectedDates.length === 1) {
        return format(selectedDates[0], "PPP", { locale: sv });
      } else {
        return `${selectedDates.length} dagar: ${format(selectedDates[0], "d MMM", { locale: sv })} - ${format(selectedDates[selectedDates.length - 1], "d MMM", { locale: sv })}`;
      }
    }
    return format(date, "PPP", { locale: sv });
  };

  // Update date selection when a date is picked in single mode
  const handleSingleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate);
      
      // If in range or multi mode, also update those selections
      if (dateRangeType === 'range') {
        if (direction === 'future') {
          setDateRange({
            from: newDate,
            to: addDays(newDate, daysCount - 1)
          });
        } else if (direction === 'past') {
          setDateRange({
            from: subDays(newDate, daysCount - 1),
            to: newDate
          });
        } else { // both
          const middlePoint = Math.floor(daysCount / 2);
          setDateRange({
            from: subDays(newDate, middlePoint),
            to: addDays(newDate, daysCount - 1 - middlePoint)
          });
        }
      } else if (dateRangeType === 'multi') {
        updateMultiDaySelection(newDate, daysCount, direction);
      }
    }
  };

  // When a range is selected, update both the main date and the range
  const handleRangeSelect = (range: { from: Date; to?: Date }) => {
    setDateRange(range);
    if (range.from) {
      setDate(range.from);
    }
  };

  // When multiple dates are selected
  const handleMultiDatesSelect = (dates: Date[] | undefined) => {
    if (dates && dates.length > 0) {
      setSelectedDates(dates);
      // Update the main date to the first selected date
      setDate(dates[0]);
    }
  };

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

  // Render the calendar based on the current mode
  const renderCalendar = () => {
    if (dateRangeType === 'single') {
      return (
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSingleDateSelect}
          initialFocus
          numberOfMonths={2}
          locale={sv}
        />
      );
    } else if (dateRangeType === 'range') {
      return (
        <Calendar
          mode="range"
          selected={dateRange}
          onSelect={handleRangeSelect}
          initialFocus
          numberOfMonths={2}
          locale={sv}
        />
      );
    } else if (dateRangeType === 'multi') {
      return (
        <Calendar
          mode="multiple"
          selected={selectedDates}
          onSelect={handleMultiDatesSelect}
          initialFocus
          numberOfMonths={2}
          locale={sv}
        />
      );
    }
    
    // Default fallback
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleSingleDateSelect}
        initialFocus
        numberOfMonths={2}
        locale={sv}
      />
    );
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
          <div className="flex flex-col sm:flex-row justify-between items-center p-4">
            <div className="w-full sm:w-auto mb-4 sm:mb-0">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto h-10 px-3 rounded-full bg-white border-gray-200 shadow-sm hover:bg-gray-50">
                    <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
                    {formatDateDisplay()}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white border border-gray-100 shadow-lg rounded-lg">
                  <div className="p-3 border-b border-gray-100">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium mb-2">Välj datumtyp</h4>
                        <RadioGroup 
                          value={dateRangeType} 
                          onValueChange={(value) => handleDateRangeTypeChange(value as DateRangeType)}
                          className="flex items-center gap-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="single" id="single" />
                            <Label htmlFor="single">En dag</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="range" id="range" />
                            <Label htmlFor="range">Datumintervall</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="multi" id="multi" />
                            <Label htmlFor="multi">Flera dagar</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {dateRangeType !== 'single' && (
                        <>
                          <div>
                            <h4 className="font-medium mb-2">Antal dagar</h4>
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => handleDaysCountChange(Math.max(2, daysCount - 1))}
                                disabled={daysCount <= 2}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                              <div className="w-8 text-center">{daysCount}</div>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="h-8 w-8" 
                                onClick={() => handleDaysCountChange(Math.min(14, daysCount + 1))}
                                disabled={daysCount >= 14}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium mb-2">Välj riktning</h4>
                            <Select 
                              value={direction} 
                              onValueChange={(value) => handleDirectionChange(value as 'future' | 'past' | 'both')}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Välj riktning" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="future">Framåt i tiden</SelectItem>
                                <SelectItem value="past">Bakåt i tiden</SelectItem>
                                <SelectItem value="both">Både och</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {renderCalendar()}
                </PopoverContent>
              </Popover>
            </div>
            
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
