
import React from "react";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "../ui/accordion";
import TrainCarVisualization from "./TrainCarVisualization";

interface TrainDetailSectionsProps {
  trainId: string;
}

const TrainDetailSections = ({ trainId }: TrainDetailSectionsProps) => {
  return (
    <div className="mt-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="karta" className="border-b border-gray-200 dark:border-gray-700 border-t-0 border-x-0">
          <AccordionTrigger className="py-2 hover:no-underline text-gray-900 dark:text-gray-100">
            <span className="text-base font-medium">Karta</span>
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <div className="h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-400">
              Kartinformation skulle visas här
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rutt-kpi" className="border-b border-gray-200 dark:border-gray-700 border-t-0 border-x-0">
          <AccordionTrigger className="py-2 hover:no-underline text-gray-900 dark:text-gray-100">
            <span className="text-base font-medium">Rutt KPI</span>
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <div className="h-24 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md text-gray-600 dark:text-gray-400">
              KPI statistik skulle visas här
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tagsammansattning" className="border-b border-gray-200 dark:border-gray-700 border-t-0 border-x-0">
          <AccordionTrigger className="py-2 hover:no-underline text-gray-900 dark:text-gray-100">
            <span className="text-base font-medium">Tågsammansättning</span>
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <TrainCarVisualization trainId={trainId} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TrainDetailSections;
