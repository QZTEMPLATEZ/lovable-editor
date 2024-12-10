import React, { useState } from 'react';
import { VideoStyle } from '@/types/video';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Camera, Film, Heart, Music, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
  onNext?: () => void;
}

const VIDEO_STYLES = [
  {
    id: 'classic',
    title: 'Classic Cinematic',
    description: 'Timeless & Emotional',
    previewVideo: 'https://www.dropbox.com/scl/fi/6qe8m4ab7nzjj14ne0h6u/CLASSIC-LONG-OK-OK.mp4?raw=1',
    features: [
      'Warm, timeless color grading',
      'Balanced framing & composition',
      'Smooth, intentional movements',
      'Emotional storytelling flow',
      'Scene-specific pacing'
    ],
    technicalDetails: {
      colorGrading: 'Warm tones with soft highlights',
      transitions: 'Scene-weighted, emotional',
      pacing: 'Moderate, story-driven',
      movements: 'Smooth, stabilized'
    }
  },
  {
    id: 'cinematic',
    title: 'Modern Cinema',
    description: 'Contemporary & Bold',
    previewVideo: 'https://www.dropbox.com/scl/fi/ng9ndcl10lcownk1mtx4g/CINEMATOGRAFICO-LONG-OK.mp4?raw=1',
    features: [
      'Contemporary color palette',
      'Dynamic camera movements',
      'Creative transitions',
      'Modern storytelling approach',
      'Dramatic pacing'
    ]
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'Authentic & Natural',
    previewVideo: 'https://www.dropbox.com/scl/fi/1mlqx5aq31pvyo67mpz4x/DOC-LONG-OK-OK.mp4?raw=1',
    features: [
      'Natural color grading',
      'Candid moments focus',
      'Journalistic approach',
      'Real emotions capture',
      'Organic pacing'
    ]
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'Energetic & Bold',
    previewVideo: 'https://www.dropbox.com/scl/fi/m75wtfagul3ui9qbi996b/DINAMICO-OK.mp4?raw=1',
    features: [
      'High-energy editing',
      'Bold color treatment',
      'Fast-paced cuts',
      'Music-driven timing',
      'Creative effects'
    ]
  }
];

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload, onNext }: VideoStyleSelectorProps) => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [selectedStyleDetails, setSelectedStyleDetails] = useState<typeof VIDEO_STYLES[0] | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStyleSelectAndNext = (styleId: string) => {
    const style = VIDEO_STYLES.find(s => s.id === styleId);
    setSelectedStyleDetails(style || null);
    onStyleSelect(styleId as VideoStyle);
    
    toast({
      title: `${style?.title} Style Selected`,
      description: "Your wedding film will be edited with this cinematic style.",
    });

    if (onNext) {
      onNext();
    }
    navigate('/music');
  };

  const handleVideoError = (styleId: string) => {
    toast({
      variant: "destructive",
      title: "Video Preview Error",
      description: "There was an error playing the preview video. Please try again.",
    });
    console.error(`Error playing video for style: ${styleId}`);
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-[#0A0A0A]">
      <div className="text-center py-12 px-4 relative border-b border-gray-800">
        <button
          onClick={() => navigate('/duration')}
          className="absolute left-8 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900 hover:bg-gray-800 border border-gray-800 transition-colors duration-300"
        >
          <ChevronLeft className="w-6 h-6 text-gray-400" />
        </button>
        <h1 className="text-2xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
          Choose Your Cinematic Style
        </h1>
        <p className="mt-2 text-gray-400 max-w-2xl mx-auto">
          Each style is carefully crafted to tell your story with a unique cinematic approach,
          from classic timeless edits to modern dynamic cuts.
        </p>
      </div>

      <div className="w-full max-w-none px-0 space-y-0">
        <AnimatePresence>
          {VIDEO_STYLES.map((style) => (
            <motion.div
              key={style.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative w-full [aspect-ratio:3/1] group cursor-pointer bg-[#0A0A0A] transition-colors duration-300 border-b border-gray-800 overflow-hidden"
              onMouseEnter={() => setHoveredStyle(style.id)}
              onMouseLeave={() => setHoveredStyle(null)}
              onClick={() => handleStyleSelectAndNext(style.id)}
            >
              {/* Background Video */}
              <div className="absolute inset-0 w-full h-full">
                <video
                  key={style.id}
                  src={style.previewVideo}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onError={() => handleVideoError(style.id)}
                />
                {/* Gradient Overlay */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent transition-opacity duration-500 ${
                    hoveredStyle === style.id ? 'opacity-50' : 'opacity-80'
                  }`} 
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex items-center justify-between h-full w-full px-16 md:px-32">
                <div className="space-y-4">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-3xl md:text-4xl font-cinzel tracking-wider text-white group-hover:text-white/90 transition-colors"
                  >
                    {style.title}
                  </motion.h2>
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-sm md:text-base tracking-[0.2em] uppercase text-gray-400 font-italiana group-hover:text-gray-300 transition-colors"
                  >
                    {style.description}
                  </motion.p>
                  
                  {/* Style Features */}
                  {hoveredStyle === style.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-6 mt-4"
                    >
                      {style.features.slice(0, 3).map((feature, index) => (
                        <TooltipProvider key={index}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2 text-white/70">
                                {index === 0 && <Camera className="w-4 h-4" />}
                                {index === 1 && <Film className="w-4 h-4" />}
                                {index === 2 && <Heart className="w-4 h-4" />}
                                <span className="text-sm">{feature}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">{feature}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                    </motion.div>
                  )}
                </div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex items-center gap-4"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toast({
                              title: "Style Details",
                              description: style.features.join(' • '),
                            });
                          }}
                          className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          <Info className="w-5 h-5 text-white/70" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View style details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStyleSelectAndNext(style.id);
                    }}
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white px-8 py-3 rounded-md transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
                  >
                    Select Style
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VideoStyleSelector;