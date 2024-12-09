import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Crown } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface EditorHeaderProps {
  editingMode: EditingMode;
  targetDuration: VideoSizeRange;
  onDurationChange: (duration: VideoSizeRange) => void;
  userTier?: 'basic' | 'pro' | 'business';
}

const VIDEO_DURATIONS: VideoSizeRange[] = [
  {
    min: 0.5,
    max: 1.5,
    name: "Social",
    label: "30s - 1:30min",
    description: "Quick, high-energy edit for social media",
    icon: null,
    recommendedTracks: 1,
    tier: 'basic'
  },
  {
    min: 3,
    max: 5,
    name: "Trailer",
    label: "3-5 minutes",
    description: "Dynamic event summary",
    icon: null,
    recommendedTracks: 2,
    tier: 'pro'
  },
  {
    min: 8,
    max: 12,
    name: "Short Film",
    label: "8-12 minutes",
    description: "Detailed artistic edit",
    icon: null,
    recommendedTracks: 3,
    tier: 'pro'
  },
  {
    min: 15,
    max: 20,
    name: "Wedding Movie",
    label: "15-20 minutes",
    description: "Comprehensive coverage",
    icon: null,
    recommendedTracks: 4,
    tier: 'business'
  },
  {
    min: 30,
    max: 40,
    name: "Cinematic Wedding",
    label: "30-40 minutes",
    description: "Full cinematic experience",
    icon: null,
    recommendedTracks: 6,
    tier: 'business'
  }
];

const EditorHeader = ({ editingMode, targetDuration, onDurationChange, userTier = 'basic' }: EditorHeaderProps) => {
  return (
    <div className="min-h-screen bg-editor-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-medium text-white mb-4">
            Select Video Duration
          </h1>
          <p className="text-gray-400 text-lg">
            Choose the perfect length for your wedding story
          </p>
        </div>

        <Tabs 
          defaultValue={`${targetDuration.min}-${targetDuration.max}`}
          className="w-full"
          onValueChange={(value) => {
            const [min, max] = value.split('-').map(Number);
            const newDuration = VIDEO_DURATIONS.find(d => d.min === min && d.max === max);
            if (newDuration && (userTier !== 'basic' || newDuration.tier === 'basic')) {
              onDurationChange(newDuration);
            }
          }}
        >
          <TabsList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full bg-transparent">
            {VIDEO_DURATIONS.map((duration, index) => {
              const isLocked = userTier === 'basic' && duration.tier !== 'basic';
              
              return (
                <TabsTrigger
                  key={`${duration.min}-${duration.max}`}
                  value={`${duration.min}-${duration.max}`}
                  disabled={isLocked}
                  className={`relative p-6 transition-all duration-300 rounded-lg border
                    ${isLocked 
                      ? 'border-editor-border/20 opacity-50' 
                      : 'hover:border-editor-accent/50 border-editor-border/30'} 
                    data-[state=active]:border-editor-accent data-[state=active]:bg-editor-accent/10
                    data-[state=active]:shadow-[0_0_20px_rgba(155,135,245,0.2)]
                    data-[state=inactive]:hover:bg-editor-panel/50
                    h-full flex flex-col justify-between`}
                >
                  <div className="space-y-3 text-left">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-white">
                        {duration.name}
                      </h3>
                      {duration.tier !== 'basic' && (
                        <Crown className="w-4 h-4 text-editor-accent/80" />
                      )}
                    </div>
                    
                    <Badge 
                      variant="secondary" 
                      className="bg-editor-panel/50 text-xs font-normal text-gray-300"
                    >
                      {duration.label}
                    </Badge>
                    
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {duration.description}
                    </p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-editor-border/20">
                    <div className="flex items-center text-sm text-gray-400">
                      <Clock className="w-4 h-4 mr-2 text-editor-accent/70" />
                      {duration.recommendedTracks} track{duration.recommendedTracks > 1 ? 's' : ''}
                    </div>
                  </div>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default EditorHeader;