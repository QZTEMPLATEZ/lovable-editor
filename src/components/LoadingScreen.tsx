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
            {/* Corner Flag */}
            <div className="absolute top-0 right-0 bg-gradient-to-bl from-purple-500/20 to-transparent p-4 rounded-bl-3xl">
              <span className="text-sm font-medium text-purple-300">QZ TEMPLATEZ</span>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="w-full h-[80vh] relative overflow-hidden rounded-2xl">
                <img
                  src="/lovable-uploads/d5e6e89d-8f9e-4d89-b4b8-97dd63c74c53.png"
                  alt="AI Video Editor"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-editor-bg via-transparent to-transparent" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-8 backdrop-blur-lg bg-black/30 rounded-3xl border border-purple-500/20">
                  <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 mb-4">
                    QZ TEMPLATEZ VIDEO EDITOR
                  </h1>
                  <p className="text-gray-300 mb-6">AI-Powered Professional Video Editing</p>
                  <div className="w-64 h-1.5 mx-auto bg-purple-500/20 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;