
import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center justify-center space-x-6">
            <img 
              src="https://www.ri.se/themes/rise/dist/images/rise-logo-black.svg" 
              alt="RISE Logo" 
              className="h-8 dark:invert"
            />
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="text-sm">
                För feedback, kontakta{" "}
                <a 
                  href="mailto:sandra.haraldson@ri.se" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  sandra.haraldson@ri.se
                </a>
                {" "}eller{" "}
                <a 
                  href="mailto:johan.ostling@ri.se" 
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  johan.ostling@ri.se
                </a>
              </span>
            </div>
          </div>
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} RISE Research Institutes of Sweden.
            </p>
            <p className="text-xs text-muted-foreground">
              Finansierat av RailwayCDM och NOMIR • Under utveckling
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
