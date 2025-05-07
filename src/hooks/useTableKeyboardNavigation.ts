
import { useCallback } from "react";
import { Train } from "@/types/train";

export const useTableKeyboardNavigation = (
  setEditingCell: React.Dispatch<React.SetStateAction<{ trainId: string; field: keyof Train | null }>>
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
