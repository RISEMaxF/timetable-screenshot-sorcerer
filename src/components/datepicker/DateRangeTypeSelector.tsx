
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { DateRangeType } from "./types";

interface DateRangeTypeSelectorProps {
  dateRangeType: DateRangeType;
  onDateRangeTypeChange: (value: DateRangeType) => void;
}

export function DateRangeTypeSelector({
  dateRangeType,
  onDateRangeTypeChange
}: DateRangeTypeSelectorProps) {
  return (
    <div>
      <h4 className="font-medium mb-2">Välj datumtyp</h4>
      <RadioGroup 
        value={dateRangeType} 
        onValueChange={(value) => onDateRangeTypeChange(value as DateRangeType)}
        className="flex items-center gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="single" id="single" />
          <Label htmlFor="single">En dag</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="range" id="range" />
          <Label htmlFor="range">Datumintervall</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="multi" id="multi" />
          <Label htmlFor="multi">Flera dagar</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
