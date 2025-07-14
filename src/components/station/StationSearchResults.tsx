
import { useMemo } from "react";
import { Search, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { fuzzyMatch, partialWordMatch } from "@/utils/fuzzySearch";
import { Train } from "@/types/train";

interface StationSearchResultsProps {
  hasSearched: boolean;
  searchResults: Train[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading?: boolean;
  error?: string | null;
}

const StationSearchResults = ({ 
  hasSearched, 
  searchResults, 
  searchTerm, 
  setSearchTerm,
  isLoading = false,
  error = null
}: StationSearchResultsProps) => {
  // Enhanced flexible search filter for results with performance optimization
  const filteredResults = useMemo(() => {
    if (!searchTerm) return searchResults;
    
    const searchLower = searchTerm.toLowerCase();
    
    return searchResults.filter(train => {
      const fieldsToSearch = [
        train.id,
        train.operator,
        train.from || "",
        train.to || "",
        train.track || "",
        train.country
      ];

      return fieldsToSearch.some(field => {
        const fieldStr = field.toString();
        
        // Try exact substring match first (fastest)
        if (fieldStr.toLowerCase().includes(searchLower)) {
          return true;
        }
        
        // Try fuzzy matching for typos
        if (fuzzyMatch(searchTerm, fieldStr)) {
          return true;
        }
        
        // Try partial word matching
        if (partialWordMatch(searchTerm, fieldStr)) {
          return true;
        }
        
        return false;
      });
    });
  }, [searchResults, searchTerm]);

  // Error state
  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Ett fel inträffade vid sökning: {error}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <h3 className="text-lg font-medium mb-2">Söker...</h3>
        <p>Söker efter tåg enligt de valda kriterierna</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">Välj sökkriterier</h3>
        <p>Välj sökkriterier ovan för att visa avgångar</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        <Building2 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">Inga resultat</h3>
        <p>Inga tåg hittades för de valda kriterierna</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search bar above the table */}
      <div className="p-4 border-b border-border bg-background">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Sök bland resultat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md"
          />
        </div>
        <div className="text-sm text-muted-foreground mt-2">
          {filteredResults.length} av {searchResults.length} tåg visas
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Tåg ID</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Från</TableHead>
              <TableHead>Till</TableHead>
              <TableHead>Ankomsttid</TableHead>
              <TableHead>Spår</TableHead>
              <TableHead>Land</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredResults.map((train, index) => (
              <TableRow 
                key={train.id}
                className={cn(
                  index % 2 === 0 ? "bg-background" : "bg-muted/50",
                  train.highlighted ? "bg-red-100 dark:bg-red-900/40" : ""
                )}
              >
                <TableCell className="font-medium">{train.id}</TableCell>
                <TableCell>{train.operator}</TableCell>
                <TableCell>{train.from || "-"}</TableCell>
                <TableCell>{train.to || "-"}</TableCell>
                <TableCell>{train.arrivalTime || "-"}</TableCell>
                <TableCell>{train.track || "-"}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://flagcdn.com/w20/${train.country.toLowerCase()}.png`} 
                      alt={train.country} 
                      className="w-5 h-auto"
                    />
                    {train.country}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default StationSearchResults;
