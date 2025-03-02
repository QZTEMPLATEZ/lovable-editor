import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileVideo, CheckCircle2, Loader2, Tag } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VideoThumbnailGridProps {
  videos: File[];
  categories: Record<string, string>;
  onReclassify?: (videoIndex: number, newCategory: string) => void;
  processingStatus?: Record<string, boolean>;
}

const VideoThumbnailGrid: React.FC<VideoThumbnailGridProps> = ({
  videos,
  categories,
  onReclassify,
  processingStatus = {}
}) => {
  return (
    <ScrollArea className="h-[400px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
        <AnimatePresence>
          {videos.map((video, index) => (
            <motion.div
              key={video.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="aspect-video bg-editor-panel rounded-lg overflow-hidden border border-purple-500/20 group-hover:border-purple-500/50 transition-all duration-300">
                <video
                  src={URL.createObjectURL(video)}
                  className="w-full h-full object-cover"
                  onMouseOver={e => (e.target as HTMLVideoElement).play()}
                  onMouseOut={e => {
                    const videoElement = e.target as HTMLVideoElement;
                    videoElement.pause();
                    videoElement.currentTime = 0;
                  }}
                  muted
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2 space-y-2">
                    <p className="text-xs text-white truncate">{video.name}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-[10px]">
                        {(video.size / (1024 * 1024)).toFixed(1)} MB
                      </Badge>
                      {categories[video.name] && (
                        <Badge 
                          variant="outline" 
                          className="text-[10px] bg-purple-500/20 text-purple-200 flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {categories[video.name]}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Processing Status */}
                <div className="absolute top-2 right-2">
                  {processingStatus[video.name] ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="bg-black/50 rounded-full p-1"
                    >
                      <Loader2 className="w-4 h-4 text-purple-400" />
                    </motion.div>
                  ) : (
                    <div className="bg-black/50 rounded-full p-1">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                  )}
                </div>

                {!categories[video.name] && (
                  <div className="absolute top-2 left-2 bg-red-500/20 text-red-200 px-2 py-1 rounded-full text-xs">
                    Não classificado
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ScrollArea>
  );
};

export default VideoThumbnailGrid;