import React from 'react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-editor-bg flex items-center justify-center z-50">
      <div className="max-w-4xl w-full mx-auto p-6">
        {/* Image Container with aspect ratio matching tutorial video */}
        <div className="relative rounded-lg overflow-hidden bg-editor-bg border border-editor-border">
          <div className="aspect-video w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
              className="w-full h-full"
            >
              <img
                src="/lovable-uploads/70f81722-0ff6-4bd0-966a-ea1b5e93c680.png"
                alt="OSÍRIZ EDITION"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>

          {/* Futuristic Loading Bar */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md">
            <div className="glass-panel p-4 rounded-xl backdrop-blur-xl border border-editor-glow-purple/20">
              <div className="relative">
                <div className="h-1.5 bg-editor-glass-dark rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 5.5,
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;