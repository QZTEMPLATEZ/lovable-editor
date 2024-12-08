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
    const timer = setTimeout(onComplete, 5000); // Extended to 5 seconds
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
            src="/lovable-uploads/32ed6cd5-489f-4f20-849f-f03c97b8994a.png"
            alt="Wedding Editor Intro"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-2 p-4">
            {/* Futuristic loading bar container */}
            <div className="w-full max-w-md h-1.5 bg-black/20 backdrop-blur-sm rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                initial={{ scaleX: 0, x: "-100%" }}
                animate={{ 
                  scaleX: 1, 
                  x: "0%",
                  background: [
                    "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
                    "linear-gradient(to right, #ec4899, #3b82f6, #8b5cf6)",
                    "linear-gradient(to right, #8b5cf6, #ec4899, #3b82f6)"
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
            
            {/* Animated dots */}
            <motion.div 
              className="flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 bg-white/50 rounded-full"
                  animate={{ 
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </div>
        </AspectRatio>
      </div>
    </motion.div>
  );
};

export default IntroScreen;