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
    <div className="space-y-4">
      <motion.h2 
        className="text-2xl md:text-3xl font-['Montserrat'] font-bold tracking-wider uppercase text-white"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {title}
      </motion.h2>
      <motion.p 
        className="text-sm md:text-base font-['Montserrat'] font-light tracking-wide text-white/70 max-w-xl"
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
          transition={{ delay: 0.4 }}
          className="space-y-2"
        >
          <p className="text-sm text-white/90 font-medium">Key Features:</p>
          <ul className="list-disc list-inside space-y-1">
            {features.slice(0, 4).map((feature, index) => (
              <li key={index} className="text-sm text-white/70">{feature}</li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default StyleContent;