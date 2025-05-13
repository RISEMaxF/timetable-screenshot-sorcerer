import { useState, useEffect } from "react";
import { addDays, subDays } from "date-fns";
import { DateRangeType, DateDirection, DateRange } from "./types";
import { calculateDateRange, generateMultiDaySelection } from "./dateUtils";

interface UseDateRangeProps {
  initialDate: Date;
  onDateChange?: (date: Date) => void;
  onMultiDatesChange?: (dates: Date[]) => void;
}

export function useDateRange({ 
  initialDate, 
  onDateChange, 
  onMultiDatesChange 
}: UseDateRangeProps) {
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('single');
  const [daysCount, setDaysCount] = useState(3);
  const [direction, setDirection] = useState<DateDirection>('future');
  const [currentDate, setCurrentDate] = useState<Date>(initialDate);

  // For range selection
  const [dateRange, setDateRange] = useState<DateRange>({
    from: initialDate,
    to: direction === 'past' ? undefined : addDays(initialDate, daysCount - 1),
  });

  // For multi-day selection
  const [selectedDates, setSelectedDates] = useState<Date[]>([initialDate]);

  // Update internal date when external date changes
  useEffect(() => {
    setCurrentDate(initialDate);
  }, [initialDate]);

  // Function to handle direction change and update date ranges accordingly
  const handleDirectionChange = (newDirection: DateDirection) => {
    setDirection(newDirection);
    
    if (dateRangeType === 'range') {
      const newRange = calculateDateRange(currentDate, daysCount, newDirection);
      setDateRange(newRange);
    } else if (dateRangeType === 'multi') {
      updateMultiDaySelection(currentDate, daysCount, newDirection);
    }
  };

  // Function to handle days count change and update ranges
  const handleDaysCountChange = (newCount: number) => {
    setDaysCount(newCount);
    
    if (dateRangeType === 'range') {
      const newRange = calculateDateRange(currentDate, newCount, direction);
      setDateRange(newRange);
    } else if (dateRangeType === 'multi') {
      updateMultiDaySelection(currentDate, newCount, direction);
    }
  };

  // Function to update multi-day selection based on center date, count, and direction
  const updateMultiDaySelection = (centerDate: Date, count: number, dir: DateDirection) => {
    const newDates = generateMultiDaySelection(centerDate, count, dir);
    setSelectedDates(newDates);
    
    if (onMultiDatesChange) {
      onMultiDatesChange(newDates);
    }
  };

  // Function to handle date range type change
  const handleDateRangeTypeChange = (value: DateRangeType) => {
    setDateRangeType(value);
    
    if (value === 'single') {
      // Keep the current date
    } else if (value === 'range') {
      // Initialize range based on current direction and days count
      const newRange = calculateDateRange(currentDate, daysCount, direction);
      setDateRange(newRange);
    } else if (value === 'multi') {
      // Initialize multi-day selection
      updateMultiDaySelection(currentDate, daysCount, direction);
    }
  };

  // Handle single date selection
  const handleSingleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setCurrentDate(newDate);
      
      if (onDateChange) {
        onDateChange(newDate);
      }
      
      // If in range or multi mode, also update those selections
      if (dateRangeType === 'range') {
        const newRange = calculateDateRange(newDate, daysCount, direction);
        setDateRange(newRange);
      } else if (dateRangeType === 'multi') {
        updateMultiDaySelection(newDate, daysCount, direction);
      }
    }
  };

  // When a range is selected, update both the main date and the range
  const handleRangeSelect = (range: DateRange) => {
    setDateRange(range);
    if (range.from) {
      setCurrentDate(range.from);
      
      if (onDateChange) {
        onDateChange(range.from);
      }
    }
  };

  // When multiple dates are selected
  const handleMultiDatesSelect = (dates: Date[] | undefined) => {
    if (dates && dates.length > 0) {
      setSelectedDates(dates);
      setCurrentDate(dates[0]);
      
      if (onDateChange) {
        onDateChange(dates[0]);
      }
      
      if (onMultiDatesChange) {
        onMultiDatesChange(dates);
      }
    }
  };

  return {
    dateRangeType,
    daysCount,
    direction,
    currentDate,
    dateRange,
    selectedDates,
    handleDateRangeTypeChange,
    handleDaysCountChange,
    handleDirectionChange,
    handleSingleDateSelect,
    handleRangeSelect,
    handleMultiDatesSelect
  };
}
