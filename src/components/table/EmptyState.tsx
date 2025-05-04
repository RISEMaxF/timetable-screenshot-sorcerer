
import React from "react";
import { TableRow, TableCell } from "../ui/table";
import { TableIcon } from "lucide-react";

const EmptyState = () => {
  return (
    <TableRow>
      <TableCell colSpan={11} className="h-36 text-center">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <TableIcon className="h-12 w-12 mb-3 text-gray-400" />
          <span className="text-lg">Inga tåg att visa</span>
          <p className="text-sm text-gray-400 mt-1 max-w-md">
            Det finns inga tåg att visa för tillfället. Försök ändra filtreringsalternativen eller återkom senare.
          </p>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyState;
