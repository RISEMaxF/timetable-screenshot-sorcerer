
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateDirection } from "./types";

interface DirectionSelectorProps {
  direction: DateDirection;
  onDirectionChange: (direction: DateDirection) => void;
}

export function DirectionSelector({
  direction,
  onDirectionChange
}: DirectionSelectorProps) {
  return (
    <div>
      <h4 className="font-medium mb-2">Välj riktning</h4>
      <Select 
        value={direction} 
        onValueChange={(value) => onDirectionChange(value as DateDirection)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Välj riktning" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="future">Framåt i tiden</SelectItem>
          <SelectItem value="past">Bakåt i tiden</SelectItem>
          <SelectItem value="both">Både och</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
