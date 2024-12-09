import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Check, Sparkles, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PriceDisplay from './PriceDisplay';

interface PlanFeature {
  text: string;
  tooltip: string;
}

const basicFeatures: PlanFeature[] = [
  { text: "30s - 1:30min videos", tooltip: "Perfect duration for social media content" },
  { text: "Basic editing features", tooltip: "Essential tools for quick edits" },
  { text: "720p export quality", tooltip: "Standard HD resolution export" },
  { text: "5 video uploads", tooltip: "Upload up to 5 videos per project" }
];

const maxFeatures: PlanFeature[] = [
  { text: "8-12 minutes films", tooltip: "Ideal for detailed event coverage" },
  { text: "Unlimited edits", tooltip: "Make as many edits as you need" },
  { text: "10 premium movie styles", tooltip: "Access to our premium collection of video styles" },
  { text: "4K sequence export", tooltip: "Export in ultra-high definition" }
];

const businessFeatures: PlanFeature[] = [
  { text: "Up to 40min videos", tooltip: "Perfect for full event documentation" },
  { text: "Premium features", tooltip: "Access to all advanced editing tools" },
  { text: "4K HDR quality", tooltip: "Highest quality export with HDR support" },
  { text: "Priority support", tooltip: "24/7 dedicated support team" }
];

const FeatureList = ({ features }: { features: PlanFeature[] }) => (
  <ul className="space-y-4">
    {features.map((feature, index) => (
      <li key={index} className="flex items-center gap-2 text-gray-300">
        <Check className="w-4 h-4 text-editor-accent" />
        {feature.text}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="w-4 h-4 text-gray-400 hover:text-editor-accent transition-colors" />
            </TooltipTrigger>
            <TooltipContent className="bg-editor-glass-dark border border-editor-border">
              <p>{feature.tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </li>
    ))}
  </ul>
);

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
                $9.99
              </motion.span>
            </div>
            <div className="text-sm text-gray-400">Limited features</div>
          </div>
          <FeatureList features={basicFeatures} />
          <Button className="w-full bg-editor-accent hover:bg-editor-accent/80">
            Start Now
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
          <FeatureList features={maxFeatures} />
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
          <FeatureList features={businessFeatures} />
          <Button className="w-full bg-editor-accent hover:bg-editor-accent/80">
            Contact Sales
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PricingPlans;