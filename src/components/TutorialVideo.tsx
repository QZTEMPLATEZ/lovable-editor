import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';

interface TutorialVideoProps {
  onComplete: () => void;
}

const TutorialVideo = ({ onComplete }: TutorialVideoProps) => {
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { toast } = useToast();

  const handleSkip = () => {
    if (dontShowAgain) {
      localStorage.setItem('skipTutorial', 'true');
      toast({
        title: "Tutorial preferences saved",
        description: "The tutorial will not be shown again",
      });
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
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/UJAUV_D5ynQ?modestbranding=1&showinfo=0&rel=0"
              title="QZ TEMPLATEZ Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          
          <div className="absolute top-4 right-4">
            <Button
              variant="secondary"
              onClick={handleSkip}
              className="bg-black/50 hover:bg-black/70 text-white"
            >
              Skip Tutorial
            </Button>
          </div>
          
          <div className="p-4 bg-black/50 absolute bottom-0 left-0 right-0 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="dontShowAgain"
                checked={dontShowAgain}
                onCheckedChange={(checked) => setDontShowAgain(checked as boolean)}
              />
              <label
                htmlFor="dontShowAgain"
                className="text-sm text-white cursor-pointer"
              >
                Don't show this again
              </label>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialVideo;