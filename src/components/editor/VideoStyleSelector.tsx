import React, { useRef, useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import VideoStyleItem from './VideoStyleItem';
import { Crown, Upload } from 'lucide-react';

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
      <div className="mt-20 bg-gradient-to-br from-black/95 to-black/90 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <Crown className="w-10 h-10 text-yellow-500" />
              <h2 className="text-5xl font-cinzel bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-500">
                Business Reference Video
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <p className="text-xl text-gray-300 mb-12 font-italiana">
                Unlock the power to upload your own reference videos. Perfect for brands and agencies looking to maintain consistent style across all their content.
              </p>
              <div className="p-12 border border-dashed border-yellow-500/30 rounded-2xl bg-black/50 hover:border-yellow-500/50 transition-all duration-300 backdrop-blur-sm">
                <Upload className="w-16 h-16 text-yellow-500/70 mx-auto mb-6" />
                <p className="text-xl text-gray-200 mb-8 font-italiana">
                  Upload your reference video to guide our AI in matching your brand's unique style
                </p>
                <Button 
                  variant="outline" 
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all duration-300 text-lg px-8 py-6"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Reference Video
                </Button>
                <p className="text-sm text-gray-400 mt-6 font-italiana">
                  Available exclusively with Business Plan subscription
                </p>
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