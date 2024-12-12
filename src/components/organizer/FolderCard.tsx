import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface FolderCardProps {
  name: string;
  icon: React.ReactElement<LucideIcon>;
  count: number;
}

const FolderCard = ({ name, icon, count }: FolderCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative flex items-center justify-between p-4 rounded-xl border border-purple-500/20 bg-black/40 backdrop-blur-sm"
    >
      <div className="flex items-center gap-3">
        <div className="text-purple-400">
          {icon}
        </div>
        <span className="text-white font-medium">{name}</span>
      </div>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/60 text-white">
        {count}
      </div>
    </motion.div>
  );
};

export default FolderCard;