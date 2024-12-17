import React from 'react';
import { motion } from 'framer-motion';
import { FileVideo, Folder } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VideoThumbnailGridProps {
  videos: File[];
  categories: { [key: string]: string };
  onReclassify?: (videoIndex: number, newCategory: string) => void;
}

const VideoThumbnailGrid: React.FC<VideoThumbnailGridProps> = ({
  videos,
  categories,
  onReclassify
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative group"
        >
          <div className="aspect-video bg-editor-panel rounded-lg overflow-hidden border border-purple-500/20 group-hover:border-purple-500 transition-colors">
            <div className="absolute top-2 left-2 bg-black/80 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
              {index + 1}
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <FileVideo className="w-8 h-8 text-purple-400" />
            </div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge 
                    variant="secondary"
                    className="absolute bottom-2 left-2 flex items-center gap-1"
                  >
                    <Folder className="w-3 h-3" />
                    <span className="text-xs truncate max-w-[100px]">
                      {categories[video.name] || 'Não classificado'}
                    </span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Categoria atual: {categories[video.name] || 'Não classificado'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="mt-2">
            <p className="text-sm text-gray-300 truncate">{video.name}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default VideoThumbnailGrid;