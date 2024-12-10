import React from 'react';
import { motion } from 'framer-motion';

interface StyleContentProps {
  title: string;
  description: string;
  isHovered: boolean;
  features: string[];
}

const StyleContent = ({ title, description, isHovered, features }: StyleContentProps) => {
  return (
    <div className="space-y-1">
      <motion.h2 
        className={`text-2xl md:text-3xl font-cinzel tracking-wider ${isHovered ? 'text-white' : 'text-white'}`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.p 
        className={`text-[8px] md:text-[10px] tracking-[0.2em] uppercase ${isHovered ? 'text-white/70' : 'text-gray-400'} font-italiana`}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {description}
      </motion.p>
      
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-6 mt-4"
        >
          {features.slice(0, 3).map((feature, index) => (
            <div key={index} className="text-white/70 text-sm">
              {feature}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default StyleContent;