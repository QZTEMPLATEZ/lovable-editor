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
    const timer = setTimeout(onComplete, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full max-w-7xl mx-auto">
        <AspectRatio ratio={16/9} className="overflow-hidden">
          <img
            src="/lovable-uploads/69458f16-0038-42f9-a188-fdd128045605.png"
            alt="Wedding Editor Intro"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-4 p-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">QZ TEMPLATEZ</h1>
              <p className="text-xl md:text-2xl text-gray-200">AI-POWERED WEDDING EDITOR</p>
              <p className="text-sm text-gray-300 mt-2">VERSION 7.12 • 2025</p>
            </motion.div>
            
            {/* Futuristic loading bar */}
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
                  duration: 5,
                  ease: "linear",
                  background: {
                    duration: 2,
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