import React from 'react';
import { motion } from 'framer-motion';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  period?: string;
  billingNote?: string;
}

const PriceDisplay = ({ price, originalPrice, period = "/mo", billingNote = "Billed annually" }: PriceDisplayProps) => {
  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-1">
        <span className="text-sm text-editor-glow-pink/80">US$</span>
        {originalPrice && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            className="text-lg line-through text-gray-400"
          >
            {originalPrice}
          </motion.span>
        )}
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-editor-glow-pink to-editor-glow-purple bg-clip-text text-transparent"
        >
          {price}
        </motion.span>
        <span className="text-sm text-editor-glow-pink/80">{period}</span>
      </div>
      <div className="text-sm text-gray-400">{billingNote}</div>
    </div>
  );
};

export default PriceDisplay;