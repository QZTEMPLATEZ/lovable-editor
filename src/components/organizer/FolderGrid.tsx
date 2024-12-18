import React from 'react';
import { motion } from 'framer-motion';
import { FolderCategory } from '@/types';
import { Folder } from 'lucide-react';

interface FolderGridProps {
  categories: FolderCategory[];
  categorizedFiles?: Record<string, number>;
}

const FolderGrid: React.FC<FolderGridProps> = ({ categories, categorizedFiles = {} }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative flex items-center gap-3 p-4 rounded-xl border border-purple-500/20 bg-gradient-to-br ${category.color} backdrop-blur-sm hover:bg-opacity-75 transition-all duration-300 group cursor-pointer`}
        >
          <div className="text-white/80 group-hover:text-white transition-colors">
            {category.icon || <Folder className="w-5 h-5" />}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-white/60">
              {categorizedFiles[category.name] || 0} videos
            </p>
            <p className="text-xs text-white/40 mt-1">
              {category.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FolderGrid;