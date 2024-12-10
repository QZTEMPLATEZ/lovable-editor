import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface TutorialVideoProps {
  onComplete: () => void;
  videoUrl?: string;
}

const TutorialVideo = ({ onComplete, videoUrl = 'https://www.youtube.com/embed/txBOuZWJcXg' }: TutorialVideoProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);

  const handleComplete = () => {
    if (dontShowAgain) {
      localStorage.setItem('skipTutorial', 'true');
    }
    onComplete();
  };

  // Convert regular YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`;
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
                src={getEmbedUrl(videoUrl)}
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
                
                <div className="flex gap-4">
                  <Button
                    onClick={handleComplete}
                    variant="ghost"
                    className="text-purple-200 hover:text-purple-100"
                  >
                    Skip Tutorial
                  </Button>
                  <Button
                    onClick={handleComplete}
                    variant="secondary"
                    className="bg-editor-accent hover:bg-editor-accent/80 text-white"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialVideo;