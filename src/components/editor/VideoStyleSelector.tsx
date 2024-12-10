import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import StyleItem from './style/StyleItem';
import { VideoStyle } from '@/types/video';

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
    previewVideo: 'https://www.dropbox.com/scl/fi/6qe8m4ab7nzjj14ne0h6u/CLASSIC-LONG-OK.mp4?raw=1',
    features: [
      'Warm, timeless color grading',
      'Balanced framing & composition',
      'Smooth, intentional movements',
      'Emotional storytelling flow',
      'Scene-specific pacing',
      'Natural transitions',
      'Elegant sound design',
      'Traditional editing rhythm'
    ]
  },
  {
    id: 'cinematic',
    title: 'Modern Cinema',
    description: 'Contemporary & Bold',
    previewVideo: 'https://www.dropbox.com/scl/fi/ng9ndcl10lcownk1mtx4g/CINEMATOGRAFICO-LONG-OK.mp4?raw=1',
    features: [
      'High contrast film-like grading',
      'Dynamic camera movements',
      'Dramatic lighting emphasis',
      'Creative depth transitions',
      'Bold storytelling approach',
      'Artistic scene sequencing',
      'Enhanced emotional peaks',
      'Scene-specific pacing',
      'Cinematic sound design',
      'Advanced color treatment'
    ]
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'Authentic & Natural',
    previewVideo: 'https://www.dropbox.com/scl/fi/1mlqx5aq31pvyo67mpz4x/DOC-LONG-OK.mp4?raw=1',
    features: [
      'Natural color grading',
      'Authentic storytelling',
      'Chronological sequencing',
      'Enhanced audio clarity',
      'Long, uninterrupted takes',
      'Minimal transitions',
      'Ambient sound focus',
      'Real-time pacing',
      'Candid moment preservation',
      'Natural lighting emphasis'
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
      'Creative effects',
      'Dynamic transitions',
      'Rhythmic sequencing',
      'Vibrant aesthetics',
      'Motion-focused scenes',
      'Contemporary style'
    ]
  }
];

const VideoStyleSelector = ({ 
  selectedStyle, 
  onStyleSelect, 
  onCustomVideoUpload, 
  onNext 
}: VideoStyleSelectorProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStyleSelectAndNext = (styleId: string) => {
    const style = VIDEO_STYLES.find(s => s.id === styleId);
    onStyleSelect(styleId as VideoStyle);
    
    toast({
      title: `${style?.title} Style Selected`,
      description: style?.id === 'documentary' 
        ? "Your wedding film will be edited with a focus on authenticity and natural storytelling, preserving real moments and ambient sounds."
        : style?.id === 'cinematic'
          ? "Your wedding film will be edited with advanced cinematic techniques, emphasizing dramatic storytelling and dynamic visuals."
          : style?.id === 'dynamic'
            ? "Your wedding film will be edited with high-energy pacing and creative transitions for a contemporary feel."
            : "Your wedding film will be edited with timeless cinematic techniques for an elegant result.",
    });

    if (onNext) {
      onNext();
    }
    navigate('/music');
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
            <StyleItem
              key={style.id}
              style={style}
              isHovered={false}
              onMouseEnter={() => {}}
              onMouseLeave={() => {}}
              onStyleSelect={handleStyleSelectAndNext}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VideoStyleSelector;