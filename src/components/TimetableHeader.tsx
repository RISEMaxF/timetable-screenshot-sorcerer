
import { format } from "date-fns";

interface TimetableHeaderProps {
  location: string;
  date: Date;
}

const TimetableHeader = ({ location, date }: TimetableHeaderProps) => {
  const formattedDate = format(date, "EEEE, d MMM yyyy");
  
  return (
    <div className="bg-gray-200 px-6 py-3 border-b border-gray-300">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Ankommande tåg vid <span className="font-bold">{location}</span> • {formattedDate}
      </h2>
    </div>
  );
};

export default TimetableHeader;
