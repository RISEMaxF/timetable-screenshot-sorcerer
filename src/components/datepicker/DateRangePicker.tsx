
import { useState } from "react";
import { Popover } from "@/components/ui/popover";
import { useDateRange } from "./useDateRange";
import { DateRangePickerTrigger } from "./DateRangePickerTrigger";
import { DateRangePickerContent } from "./DateRangePickerContent";

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
  // Use the useDateRange hook to handle all the date range logic
  const {
    dateRangeType,
    daysCount,
    direction,
    currentDate,
    dateRange,
    selectedDates: localSelectedDates,
    handleDateRangeTypeChange,
    handleDaysCountChange,
    handleDirectionChange,
    handleSingleDateSelect,
    handleRangeSelect,
    handleMultiDatesSelect
  } = useDateRange({
    initialDate: date,
    onDateChange: setDate,
    onMultiDatesChange: setSelectedDates
  });

  return (
    <Popover>
      <DateRangePickerTrigger
        dateRangeType={dateRangeType}
        date={currentDate}
        dateRange={dateRange}
        selectedDates={localSelectedDates}
      />
      <DateRangePickerContent
        dateRangeType={dateRangeType}
        daysCount={daysCount}
        direction={direction}
        date={currentDate}
        dateRange={dateRange}
        selectedDates={localSelectedDates}
        onDateRangeTypeChange={handleDateRangeTypeChange}
        onDaysCountChange={handleDaysCountChange}
        onDirectionChange={handleDirectionChange}
        onSingleDateSelect={handleSingleDateSelect}
        onRangeSelect={handleRangeSelect}
        onMultiDatesSelect={handleMultiDatesSelect}
      />
    </Popover>
  );
}
