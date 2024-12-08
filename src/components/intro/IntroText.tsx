import { motion } from 'framer-motion';

interface IntroTextProps {
  text: string;
  delay?: number;
  className?: string;
}

const IntroText = ({ text, delay = 0, className = "" }: IntroTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      <motion.div 
        className="relative overflow-hidden"
      >
        <motion.h2 
          className="text-4xl font-light tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white/80 to-white/40"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            delay: delay + 0.2
          }}
        >
          {text}
        </motion.h2>
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.5, duration: 0.8 }}
        />
      </motion.div>
      <motion.div
        className="mt-1 h-[1px] w-0 bg-white/10"
        animate={{ width: "100%" }}
        transition={{ delay: delay + 0.8, duration: 1 }}
      />
    </motion.div>
  );
};

export default IntroText;