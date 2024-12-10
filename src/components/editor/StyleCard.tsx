import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import StyleVideoPlayer from './StyleVideoPlayer';
import { VideoStyle } from './VideoStyleSelector';

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-[60vh] group cursor-pointer w-full bg-black"
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

      <div className="relative z-10 flex items-center justify-between h-full px-96 max-w-[2400px] mx-auto w-full">
        <div className="space-y-1">
          <motion.h2 
            className="text-3xl font-cinzel tracking-wider text-black"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {style.title}
          </motion.h2>
          <motion.p 
            className="text-xs tracking-[0.2em] uppercase text-black/70 font-italiana"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {style.description}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            variant="outline" 
            className="border border-black text-black hover:bg-black/10 uppercase tracking-wider text-xs"
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/explore/${style.id}`;
            }}
          >
            Explore {style.title}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StyleCard;