
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import TimeInput from "./TimeInput";
import { Train } from "../types/train";

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
    <Table>
      <TableHeader className="bg-gray-50">
        <TableRow>
          <TableHead className="w-[80px] font-semibold">Tåg ID</TableHead>
          <TableHead className="w-[80px] font-semibold">OTN</TableHead>
          <TableHead className="w-[60px] font-semibold">Op.</TableHead>
          <TableHead className="w-[80px] font-semibold">Ank.</TableHead>
          <TableHead className="w-[60px] font-semibold">Spår</TableHead>
          <TableHead className="font-semibold">Anmärkning</TableHead>
          <TableHead className="w-[80px] font-semibold">Ny op.</TableHead>
          <TableHead className="w-[80px] font-semibold">Ny tid</TableHead>
          <TableHead className="w-[80px] font-semibold">Nytt spår</TableHead>
          <TableHead className="font-semibold">Ny anmärkning</TableHead>
          <TableHead className="w-[60px] font-semibold">Klar</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trains.map((train) => (
          <TableRow 
            key={train.id} 
            className={train.highlight ? "bg-red-100" : ""}
          >
            <TableCell className="font-medium">{train.id}</TableCell>
            <TableCell>{train.otn || "-"}</TableCell>
            <TableCell>{train.operator}</TableCell>
            <TableCell 
              className={train.highlight ? "bg-red-200" : ""} 
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
              onClick={() => startEditing(train.id, "track")}
            >
              {editingCell.trainId === train.id && editingCell.field === "track" ? (
                <Input 
                  value={train.track} 
                  onChange={(e) => handleCellEdit(train, "track", e.target.value)}
                  className="h-8 w-12 p-1 text-sm"
                  autoFocus
                />
              ) : (
                train.track
              )}
            </TableCell>
            <TableCell 
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
              onClick={() => startEditing(train.id, "newTime")}
            >
              {editingCell.trainId === train.id && editingCell.field === "newTime" ? (
                <TimeInput 
                  value={train.newTime || ""} 
                  onBlur={(value) => handleCellEdit(train, "newTime", value)} 
                />
              ) : (
                <div className="flex items-center">
                  {train.newTime || "hh:mm"}
                  {train.newTime && <ClockIcon className="ml-1 h-4 w-4" />}
                </div>
              )}
            </TableCell>
            <TableCell 
              onClick={() => startEditing(train.id, "newTrack")}
              className={train.newTrack ? "bg-yellow-100" : ""}
            >
              {editingCell.trainId === train.id && editingCell.field === "newTrack" ? (
                <Input 
                  value={train.newTrack || ""} 
                  onChange={(e) => handleCellEdit(train, "newTrack", e.target.value)}
                  className="h-8 w-12 p-1 text-sm"
                  autoFocus
                />
              ) : (
                train.newTrack || ""
              )}
            </TableCell>
            <TableCell 
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
            <TableCell className="text-center">
              <Checkbox 
                checked={train.completed} 
                onCheckedChange={(checked) => handleCellEdit(train, "completed", checked)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
