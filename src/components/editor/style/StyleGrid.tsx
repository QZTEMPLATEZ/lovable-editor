import React from 'react';
import { AnimatePresence } from 'framer-motion';
import StyleItem from './StyleItem';
import { VideoStyle } from '@/types/video';
import { VIDEO_STYLES } from '@/constants/videoStyles';

interface StyleGridProps {
  onStyleSelect: (styleId: string) => void;
}

const StyleGrid = ({ onStyleSelect }: StyleGridProps) => {
  return (
    <div className="w-full max-w-none px-0 space-y-0 bg-[#0A0A0A]/95 backdrop-blur-sm">
      <AnimatePresence>
        {VIDEO_STYLES.map((style) => (
          <StyleItem
            key={style.id}
            style={style}
            isHovered={false}
            onMouseEnter={() => {}}
            onMouseLeave={() => {}}
            onStyleSelect={onStyleSelect}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default StyleGrid;