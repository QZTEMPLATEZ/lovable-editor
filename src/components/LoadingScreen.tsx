import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [showText, setShowText] = useState(false);
  const [showLoadingBar, setShowLoadingBar] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1000);
    const loadingTimer = setTimeout(() => setShowLoadingBar(true), 2000);
    const completeTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 4000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(loadingTimer);
      clearTimeout(completeTimer);
    };
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
              
              <AnimatePresence>
                {showText && (
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="p-8 backdrop-blur-lg bg-black/50 rounded-3xl border border-pink-500/20">

                      <motion.h1 
                        className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-rose-300 mb-4"
                      >
                        Professional Wedding Video Editor
                      </motion.h1>
                      <motion.h2 
                        className="text-xl md:text-2xl font-light text-gray-200 mb-2"
                      >
                        Powered by AI Smart Editor
                      </motion.h2>
                      <motion.p 
                        className="text-lg text-gray-300 mb-6 tracking-wide"
                      >
                        WEDDING TEMPLATEZ
                      </motion.p>

                      {showLoadingBar && (
                        <motion.div
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="relative"
                        >
                          <div className="h-0.5 w-64 bg-pink-500/20 rounded-full overflow-hidden mx-auto">
                            <motion.div
                              className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500"
                              initial={{ x: '-100%' }}
                              animate={{ x: '100%' }}
                              transition={{
                                duration: 2,
                                repeat: 1,
                                ease: 'linear'
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
