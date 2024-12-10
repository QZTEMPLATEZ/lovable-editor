import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import StyleVideoPlayer from './StyleVideoPlayer';
import { VideoStyle } from '@/types/video';

interface StyleCardProps {
  style: {
    id: string;
    title: string;
    description: string;
    previewVideo: string;
    startTime?: number;
    endTime?: number;
  };
  isHovered: boolean;
  isMuted: boolean;
  onHover: (id: string | null) => void;
  onToggleMute: () => void;
  onStyleSelect: (style: VideoStyle) => void;
}

const StyleCard = ({ style, isHovered, isMuted, onHover, onToggleMute, onStyleSelect }: StyleCardProps) => {
  return (
    <div 
      className="relative h-full group cursor-pointer w-full bg-black"
      onMouseEnter={() => onHover(style.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onStyleSelect(style.id as VideoStyle)}
    >
      <StyleVideoPlayer
        style={style}
        isHovered={isHovered}
        isMuted={isMuted}
        onToggleMute={onToggleMute}
      />

      <div className="absolute inset-0 flex items-center px-24">
        <div className="space-y-2 z-10">
          <motion.h2 
            className="text-4xl font-cinzel tracking-wider text-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {style.title}
          </motion.h2>
          <motion.p 
            className="text-sm tracking-[0.2em] uppercase text-black/70 font-italiana"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {style.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              variant="outline" 
              className="mt-4 border border-black text-black hover:bg-black/10 uppercase tracking-wider text-xs"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/explore/${style.id}`;
              }}
            >
              Explore {style.title}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StyleCard;