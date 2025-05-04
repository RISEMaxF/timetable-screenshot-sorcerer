
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import TimeInput from "./TimeInput";
import { Train } from "../types/train";
import { cn } from "@/lib/utils";
import { ArrowRight, TableIcon } from "lucide-react";

interface TrainTimetableProps {
  trains: Train[];
  onTrainUpdate: (train: Train) => void;
}

const TrainTimetable = ({ trains, onTrainUpdate }: TrainTimetableProps) => {
  const [editingCell, setEditingCell] = useState<{
    trainId: string;
    field: keyof Train | null;
  }>({ trainId: "", field: null });

  const handleCellEdit = (train: Train, field: keyof Train, value: any) => {
    const updatedTrain = { ...train, [field]: value };
    onTrainUpdate(updatedTrain);
    setEditingCell({ trainId: "", field: null });
  };

  const startEditing = (trainId: string, field: keyof Train) => {
    setEditingCell({ trainId, field });
  };

  return (
    <div className="border rounded-md overflow-hidden">
      <Table className="border-collapse w-full">
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
        <TableBody>
          {trains.map((train, index) => (
            <TableRow 
              key={train.id}
              className={cn(
                "border-b hover:bg-gray-50 transition-colors",
                index % 2 === 0 ? "bg-white" : "bg-gray-50",
                train.highlight ? "bg-red-50" : "",
                train.completed ? "bg-green-50" : ""
              )}
            >
              <TableCell className="font-medium border-r p-2 text-sm">{train.id}</TableCell>
              <TableCell className="border-r p-2 text-sm">{train.otn || "-"}</TableCell>
              <TableCell className="border-r p-2 text-sm">{train.operator}</TableCell>
              <TableCell 
                className={cn(
                  "border-r p-2 text-sm cursor-pointer",
                  train.highlight ? "bg-red-100" : ""
                )}
                onClick={() => startEditing(train.id, "arrivalTime")}
              >
                {editingCell.trainId === train.id && editingCell.field === "arrivalTime" ? (
                  <TimeInput 
                    value={train.arrivalTime} 
                    onBlur={(value) => handleCellEdit(train, "arrivalTime", value)} 
                  />
                ) : (
                  train.arrivalTime
                )}
              </TableCell>
              <TableCell 
                className="border-r p-2 text-sm cursor-pointer"
                onClick={() => startEditing(train.id, "track")}
              >
                {editingCell.trainId === train.id && editingCell.field === "track" ? (
                  <Input 
                    value={train.track as string} 
                    onChange={(e) => handleCellEdit(train, "track", e.target.value)}
                    className="h-8 w-12 p-1 text-sm"
                    autoFocus
                  />
                ) : (
                  <div className={cn(
                    "flex items-center",
                    train.newTrack ? "line-through text-gray-500" : ""
                  )}>
                    {train.track}
                  </div>
                )}
              </TableCell>
              <TableCell 
                className="border-r p-2 text-sm cursor-pointer"
                onClick={() => startEditing(train.id, "notes")}
              >
                {editingCell.trainId === train.id && editingCell.field === "notes" ? (
                  <Input 
                    value={train.notes || ""} 
                    onChange={(e) => handleCellEdit(train, "notes", e.target.value)}
                    className="h-8 w-full p-1 text-sm"
                    autoFocus
                  />
                ) : (
                  train.notes || "-"
                )}
              </TableCell>
              <TableCell 
                className="border-r p-2 text-sm cursor-pointer"
                onClick={() => startEditing(train.id, "newOperator")}
              >
                {editingCell.trainId === train.id && editingCell.field === "newOperator" ? (
                  <Input 
                    value={train.newOperator || ""} 
                    onChange={(e) => handleCellEdit(train, "newOperator", e.target.value)}
                    className="h-8 w-full p-1 text-sm"
                    autoFocus
                  />
                ) : (
                  train.newOperator || ""
                )}
              </TableCell>
              <TableCell 
                className="border-r p-2 text-sm cursor-pointer"
                onClick={() => startEditing(train.id, "newTime")}
              >
                {editingCell.trainId === train.id && editingCell.field === "newTime" ? (
                  <TimeInput 
                    value={train.newTime || ""} 
                    onBlur={(value) => handleCellEdit(train, "newTime", value)} 
                  />
                ) : (
                  <div className="flex items-center">
                    {train.newTime || <span className="text-gray-400">hh:mm</span>}
                    {train.newTime && <ClockIcon className="ml-1 h-4 w-4" />}
                  </div>
                )}
              </TableCell>
              <TableCell 
                className={cn(
                  "border-r p-2 text-sm cursor-pointer",
                  train.newTrack ? "bg-yellow-100" : ""
                )}
                onClick={() => startEditing(train.id, "newTrack")}
              >
                {editingCell.trainId === train.id && editingCell.field === "newTrack" ? (
                  <Input 
                    value={train.newTrack as string || ""} 
                    onChange={(e) => handleCellEdit(train, "newTrack", e.target.value)}
                    className="h-8 w-12 p-1 text-sm"
                    autoFocus
                  />
                ) : (
                  train.newTrack ? (
                    <div className="flex items-center gap-1 font-medium text-yellow-800">
                      {train.track} <ArrowRight className="h-3.5 w-3.5" /> {train.newTrack}
                    </div>
                  ) : ""
                )}
              </TableCell>
              <TableCell 
                className="border-r p-2 text-sm cursor-pointer"
                onClick={() => startEditing(train.id, "newNotes")}
              >
                {editingCell.trainId === train.id && editingCell.field === "newNotes" ? (
                  <Input 
                    value={train.newNotes || ""} 
                    onChange={(e) => handleCellEdit(train, "newNotes", e.target.value)}
                    className="h-8 w-full p-1 text-sm"
                    autoFocus
                  />
                ) : (
                  train.newNotes || ""
                )}
              </TableCell>
              <TableCell className="p-2 text-center">
                <Checkbox 
                  checked={train.completed} 
                  onCheckedChange={(checked) => handleCellEdit(train, "completed", checked)}
                  className="border-gray-400"
                />
              </TableCell>
            </TableRow>
          ))}
          {trains.length === 0 && (
            <TableRow>
              <TableCell colSpan={11} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center text-gray-500">
                  <TableIcon className="h-8 w-8 mb-2" />
                  <span>Inga tåg att visa</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Small clock icon component
const ClockIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default TrainTimetable;
