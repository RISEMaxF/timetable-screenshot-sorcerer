
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
        title: "Inga matchande tåg hittades",
        description: "Försök ändra din sökterm eller filterkriterier"
      };
    } else if (searchTerm) {
      return {
        icon: <SearchX className="h-12 w-12 text-gray-400 mb-2" />,
        title: "Inga tåg matchar din sökning",
        description: `Inga tåg hittades som matchar "${searchTerm}"`
      };
    } else if (filterApplied) {
      return {
        icon: <Filter className="h-12 w-12 text-gray-400 mb-2" />,
        title: "Inga tåg matchar detta filter",
        description: "Försök ändra dina filterkriterier"
      };
    } else {
      return {
        icon: <Filter className="h-12 w-12 text-gray-400 mb-2" />,
        title: "Inga tåg tillgängliga",
        description: "Det finns inga tåg att visa just nu"
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
