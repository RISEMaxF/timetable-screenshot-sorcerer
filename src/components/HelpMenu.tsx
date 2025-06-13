
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
          className="flex items-center gap-1"
        >
          <HelpCircle className="h-4 w-4" />
          Hjälp
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 max-h-[500px] overflow-y-auto p-4" align="end">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mb-2">Tåginfo - Hjälpguide</h3>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="colors">
              <AccordionTrigger className="text-sm font-medium">
                Färgernas betydelse
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-pink-100 border border-pink-300"></div>
                    <span>Tidsförändringar (ankomst/avgång uppdateringar)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-yellow-100 border border-yellow-300"></div>
                    <span>Spårändringar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-green-100 border border-green-300"></div>
                    <span>Slutförda tåg</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-blue-100 border border-blue-300"></div>
                    <span>Valda tåg</span>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="columns">
              <AccordionTrigger className="text-sm font-medium">
                Kolumnbeskrivningar
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm">
                  <li className="pb-1 border-b">
                    <strong>Tåg-ID:</strong> Unik identifierare för varje tåg
                  </li>
                  <li className="pb-1 border-b">
                    <strong>OTN:</strong> Operations tracking number
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Operatör:</strong> Företag som driver tågtjänsten
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Från:</strong> Avgångsstation för tåget
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Till:</strong> Destination för tåget
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Ankomst:</strong> Schemalagd ankomsttid till stationen
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Spår:</strong> Tilldelat spår för tåget
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Anteckningar:</strong> Ytterligare information om tåget
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Ny operatör:</strong> Uppdatering av ny operatör, om det ändrats
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Ny tid:</strong> Uppdaterad ankomsttid, om det ändrats
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Spårändring:</strong> Information om spårbyten
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Nya anteckningar:</strong> Nyligen tillagda kommentarer
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Klar:</strong> Om tåget är slutfört eller väntar
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="usage">
              <AccordionTrigger className="text-sm font-medium">
                Användarguide
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <h4 className="font-medium">Grundläggande funktioner</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Klicka på valfri cell för att redigera dess innehåll</li>
                    <li>Klicka på en rad för att visa detaljerad tåginformation</li>
                    <li>Använd sökrutan för att hitta tåg efter ID eller andra detaljer</li>
                    <li>Filtrera tåg efter status med filtermenyn</li>
                    <li>Sortera kolumner genom att klicka på kolumnrubrikerna</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Sökning</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Som standard hittar sökningen delvis matchningar (t.ex. "SJ" matchar "JSA")</li>
                    <li>Aktivera kryssrutan "Exakt matchning" för striktare sökresultat</li>
                    <li>Välj specifika kolumner att söka i via kolumnsväljaren</li>
                    <li>Sökningen fungerar över tåg-ID, operatör, spår och anteckningar</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Stationssök</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Byt till "Stationsök" för att söka tåg baserat på stationer</li>
                    <li>Sök på enskilda stationer eller mellan två stationer</li>
                    <li>Filtrera sökresultat efter avgång, ankomst eller båda</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Flervalsläge</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Håll ned Ctrl/Cmd medan du klickar på rader för att välja flera tåg</li>
                    <li>Använd gruppåtgärder för att uppdatera flera tåg på en gång</li>
                    <li>Tryck på Esc för att rensa alla val</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Tangentbordsgenvägar</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><kbd className="px-1 py-0.5 bg-gray-100 rounded border">Ctrl+F</kbd> - Fokusera sökrutan</li>
                    <li><kbd className="px-1 py-0.5 bg-gray-100 rounded border">Esc</kbd> - Rensa markering</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="map">
              <AccordionTrigger className="text-sm font-medium">
                Kartvy
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <p>Via tågdetaljvyn kan du se tågets position på en interaktiv karta. Kartan centreras automatiskt över Norden.</p>
                  
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Zooma in/ut med mushjulet eller knapparna på kartan</li>
                    <li>Använd teaterläge för att se kartan i helskärm</li>
                    <li>Tågikoner på kartan visar positioner för aktiva tåg</li>
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
