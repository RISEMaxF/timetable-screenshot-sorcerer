import { Train } from "@/types/train";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ChevronRight, AlarmClock, MapPin, Train as TrainIcon, Star } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { UI_TEXT, ICON_SIZES } from "@/constants/app";

interface TrainInfoCardProps {
  train: Train | null;
  onOpenDetail: () => void;
  onToggleFavorite: (train: Train) => void;
}

export const TrainInfoCard = ({ train, onOpenDetail, onToggleFavorite }: TrainInfoCardProps) => {
  const { isFavoriteStation } = useFavorites();

  if (!train) {
    return (
      <Card className="border shadow-sm">
        <CardContent className="p-6 text-center">
          <TrainIcon className={`${ICON_SIZES.LARGE} text-gray-300 mx-auto mb-3`} />
          <p className="text-gray-500">{UI_TEXT.NO_TRAIN_SELECTED}</p>
        </CardContent>
      </Card>
    );
  }

  const isFavorite = train.from && isFavoriteStation(train.from, train.country);

  return (
    <Card className="border shadow-sm">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <TrainIcon className={`${ICON_SIZES.MEDIUM} text-blue-600`} /> 
            Tåg {train.id}
          </h3>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onToggleFavorite(train)}
              className="p-1"
            >
              <Star 
                className={`${ICON_SIZES.SMALL} ${
                  isFavorite
                    ? 'fill-yellow-400 text-yellow-400' 
                    : 'text-gray-400'
                }`} 
              />
            </Button>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {train.operator}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-2 gap-4">
          <TrainInfoField 
            icon={<MapPin className={`${ICON_SIZES.SMALL} text-gray-500`} />}
            label="Från"
            value={train.from || "-"}
          />
          
          <TrainInfoField 
            icon={<MapPin className={`${ICON_SIZES.SMALL} text-gray-500`} />}
            label="Till"
            value={train.to || "-"}
          />
          
          <TrainInfoField 
            icon={<AlarmClock className={`${ICON_SIZES.SMALL} text-gray-500`} />}
            label="Ankomst"
            value={train.arrivalTime || "-"}
          />

          <TrainInfoField 
            label="Spår"
            value={train.track || "-"}
          />
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted p-4 flex justify-end border-t">
        <Button 
          variant="outline" 
          onClick={onOpenDetail} 
          className="flex items-center gap-1"
        >
          Visa mer <ChevronRight className={ICON_SIZES.SMALL} />
        </Button>
      </CardFooter>
    </Card>
  );
};

interface TrainInfoFieldProps {
  icon?: React.ReactNode;
  label: string;
  value: string;
}

const TrainInfoField = ({ icon, label, value }: TrainInfoFieldProps) => (
  <div className="flex items-center gap-2">
    {icon}
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);