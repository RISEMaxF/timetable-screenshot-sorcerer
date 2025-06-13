
import React from "react";
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from "../ui/accordion";

const TrainDetailSections = () => {
  return (
    <div className="mt-5">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="karta" className="border-b border-t-0 border-x-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-base font-medium">Karta</span>
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <div className="h-24 flex items-center justify-center bg-gray-100 rounded-md">
              Kartinformation skulle visas här
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rutt-kpi" className="border-b border-t-0 border-x-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-base font-medium">Rutt KPI</span>
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <div className="h-24 flex items-center justify-center bg-gray-100 rounded-md">
              KPI statistik skulle visas här
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="tagsammansattning" className="border-b border-t-0 border-x-0">
          <AccordionTrigger className="py-2 hover:no-underline">
            <span className="text-base font-medium">Tågsammansättning</span>
          </AccordionTrigger>
          <AccordionContent className="text-sm">
            <div className="h-24 flex items-center justify-center bg-gray-100 rounded-md">
              Tågsammansättnings information skulle visas här
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TrainDetailSections;
