
import { motion } from 'framer-motion';

const EmptyState = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 text-center"
    >
      <div className="bg-[#232323] rounded-lg p-8 border border-[#3F3F3F] shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-[#E8E8E8]">Organize seus Clipes</h2>
        <p className="text-[#B8B8B8] mb-4">
          Selecione alguns arquivos para começar a organização automática.
        </p>
      </div>
    </motion.div>
  );
};

export default EmptyState;
