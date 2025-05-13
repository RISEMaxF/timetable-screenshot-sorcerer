
import { Button } from "@/components/ui/button";

interface LocationSelectorProps {
  location: string;
  setLocation: (location: string) => void;
  showFlags?: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  setLocation,
  showFlags = false,
}) => {
  // Simple function to cycle through available locations
  const handleLocationChange = () => {
    // Simple toggle between ALL and SE for now
    const newLocation = location === "ALL" ? "SE" : "ALL";
    setLocation(newLocation);
  };

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        onClick={handleLocationChange}
        className="w-[180px] justify-between bg-white"
      >
        {location === "ALL" ? "Alla länder" : "Sverige"}
      </Button>
    </div>
  );
};

export default LocationSelector;
