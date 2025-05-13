
import { PopoverContent } from "@/components/ui/popover";
import { DateRangeControls } from "./DateRangeControls";
import { DatePickerCalendar } from "./DatePickerCalendar";
import { DateRangeType, DateDirection, DateRange } from "./types";

interface DateRangePickerContentProps {
  dateRangeType: DateRangeType;
  daysCount: number;
  direction: DateDirection;
  date: Date;
  dateRange: DateRange;
  selectedDates: Date[];
  onDateRangeTypeChange: (type: DateRangeType) => void;
  onDaysCountChange: (count: number) => void;
  onDirectionChange: (direction: DateDirection) => void;
  onSingleDateSelect: (date: Date | undefined) => void;
  onRangeSelect: (range: DateRange) => void;
  onMultiDatesSelect: (dates: Date[] | undefined) => void;
}

export function DateRangePickerContent({
  dateRangeType,
  daysCount,
  direction,
  date,
  dateRange,
  selectedDates,
  onDateRangeTypeChange,
  onDaysCountChange,
  onDirectionChange,
  onSingleDateSelect,
  onRangeSelect,
  onMultiDatesSelect
}: DateRangePickerContentProps) {
  return (
    <PopoverContent className="w-auto p-0 bg-white border border-gray-100 shadow-lg rounded-lg">
      <DateRangeControls
        dateRangeType={dateRangeType}
        onDateRangeTypeChange={onDateRangeTypeChange}
        daysCount={daysCount}
        onDaysCountChange={onDaysCountChange}
        direction={direction}
        onDirectionChange={onDirectionChange}
      />
      
      <DatePickerCalendar
        dateRangeType={dateRangeType}
        date={date}
        dateRange={dateRange}
        selectedDates={selectedDates}
        onSingleDateSelect={onSingleDateSelect}
        onRangeSelect={onRangeSelect}
        onMultiDatesSelect={onMultiDatesSelect}
      />
    </PopoverContent>
  );
}
