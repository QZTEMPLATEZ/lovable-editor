import React from 'react';
import { FileVideo, Tag, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VideoThumbnailProps {
  file: File;
  category: string;
  confidence: number;
  onPreview: (file: File) => void;
  isSelected?: boolean;
}

const VideoThumbnail = ({ 
  file, 
  category, 
  confidence, 
  onPreview,
  isSelected 
}: VideoThumbnailProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`relative rounded-lg overflow-hidden border ${
              isSelected ? 'border-purple-500' : 'border-purple-500/20'
            } cursor-pointer group`}
            onClick={() => onPreview(file)}
          >
            <div className="aspect-video bg-black relative">
              <video
                src={URL.createObjectURL(file)}
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                onMouseOver={(e) => (e.target as HTMLVideoElement).play()}
                onMouseOut={(e) => {
                  (e.target as HTMLVideoElement).pause();
                  (e.target as HTMLVideoElement).currentTime = 0;
                }}
                muted
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-purple-300" />
                  <span className="text-sm text-white font-medium truncate">
                    {category}
                  </span>
                </div>
                {confidence > 0.8 && (
                  <div className="bg-green-500/20 p-1 rounded-full">
                    <Check className="w-3 h-3 text-green-400" />
                  </div>
                )}
              </div>
            </div>

            <TooltipContent side="top">
              <p className="font-medium">{file.name}</p>
              <p className="text-xs text-gray-400">
                Confidence: {Math.round(confidence * 100)}%
              </p>
            </TooltipContent>
          </motion.div>
        </TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VideoThumbnail;