
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Index from './pages/Index';
import Favorites from './pages/Favorites';
import StationSearch from './pages/StationSearch';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="taginfo-theme">
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/station-search" element={<StationSearch />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
