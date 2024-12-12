import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Film, Music, Palette } from 'lucide-react';
import { useVideoType } from '@/contexts/VideoTypeContext';

const ReviewSummary = () => {
  const { selectedVideoType, selectedStyle, selectedMusic } = useVideoType();

  const summaryItems = [
    {
      icon: Clock,
      title: "Duration",
      value: selectedVideoType?.label || "No duration selected",
      description: selectedVideoType?.description || null
    },
    {
      icon: Palette,
      title: "Style",
      value: selectedStyle?.name || "No style selected",
      description: selectedStyle?.description || null
    },
    {
      icon: Music,
      title: "Music",
      value: selectedMusic?.length 
        ? `${selectedMusic.length} track${selectedMusic.length === 1 ? '' : 's'} selected`
        : "No music selected",
      description: selectedMusic?.length 
        ? selectedMusic.map(music => music.name).join(', ')
        : null
    },
    {
      icon: Film,
      title: "Preview",
      value: "Ready for processing",
      description: "Your video will be processed using AI"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {summaryItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-editor-panel border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
        >
          <div className="flex items-center gap-3 mb-4">
            <item.icon className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-300">{item.title}</h3>
          </div>
          
          <div className="space-y-2">
            <p className="text-gray-300">{item.value}</p>
            {item.description && (
              <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReviewSummary;