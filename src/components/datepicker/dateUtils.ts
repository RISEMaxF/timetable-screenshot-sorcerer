
import { addDays, subDays, format, isValid } from "date-fns";
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
  // Helper function to safely format dates
  const safeFormat = (dateToFormat: Date, formatString: string) => {
    if (!dateToFormat || !isValid(dateToFormat)) {
      return "Invalid date";
    }
    return format(dateToFormat, formatString, { locale: sv });
  };

  if (dateRangeType === 'single') {
    return safeFormat(date, "PPP");
  } else if (dateRangeType === 'range' && dateRange.from && dateRange.to) {
    return `${safeFormat(dateRange.from, "d MMM")} - ${safeFormat(dateRange.to, "d MMM")}`;
  } else if (dateRangeType === 'multi' && selectedDates.length > 0) {
    if (selectedDates.length === 1) {
      return safeFormat(selectedDates[0], "PPP");
    } else {
      return `${selectedDates.length} dagar: ${safeFormat(selectedDates[0], "d MMM")} - ${safeFormat(selectedDates[selectedDates.length - 1], "d MMM")}`;
    }
  }
  return safeFormat(date, "PPP");
}
