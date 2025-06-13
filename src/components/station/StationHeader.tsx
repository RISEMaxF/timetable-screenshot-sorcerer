
import { Building2, TrainFront, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StationHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <Building2 className="h-8 w-8 mr-2 text-blue-600" />
          Stationsök
        </h1>
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="outline" className="flex items-center gap-2">
              <TrainFront className="h-4 w-4" />
              Tåginfo
            </Button>
          </Link>
          <Link to="/favorites">
            <Button variant="outline" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Favoriter
            </Button>
          </Link>
          <img 
            src="https://www.ri.se/themes/rise/dist/images/rise-logo-black.svg" 
            alt="RISE Logo" 
            className="h-12"
          />
        </div>
      </div>
    </div>
  );
}

export default StationHeader;
