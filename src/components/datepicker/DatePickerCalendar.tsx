
import { Calendar } from "@/components/ui/calendar";
import { sv } from "date-fns/locale";
import { DateRangeType, DateRange } from "./types";

interface DatePickerCalendarProps {
  dateRangeType: DateRangeType;
  date: Date;
  dateRange: DateRange;
  selectedDates: Date[];
  onSingleDateSelect: (date: Date | undefined) => void;
  onRangeSelect: (range: DateRange) => void;
  onMultiDatesSelect: (dates: Date[] | undefined) => void;
}

export function DatePickerCalendar({
  dateRangeType,
  date,
  dateRange,
  selectedDates,
  onSingleDateSelect,
  onRangeSelect,
  onMultiDatesSelect
}: DatePickerCalendarProps) {
  if (dateRangeType === 'single') {
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={onSingleDateSelect}
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
        onSelect={onRangeSelect}
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
        selected={selectedDates}
        onSelect={onMultiDatesSelect}
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
      onSelect={onSingleDateSelect}
      initialFocus
      numberOfMonths={2}
      locale={sv}
      className="p-3 pointer-events-auto"
    />
  );
}
