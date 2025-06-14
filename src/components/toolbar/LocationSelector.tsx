
import CountryDropdown from "./CountryDropdown";
import StationDropdown from "./StationDropdown";

interface LocationSelectorProps {
  location: string;
  setLocation: (location: string) => void;
  station?: string;
  setStation?: (station: string) => void;
  showFlags?: boolean;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  location,
  setLocation,
  station = "ALL",
  setStation = () => {},
  showFlags = false,
}) => {
  // Handle country change - reset station to ALL when country changes
  const handleCountryChange = (countryCode: string) => {
    setLocation(countryCode);
    setStation("ALL");
  };

  return (
    <div className="flex space-x-2">
      <CountryDropdown
        location={location}
        onLocationChange={handleCountryChange}
        showFlags={showFlags}
      />

      <StationDropdown
        location={location}
        station={station}
        onStationChange={setStation}
      />
    </div>
  );
};

export default LocationSelector;
