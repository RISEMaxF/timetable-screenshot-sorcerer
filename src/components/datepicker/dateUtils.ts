import { addDays, subDays, format } from "date-fns";
import { sv } from "date-fns/locale";
import { DateDirection, DateRangeType } from "./types";

/**
 * Calculate range of dates based on a central date, days count, and direction
 */
export function calculateDateRange(centerDate: Date, daysCount: number, direction: DateDirection) {
  if (direction === 'future') {
    return {
      from: centerDate,
      to: addDays(centerDate, daysCount - 1)
    };
  } else if (direction === 'past') {
    return {
      from: subDays(centerDate, daysCount - 1),
      to: centerDate
    };
  } else { // both
    const middlePoint = Math.floor(daysCount / 2);
    return {
      from: subDays(centerDate, middlePoint),
      to: addDays(centerDate, daysCount - 1 - middlePoint)
    };
  }
}

/**
 * Generate an array of dates based on center date, count and direction
 */
export function generateMultiDaySelection(centerDate: Date, count: number, dir: DateDirection): Date[] {
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
  
  return newDates;
}

/**
 * Format date display based on dateRangeType and selection
 */
export function formatDateDisplay({
  dateRangeType,
  date,
  dateRange,
  selectedDates
}: {
  dateRangeType: DateRangeType;
  date: Date;
  dateRange: {
    from: Date;
    to?: Date;
  };
  selectedDates: Date[];
}): string {
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
