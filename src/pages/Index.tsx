
import { useState } from "react";
import { TrainDataProvider } from "../providers/TrainDataProvider";
import MainHeader from "../components/MainHeader";
import { TimetableToolbar } from "../components/TimetableToolbar";
import TrainTimetable from "../components/TrainTimetable";

const Index = () => {
  const [showFavorites, setShowFavorites] = useState(false);

  const handleToggleFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  return (
    <TrainDataProvider>
      <div className="min-h-screen bg-background">
        <MainHeader 
          showFavorites={showFavorites}
          onToggleFavorites={handleToggleFavorites}
        />
        <div className="container mx-auto p-4 sm:p-6 space-y-6">
          <TimetableToolbar />
          <TrainTimetable showFavorites={showFavorites} />
        </div>
      </div>
    </TrainDataProvider>
  );
};

export default Index;
