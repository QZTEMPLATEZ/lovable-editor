import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileVideo, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VideoThumbnailProps {
  file: File;
  isSelected?: boolean;
  category?: string;
  confidence?: number;
  onPreview?: (file: File) => void;
  onReclassify?: () => void;
}

const VideoThumbnail = ({ 
  file, 
  isSelected,
  category,
  confidence,
  onPreview,
  onReclassify
}: VideoThumbnailProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = URL.createObjectURL(file);
    }
    
    return () => {
      if (videoRef.current?.src) {
        URL.revokeObjectURL(videoRef.current.src);
      }
    };
  }, [file]);

  return (
    <motion.div
      initial={false}
      animate={{
        scale: isSelected ? 1.05 : 1,
      }}
      className={`relative rounded-lg overflow-hidden border ${
        isSelected ? 'border-purple-500' : 'border-purple-500/20'
      }`}
      onClick={() => onPreview?.(file)}
    >
      <div className="aspect-video bg-black relative group">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          preload="metadata"
          muted
          onMouseOver={e => e.currentTarget.play()}
          onMouseOut={e => {
            e.currentTarget.pause();
            e.currentTarget.currentTime = 0;
          }}
        />
        
        {category && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-black/50 rounded-full">
            <span className="text-xs text-white">{category}</span>
          </div>
        )}
        
        {confidence !== undefined && (
          <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/50 rounded-full">
            <span className="text-xs text-white">{Math.round(confidence * 100)}%</span>
          </div>
        )}

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onReclassify?.();
                }}
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reclassify video</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="p-2">
        <p className="text-xs text-gray-300 truncate">
          {file.name}
        </p>
      </div>
    </motion.div>
  );
};

export default VideoThumbnail;