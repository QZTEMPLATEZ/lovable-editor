import { motion } from 'framer-motion';

const WaveformAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 mx-0.5 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full"
          initial={{ height: 20 }}
          animate={{ 
            height: [20, 40, 20],
            backgroundColor: ['#9b87f5', '#d946ef', '#9b87f5']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default WaveformAnimation;