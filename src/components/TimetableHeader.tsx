
import { format } from "date-fns";
import { sv } from "date-fns/locale";

interface TimetableHeaderProps {
  location: string;
  date: Date;
}

const TimetableHeader = ({ location, date }: TimetableHeaderProps) => {
  const formattedDate = format(date, "EEEE, d MMM yyyy", { locale: sv });
  
  return (
    <div className="bg-gray-200 px-6 py-4 border-b border-gray-300">
      <h2 className="text-xl font-semibold text-center text-gray-800">
        Tåg info
      </h2>
    </div>
  );
};

export default TimetableHeader;
