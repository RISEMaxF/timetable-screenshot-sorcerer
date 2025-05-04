
import { useState } from "react";
import TrainTimetable from "../components/TrainTimetable";
import TimetableHeader from "../components/TimetableHeader";
import { TimetableToolbar } from "../components/TimetableToolbar";
import { trainData } from "../data/trainData";
import { Train } from "../types/train";

const Index = () => {
  const [trains, setTrains] = useState(trainData);
  const [location, setLocation] = useState("Hagalund");
  const [date, setDate] = useState(new Date());

  const handleTrainUpdate = (updatedTrain: Train) => {
    setTrains(trains.map((train) => 
      train.id === updatedTrain.id ? updatedTrain : train
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Train Timetabling Tool</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <TimetableToolbar 
            location={location} 
            setLocation={setLocation} 
            date={date} 
            setDate={setDate} 
          />
          <TimetableHeader location={location} date={date} />
          <div className="overflow-x-auto">
            <TrainTimetable 
              trains={trains} 
              onTrainUpdate={handleTrainUpdate} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
