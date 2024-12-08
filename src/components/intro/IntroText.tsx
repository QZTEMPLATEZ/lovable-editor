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
      <motion.h2 
        className="text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-editor-accent to-purple-400"
        animate={{ 
          backgroundPosition: ["0%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        {text}
      </motion.h2>
    </motion.div>
  );
};

export default IntroText;