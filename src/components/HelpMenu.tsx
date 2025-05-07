
import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

const HelpMenu = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1 bg-white border-gray-300"
        >
          <HelpCircle className="h-4 w-4" />
          Help
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-[500px] overflow-y-auto p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-2">Plankan Help Guide</h3>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="colors">
              <AccordionTrigger className="text-sm font-medium">
                Color Meanings
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-pink-100 border border-pink-300"></div>
                    <span>Time changes (arrival/departure updates)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
                    <span>Track changes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
                    <span>Completed trains</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
                    <span>Selected trains</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="columns">
              <AccordionTrigger className="text-sm font-medium">
                Column Descriptions
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm">
                  <li className="pb-1 border-b">
                    <strong>Train ID:</strong> Unique identifier for each train
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Arrival:</strong> Scheduled arrival time at the station
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Departure:</strong> Scheduled departure time from the station
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Track:</strong> Platform track number assigned to the train
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Operator:</strong> Company operating the train service
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Status:</strong> Whether the train is completed or pending
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Notes:</strong> Additional information about the train
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="usage">
              <AccordionTrigger className="text-sm font-medium">
                Usage Guide
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <h4 className="font-medium">Basic Operations</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Click on any cell to edit its content</li>
                    <li>Click row to view detailed train information</li>
                    <li>Use search box to find trains by ID or other details</li>
                    <li>Filter trains by status using the filter dropdown</li>
                    <li>Sort columns by clicking column headers</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Searching</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>By default, search finds partial matches (e.g., "SJ" will match "JSA")</li>
                    <li>Enable "Exact match" checkbox for stricter search results</li>
                    <li>Search works across train ID, operator, track, and notes</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Multi-selection</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Hold Ctrl/Cmd while clicking rows to select multiple trains</li>
                    <li>Use batch actions to update multiple trains at once</li>
                    <li>Press Esc to clear all selections</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Keyboard Shortcuts</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><kbd className="px-1 py-0.5 bg-gray-100 rounded border">Ctrl+F</kbd> - Focus search box</li>
                    <li><kbd className="px-1 py-0.5 bg-gray-100 rounded border">Esc</kbd> - Clear selection</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default HelpMenu;
