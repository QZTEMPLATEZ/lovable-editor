import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Crown, Check, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';

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

const getPlanBadge = (tier: 'basic' | 'pro' | 'business') => {
  switch (tier) {
    case 'basic':
      return (
        <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border border-blue-500/20">
          Basic
        </Badge>
      );
    case 'pro':
      return (
        <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Crown className="w-3 h-3 mr-1" />
          Pro
        </Badge>
      );
    case 'business':
      return (
        <Badge variant="secondary" className="bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Sparkles className="w-3 h-3 mr-1" />
          Business
        </Badge>
      );
  }
};

const EditorHeader = ({ editingMode, targetDuration, onDurationChange, userTier = 'basic' }: EditorHeaderProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-editor-bg to-editor-bg/95 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue animate-gradient mb-4">
            Select Your Video Duration
          </h1>
          <p className="text-gray-400 text-lg">
            Choose the perfect duration for your wedding story
          </p>
        </motion.div>

        <div className="space-y-6">
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
            <TabsList className="w-full bg-transparent grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {VIDEO_DURATIONS.map((duration) => {
                const isLocked = userTier === 'basic' && duration.tier !== 'basic';
                
                return (
                  <motion.div
                    key={`${duration.min}-${duration.max}`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <TabsTrigger
                      value={`${duration.min}-${duration.max}`}
                      disabled={isLocked}
                      className={`relative w-full p-6 transition-all duration-300 rounded-xl
                        ${isLocked 
                          ? 'opacity-50' 
                          : 'hover:bg-editor-accent/10'} 
                        data-[state=active]:bg-editor-accent/20
                        data-[state=active]:shadow-[0_0_20px_rgba(155,135,245,0.2)]
                        h-full flex flex-col items-start gap-3 border border-editor-border/30
                        backdrop-blur-sm bg-editor-panel/30`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-medium text-xl text-white">{duration.name}</span>
                        {getPlanBadge(duration.tier)}
                      </div>
                      
                      <Badge variant="secondary" className="bg-editor-panel/50 mt-2">
                        {duration.label}
                      </Badge>
                      
                      <p className="text-sm text-gray-400 text-left">
                        {duration.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm text-editor-accent mt-2 bg-editor-accent/10 px-3 py-2 rounded-lg">
                        <Clock className="w-4 h-4" />
                        <span>Recommended Tracks: {duration.recommendedTracks}</span>
                      </div>
                    </TabsTrigger>
                  </motion.div>
                );
              })}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;