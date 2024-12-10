import React from 'react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-editor-bg relative overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src="/lovable-uploads/d5e27b14-ae6c-4a12-8420-a543cf67665b.png"
            alt="Wedding Dress"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-editor-bg via-transparent to-transparent" />
        </motion.div>

        {/* Text Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue animate-gradient">
            Unlimited AI Wedding Editor
          </h1>
        </motion.div>

        {/* Futuristic Loading Bar */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 max-w-[90%]">
          <div className="glass-panel p-6 rounded-2xl backdrop-blur-xl border border-editor-glow-purple/20">
            <div className="relative">
              <div className="h-1.5 bg-editor-glass-dark rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 3.5,
                    ease: "easeInOut"
                  }}
                />
              </div>
              
              {/* Loading Glow Effect */}
              <motion.div
                className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["0%", "100%"],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            
            <div className="mt-3 text-center">
              <motion.p 
                className="text-sm text-editor-text/90 font-light tracking-wider"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Initializing your wedding editor...
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;