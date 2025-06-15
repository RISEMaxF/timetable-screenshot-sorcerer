
import React, { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { Train } from "../../types/train";
import TrainDetailHeader from "./TrainDetailHeader";
import TrainInfoGrid from "./TrainInfoGrid";
import TrainHistoryTable from "./TrainHistoryTable";
import TrainDetailSections from "./TrainDetailSections";
import TrainCarVisualization from "./TrainCarVisualization";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface TrainDetailDialogProps {
  train: Train | null;
  isOpen: boolean;
  onClose: () => void;
}

const TrainDetailDialog = ({ train, isOpen, onClose }: TrainDetailDialogProps) => {
  if (!train) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-6xl max-h-[90vh] w-[95vw] flex flex-col bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
        <TrainDetailHeader train={train} />

        <div className="flex-1 overflow-hidden mt-4 mb-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
              >
                Översikt
              </TabsTrigger>
              <TabsTrigger 
                value="composition" 
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
              >
                Tågsammansättning
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="data-[state=active]:bg-white data-[state=active]:text-gray-900 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-gray-100"
              >
                Detaljer
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4 space-y-4">
              <TrainInfoGrid train={train} />
              <TrainHistoryTable train={train} />
            </TabsContent>
            
            <TabsContent value="composition" className="mt-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <TrainCarVisualization trainId={train.id} />
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="mt-4">
              <TrainDetailSections trainId={train.id} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TrainDetailDialog;
