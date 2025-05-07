
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface TimeInputProps {
  value: string;
  onBlur: (value: string) => void;
}

const TimeInput = ({ value, onBlur }: TimeInputProps) => {
  const [timeValue, setTimeValue] = useState(value || "");
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, []);

  const validateTimeFormat = (input: string): boolean => {
    // Empty is allowed
    if (!input) return true;
    
    const timeRegex = /^([01]?[0-9]|2[0-3]):?([0-5][0-9])$/;
    return timeRegex.test(input.replace(":", ""));
  };

  const formatTimeValue = (input: string) => {
    // Remove non-numeric characters
    let cleaned = input.replace(/[^\d]/g, "");
    
    // Format as hh:mm
    if (cleaned.length > 2) {
      cleaned = `${cleaned.substring(0, 2)}:${cleaned.substring(2, 4)}`;
    }
    
    return cleaned;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatTimeValue(e.target.value);
    setTimeValue(formatted);
    setIsValid(validateTimeFormat(formatted));
  };

  const handleBlur = () => {
    if (validateTimeFormat(timeValue)) {
      if (timeValue) {
        const [hours, minutes] = timeValue.split(":");
        const formattedTime = `${hours.padStart(2, "0")}:${minutes || "00"}`;
        onBlur(formattedTime);
      } else {
        onBlur("");
      }
    } else {
      toast({
        title: "Invalid time format",
        description: "Please use HH:MM format (e.g., 13:45)",
        variant: "destructive"
      });
      onBlur(value); // Revert to original value if invalid
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Quick increment/decrement with arrow keys
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (timeValue) {
        const [hours, minutes] = timeValue.split(":");
        let h = parseInt(hours || "0", 10);
        let m = parseInt(minutes || "0", 10);
        
        if (e.key === "ArrowUp") {
          m += 15;
          if (m >= 60) {
            m = 0;
            h += 1;
          }
          if (h >= 24) h = 0;
        } else {
          m -= 15;
          if (m < 0) {
            m = 45;
            h -= 1;
          }
          if (h < 0) h = 23;
        }
        
        const newTime = `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
        setTimeValue(newTime);
      }
    }
    
    if (e.key === "Enter") {
      handleBlur();
    }
    
    if (e.key === "Escape") {
      onBlur(value); // Revert to original on escape
    }
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      value={timeValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        "h-8 w-20 p-1 text-sm",
        !isValid && "border-red-500 focus-visible:ring-red-500"
      )}
      placeholder="hh:mm"
      maxLength={5}
      autoFocus
    />
  );
};

export default TimeInput;

// Helper function that was missing
const cn = (...classes: any[]) => {
  return classes.filter(Boolean).join(" ");
};
