import React, { useRef, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import VideoStyleItem from './VideoStyleItem';
import { Crown, Upload, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

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
            onStyleSelect={() => {
              onStyleSelect(style.id as VideoStyle);
              navigate('/edit');
            }}
            onToggleMute={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
          />
        ))}
      </div>

      {/* Reference Video Upload Banner */}
      <div className="relative mt-20 overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/90 to-black/95" />
        
        {/* Content */}
        <div className="relative py-24 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              {/* Business Plan Badge */}
              <Badge 
                variant="secondary" 
                className="mb-8 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 py-2 px-4 text-sm"
              >
                <Crown className="w-4 h-4 mr-2" />
                Business Plan Feature
              </Badge>
              
              {/* Title with decorative elements */}
              <div className="inline-flex items-center justify-center gap-4 mb-8">
                <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-500/0 via-yellow-500 to-yellow-500/0" />
                <h2 className="text-5xl font-cinzel bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500">
                  Reference Video
                </h2>
                <div className="w-12 h-0.5 bg-gradient-to-r from-yellow-500/0 via-yellow-500 to-yellow-500/0" />
              </div>

              <div className="max-w-3xl mx-auto">
                <p className="text-xl text-gray-300 mb-12 font-italiana leading-relaxed">
                  Elevate your brand consistency by uploading your own reference videos. Our AI will analyze and match your unique style across all content.
                </p>

                {/* Upload Area */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <div className="relative p-12 bg-black/80 border border-yellow-500/20 rounded-2xl backdrop-blur-sm group-hover:border-yellow-500/40 transition-all duration-300">
                    <div className="absolute top-0 right-0 m-4">
                      <Sparkles className="w-6 h-6 text-yellow-500/70 animate-pulse" />
                    </div>
                    
                    <Upload className="w-16 h-16 text-yellow-500/70 mx-auto mb-8 group-hover:scale-110 transition-transform duration-300" />
                    <p className="text-xl text-gray-200 mb-8 font-italiana">
                      Drop your reference video here or click to browse
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 text-lg px-8 py-6 group-hover:scale-105"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Select Video File
                    </Button>
                    <p className="text-sm text-gray-400 mt-6 font-italiana">
                      Maximum file size: 500MB • Supported formats: MP4, MOV, AVI
                    </p>
                  </div>
                </div>
              </div>
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