
export interface Train {
  id: string;
  otn: string | null;
  operator: string;
  arrivalTime: string;
  track: string | number;
  notes: string | null;
  newOperator?: string;
  newTime?: string;
  newTrack?: string | number;
  newNotes?: string;
  completed: boolean;
  highlight?: boolean;
}
