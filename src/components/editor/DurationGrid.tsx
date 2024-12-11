import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoSizeRange } from '../../types';
import DurationCard from './DurationCard';
import { motion } from 'framer-motion';

interface DurationGridProps {
  durations: VideoSizeRange[];
  selectedDuration: VideoSizeRange | null;
  userTier: string;
  onDurationSelect: (duration: VideoSizeRange) => void;
}

const DurationGrid = ({ durations, selectedDuration, userTier, onDurationSelect }: DurationGridProps) => {
  if (!durations || durations.length === 0) {
    return null;
  }

  return (
    <Tabs defaultValue={selectedDuration ? `${selectedDuration.min}-${selectedDuration.max}` : undefined}>
      <TabsList className="w-full bg-transparent grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {durations.map((duration) => {
          const isSelected = selectedDuration?.min === duration.min && selectedDuration?.max === duration.max;
          const isLocked = false; // Previously: userTier === 'basic' && duration.tier !== 'basic'
          
          return (
            <TabsTrigger
              key={`${duration.min}-${duration.max}`}
              value={`${duration.min}-${duration.max}`}
              disabled={isLocked}
              className="w-full p-0 bg-transparent border-0 hover:bg-transparent data-[state=active]:bg-transparent"
            >
              <DurationCard
                duration={duration}
                isSelected={isSelected}
                isLocked={isLocked}
                onClick={() => onDurationSelect(duration)}
              />
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
};

export default DurationGrid;