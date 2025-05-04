
import React from "react";
import { TableRow, TableCell } from "../ui/table";
import { TableIcon } from "lucide-react";

const EmptyState = () => {
  return (
    <TableRow>
      <TableCell colSpan={11} className="h-24 text-center">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <TableIcon className="h-8 w-8 mb-2" />
          <span>Inga tåg att visa</span>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default EmptyState;
