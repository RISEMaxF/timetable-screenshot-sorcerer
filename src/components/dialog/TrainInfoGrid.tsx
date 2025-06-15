
import React from "react";
import { Train } from "../../types/train";

interface TrainInfoGridProps {
  train: Train;
}

const TrainInfoGrid = ({ train }: TrainInfoGridProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <InfoCard label="Tåg ID" value={train.id} />
      <InfoCard label="OTN" value={train.otn || "-"} />
      <InfoCard label="Beräknad ankomst" value={train.newTime || train.arrivalTime} />
      
      <InfoCard label="Faktisk ankomst" value={train.newTime || train.arrivalTime} />
      <InfoCard label="Operatör" value={train.newOperator || train.operator} />
      <InfoCard label="Planerad loktyp" value="RC6" />
      
      <InfoCard label="Planerad fordonslängd (m)" value="263" />
      <InfoCard label="Planerad fordonstyp" value="500" />
      <InfoCard label="Individer" value="44" />
    </div>
  );
};

const InfoCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md border border-gray-200 dark:border-gray-700">
    <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
    <div className="font-medium mt-1 text-gray-900 dark:text-gray-100">{value}</div>
  </div>
);

export default TrainInfoGrid;
