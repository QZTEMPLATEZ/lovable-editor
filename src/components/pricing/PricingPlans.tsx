import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import PriceDisplay from './PriceDisplay';

const PricingPlans = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {/* Basic Plan */}
      <div className="relative p-8 rounded-2xl border border-editor-border bg-editor-panel/50 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5 rounded-2xl" />
        <div className="relative space-y-6">
          <h3 className="text-2xl font-bold text-white">Basic</h3>
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-editor-glow-pink to-editor-glow-purple bg-clip-text text-transparent"
              >
                Try for Free
              </motion.span>
            </div>
            <div className="text-sm text-gray-400">Limited features</div>
          </div>
          <ul className="space-y-4">
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              30s - 1:30min videos
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              Basic editing features
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              720p export quality
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              5 video uploads
            </li>
          </ul>
          <Button className="w-full bg-editor-accent hover:bg-editor-accent/80">
            Start Free
          </Button>
        </div>
      </div>

      {/* MAX Plan */}
      <div className="relative p-8 rounded-2xl border-2 border-editor-accent bg-editor-panel/50 backdrop-blur-xl transform scale-105">
        <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/10 via-transparent to-editor-glow-pink/10 rounded-2xl" />
        <div className="relative space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">MAX</h3>
            <Crown className="w-5 h-5 text-editor-accent" />
          </div>
          <PriceDisplay price={29.99} originalPrice={39.99} />
          <ul className="space-y-4">
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              8-12 minutes films
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              Unlimited edits
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              10 premium movie styles
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              4K sequence export
            </li>
          </ul>
          <Button className="w-full bg-editor-accent hover:bg-editor-accent/80">
            Choose MAX
          </Button>
        </div>
      </div>

      {/* Business Plan */}
      <div className="relative p-8 rounded-2xl border border-editor-border bg-editor-panel/50 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/5 via-transparent to-editor-glow-pink/5 rounded-2xl" />
        <div className="relative space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">Business</h3>
            <Sparkles className="w-5 h-5 text-editor-accent" />
          </div>
          <PriceDisplay price={35.99} />
          <ul className="space-y-4">
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              Up to 40min videos
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              Premium features
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              4K HDR quality
            </li>
            <li className="flex items-center gap-2 text-gray-300">
              <Check className="w-4 h-4 text-editor-accent" />
              Priority support
            </li>
          </ul>
          <Button className="w-full bg-editor-accent hover:bg-editor-accent/80">
            Contact Sales
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingPlans;