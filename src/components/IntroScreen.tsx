import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const { theme } = useTheme();
  
  React.useEffect(() => {
    const timer = setTimeout(onComplete, 10000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0 }}
    >
      <div className="relative w-full max-w-7xl mx-auto">
        <AspectRatio ratio={16/9} className="overflow-hidden">
          <img
            src="/lovable-uploads/e2c0ab7b-c4f0-418d-9d71-1c673bfddabe.png"
            alt="Wedding Editor Intro"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-8 p-16">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.6 }}
              className="text-center space-y-8"
            >
              <div>
                <p className="text-sm md:text-base text-gray-400 tracking-[0.3em] uppercase mb-4">The Art of Cinematic Storytelling</p>
                <h2 className="text-xl md:text-2xl text-gray-300 tracking-widest font-light mb-3">QZ TEMPLATEZ PRESENTS</h2>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
                  WEDDING CINEMA
                  <br />
                  ARTISTRY SUITE
                </h1>
                <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-white to-transparent my-8" />
                <p className="text-xl md:text-2xl text-gray-200 font-light tracking-wide italic mb-8">
                  "Where Every Frame Tells Your Story"
                </p>
                <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                  Embark on a journey where artificial intelligence meets artistic vision, 
                  crafting wedding films that transcend traditional videography. 
                  Our suite combines cutting-edge AI technology with timeless cinematographic principles 
                  to create breathtaking narratives that capture the essence of your special day.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
                  <div className="space-y-2">
                    <h3 className="text-purple-300 text-lg font-semibold">Artistic Vision</h3>
                    <p className="text-gray-400 text-sm">Blending contemporary aesthetics with timeless storytelling techniques</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-purple-300 text-lg font-semibold">Technical Excellence</h3>
                    <p className="text-gray-400 text-sm">AI-powered color grading and composition enhancement</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-purple-300 text-lg font-semibold">Emotional Impact</h3>
                    <p className="text-gray-400 text-sm">Intelligent moment detection for perfect emotional timing</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="w-full max-w-md h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                initial={{ scaleX: 0, x: "-100%" }}
                animate={{ 
                  scaleX: 1, 
                  x: "0%",
                  background: [
                    "linear-gradient(to right, #8b5cf6, #ec4899, #8b5cf6)",
                    "linear-gradient(to right, #ec4899, #8b5cf6, #ec4899)",
                    "linear-gradient(to right, #8b5cf6, #ec4899, #8b5cf6)"
                  ]
                }}
                transition={{ 
                  duration: 10,
                  ease: "linear",
                  background: {
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              />
            </div>
            <p className="text-xs text-gray-500 tracking-wider">INITIALIZING ARTISTIC VISION • PREPARING CREATIVE ENVIRONMENT</p>
          </div>
        </AspectRatio>
      </div>
    </motion.div>
  );
};

export default IntroScreen;