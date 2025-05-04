
import { format } from "date-fns";

interface TimetableHeaderProps {
  location: string;
  date: Date;
}

const TimetableHeader = ({ location, date }: TimetableHeaderProps) => {
  const formattedDate = format(date, "EEEE, d MMM");
  
  return (
    <div className="bg-gray-200 px-6 py-4 border-b border-gray-300">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Ankommande tåg vid {location} {formattedDate}
      </h2>
    </div>
  );
};

export default TimetableHeader;
