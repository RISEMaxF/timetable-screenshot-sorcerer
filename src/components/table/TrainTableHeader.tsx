
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDown, ArrowUp, SeparatorVertical } from "lucide-react";
import { Train } from "@/types/train";
import { Separator } from "../ui/separator";

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
  
  const headerClasses = "px-4 py-3 text-left font-medium text-gray-700 bg-gray-100 cursor-pointer select-none relative";
  
  return (
    <TableHeader className="border-b-2 border-gray-300">
      <TableRow>
        {/* Checkbox column */}
        <TableHead className="w-10 p-0 bg-gray-100">
          <span className="px-2 text-xs font-medium text-gray-500">Välj</span>
        </TableHead>
        
        {/* Data columns with consistent widths */}
        <TableHead 
          className={`${headerClasses} w-20`}
          onClick={() => onSort && onSort("id")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Tåg-ID {renderSortIcon("id")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-gray-300 absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={`${headerClasses} w-20`}
          onClick={() => onSort && onSort("announcedTrainNumber")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Annons. tågnr {renderSortIcon("announcedTrainNumber")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-gray-300 absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={`${headerClasses} w-24`}
          onClick={() => onSort && onSort("operator")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Operatör {renderSortIcon("operator")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-gray-300 absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={`${headerClasses} w-24`}
          onClick={() => onSort && onSort("from")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Från {renderSortIcon("from")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-gray-300 absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={`${headerClasses} w-24`}
          onClick={() => onSort && onSort("to")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Till {renderSortIcon("to")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-gray-300 absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={`${headerClasses} w-24`}
          onClick={() => onSort && onSort("latest")}
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center">
              Senast {renderSortIcon("latest")}
            </span>
            <SeparatorVertical className="h-5 w-5 text-gray-300 absolute right-0" />
          </div>
        </TableHead>
        
        <TableHead 
          className={`${headerClasses} w-28`}
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
