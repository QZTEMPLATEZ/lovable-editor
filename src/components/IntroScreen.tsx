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
    const timer = setTimeout(onComplete, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="relative w-full max-w-7xl mx-auto">
        <AspectRatio ratio={16/9} className="overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src="/lovable-uploads/ceaa41bb-a4c4-4b1f-a64a-7a78bd7011c4.png"
              alt="Artistic Wedding Portrait"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <motion.div 
            className="absolute top-1/4 left-8 text-white space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <h1 className="text-6xl font-artistic text-pink-300">Wedding Dreams</h1>
            <div className="text-xl text-pink-200/90 font-light tracking-wider space-y-2">
              <p className="font-artistic">Where Dreams Come True</p>
              <p className="text-sm uppercase tracking-[0.2em]">Professional Wedding Video Editor</p>
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-16 left-8 text-white space-y-4 max-w-lg"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            <h2 className="text-2xl font-artistic text-pink-300">Capture Your Love Story</h2>
            <p className="text-sm text-pink-200/80 leading-relaxed">
              Transform your precious moments into timeless memories with our professional 
              wedding video editing service. Let us tell your unique love story.
            </p>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-8 w-full max-w-md mx-auto px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400"
                initial={{ scaleX: 0, x: "-100%" }}
                animate={{ scaleX: 1, x: "0%" }}
                transition={{ duration: 6, ease: "linear" }}
              />
            </div>
          </motion.div>
        </AspectRatio>
      </div>
    </motion.div>
  );
};

export default IntroScreen;