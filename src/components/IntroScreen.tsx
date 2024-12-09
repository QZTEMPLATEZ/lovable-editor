import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Sparkles } from 'lucide-react';

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
            src="/lovable-uploads/c924af7f-305d-40de-aadf-110a0bc2f001.png"
            alt="Wedding Editor Intro"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.6 }}
              className="text-center space-y-12"
            >
              <div className="relative space-y-6">
                <Sparkles className="absolute -top-8 right-0 w-6 h-6 text-pink-400 animate-pulse" />
                
                <h2 className="font-['Montserrat'] text-xl md:text-2xl text-pink-200 font-light tracking-wider mb-4">
                  ARTISTIC AI EDITOR PRO FOR WEDDINGS
                </h2>
                
                <h1 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  WEDDING TEMPLATEZ
                </h1>
                
                <div className="space-y-2 opacity-80">                  
                  <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-pink-300 to-transparent" />
                  
                  <p className="font-['Montserrat'] text-sm md:text-base text-gray-300 font-light tracking-wider">
                    AI-Powered Wedding Video Suite
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="absolute bottom-16 w-full max-w-md">
              <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
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
              <p className="font-['Montserrat'] text-xs text-pink-300/70 tracking-widest mt-4">
                INITIALIZING YOUR CREATIVE SUITE
              </p>
            </div>
          </div>
        </AspectRatio>
      </div>
    </motion.div>
  );
};

export default IntroScreen;