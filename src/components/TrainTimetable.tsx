
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
  selectedTrains: string[];
  onToggleSelection: (trainId: string) => void;
}

type SortField = keyof Train | null;
type SortDirection = "asc" | "desc";

const TrainTimetable = ({ trains, onTrainUpdate, selectedTrains = [], onToggleSelection }: TrainTimetableProps) => {
  const [editingCell, setEditingCell] = useState<{
    trainId: string;
    field: keyof Train | null;
  }>({ trainId: "", field: null });

  const [selectedTrain, setSelectedTrain] = useState<Train | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [exactMatch, setExactMatch] = useState(false);
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

  const fuzzyMatch = (text: string | undefined | null, search: string): boolean => {
    if (!text) return false;
    if (!search.trim()) return true;
    
    const searchLower = search.toLowerCase();
    const textLower = text.toString().toLowerCase();
    
    // For exact match
    if (exactMatch) {
      return textLower.includes(searchLower);
    }
    
    // For fuzzy match - check if characters appear in sequence
    let searchIndex = 0;
    for (let i = 0; i < textLower.length && searchIndex < searchLower.length; i++) {
      if (textLower[i] === searchLower[searchIndex]) {
        searchIndex++;
      }
    }
    
    return searchIndex === searchLower.length;
  };

  const filteredTrains = useMemo(() => {
    let result = [...trains];
    
    // Apply search filter
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase().trim();
      result = result.filter(
        train => 
          fuzzyMatch(train.id, searchTerm) || 
          fuzzyMatch(train.operator, searchTerm) ||
          fuzzyMatch(train.track?.toString(), searchTerm) ||
          fuzzyMatch(train.notes, searchTerm)
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
  }, [trains, searchTerm, sortField, sortDirection, filterStatus, exactMatch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Implement keyboard navigation between cells
    if (e.key === "Escape") {
      setEditingCell({ trainId: "", field: null });
    }
    
    // Add more keyboard shortcuts as needed
  };

  return (
    <>
      <div className="mb-4 flex flex-col sm:flex-row items-start gap-4" onKeyDown={handleKeyDown}>
        {/* Search Box - Improved styling */}
        <div className="relative flex-grow max-w-md w-full">
          <div className="relative flex items-center">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search className="h-4 w-4" />
            </div>
            <Input
              placeholder="Sök tåg..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 h-10 border-gray-300 focus-visible:ring-blue-500 w-full"
            />
          </div>
          <div className="mt-1.5 flex items-center">
            <input 
              type="checkbox" 
              id="exactMatch" 
              checked={exactMatch}
              onChange={() => setExactMatch(prev => !prev)}
              className="mr-1.5 h-4 w-4"
            />
            <label htmlFor="exactMatch" className="text-xs text-gray-600">Exakt matchning</label>
          </div>
        </div>
        
        <div className="flex space-x-2 items-center h-10">
          {/* Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="h-10">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => setFilterStatus("all")} className="cursor-pointer">
                Alla tåg
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("completed")} className="cursor-pointer">
                Klara
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("pending")} className="cursor-pointer">
                Väntande
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="default" className="h-10">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Sortera
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => toggleSort("id")} className="cursor-pointer">
                Tåg-ID
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("arrivalTime")} className="cursor-pointer">
                Ankomsttid
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("track")} className="cursor-pointer">
                Spår
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleSort("completed")} className="cursor-pointer">
                Status
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
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
                  isMultiSelected={selectedTrains.includes(train.id)}
                  onToggleSelection={onToggleSelection}
                />
              ))}
              {filteredTrains.length === 0 && (
                <EmptyState searchTerm={searchTerm} filterApplied={filterStatus !== "all"} />
              )}
            </TableBody>
          </Table>
        </div>
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
