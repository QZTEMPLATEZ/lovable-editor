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
    const timer = setTimeout(onComplete, 3000); // Set to exactly 3 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="relative z-10 w-full max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <AspectRatio ratio={16/9} className="overflow-hidden rounded-2xl">
            <img
              src="/lovable-uploads/862aebf7-0d0b-4881-add7-261b860643d5.png"
              alt="Wedding Video Editor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-editor-bg via-transparent to-transparent" />
          </AspectRatio>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-8 backdrop-blur-lg bg-black/30 rounded-3xl border border-pink-500/20"
            >
              <motion.h1 
                className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300 mb-2"
              >
                QZ TEMPLATEZ
              </motion.h1>
              <motion.p 
                className="text-lg text-gray-300 tracking-wider uppercase"
              >
                Wedding Smart Templates
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default IntroScreen;