import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { sv } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type DateRangeType = 'single' | 'range' | 'multi';
export type DateDirection = 'future' | 'past' | 'both';

interface DateRangePickerProps {
  date: Date;
  setDate: (date: Date) => void;
  selectedDates?: Date[];
  setSelectedDates?: (dates: Date[]) => void;
}

export function DateRangePicker({ 
  date, 
  setDate,
  selectedDates,
  setSelectedDates
}: DateRangePickerProps) {
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('single');
  const [daysCount, setDaysCount] = useState(3);
  const [direction, setDirection] = useState<DateDirection>('future');

  // For range selection
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to?: Date;
  }>({
    from: date,
    to: direction === 'past' ? undefined : addDays(date, daysCount - 1),
  });

  // For multi-day selection
  const [localSelectedDates, setLocalSelectedDates] = useState<Date[]>([date]);

  // Function to handle direction change and update date ranges accordingly
  const handleDirectionChange = (newDirection: DateDirection) => {
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
  const updateMultiDaySelection = (centerDate: Date, count: number, dir: DateDirection) => {
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
    
    setLocalSelectedDates(newDates);
    if (setSelectedDates) {
      setSelectedDates(newDates);
    }
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
    } else if (dateRangeType === 'multi' && localSelectedDates.length > 0) {
      if (localSelectedDates.length === 1) {
        return format(localSelectedDates[0], "PPP", { locale: sv });
      } else {
        return `${localSelectedDates.length} dagar: ${format(localSelectedDates[0], "d MMM", { locale: sv })} - ${format(localSelectedDates[localSelectedDates.length - 1], "d MMM", { locale: sv })}`;
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
      setLocalSelectedDates(dates);
      if (setSelectedDates) {
        setSelectedDates(dates);
      }
      // Update the main date to the first selected date
      setDate(dates[0]);
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
          className="p-3 pointer-events-auto"
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
          className="p-3 pointer-events-auto"
        />
      );
    } else if (dateRangeType === 'multi') {
      return (
        <Calendar
          mode="multiple"
          selected={localSelectedDates}
          onSelect={handleMultiDatesSelect}
          initialFocus
          numberOfMonths={2}
          locale={sv}
          className="p-3 pointer-events-auto"
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
        className="p-3 pointer-events-auto"
      />
    );
  };

  return (
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
                    onValueChange={(value) => handleDirectionChange(value as DateDirection)}
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
  );
}
