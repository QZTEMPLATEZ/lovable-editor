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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
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
              src="/lovable-uploads/c924af7f-305d-40de-aadf-110a0bc2f001.png"
              alt="Wedding Editor Intro"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-16">
            <motion.div
              variants={containerVariants}
              className="text-center space-y-12"
            >
              <motion.div variants={itemVariants} className="relative space-y-6">
                <motion.h2 
                  className="font-['Montserrat'] text-xl md:text-2xl text-pink-200 font-light tracking-wider mb-4"
                  variants={itemVariants}
                >
                  ARTISTIC AI EDITOR PRO FOR WEDDINGS
                </motion.h2>
                
                <motion.h1 
                  className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
                  variants={itemVariants}
                >
                  WEDDING TEMPLATEZ
                </motion.h1>
                
                <motion.div 
                  className="space-y-2 opacity-80"
                  variants={itemVariants}
                >                  
                  <motion.div 
                    className="h-px w-16 mx-auto"
                    initial={{ width: 0 }}
                    animate={{ width: "4rem" }}
                    transition={{ duration: 1, delay: 1.5 }}
                    style={{
                      background: "linear-gradient(90deg, transparent, #fff, transparent)"
                    }}
                  />
                  
                  <motion.p 
                    className="font-['Montserrat'] text-sm md:text-base text-gray-300 font-light tracking-wider"
                    variants={itemVariants}
                  >
                    AI-Powered Wedding Video Suite
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="absolute bottom-16 w-full max-w-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full"
                  initial={{ scaleX: 0, x: "-100%" }}
                  animate={{ 
                    scaleX: 1, 
                    x: "0%"
                  }}
                  transition={{ 
                    duration: 10,
                    ease: "linear"
                  }}
                  style={{
                    background: "linear-gradient(90deg, #9b87f5, #D946EF, #9b87f5)",
                    backgroundSize: "200% 100%"
                  }}
                />
              </div>
            </motion.div>
          </div>
        </AspectRatio>
      </div>
    </motion.div>
  );
};

export default IntroScreen;