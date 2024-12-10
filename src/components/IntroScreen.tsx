import React from 'react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 6000); // Increased from 4000 to 6000ms
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-editor-bg relative overflow-hidden">
      {/* Image Container */}
      <div className="relative w-full h-screen">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }} // Increased from 0.5 to 1.5s for slower fade in
          className="absolute inset-0"
        >
          <img
            src="/lovable-uploads/0b0a1a52-7179-4dab-b802-5585b8e202fe.png"
            alt="OSÍRIZ EDITION"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-editor-bg via-transparent to-transparent" />
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
                    duration: 5.5, // Increased from 3.5 to 5.5s
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
  );
};

export default IntroScreen;