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
    const timer = setTimeout(onComplete, 6000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-editor-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="relative w-full max-w-7xl mx-auto">
        <AspectRatio ratio={16/9} className="overflow-hidden">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src="/lovable-uploads/8d72e406-120c-4cf2-bcc4-c345954f8e83.png"
              alt="Wedding Editor Intro"
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <motion.div 
            className="absolute top-8 left-8 text-white space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <h1 className="text-4xl font-bold text-pink-400">WEDDING TEMPLATEZ</h1>
            <div className="text-lg text-pink-300/80 font-light tracking-wider">
              <p>ヴァンメムでさす たヴタ.モヴ゜</p>
              <p>ふみンナ-ナオョベ゜</p>
              <p>タフ'キチ.カセダ</p>
            </div>
          </motion.div>

          <motion.div 
            className="absolute bottom-16 left-8 text-white space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            <h2 className="text-2xl font-medium text-pink-400">VIDEO VIIDO SUIITE</h2>
            <div className="text-lg text-pink-300/80 font-light tracking-wider">
              <p>阪伊系災力ホカル</p>
              <p>アヴイニフバンシイプ</p>
              <p>雨屋姿互高奈ホ示父</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-16 w-full max-w-md mx-auto px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full"
                initial={{ scaleX: 0, x: "-100%" }}
                animate={{ 
                  scaleX: 1, 
                  x: "0%"
                }}
                transition={{ 
                  duration: 6,
                  ease: "linear"
                }}
                style={{
                  background: "linear-gradient(90deg, #9b87f5, #D946EF, #9b87f5)",
                  backgroundSize: "200% 100%"
                }}
              />
            </div>
          </motion.div>
        </AspectRatio>
      </div>
    </motion.div>
  );
};

export default IntroScreen;