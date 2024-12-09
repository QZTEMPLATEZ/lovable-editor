import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface TutorialVideoProps {
  onComplete: () => void;
}

const TutorialVideo = ({ onComplete }: TutorialVideoProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleVideoEnded = () => {
    if (dontShowAgain) {
      localStorage.setItem('skipTutorial', 'true');
    }
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
    >
      <div className="max-w-4xl w-full mx-auto p-6">
        <div className="relative rounded-lg overflow-hidden bg-editor-bg border border-editor-border">
          <div className="flex flex-col">
            {/* Video Container */}
            <div className="aspect-video w-full bg-editor-panel">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/txBOuZWJcXg?autoplay=1&enablejsapi=1"
                title="Tutorial Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            
            {/* Controls Footer */}
            <div className="p-4 bg-editor-panel/50 backdrop-blur-sm border-t border-editor-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dontShowAgain"
                    checked={dontShowAgain}
                    onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
                    className="border-purple-500/50"
                  />
                  <label
                    htmlFor="dontShowAgain"
                    className="text-sm text-purple-200 cursor-pointer select-none"
                  >
                    Don't show again
                  </label>
                </div>
                
                <Button
                  onClick={onComplete}
                  variant="secondary"
                  className="bg-editor-accent hover:bg-editor-accent/80 text-white"
                >
                  Skip Tutorial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialVideo;