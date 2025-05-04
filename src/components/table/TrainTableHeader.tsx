
import React from "react";
import { TableHeader, TableHead, TableRow } from "../ui/table";

const TrainTableHeader = () => {
  return (
    <TableHeader>
      <TableRow className="border-b border-gray-300 bg-gray-100">
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">Tåg ID</TableHead>
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">OTN</TableHead>
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">Op.</TableHead>
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">Ank.</TableHead>
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">Spår</TableHead>
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">Anmärkning</TableHead>
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">Ny op.</TableHead>
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">Ny tid</TableHead>
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">Nytt spår</TableHead>
        <TableHead className="font-semibold text-sm border-r p-2 text-gray-700 sticky top-0">Ny anmärkning</TableHead>
        <TableHead className="font-semibold text-sm p-2 text-gray-700 sticky top-0 text-center">Klar</TableHead>
      </TableRow>
    </TableHeader>
  );
};

export default TrainTableHeader;
