
import { TrainFront, Menu, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "./ThemeToggle";
import HelpMenu from "./HelpMenu";

interface MainHeaderProps {
  showFavorites?: boolean;
  onToggleFavorites?: () => void;
}

const MainHeader = ({ showFavorites = false, onToggleFavorites }: MainHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
          <TrainFront className="h-6 w-6 sm:h-8 sm:w-8 mr-2 text-blue-600 dark:text-blue-400" />
          <span className="hidden sm:inline">Tåginfo</span>
          <span className="sm:hidden">Tåg</span>
        </h1>
        
        {isMobile ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <User className="h-4 w-4" />
              <span>Johan Östling</span>
            </div>
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
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <User className="h-4 w-4" />
              <span>Johan Östling</span>
            </div>
            <Link to="/station-search">
              <Button variant="outline" className="flex items-center gap-2">
                Stationsök
              </Button>
            </Link>
            {onToggleFavorites && (
              <Button 
                variant="outline" 
                onClick={onToggleFavorites}
                className="flex items-center gap-2"
              >
                <Star className={`h-4 w-4 ${showFavorites ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                {showFavorites ? "Visa alla tåg" : "Visa favoriter"}
              </Button>
            )}
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
          <Link to="/station-search" className="block">
            <Button variant="outline" className="w-full justify-start">
              Stationsök
            </Button>
          </Link>
          {onToggleFavorites && (
            <Button 
              variant="outline" 
              onClick={onToggleFavorites}
              className="w-full justify-start flex items-center gap-2"
            >
              <Star className={`h-4 w-4 ${showFavorites ? 'fill-yellow-400 text-yellow-400' : ''}`} />
              {showFavorites ? "Visa alla tåg" : "Visa favoriter"}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default MainHeader;
