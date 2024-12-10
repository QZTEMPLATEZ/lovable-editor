import React, { useState } from 'react';
import { VideoStyle } from '@/types/video';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";

interface VideoStyleSelectorProps {
  selectedStyle: VideoStyle | null;
  onStyleSelect: (style: VideoStyle) => void;
  onCustomVideoUpload: (file: File) => void;
  onNext?: () => void;
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
];

const VideoStyleSelector = ({ selectedStyle, onStyleSelect, onCustomVideoUpload, onNext }: VideoStyleSelectorProps) => {
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStyleSelectAndNext = (styleId: string) => {
    onStyleSelect(styleId as VideoStyle);
    if (onNext) {
      onNext();
    }
    navigate('/music');
  };

  const handleMouseEnter = async (styleId: string, videoElement: HTMLVideoElement | null) => {
    setHoveredStyle(styleId);
    if (videoElement) {
      try {
        // Set video properties before playing
        videoElement.muted = true;
        videoElement.playsInline = true;
        videoElement.currentTime = 0;
        await videoElement.play();
      } catch (error) {
        console.log('Video autoplay failed:', error);
        // Don't show error toast to user as this is not critical
      }
    }
  };

  const handleMouseLeave = (videoElement: HTMLVideoElement | null) => {
    setHoveredStyle(null);
    if (videoElement) {
      videoElement.pause();
      videoElement.currentTime = 0;
    }
  };

  const handleExploreClick = (styleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    handleStyleSelectAndNext(styleId);
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
          Choose Your Style
        </h1>
      </div>

      <div className="w-full max-w-none px-0 space-y-0">
        {VIDEO_STYLES.map((style) => (
          <div
            key={style.id}
            className="relative w-full [aspect-ratio:3/1] group cursor-pointer bg-[#0A0A0A] transition-colors duration-300 border-b border-gray-800"
            onMouseEnter={(e) => {
              const videoElement = e.currentTarget.querySelector('video');
              handleMouseEnter(style.id, videoElement);
            }}
            onMouseLeave={(e) => {
              const videoElement = e.currentTarget.querySelector('video');
              handleMouseLeave(videoElement);
            }}
            onClick={() => handleStyleSelectAndNext(style.id)}
          >
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
            
            {/* Video with hover overlay */}
            <div className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-100 opacity-60">
              <video
                key={style.id}
                src={style.previewVideo}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                preload="metadata"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            <div className="relative z-10 flex items-center justify-between h-full w-full px-16 md:px-32">
              <div className="space-y-1">
                <h2 className="text-3xl md:text-4xl font-cinzel tracking-wider text-white group-hover:text-white/90 transition-colors">
                  {style.title}
                </h2>
                <p className="text-sm md:text-base tracking-[0.2em] uppercase text-gray-400 font-italiana group-hover:text-gray-300 transition-colors">
                  {style.description}
                </p>
              </div>
              <button
                onClick={(e) => handleExploreClick(style.id, e)}
                className="bg-gray-900 hover:bg-gray-800 border border-gray-800 text-white px-8 py-3 rounded-md transition-all duration-300 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10"
              >
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoStyleSelector;