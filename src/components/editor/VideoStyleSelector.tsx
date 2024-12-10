import React, { useState, useRef } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import VideoStyleItem from './VideoStyleItem';
import { Crown } from 'lucide-react';

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
      <div className="text-center py-12 px-4">
        <h1 className="text-2xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
          Define Your Visual Story
        </h1>
      </div>

      <div className="w-full max-w-none px-0 space-y-0">
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

      {/* New Business Reference Video Banner */}
      <div className="mt-20 bg-black/90 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-italiana mb-6">The perfect plan to fit your needs</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Standard Plans */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Standard plans</h3>
                <p className="text-gray-400">
                  For video creators of all kinds. Get the creative assets your projects need, all covered by one simple license.
                </p>
                <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                  See Plans
                </Button>
              </div>
              
              {/* Business Plans */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 justify-center">
                  <h3 className="text-2xl font-semibold">Business plans</h3>
                  <Crown className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-gray-400">
                  For brands, creative teams, agencies, and everything in between. Get unlimited assets and a license that covers your business.
                </p>
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Learn More
                </Button>
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