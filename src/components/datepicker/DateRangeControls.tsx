
import { DateRangeType, DateDirection } from "./types";
import { DateRangeTypeSelector } from "./DateRangeTypeSelector";
import { DaysCountSelector } from "./DaysCountSelector";
import { DirectionSelector } from "./DirectionSelector";

interface DateRangeControlsProps {
  dateRangeType: DateRangeType;
  onDateRangeTypeChange: (value: DateRangeType) => void;
  daysCount: number;
  onDaysCountChange: (count: number) => void;
  direction: DateDirection;
  onDirectionChange: (direction: DateDirection) => void;
}

export function DateRangeControls({
  dateRangeType,
  onDateRangeTypeChange,
  daysCount,
  onDaysCountChange,
  direction,
  onDirectionChange
}: DateRangeControlsProps) {
  return (
    <div className="p-3 border-b border-gray-100">
      <div className="space-y-3">
        <DateRangeTypeSelector
          dateRangeType={dateRangeType}
          onDateRangeTypeChange={onDateRangeTypeChange}
        />
        
        {dateRangeType !== 'single' && (
          <>
            <DaysCountSelector
              daysCount={daysCount}
              onDaysCountChange={onDaysCountChange}
            />
            
            <DirectionSelector
              direction={direction}
              onDirectionChange={onDirectionChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
