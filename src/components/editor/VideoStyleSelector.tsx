import React from 'react';
import { motion } from 'framer-motion';
import { Film, Clock, Video, Zap, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export type VideoStyle = 'classic' | 'cinematic' | 'documentary' | 'dynamic' | 'custom';

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
}

const VIDEO_STYLES = [
  {
    id: 'classic',
    title: 'Classic',
    description: 'Timeless, elegant edit focusing on key moments with minimal transitions',
    icon: <Film className="w-6 h-6 text-purple-400" />,
    features: ['Elegant transitions', 'Key moment focus', 'Traditional pacing']
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'Polished, emotional edit with slow motion and dramatic pacing',
    icon: <Video className="w-6 h-6 text-pink-400" />,
    features: ['Slow motion', 'Color grading', 'Dramatic cuts']
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'Chronological and detailed edit, focusing on storytelling',
    icon: <Clock className="w-6 h-6 text-blue-400" />,
    features: ['Raw moments', 'Natural flow', 'Detailed coverage']
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'Fast-paced, high-energy edit tailored for social media',
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    features: ['Quick cuts', 'High energy', 'Social media ready']
  }
] as const;

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const { toast } = useToast();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('video/')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload a video file."
        });
        return;
      }
      onCustomVideoUpload(file);
      onStyleSelect('custom');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Select Video Style
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {VIDEO_STYLES.map((style) => (
          <motion.button
            key={style.id}
            whileHover={{ scale: 1.02, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onStyleSelect(style.id as VideoStyle)}
            className={`group relative overflow-hidden p-8 rounded-xl border-2 transition-all duration-300 text-left
              ${selectedStyle === style.id
                ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
                : 'border-editor-border hover:border-purple-500/50 bg-editor-glass.light'
              }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative space-y-4">
              <div className="flex items-center gap-4">
                {style.icon}
                <h4 className="text-xl font-semibold text-white">{style.title}</h4>
              </div>
              
              <p className="text-sm text-editor-text">{style.description}</p>
              
              <ul className="space-y-2">
                {style.features.map((feature, index) => (
                  <li key={index} className="text-sm text-purple-300 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.button>
        ))}
      </div>

      <div className="mt-8 p-6 rounded-xl border-2 border-dashed border-editor-border bg-editor-bg/50">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleCustomUpload}
          accept="video/*"
          className="hidden"
        />
        <div className="text-center space-y-4">
          <Upload className="w-8 h-8 text-purple-400 mx-auto" />
          <div>
            <h4 className="text-lg font-semibold text-white mb-2">Custom Style</h4>
            <p className="text-sm text-editor-text mb-4">
              Upload your own reference video to create a custom style
            </p>
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="bg-editor-panel/50 hover:bg-editor-panel"
            >
              Upload Reference Video
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoStyleSelector;