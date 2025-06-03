
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { fuzzyMatch, partialWordMatch } from "@/utils/fuzzySearch";

interface Train {
  id: string;
  operator: string;
  from?: string;
  to?: string;
  arrivalTime?: string;
  track?: string;
  country: string;
  highlighted?: boolean;
}

interface StationSearchResultsProps {
  hasSearched: boolean;
  searchResults: Train[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const StationSearchResults = ({ 
  hasSearched, 
  searchResults, 
  searchTerm, 
  setSearchTerm 
}: StationSearchResultsProps) => {
  // Enhanced flexible search filter for results
  const filteredResults = searchTerm ? searchResults.filter(train => {
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
      const searchLower = searchTerm.toLowerCase();
      
      // Try exact substring match first
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
  }) : searchResults;

  if (!hasSearched) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium mb-2">Välj sökkriterier</h3>
        <p>Välj sökkriterier ovan för att visa avgångar</p>
      </div>
    );
  }

  if (searchResults.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium mb-2">Inga resultat</h3>
        <p>Inga tåg hittades för de valda kriterierna</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search bar above the table */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Sök bland resultat..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-md"
          />
        </div>
        <div className="text-sm text-gray-500 mt-2">
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
                  index % 2 === 0 ? "bg-white" : "bg-gray-50",
                  train.highlighted ? "bg-pink-50" : ""
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
