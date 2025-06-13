
import { Building2, TrainFront, Bookmark, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const StationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 flex items-center">
          <Building2 className="h-6 w-6 sm:h-8 sm:w-8 mr-2 text-blue-600" />
          <span className="hidden sm:inline">Stationsök</span>
          <span className="sm:hidden">Station</span>
        </h1>
        
        {isMobile ? (
          <div className="flex items-center gap-2">
            <img 
              src="https://www.ri.se/themes/rise/dist/images/rise-logo-black.svg" 
              alt="RISE Logo" 
              className="h-8"
            />
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        ) : (
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
        )}
      </div>
      
      {isMobile && isMenuOpen && (
        <div className="mt-4 border-t pt-4 space-y-2">
          <Link to="/" className="block">
            <Button variant="outline" className="w-full justify-start">
              <TrainFront className="h-4 w-4 mr-2" />
              Tåginfo
            </Button>
          </Link>
          <Link to="/favorites" className="block">
            <Button variant="outline" className="w-full justify-start">
              <Bookmark className="h-4 w-4 mr-2" />
              Favoriter
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default StationHeader;
