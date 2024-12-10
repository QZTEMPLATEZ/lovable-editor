import React from 'react';
import { Crown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface ReferenceVideoBannerProps {
  onFileInputClick: () => void;
}

const ReferenceVideoBanner = ({ onFileInputClick }: ReferenceVideoBannerProps) => {
  return (
    <div className="w-full bg-editor-bg border-t border-editor-border mt-20">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-editor-panel/50 border border-editor-border">
              <Crown className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-300">Business Plan Feature</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-cinzel bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              The perfect plan to fit your needs
            </h2>
            
            <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
              For brands, creative teams, agencies, and everything in between. 
              Get unlimited assets and a license that covers your business.
            </p>

            <div className="flex gap-4">
              <Button
                onClick={onFileInputClick}
                className="bg-white text-black hover:bg-gray-100 px-8"
              >
                See Plans
              </Button>
              <Button
                variant="outline"
                onClick={onFileInputClick}
                className="border-white/20 hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Decorative Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative aspect-square hidden md:block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-editor-glow-purple/20 via-editor-glow-pink/10 to-editor-glow-blue/20 rounded-3xl" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReferenceVideoBanner;