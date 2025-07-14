
import { Building2, TrainFront, Bookmark, Menu, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "../ThemeToggle";
import HelpMenu from "../HelpMenu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const StationHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo] = useState({ name: "Johan Östling" }); // TODO: Replace with actual user data
  const isMobile = useIsMobile();

  const handleLogout = () => {
    // TODO: Implement actual logout logic
    console.log("User logged out");
  };

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
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                  <User className="h-4 w-4" />
                  <span>{userInfo.name}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logga ut
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bekräfta utloggning</AlertDialogTitle>
                      <AlertDialogDescription>
                        Är du säker på att du vill logga ut?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Avbryt</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>Logga ut</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PopoverContent>
            </Popover>
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
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors">
                  <User className="h-4 w-4" />
                  <span>{userInfo.name}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logga ut
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Bekräfta utloggning</AlertDialogTitle>
                      <AlertDialogDescription>
                        Är du säker på att du vill logga ut?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Avbryt</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>Logga ut</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </PopoverContent>
            </Popover>
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
