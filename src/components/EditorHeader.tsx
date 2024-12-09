import React from 'react';
import { EditingMode } from './EditingModeSelector';
import { VideoSizeRange } from './VideoSizeSelector';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Crown, Check } from 'lucide-react';
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

const TIER_FEATURES = {
  basic: ['30s - 1:30min videos', 'Basic editing features', '720p export quality', '5 video uploads'],
  pro: ['Up to 12min videos', 'Advanced AI features', '4K export quality', 'Unlimited uploads'],
  business: ['Up to 40min videos', 'Premium features', '4K HDR quality', 'Priority support']
};

const EditorHeader = ({ editingMode, targetDuration, onDurationChange, userTier = 'basic' }: EditorHeaderProps) => {
  return (
    <div className="min-h-screen bg-editor-bg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue animate-gradient mb-4">
            Select Your Plan
          </h1>
          <p className="text-gray-400 text-lg">
            Choose the perfect duration and features for your wedding story
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['basic', 'pro', 'business'].map((tier) => (
            <motion.div
              key={tier}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`relative rounded-2xl overflow-hidden ${
                tier === 'pro' ? 'border-2 border-editor-accent' : 'border border-editor-border'
              } bg-editor-glass-dark backdrop-blur-xl p-6`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5" />
              
              <div className="relative space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold capitalize text-white">
                    {tier}
                  </h3>
                  {tier !== 'basic' && (
                    <Crown className="w-5 h-5 text-editor-accent" />
                  )}
                </div>

                <div className="space-y-4">
                  {TIER_FEATURES[tier as keyof typeof TIER_FEATURES].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-300">
                      <Check className="w-4 h-4 text-editor-accent" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
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
                    <TabsList className="w-full bg-transparent flex flex-col gap-2">
                      {VIDEO_DURATIONS.filter(d => d.tier === tier).map((duration) => {
                        const isLocked = userTier === 'basic' && duration.tier !== 'basic';
                        
                        return (
                          <TabsTrigger
                            key={`${duration.min}-${duration.max}`}
                            value={`${duration.min}-${duration.max}`}
                            disabled={isLocked}
                            className={`relative w-full p-4 transition-all duration-300 rounded-lg
                              ${isLocked 
                                ? 'opacity-50' 
                                : 'hover:bg-editor-accent/10'} 
                              data-[state=active]:bg-editor-accent/20
                              data-[state=active]:shadow-[0_0_20px_rgba(155,135,245,0.2)]
                              h-full flex flex-col items-start gap-2`}
                          >
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">{duration.name}</span>
                              <Badge variant="secondary" className="bg-editor-panel/50">
                                {duration.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-400 text-left">
                              {duration.description}
                            </p>
                          </TabsTrigger>
                        );
                      })}
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;