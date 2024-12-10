import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Sparkles, Wand2 } from 'lucide-react';
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
      "Warm, film-inspired color grading for timeless appeal",
      "Perfectly balanced framing with golden ratio composition",
      "Smooth, intentional camera movements that enhance emotion",
      "Carefully crafted emotional storytelling progression",
      "Scene-specific pacing that matches the moments intensity",
      "Elegant transitions that flow naturally between scenes",
      "Rich orchestral sound design with layered ambient audio",
      "Traditional 24fps cinematic look and feel",
      "Thoughtful use of slow motion for emotional peaks",
      "Professional color correction with film emulation"
    ],
    technicalDetails: {
      colorGrading: "Warm, film-like tones with subtle contrast",
      transitions: "Cross dissolves, gentle fades",
      pacing: "Measured, intentional cuts (3-5 seconds)",
      effects: "Light film grain, anamorphic lens simulation"
    }
  },
  {
    id: 'cinematic',
    title: 'Modern Cinema',
    description: 'Contemporary & Bold',
    previewVideo: 'https://www.dropbox.com/scl/fi/ng9ndcl10lcownk1mtx4g/CINEMATOGRAFICO-LONG-OK.mp4?raw=1',
    features: [
      "High-contrast film-like grading with cinematic LUTs",
      "Dynamic camera movements with advanced stabilization",
      "Dramatic lighting emphasis using advanced color science",
      "Creative depth transitions with parallax effects",
      "Bold, non-linear storytelling approach",
      "Artistic scene sequencing with emotional build-up",
      "Enhanced emotional peaks through advanced editing",
      "Premium sound design with orchestral elements",
      "Anamorphic widescreen aspect ratio",
      "Hollywood-grade color treatment and finishing"
    ],
    technicalDetails: {
      colorGrading: "High contrast, cinematic color science",
      transitions: "Dynamic wipes, creative morphs",
      pacing: "Variable pacing (1-4 seconds)",
      effects: "Lens flares, advanced color grading"
    }
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'Authentic & Natural',
    previewVideo: 'https://www.dropbox.com/scl/fi/1mlqx5aq31pvyo67mpz4x/DOC-LONG-OK.mp4?raw=1',
    features: [
      "Natural color grading preserving true-to-life colors",
      "Authentic storytelling following real events",
      "Chronological sequencing with minimal manipulation",
      "Crystal-clear dialogue and speech enhancement",
      "Long, uninterrupted takes capturing genuine moments",
      "Minimal transitions to maintain authenticity",
      "Rich ambient sound capture and preservation",
      "Real-time pacing that respects natural flow",
      "Focus on candid reactions and genuine emotions",
      "Natural lighting with minimal enhancement"
    ],
    technicalDetails: {
      colorGrading: "Natural, true-to-life colors",
      transitions: "Simple cuts, minimal effects",
      pacing: "Extended shots (5-15 seconds)",
      effects: "Subtle stabilization only"
    }
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'Energetic & Bold',
    previewVideo: 'https://www.dropbox.com/scl/fi/m75wtfagul3ui9qbi996b/DINAMICO-OK.mp4?raw=1',
    features: [
      "High-energy editing synchronized with music beats",
      "Vibrant color treatment with enhanced saturation",
      "Fast-paced cuts timed to musical rhythm",
      "Creative speed ramping and time manipulation",
      "Modern transition effects (whips, zooms, morphs)",
      "Split-screen and multi-angle compositions",
      "Advanced motion graphics and text animations",
      "Contemporary sound design with beat matching",
      "Dramatic slow motion and time-lapse sequences",
      "Cutting-edge visual effects and overlays"
    ],
    technicalDetails: {
      colorGrading: "High saturation, vibrant look",
      transitions: "Fast cuts, whip pans, zooms",
      pacing: "Rapid cuts (0.5-2 seconds)",
      effects: "Speed ramping, motion graphics"
    }
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
        ? "Your video will be edited with a focus on authenticity and natural storytelling, preserving real moments and ambient sounds."
        : style?.id === 'cinematic'
          ? "Your video will be edited with advanced cinematic techniques, emphasizing dramatic storytelling and dynamic visuals."
          : style?.id === 'dynamic'
            ? "Your video will be edited with high-energy pacing and creative transitions for a contemporary feel."
            : "Your video will be edited with timeless cinematic techniques for an elegant result.",
    });

    if (onNext) {
      onNext();
    }
    navigate('/music');
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-[#0A0A0A]">
      <div className="relative py-12 px-4 border-b border-editor-border/20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
        
        {/* Header Content */}
        <div className="relative flex items-center gap-6 max-w-7xl mx-auto">
          {/* Back Button with Glow */}
          <motion.button
            onClick={() => navigate('/duration')}
            className="p-3 rounded-2xl bg-editor-panel/50 backdrop-blur-sm border border-editor-border/20 
                     hover:bg-editor-panel/70 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
          >
            <ChevronLeft className="w-6 h-6 text-editor-glow-purple group-hover:text-editor-glow-pink transition-colors" />
          </motion.button>

          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                  <Wand2 className="w-6 h-6 text-editor-glow-purple" />
                </div>
                <Sparkles className="w-4 h-4 text-editor-glow-pink absolute -top-1 -right-1 animate-pulse" />
              </div>
              
              <div>
                <h1 className="text-3xl font-cinzel tracking-wider bg-clip-text text-transparent 
                             bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue">
                  Choose Your Cinematic Style
                </h1>
                <p className="text-sm text-editor-text/70 font-italiana tracking-wider mt-1">
                  Each style is carefully crafted to tell your story with a unique cinematic approach
                </p>
              </div>
            </div>
          </div>
        </div>
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