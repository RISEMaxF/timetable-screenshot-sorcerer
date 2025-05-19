
import { Building2, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StationHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6">
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
        <img 
          src="https://www.ri.se/themes/rise/dist/images/rise-logo-black.svg" 
          alt="RISE Logo" 
          className="h-12"
        />
      </div>
    </div>
  );
}

export default StationHeader;
