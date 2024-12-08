import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const { theme } = useTheme();
  
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 10000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
    >
      <div className="relative w-full max-w-7xl mx-auto">
        <AspectRatio ratio={16/9} className="overflow-hidden">
          <img
            src="/lovable-uploads/e2c0ab7b-c4f0-418d-9d71-1c673bfddabe.png"
            alt="Wedding Editor Intro"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-6 p-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 1.6 }}
              className="text-center space-y-6"
            >
              <div>
                <p className="text-xs md:text-sm text-gray-400 tracking-[0.2em] mb-1">POWERED BY ARTIFICIAL INTELLIGENCE</p>
                <h2 className="text-lg md:text-xl text-gray-300 tracking-widest font-light mb-2">QZ TEMPLATEZ PRESENTS</h2>
                <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  PROFESSIONAL WEDDING
                  <br />
                  CINEMATOGRAPHY SUITE
                </h1>
                <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-white to-transparent my-6" />
                <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide">
                  ADVANCED AI-DRIVEN EDITING SUITE
                </p>
                <p className="text-xs md:text-sm text-gray-400 mt-4 tracking-wider">OPTIMIZED FOR PROFESSIONAL WEDDING CINEMATOGRAPHY</p>
                <p className="text-xs md:text-sm text-gray-400 tracking-wider">REAL-TIME RENDERING • AI COLOR GRADING • SMART TRANSITIONS</p>
              </div>
              <p className="text-sm text-gray-400 tracking-wider mt-8">VERSION 7.12 • 2025</p>
              <p className="text-[10px] text-gray-500 tracking-wider">LOADING PROFESSIONAL EDITING ENVIRONMENT...</p>
            </motion.div>
            
            <div className="w-full max-w-md h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
                initial={{ scaleX: 0, x: "-100%" }}
                animate={{ 
                  scaleX: 1, 
                  x: "0%",
                  background: [
                    "linear-gradient(to right, #ec4899, #8b5cf6, #ec4899)",
                    "linear-gradient(to right, #8b5cf6, #ec4899, #8b5cf6)",
                    "linear-gradient(to right, #ec4899, #8b5cf6, #ec4899)"
                  ]
                }}
                transition={{ 
                  duration: 10,
                  ease: "linear",
                  background: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            </div>
          </div>
        </AspectRatio>
      </div>
    </motion.div>
  );
};

export default IntroScreen;