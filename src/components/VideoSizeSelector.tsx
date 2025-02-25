
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import PlanBadge from './PlanBadge';
import { Clock, Check, ChevronLeft, Activity, Users } from 'lucide-react';
import { VideoSizeRange } from '../types';
import { useVideoType } from '../contexts/VideoTypeContext';
import { Button } from './ui/button';
import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';

const VIDEO_SIZES: VideoSizeRange[] = [
  {
    min: 0.5,
    max: 1.5,
    name: "Social",
    label: "30s - 1:30min",
    description: "Quick, high-energy edit for social media\n• Perfect for Instagram/TikTok\n• Fast-paced highlights\n• Key moments only\n• Music-driven edits\n• Vertical format ready",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 1,
    tier: 'basic'
  },
  {
    min: 3,
    max: 5,
    name: "Trailer",
    label: "3-5 minutes",
    description: "Dynamic event summary\n• Best moment highlights\n• Engaging transitions\n• Emotional storytelling\n• Professional pacing\n• Perfect for sharing",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 2,
    tier: 'pro'
  },
  {
    min: 8,
    max: 12,
    name: "Short Film",
    label: "8-12 minutes",
    description: "Detailed artistic edit\n• Complete ceremony coverage\n• Key reception moments\n• Special family moments\n• Guest interviews\n• Cinematic transitions",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 3,
    tier: 'pro'
  },
  {
    min: 15,
    max: 20,
    name: "Wedding Movie",
    label: "15-20 minutes",
    description: "Comprehensive coverage\n• Full ceremony with vows\n• Extended reception highlights\n• Detailed family moments\n• All important speeches\n• Multiple camera angles",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 4,
    tier: 'business'
  },
  {
    min: 30,
    max: 40,
    name: "Cinematic Wedding",
    label: "30-40 minutes",
    description: "Full cinematic experience\n• Complete event documentation\n• Behind-the-scenes footage\n• Extended family coverage\n• Multiple perspectives\n• Documentary style",
    icon: <Clock className="w-5 h-5 text-purple-400" />,
    recommendedTracks: 6,
    tier: 'business'
  }
];

interface VideoAnalysisStats {
  dynamicScenes: number;
  totalScenes: number;
  faceDetections: number;
  avgMotionScore: number;
  dominantMotionType: 'static' | 'dynamic';
}

interface VideoSizeSelectorProps {
  selectedSize: VideoSizeRange | null;
  onSizeSelect: (size: VideoSizeRange) => void;
  userTier?: 'basic' | 'pro' | 'business';
}

const VideoSizeSelector = ({ selectedSize, onSizeSelect, userTier }: VideoSizeSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { setSelectedVideoType } = useVideoType();
  const [analysisStats, setAnalysisStats] = useState<VideoAnalysisStats>({
    dynamicScenes: 0,
    totalScenes: 0,
    faceDetections: 0,
    avgMotionScore: 0,
    dominantMotionType: 'static'
  });
  const [detector, setDetector] = useState<faceDetection.FaceDetector | null>(null);

  useEffect(() => {
    const initializeFaceDetector = async () => {
      await tf.ready();
      const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
      const detector = await faceDetection.createDetector(model, {
        runtime: 'tfjs',
      });
      setDetector(detector);
    };

    initializeFaceDetector().catch(console.error);
  }, []);

  const analyzeVideoFrame = async (videoElement: HTMLVideoElement) => {
    if (!detector) return;

    const faces = await detector.estimateFaces(videoElement);
    setAnalysisStats(prev => ({
      ...prev,
      faceDetections: prev.faceDetections + faces.length
    }));

    return faces.length;
  };

  const handleSizeSelect = (size: VideoSizeRange) => {
    const { avgMotionScore, faceDetections, totalScenes } = analysisStats;
    let recommendedSize = size;

    // Complex recommendation logic based on multiple factors
    if (avgMotionScore > 30 && faceDetections / totalScenes < 1) {
      // High motion, few faces - suggest shorter format
      recommendedSize = VIDEO_SIZES[0]; // Social
      toast({
        title: "Sugestão de Formato",
        description: "Detectamos muitas cenas dinâmicas com poucos closes. Recomendamos um formato mais curto e dinâmico.",
      });
    } else if (avgMotionScore < 20 && faceDetections / totalScenes > 2) {
      // Low motion, many faces - suggest longer format
      recommendedSize = VIDEO_SIZES[2]; // Short Film
      toast({
        title: "Sugestão de Formato",
        description: "Detectamos muitas cenas com closes e momentos íntimos. Recomendamos um formato que permita contar a história com mais detalhes.",
      });
    }

    // Store analysis for AI training
    const analysisData = {
      timestamp: new Date().toISOString(),
      stats: analysisStats,
      recommendedFormat: recommendedSize.name,
      userSelectedFormat: size.name
    };
    
    // Log analysis data for future training
    console.log('Video Analysis Data:', analysisData);

    onSizeSelect(recommendedSize);
    setSelectedVideoType(recommendedSize);
    navigate('/style');
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-[40vh] lg:h-[50vh] bg-[#0A0A0A] overflow-hidden">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 z-10 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>

        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            <source src="https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
        </div>
        
        <div className="relative container mx-auto h-full max-w-[2560px] px-4 lg:px-8">
          <div className="flex flex-col justify-center h-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-extrabold tracking-[0.2em] uppercase text-white mb-4 leading-tight">
              GET UNLIMITED<br />VIDEO EDITING
            </h1>
            <p className="text-sm md:text-base lg:text-lg font-['Inter'] font-light text-white/80 mb-6 max-w-xl lg:max-w-2xl">
              Choose the perfect duration for your video project. Each option is carefully designed 
              to match different content needs.
            </p>

            {analysisStats.totalScenes > 0 && (
              <div className="bg-black/40 p-4 rounded-lg backdrop-blur-sm space-y-3">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Activity className="w-4 h-4" />
                  <span>Motion Analysis:</span>
                  <span className="text-purple-400">
                    {analysisStats.dominantMotionType === 'dynamic' ? 'Dynamic' : 'Static'} Dominant
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Users className="w-4 h-4" />
                  <span>Face Detections:</span>
                  <span className="text-purple-400">
                    {Math.round(analysisStats.faceDetections / Math.max(1, analysisStats.totalScenes))} per scene
                  </span>
                </div>

                <div className="w-full bg-gray-700 h-1.5 rounded-full">
                  <div 
                    className="h-full rounded-full bg-purple-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, (analysisStats.avgMotionScore / 50) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {VIDEO_SIZES.map((size) => {
        const isSelected = selectedSize && selectedSize.min === size.min && selectedSize.max === size.max;
        
        return (
          <motion.div
            key={`${size.min}-${size.max}`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`relative w-full p-8 border-b transition-all duration-300 cursor-pointer
              ${isSelected 
                ? 'border-editor-glow-purple bg-editor-glow-purple/10' 
                : 'border-gray-700/30 hover:bg-editor-glow-purple/5'
              }`}
            onClick={() => handleSizeSelect(size)}
          >
            <div className="container mx-auto max-w-[2560px]">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-medium text-white">{size.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Clock className="w-4 h-4" />
                      <span>{size.label}</span>
                    </div>
                    <PlanBadge tier={size.tier} />
                  </div>

                  <p className="text-sm text-gray-400 mb-4 max-w-2xl whitespace-pre-line">
                    {size.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-purple-300 bg-purple-500/10 p-2 rounded-lg inline-block">
                    <Clock className="w-3 h-3" />
                    <span>Recommended Tracks: {size.recommendedTracks}</span>
                  </div>
                </div>

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="bg-editor-glow-purple rounded-full p-3"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default VideoSizeSelector;
