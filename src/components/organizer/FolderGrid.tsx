import React from 'react';
import { FolderCategory } from '@/types';
import { motion } from 'framer-motion';

interface FolderGridProps {
  categories: FolderCategory[];
  categorizedFiles?: Record<string, number>;
}

const FolderGrid: React.FC<FolderGridProps> = ({ categories, categorizedFiles = {} }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`relative flex items-center gap-3 p-4 rounded-xl border border-purple-500/20 bg-gradient-to-br ${category.color} backdrop-blur-sm hover:bg-opacity-75 transition-all duration-300 group cursor-pointer`}
        >
          <div className="text-white/80 group-hover:text-white transition-colors">
            {category.icon}
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
              {category.name}
            </h3>
            <p className="text-xs text-white/60">
              {categorizedFiles[category.name] || 0} vídeos
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FolderGrid;