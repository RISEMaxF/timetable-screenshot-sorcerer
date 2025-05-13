
import { TrainFront } from "lucide-react";

const TimetableHeader = () => {
  return (
    <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
      <div className="flex items-center">
        <TrainFront className="h-5 w-5 text-blue-600 mr-2" />
        <h2 className="text-base font-semibold">Tågtidtabell</h2>
      </div>
    </div>
  );
};

export default TimetableHeader;
