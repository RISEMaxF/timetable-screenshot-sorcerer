
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
  
  const headerClasses = "px-4 py-3 text-left font-medium text-gray-700 cursor-pointer select-none";
  
  return (
    <TableHeader className="bg-gray-100">
      <TableRow>
        <TableHead 
          className={headerClasses}
          onClick={() => onSort && onSort("id")}
        >
          Tåg-ID {renderSortIcon("id")}
        </TableHead>
        <TableHead className={headerClasses}>OTN</TableHead>
        <TableHead className={headerClasses}>Operatör</TableHead>
        <TableHead 
          className={headerClasses}
          onClick={() => onSort && onSort("arrivalTime")}
        >
          Ankomst {renderSortIcon("arrivalTime")}
        </TableHead>
        <TableHead 
          className={headerClasses}
          onClick={() => onSort && onSort("track")}
        >
          Spår {renderSortIcon("track")}
        </TableHead>
        <TableHead className={headerClasses}>Anteckningar</TableHead>
        <TableHead className={headerClasses}>Ny operatör</TableHead>
        <TableHead className={headerClasses}>Ny tid</TableHead>
        <TableHead className={headerClasses}>Spårändring</TableHead>
        <TableHead className={headerClasses}>Nya anteckningar</TableHead>
        <TableHead 
          className={`${headerClasses} text-center`}
          onClick={() => onSort && onSort("completed")}
        >
          Klar {renderSortIcon("completed")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TrainTableHeader;
