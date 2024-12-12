import React from 'react';
import { motion } from 'framer-motion';
import { Bird, Check, Sparkles, Info } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
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
  <ul className="space-y-3 text-sm">
    {features.map((feature, index) => (
      <li key={index} className="flex items-start gap-2">
        <Check className="w-4 h-4 text-editor-accent mt-0.5 flex-shrink-0" />
        <div className="flex items-center gap-1.5">
          <span className="text-gray-200">{feature.text}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-3.5 h-3.5 text-gray-400 hover:text-editor-accent transition-colors" />
              </TooltipTrigger>
              <TooltipContent className="bg-editor-glass-dark border border-editor-border">
                <p className="text-xs">{feature.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </li>
    ))}
  </ul>
);

interface PricingPlansProps {
  onComplete?: () => void;
}

const PricingPlans = ({ onComplete }: PricingPlansProps) => {
  const navigate = useNavigate();

  const handlePlanSelect = (isFreePlan: boolean = false) => {
    if (isFreePlan) {
      navigate('/duration');
    } else if (onComplete) {
      onComplete();
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="space-y-12 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-editor-glow.purple to-editor-glow.pink bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Select the perfect plan that matches your creative needs
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {/* Basic Plan */}
        <div className="relative p-6 rounded-xl border border-editor-border bg-editor-panel/50 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-editor-glow.purple/5 via-transparent to-editor-glow.pink/5 rounded-xl" />
          <div className="relative space-y-6">
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Basic</h3>
              <p className="text-sm text-gray-400">Perfect for getting started</p>
            </div>
            
            <PriceDisplay 
              price={9.99} 
              billingNote="Billed annually, or monthly for US$ 14.99"
            />
            
            <div className="pt-4 border-t border-editor-border">
              <FeatureList features={basicFeatures} />
            </div>
            
            <Button 
              className="w-full bg-editor-accent hover:bg-editor-accent/80 text-sm py-6 rounded-xl"
              onClick={() => handlePlanSelect(true)}
            >
              Try Free
            </Button>
          </div>
        </div>

        {/* MAX Plan */}
        <div className="relative p-6 rounded-xl border-2 border-editor-accent bg-editor-panel/50 backdrop-blur-xl transform scale-105 shadow-2xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-editor-accent text-white border-none px-4 py-1">
              MOST POPULAR
            </Badge>
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-editor-glow.purple/10 via-transparent to-editor-glow.pink/10 rounded-xl" />
          <div className="relative space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">MAX</h3>
                <Bird className="w-5 h-5 text-editor-accent" />
              </div>
              <p className="text-sm text-gray-400">For professional creators</p>
            </div>
            
            <PriceDisplay 
              price={69.99} 
              billingNote="Billed annually"
            />
            
            <div className="pt-4 border-t border-editor-border">
              <FeatureList features={maxFeatures} />
            </div>
            
            <Button 
              className="w-full bg-editor-accent hover:bg-editor-accent/80 text-sm py-6 rounded-xl"
              onClick={() => handlePlanSelect()}
            >
              Get Started
            </Button>
          </div>
        </div>

        {/* Business Plan */}
        <div className="relative p-6 rounded-xl border border-editor-border bg-editor-panel/50 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-editor-glow.purple/5 via-transparent to-editor-glow.pink/5 rounded-xl" />
          <div className="relative space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Business</h3>
                <Bird className="w-5 h-5 text-yellow-400" />
              </div>
              <p className="text-sm text-gray-400">For teams and enterprises</p>
            </div>
            
            <PriceDisplay 
              price={99.99} 
              billingNote="Billed annually"
            />
            
            <div className="pt-4 border-t border-editor-border">
              <FeatureList features={businessFeatures} />
            </div>
            
            <Button 
              className="w-full bg-editor-accent hover:bg-editor-accent/80 text-sm py-6 rounded-xl"
              onClick={() => handlePlanSelect()}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PricingPlans;