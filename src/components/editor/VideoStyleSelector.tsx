import React, { useRef, useState } from 'react';
import { Upload, Film, Info, Crown, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import VideoStyleItem from './VideoStyleItem';

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
    description: 'made by world-class artists',
    previewVideo: 'https://www.dropbox.com/scl/fi/6qe8m4ab7nzjj14ne0h6u/CLASSIC-LONG-OK-OK.mp4?rlkey=syb52596tbxhgxc6zliv3glrw&dl=1',
    darkMode: true
  },
  {
    id: 'cinematic',
    title: 'Cinematic',
    description: 'recorded by top sound engineers',
    previewVideo: 'https://www.dropbox.com/scl/fi/ng9ndcl10lcownk1mtx4g/CINEMATOGRAFICO-LONG-OK.mp4?rlkey=ygbln4b5xuaxqeljavln93r3q&dl=1',
    darkMode: true
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'with exclusive voice actors',
    previewVideo: 'https://www.dropbox.com/scl/fi/1mlqx5aq31pvyo67mpz4x/DOC-LONG-OK-OK.mp4?rlkey=pbbkz4xtf9rgl2mecemvp7la3&dl=1',
    darkMode: true
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'shot by pro filmmakers',
    previewVideo: 'https://www.dropbox.com/scl/fi/m75wtfagul3ui9qbi996b/DINAMICO-OK.mp4?rlkey=h545e8z9706sc6bawg9cm9gzc&dl=1',
    darkMode: true
  }
] as const;

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload }: VideoStyleSelectorProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleMouseEnter = (styleId: string) => {
    setHoveredStyle(styleId);
  };

  const handleMouseLeave = (styleId: string) => {
    setHoveredStyle(null);
  };

  return (
    <div className="flex flex-col w-screen max-w-[100vw] -mx-[100vw] relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw]">
      {/* Header Section */}
      <div className="relative py-16 px-4 text-center before:absolute before:inset-0 before:bg-gradient-to-b before:from-editor-bg/50 before:to-transparent">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-cinzel mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
            Define Your Visual Story
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-italiana max-w-2xl mx-auto">
            Choose from our curated collection of professional video styles, each crafted to bring your vision to life
          </p>
        </div>
      </div>

      {/* Video Styles Grid */}
      <div className="w-full max-w-none px-0 space-y-1">
        {VIDEO_STYLES.map((style) => (
          <VideoStyleItem
            key={style.id}
            style={style}
            isHovered={hoveredStyle === style.id}
            isMuted={isMuted}
            onMouseEnter={() => handleMouseEnter(style.id)}
            onMouseLeave={() => handleMouseLeave(style.id)}
            onStyleSelect={(selectedStyle) => {
              onStyleSelect(selectedStyle);
              navigate('/edit');
            }}
            onToggleMute={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
          />
        ))}
      </div>

      {/* New Reference Video Upload Banner */}
      <div className="relative mt-20 overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/20 via-editor-glow-pink/10 to-editor-glow-blue/20" />
        </div>
        
        {/* Content Container */}
        <div className="relative py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center space-y-8">
              {/* Business Plan Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge 
                  variant="secondary" 
                  className="bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/30 py-2 px-4 text-sm backdrop-blur-sm"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Business Plan Feature
                </Badge>
              </motion.div>
              
              {/* Title Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center justify-center gap-4">
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                  <h2 className="text-4xl md:text-5xl font-cinzel bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                    Reference Video
                  </h2>
                  <div className="h-px w-12 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
                </div>

                <p className="text-xl text-gray-300 max-w-3xl mx-auto font-italiana leading-relaxed">
                  Elevate your brand consistency by uploading your own reference videos. 
                  Our AI will analyze and match your unique style across all content.
                </p>
              </motion.div>

              {/* Upload Area */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative group max-w-4xl mx-auto"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                <div 
                  className="relative p-12 bg-black/40 border border-amber-500/20 rounded-2xl backdrop-blur-sm group-hover:border-amber-500/40 transition-all duration-300"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="absolute top-0 right-0 m-4">
                    <Sparkles className="w-6 h-6 text-amber-500/70 animate-pulse" />
                  </div>
                  
                  <Upload className="w-16 h-16 text-amber-500/70 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300" />
                  <p className="text-xl text-gray-200 mb-8 font-italiana">
                    Drop your reference video here or click to browse
                  </p>
                  <Button 
                    variant="outline" 
                    className="border-2 border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition-all duration-300 text-lg px-8 py-6 group-hover:scale-105"
                  >
                    Select Video File
                  </Button>
                  <p className="text-sm text-gray-400 mt-6 font-italiana">
                    Maximum file size: 500MB • Supported formats: MP4, MOV, AVI
                  </p>

                  {/* Features List */}
                  <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {[
                      { title: 'Style Analysis', desc: 'AI analyzes visual style and composition' },
                      { title: 'Smart Transitions', desc: 'Learns transition preferences and timing' },
                      { title: 'Color Matching', desc: 'Understands your color grading and mood' }
                    ].map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + (index * 0.1) }}
                        className="p-4 rounded-lg bg-black/20 border border-amber-500/10"
                      >
                        <h3 className="text-amber-400 font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-400 text-sm">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
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
        }}
        accept="video/*"
        className="hidden"
      />
    </div>
  );
};

export default VideoStyleSelector;