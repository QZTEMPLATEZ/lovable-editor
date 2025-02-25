import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { VideoSizeRange } from '../types';
import { useVideoType } from '../contexts/VideoTypeContext';
import * as tf from '@tensorflow/tfjs';
import * as faceDetection from '@tensorflow-models/face-detection';
import VideoSelectorHeader from './video-selector/VideoSelectorHeader';
import AnalysisStats from './video-selector/AnalysisStats';
import VideoSizeOption from './video-selector/VideoSizeOption';

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

    if (avgMotionScore > 30 && faceDetections / totalScenes < 1) {
      recommendedSize = VIDEO_SIZES[0];
      toast({
        title: "Sugestão de Formato",
        description: "Detectamos muitas cenas dinâmicas com poucos closes. Recomendamos um formato mais curto e dinâmico.",
      });
    } else if (avgMotionScore < 20 && faceDetections / totalScenes > 2) {
      recommendedSize = VIDEO_SIZES[2];
      toast({
        title: "Sugestão de Formato",
        description: "Detectamos muitas cenas com closes e momentos íntimos. Recomendamos um formato que permita contar a história com mais detalhes.",
      });
    }

    const analysisData = {
      timestamp: new Date().toISOString(),
      stats: analysisStats,
      recommendedFormat: recommendedSize.name,
      userSelectedFormat: size.name
    };
    
    console.log('Video Analysis Data:', analysisData);

    onSizeSelect(recommendedSize);
    setSelectedVideoType(recommendedSize);
    navigate('/style');
  };

  return (
    <div className="min-h-screen">
      <VideoSelectorHeader />
      <div className="container mx-auto px-4 lg:px-8">
        <AnalysisStats stats={analysisStats} />
      </div>

      {VIDEO_SIZES.map((size) => (
        <VideoSizeOption
          key={`${size.min}-${size.max}`}
          size={size}
          isSelected={selectedSize?.min === size.min && selectedSize?.max === size.max}
          onClick={() => handleSizeSelect(size)}
        />
      ))}
    </div>
  );
};

export default VideoSizeSelector;
