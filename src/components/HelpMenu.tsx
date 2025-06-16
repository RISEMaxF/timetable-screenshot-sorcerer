
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
                    <strong>OTN:</strong> Operations tracking number - operationell spårningsnummer
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
                    <strong>Avgång:</strong> Schemalagd avgångstid från stationen
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Spår:</strong> Tilldelat spår för tåget
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Anteckningar:</strong> Ytterligare information om tåget
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Ny operatör:</strong> Uppdaterad operatör, om det ändrats
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Ny tid:</strong> Uppdaterad ankomst- eller avgångstid
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Spårändring:</strong> Information om spårbyten
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Nya anteckningar:</strong> Nyligen tillagda kommentarer
                  </li>
                  <li className="pb-1 border-b">
                    <strong>Klar:</strong> Markerar om tåget är slutfört
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
                    <li>Använd sökrutan längst upp för att hitta specifika tåg</li>
                    <li>Filtrera tåg efter status med filterknapparna</li>
                    <li>Sortera kolumner genom att klicka på kolumnrubrikerna</li>
                    <li>Växla mellan ljust och mörkt tema med tema-knappen</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Sök och filter</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Använd sökrutan för att söka över alla tågdata</li>
                    <li>Aktivera "Exakt matchning" för striktare sökresultat</li>
                    <li>Använd kolumnsväljaren för att begränsa sökningen till specifika fält</li>
                    <li>Filtrera efter land och datum med verktygsfältet</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Stationssök</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Navigera till "Stationsök" för att söka tåg mellan stationer</li>
                    <li>Sök på enskilda stationer eller rutter mellan två stationer</li>
                    <li>Filtrera på avgångar, ankomster eller båda</li>
                    <li>Spara ofta använda stationer som favoriter</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Flervalsläge</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Håll ned Ctrl/Cmd medan du klickar för att välja flera tåg</li>
                    <li>Använd gruppåtgärder för att uppdatera flera tåg samtidigt</li>
                    <li>Tryck Esc för att rensa alla val</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Tangentbordsgenvägar</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><kbd className="px-1 py-0.5 bg-gray-100 rounded border">Ctrl+F</kbd> - Fokusera sökrutan</li>
                    <li><kbd className="px-1 py-0.5 bg-gray-100 rounded border">Esc</kbd> - Rensa markering</li>
                    <li><kbd className="px-1 py-0.5 bg-gray-100 rounded border">Enter</kbd> - Bekräfta cell-redigering</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="details">
              <AccordionTrigger className="text-sm font-medium">
                Tågdetaljer och karta
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <h4 className="font-medium">Detaljvy</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Klicka på en tågrad för att öppna detaljvyn</li>
                    <li>Se fullständig tåginformation, historik och ändringar</li>
                    <li>Visa tågsammansättning med vagnar och last</li>
                    <li>Expandera vagnsdetaljer för axlar, vikt och godsinformation</li>
                  </ul>
                  
                  <h4 className="font-medium mt-3">Kartvy</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Klicka på "Visa karta" för att se tågets position</li>
                    <li>Kartan centreras automatiskt över Norden</li>
                    <li>Zooma in/ut med mushjulet eller kartans knappar</li>
                    <li>Använd teaterläge för helskärmsvy av kartan</li>
                    <li>Tågikoner visar positioner för aktiva tåg</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="favorites">
              <AccordionTrigger className="text-sm font-medium">
                Favoriter
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 text-sm">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Klicka på stjärnan i huvudvyn för att visa endast favorittåg</li>
                    <li>Markera tåg som favoriter genom att klicka på stjärnan i tågdetaljvyn</li>
                    <li>Spara ofta använda stationer som favoriter i stationssök</li>
                    <li>Favoritdata sparas lokalt i din webbläsare</li>
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
