
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
        <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-8 w-8 mr-2 text-blue-600" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"/>
            <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12s4.5 10 10 10"/>
            <circle cx="16" cy="12" r="2"/>
            <circle cx="12" cy="12" r="2"/>
            <circle cx="8" cy="12" r="2"/>
          </svg>
          Train Timetabling Tool
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
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
