import React from 'react';
import { motion } from 'framer-motion';

interface StyleFeaturesProps {
  features: string[];
  isVisible: boolean;
}

const StyleFeatures = ({ features, isVisible }: StyleFeaturesProps) => {
  if (!isVisible) return null;

  return (
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
  );
};

export default StyleFeatures;