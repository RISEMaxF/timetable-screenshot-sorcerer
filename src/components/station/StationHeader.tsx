
import { Building2, TrainFront, Bookmark, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "../ThemeToggle";
import HelpMenu from "../HelpMenu";

const StationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <Building2 className="h-6 w-6 sm:h-8 sm:w-8 mr-2 text-blue-600 dark:text-blue-400" />
          <span className="hidden sm:inline">Stationsök</span>
          <span className="sm:hidden">Station</span>
        </h1>
        
        {isMobile ? (
          <div className="flex items-center gap-2">
            <HelpMenu />
            <ThemeToggle />
            <img 
              src="https://www.ri.se/themes/rise/dist/images/rise-logo-black.svg" 
              alt="RISE Logo" 
              className="h-8 dark:invert"
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
            <HelpMenu />
            <ThemeToggle />
            <img 
              src="https://www.ri.se/themes/rise/dist/images/rise-logo-black.svg" 
              alt="RISE Logo" 
              className="h-12 dark:invert"
            />
          </div>
        )}
      </div>
      
      {isMobile && isMenuOpen && (
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
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
