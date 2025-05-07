
import { useCallback } from "react";
import { Train } from "@/types/train";

export const useTableKeyboardNavigation = (
  setEditingCell: (cell: { trainId: string; field: keyof Train | null }) => void
) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Implement keyboard navigation between cells
    if (e.key === "Escape") {
      setEditingCell({ trainId: "", field: null });
    }
    
    // Add more keyboard shortcuts as needed
  }, [setEditingCell]);

  return { handleKeyDown };
};
