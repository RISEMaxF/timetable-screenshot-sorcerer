
export interface Train {
  id: string;
  announcedTrainNumber?: string;
  operator: string;
  from?: string;
  to?: string;
  latest?: string;
  updated?: string;
  highlighted?: boolean;
  completed?: boolean;
  
  // Adding missing properties that caused the type errors
  arrivalTime?: string;
  newTime?: string;
  track?: string;
  newTrack?: string;
  otn?: string;
  newOperator?: string;
  notes?: string;
}
