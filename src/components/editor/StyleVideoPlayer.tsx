import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { VideoStyle } from '@/types/video';

interface StyleVideoPlayerProps {
  style: {
    id: string;
    previewVideo: string;
    startTime?: number;
    endTime?: number;
  };
  isHovered: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
}

const StyleVideoPlayer = ({ style, isHovered, isMuted, onToggleMute }: StyleVideoPlayerProps) => {
  const handleTimeUpdate = (videoElement: HTMLVideoElement) => {
    if ('startTime' in style && 'endTime' in style) {
      if (videoElement.currentTime >= (style.endTime || 0)) {
        videoElement.currentTime = style.startTime || 0;
      }
    }
  };

  return (
    <AnimatePresence>
      {isHovered && (
        <>
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full object-cover"
            src={style.previewVideo}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={(e) => handleTimeUpdate(e.target as HTMLVideoElement)}
            onLoadedMetadata={(e) => {
              const video = e.target as HTMLVideoElement;
              if ('startTime' in style) {
                video.currentTime = style.startTime || 0;
              }
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleMute();
            }}
            className="absolute bottom-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </>
      )}
    </AnimatePresence>
  );
};

export default StyleVideoPlayer;
