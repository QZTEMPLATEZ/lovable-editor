import React from 'react';
import { motion } from 'framer-motion';
import { FolderCategory } from '../../types/organizer';
import { ChevronRight, Folder, FolderOpen } from 'lucide-react';
import { cn } from "@/lib/utils";

interface FolderGridProps {
  categories: FolderCategory[];
}

const FolderGrid: React.FC<FolderGridProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {categories.map((category) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-4 rounded-xl border border-white/10 backdrop-blur-sm",
            "hover:border-white/20 transition-all duration-300",
            category.color
          )}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              {category.icon || <Folder className="w-5 h-5 text-white" />}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white mb-1">{category.name}</h4>
              <p className="text-sm text-gray-300 mb-2">{category.description}</p>
              <p className="text-xs text-gray-400">Accepts: {category.expectedTypes}</p>
              
              {category.subfolders && category.subfolders.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs font-medium text-gray-300">Subfolders:</p>
                  {category.subfolders.map((subfolder) => (
                    <div 
                      key={subfolder.name} 
                      className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      <ChevronRight className="w-3 h-3" />
                      <FolderOpen className="w-3 h-3" />
                      <span>{subfolder.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FolderGrid;