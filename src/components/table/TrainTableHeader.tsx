
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Train } from "@/types/train";

interface TrainTableHeaderProps {
  onSort?: (field: keyof Train) => void;
  sortField?: keyof Train | null;
  sortDirection?: "asc" | "desc";
}

const TrainTableHeader = ({ 
  onSort, 
  sortField, 
  sortDirection 
}: TrainTableHeaderProps) => {
  const renderSortIcon = (field: keyof Train) => {
    if (sortField !== field) return null;
    
    return sortDirection === "asc" ? (
      <ArrowUp className="ml-1 h-4 w-4 inline" />
    ) : (
      <ArrowDown className="ml-1 h-4 w-4 inline" />
    );
  };
  
  const headerClasses = "px-4 py-3 text-left font-medium text-gray-700 bg-gray-100 cursor-pointer select-none";
  
  return (
    <TableHeader>
      <TableRow>
        {/* Checkbox column */}
        <TableHead className="w-10 p-0">
          <span className="sr-only">Välj</span>
        </TableHead>
        
        {/* Data columns with consistent widths */}
        <TableHead 
          className={`${headerClasses} w-20`}
          onClick={() => onSort && onSort("id")}
        >
          Tåg-ID {renderSortIcon("id")}
        </TableHead>
        <TableHead 
          className={`${headerClasses} w-20`}
          onClick={() => onSort && onSort("announcedTrainNumber")}
        >
          Annons. tågnr {renderSortIcon("announcedTrainNumber")}
        </TableHead>
        <TableHead 
          className={`${headerClasses} w-24`}
          onClick={() => onSort && onSort("operator")}
        >
          Operatör {renderSortIcon("operator")}
        </TableHead>
        <TableHead 
          className={`${headerClasses} w-24`}
          onClick={() => onSort && onSort("from")}
        >
          Från {renderSortIcon("from")}
        </TableHead>
        <TableHead 
          className={`${headerClasses} w-24`}
          onClick={() => onSort && onSort("to")}
        >
          Till {renderSortIcon("to")}
        </TableHead>
        <TableHead 
          className={`${headerClasses} w-24`}
          onClick={() => onSort && onSort("latest")}
        >
          Senast {renderSortIcon("latest")}
        </TableHead>
        <TableHead 
          className={`${headerClasses} w-28`}
          onClick={() => onSort && onSort("updated")}
        >
          Uppdaterad {renderSortIcon("updated")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TrainTableHeader;
