
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { PopoverTrigger } from "@/components/ui/popover";
import { DateRangeType, DateRange } from "./types";
import { formatDateDisplay } from "./dateUtils";

interface DateRangePickerTriggerProps {
  dateRangeType: DateRangeType;
  date: Date;
  dateRange: DateRange;
  selectedDates: Date[];
}

export function DateRangePickerTrigger({
  dateRangeType,
  date,
  dateRange,
  selectedDates
}: DateRangePickerTriggerProps) {
  return (
    <PopoverTrigger asChild>
      <Button 
        variant="outline" 
        className="w-full sm:w-auto h-10 px-3 rounded-full bg-background border-border shadow-sm hover:bg-accent"
      >
        <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
        {formatDateDisplay({
          dateRangeType,
          date,
          dateRange,
          selectedDates
        })}
      </Button>
    </PopoverTrigger>
  );
}
