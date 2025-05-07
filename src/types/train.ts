
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
}
