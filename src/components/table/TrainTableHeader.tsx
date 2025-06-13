
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, SeparatorVertical } from "lucide-react";
import { Train } from "@/types/train";
import { cn } from "@/lib/utils";

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
  
  const headerClasses = "px-4 py-3 text-left font-medium text-muted-foreground bg-muted cursor-pointer select-none relative hover:bg-muted/80 transition-colors";
  
  return (
    <TableHeader className="border-b-2 border-border">
      <TableRow>
        {/* Checkbox column */}
        <TableHead className="w-10 p-0 bg-muted">
          <span className="px-2 text-xs font-medium text-muted-foreground">Välj</span>
        </TableHead>
        
        {/* Data columns with consistent widths */}
        <TableHead 
          className={cn(headerClasses, "w-20", sortField === "id" && "bg-muted/60")}
          onClick={() => onSort && onSort("id")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Tåg-ID {renderSortIcon("id")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-border absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={cn(headerClasses, "w-20 hidden sm:table-cell", sortField === "announcedTrainNumber" && "bg-muted/60")}
          onClick={() => onSort && onSort("announcedTrainNumber")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Annons. tågnr {renderSortIcon("announcedTrainNumber")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-border absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={cn(headerClasses, "w-24", sortField === "operator" && "bg-muted/60")}
          onClick={() => onSort && onSort("operator")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Operatör {renderSortIcon("operator")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-border absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={cn(headerClasses, "w-24 hidden md:table-cell", sortField === "from" && "bg-muted/60")}
          onClick={() => onSort && onSort("from")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Från {renderSortIcon("from")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-border absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={cn(headerClasses, "w-24 hidden md:table-cell", sortField === "to" && "bg-muted/60")}
          onClick={() => onSort && onSort("to")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Till {renderSortIcon("to")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-border absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={cn(headerClasses, "w-24", sortField === "latest" && "bg-muted/60")}
          onClick={() => onSort && onSort("latest")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Senast {renderSortIcon("latest")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-border absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={cn(headerClasses, "w-28 hidden lg:table-cell", sortField === "updated" && "bg-muted/60")}
          onClick={() => onSort && onSort("updated")}
        >
          <span className="flex items-center">
            Uppdaterad {renderSortIcon("updated")}
          </span>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TrainTableHeader;
