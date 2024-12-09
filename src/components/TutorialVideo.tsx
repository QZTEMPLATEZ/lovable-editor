import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';

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
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center space-x-2 bg-black/50 rounded-lg px-3 py-2">
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
          </div>
          
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/txBOuZWJcXg?autoplay=1&controls=0&rel=0&showinfo=0&modestbranding=1&enablejsapi=1"
              title="Tutorial Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              onEnded={handleVideoEnded}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialVideo;