
import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { SearchX, Filter } from "lucide-react";

interface EmptyStateProps {
  searchTerm?: string;
  filterApplied?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, filterApplied }) => {
  const getMessage = () => {
    if (searchTerm && filterApplied) {
      return {
        icon: <SearchX className="h-12 w-12 text-gray-400 mb-2" />,
        title: "No matching trains found",
        description: "Try changing your search term or filter criteria"
      };
    } else if (searchTerm) {
      return {
        icon: <SearchX className="h-12 w-12 text-gray-400 mb-2" />,
        title: "No trains match your search",
        description: `No trains found matching "${searchTerm}"`
      };
    } else if (filterApplied) {
      return {
        icon: <Filter className="h-12 w-12 text-gray-400 mb-2" />,
        title: "No trains match this filter",
        description: "Try changing your filter criteria"
      };
    } else {
      return {
        icon: <Filter className="h-12 w-12 text-gray-400 mb-2" />,
        title: "No trains available",
        description: "There are no trains to display at this time"
      };
    }
  };

  const { icon, title, description } = getMessage();

  return (
    <TableRow>
      <TableCell colSpan={11} className="h-64 text-center">
        <div className="flex flex-col items-center justify-center p-8">
          {icon}
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyState;
