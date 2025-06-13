
import { TrainDataProvider } from "../providers/TrainDataProvider";
import MainHeader from "../components/MainHeader";
import TrainTimetable from "../components/TrainTimetable";

const Index = () => {
  return (
    <TrainDataProvider>
      <div className="min-h-screen bg-background">
        <MainHeader />
        <div className="max-w-7xl mx-auto p-3 sm:p-6">
          <TrainTimetable />
        </div>
      </div>
    </TrainDataProvider>
  );
};

export default Index;
