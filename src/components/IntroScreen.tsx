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

        {/* Futuristic Loading Bar */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 max-w-[90%]">
          <div className="glass-panel p-4 rounded-xl">
            <div className="h-1 bg-editor-glass-dark rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-editor-glow-purple via-editor-glow-pink to-editor-glow-blue"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 3.5,
                  ease: "linear"
                }}
              />
            </div>
            <div className="mt-2 text-center text-sm text-editor-text/80">
              Loading your wedding editor...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroScreen;