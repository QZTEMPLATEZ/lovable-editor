import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-editor-bg flex items-center justify-center z-50"
        >
          <div className="text-center space-y-6 max-w-7xl mx-auto p-8 relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-full h-[80vh] relative overflow-hidden rounded-2xl">
                <img
                  src="/lovable-uploads/862aebf7-0d0b-4881-add7-261b860643d5.png"
                  alt="Wedding Video Editor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-editor-bg via-transparent to-transparent" />
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="p-8 backdrop-blur-lg bg-black/30 rounded-3xl border border-pink-500/20"
                >
                  <motion.h1 
                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300 mb-4"
                  >
                    WEDDING TEMPLATEZ VIDEO EDITOR
                  </motion.h1>
                  <motion.p 
                    className="text-gray-300 mb-6"
                  >
                    AI-Powered Professional Wedding Video Editing
                  </motion.p>
                  
                  {/* Futuristic Loading Bar */}
                  <div className="relative w-64 h-1 bg-pink-500/20 rounded-full overflow-hidden mx-auto">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;