
import { addDays, subDays } from "date-fns";
import { DateDirection } from "./types";

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
