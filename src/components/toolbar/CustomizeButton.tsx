
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CustomizeButtonProps {
  onClick?: () => void;
}

const CustomizeButton = ({ onClick }: CustomizeButtonProps) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="h-10 px-3 rounded-full bg-white border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50"
      onClick={onClick}
    >
      <SlidersHorizontal className="h-4 w-4 mr-1" />
      <span className="hidden sm:inline">Anpassa</span>
    </Button>
  );
};

export default CustomizeButton;
