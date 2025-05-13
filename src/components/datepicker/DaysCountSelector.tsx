
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DaysCountSelectorProps {
  daysCount: number;
  onDaysCountChange: (count: number) => void;
}

export function DaysCountSelector({
  daysCount,
  onDaysCountChange
}: DaysCountSelectorProps) {
  return (
    <div>
      <h4 className="font-medium mb-2">Antal dagar</h4>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => onDaysCountChange(Math.max(2, daysCount - 1))}
          disabled={daysCount <= 2}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="w-8 text-center">{daysCount}</div>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8" 
          onClick={() => onDaysCountChange(Math.min(14, daysCount + 1))}
          disabled={daysCount >= 14}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
