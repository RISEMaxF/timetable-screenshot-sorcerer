
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";

interface TimeInputProps {
  value: string;
  onBlur: (value: string) => void;
}

const TimeInput = ({ value, onBlur }: TimeInputProps) => {
  const [timeValue, setTimeValue] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
    setTimeValue(formatTimeValue(e.target.value));
  };

  const handleBlur = () => {
    // Validate time format
    const timeRegex = /^([01]?[0-9]|2[0-3]):?([0-5][0-9])$/;
    if (timeRegex.test(timeValue.replace(":", ""))) {
      const [hours, minutes] = timeValue.split(":");
      const formattedTime = `${hours.padStart(2, "0")}:${minutes || "00"}`;
      onBlur(formattedTime);
    } else {
      onBlur(value); // Revert to original value if invalid
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleBlur();
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
      className="h-8 w-16 p-1 text-sm"
      placeholder="hh:mm"
      maxLength={5}
      autoFocus
    />
  );
};

export default TimeInput;
