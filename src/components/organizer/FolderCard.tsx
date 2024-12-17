import React from 'react';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FolderCardProps {
  name: string;
  icon: ReactNode;
  count: number;
  color: string;
}

const FolderCard = ({ name, icon, count, color }: FolderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative flex items-center gap-3 p-4 rounded-xl border border-purple-500/20 bg-gradient-to-br ${color} backdrop-blur-sm hover:bg-opacity-75 transition-all duration-300 group cursor-pointer`}
    >
      <div className="text-white/80 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-white/90 group-hover:text-white transition-colors">
          {name}
        </h3>
        <p className="text-xs text-white/60">
          {count} vídeos
        </p>
      </div>
    </motion.div>
  );
};

export default FolderCard;