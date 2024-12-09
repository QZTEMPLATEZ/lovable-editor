import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface WelcomeHeaderProps {
  greeting: string;
}

const WelcomeHeader = ({ greeting }: WelcomeHeaderProps) => {
  return (
    <motion.div 
      className="text-center mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 inline-flex items-center gap-2 mb-4">
        {greeting}
        <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
      </h1>
      <p className="text-editor-text/80 max-w-2xl mx-auto">
        Create stunning wedding videos with our AI-powered editor
      </p>
    </motion.div>
  );
};

export default WelcomeHeader;