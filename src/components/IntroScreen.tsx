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
    const timer = setTimeout(onComplete, 8000);
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
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.6 }}
              className="text-center"
            >
              <motion.p
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="font-['Montserrat'] text-sm tracking-[0.3em] text-purple-300/80 uppercase mb-6"
              >
                Powered by AI Smart Editor
              </motion.p>
              <h1 className="font-['Playfair_Display'] text-6xl md:text-7xl font-light text-white mb-4 tracking-tight">
                Wedding Editor Pro
              </h1>
              <div className="h-px w-32 mx-auto bg-white/20 my-6" />
              <p className="font-['Montserrat'] text-lg text-gray-300 font-light tracking-wider uppercase">
                AI Video Suite
              </p>
            </motion.div>
            
            <motion.div 
              className="w-full max-w-xs h-0.5 bg-white/10 rounded-full overflow-hidden mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div 
                className="h-full bg-white/30"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ 
                  duration: 7,
                  ease: "linear"
                }}
              />
            </motion.div>
          </div>
        </AspectRatio>
      </div>
    </motion.div>
  );
};

export default IntroScreen;