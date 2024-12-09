import { motion } from 'framer-motion';

const StepsGrid = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
    </motion.div>
  );
};

export default StepsGrid;