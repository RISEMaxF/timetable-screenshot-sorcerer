
import { TrainFront, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MainHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center">
          <TrainFront className="h-8 w-8 mr-2 text-blue-600" />
          Tåginfo
        </h1>
        <div className="flex items-center gap-4">
          <Link to="/station-search">
            <Button variant="outline" className="flex items-center gap-2">
              Stationsök
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

export default MainHeader;
