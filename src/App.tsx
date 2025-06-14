
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import StationSearch from './pages/StationSearch';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="taginfo-theme">
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <FavoritesProvider>
            <Router>
              <div className="min-h-screen bg-background flex flex-col">
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/station-search" element={<StationSearch />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
                <Footer />
                <Toaster />
              </div>
            </Router>
          </FavoritesProvider>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
