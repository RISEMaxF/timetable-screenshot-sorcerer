
export type DateRangeType = 'single' | 'range' | 'multi';
export type DateDirection = 'future' | 'past' | 'both';

export interface DateRange {
  from: Date;
  to?: Date;
}
