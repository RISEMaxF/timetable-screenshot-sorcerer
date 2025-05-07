
import { useState, useMemo } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { Train } from "../types/train";
import TrainTableHeader from "./table/TrainTableHeader";
import TrainTableRow from "./table/TrainTableRow";
import EmptyState from "./table/EmptyState";
import TrainDetailDialog from "./dialog/TrainDetailDialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TrainTimetableProps {
  trains: Train[];
  onTrainUpdate: (train: Train) => void;
}

type SortField = keyof Train | null;
type SortDirection = "asc" | "desc";

const TrainTimetable = ({ trains, onTrainUpdate }: TrainTimetableProps) => {
  const [editingCell, setEditingCell] = useState<{
    trainId: string;
    field: keyof Train | null;
  }>({ trainId: "", field: null });

  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "pending">("all");

  const handleCellEdit = (train: Train, field: keyof Train, value: any) => {
    const updatedTrain = { ...train, [field]: value };
    onTrainUpdate(updatedTrain);
    setEditingCell({ trainId: "", field: null });
    toast({
      title: "Train updated",
      description: `${field} updated for train ${train.id}`,
    });
  };

  const startEditing = (trainId: string, field: keyof Train) => {
    setEditingCell({ trainId, field });
  };

  const handleRowClick = (train: Train) => {
    setSelectedTrain(train);
    setIsDetailOpen(true);
  };

  const handleCloseDetail = () => {
    setIsDetailOpen(false);
  };

  const toggleSort = (field: keyof Train) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredTrains = useMemo(() => {
    let result = [...trains];
    
    // Apply search filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      result = result.filter(
        train => 
          train.id.toLowerCase().includes(lowerSearchTerm) || 
          train.operator?.toLowerCase().includes(lowerSearchTerm) ||
          train.track?.toString().toLowerCase().includes(lowerSearchTerm) ||
          train.notes?.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Apply status filter
    if (filterStatus === "completed") {
      result = result.filter(train => train.completed);
    } else if (filterStatus === "pending") {
      result = result.filter(train => !train.completed);
    }
    
    // Apply sorting
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
        
        if (aValue === undefined || aValue === null) return sortDirection === "asc" ? -1 : 1;
        if (bValue === undefined || bValue === null) return sortDirection === "asc" ? 1 : -1;
        
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortDirection === "asc" 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }
        
        return sortDirection === "asc" 
          ? (aValue > bValue ? 1 : -1)
          : (aValue > bValue ? -1 : 1);
      });
    }
    
    return result;
  }, [trains, searchTerm, sortField, sortDirection, filterStatus]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Implement keyboard navigation between cells
    if (e.key === "Escape") {
      setEditingCell({ trainId: "", field: null });
    }
    
    // Add more keyboard shortcuts as needed
  };

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row items-center gap-4" onKeyDown={handleKeyDown}>
        {/* Search Box */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search trains..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        {/* Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => setFilterStatus("all")} className="cursor-pointer">
              All Trains
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("completed")} className="cursor-pointer">
              Completed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterStatus("pending")} className="cursor-pointer">
              Pending
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Sort Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-10">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => toggleSort("id")} className="cursor-pointer">
              Train ID
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleSort("arrivalTime")} className="cursor-pointer">
              Arrival Time
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleSort("track")} className="cursor-pointer">
              Track
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toggleSort("completed")} className="cursor-pointer">
              Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <Table className="border-collapse w-full">
          <TrainTableHeader 
            onSort={toggleSort} 
            sortField={sortField} 
            sortDirection={sortDirection} 
          />
          <TableBody>
            {filteredTrains.map((train, index) => (
              <TrainTableRow
                key={train.id}
                train={train}
                index={index}
                editingCell={editingCell}
                startEditing={startEditing}
                handleCellEdit={handleCellEdit}
                onRowClick={handleRowClick}
                isSelected={selectedTrain?.id === train.id}
              />
            ))}
            {filteredTrains.length === 0 && (
              <EmptyState searchTerm={searchTerm} filterApplied={filterStatus !== "all"} />
            )}
          </TableBody>
        </Table>
      </div>

      <TrainDetailDialog 
        train={selectedTrain}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
      />
    </>
  );
};

export default TrainTimetable;
