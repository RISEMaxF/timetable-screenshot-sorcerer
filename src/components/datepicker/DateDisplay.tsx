
import { format } from "date-fns";
import { sv } from "date-fns/locale";
import { DateRangeType } from "./types";

interface DateDisplayProps {
  dateRangeType: DateRangeType;
  date: Date;
  dateRange: {
    from: Date;
    to?: Date;
  };
  selectedDates: Date[];
}

export function formatDateDisplay({
  dateRangeType,
  date,
  dateRange,
  selectedDates
}: DateDisplayProps): string {
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
}
