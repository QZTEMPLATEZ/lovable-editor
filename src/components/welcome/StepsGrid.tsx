import { motion } from 'framer-motion';

const steps = [
  { step: 1, title: "Upload", desc: "Upload your raw footage" },
  { step: 2, title: "Style", desc: "Choose editing style" },
  { step: 3, title: "Music", desc: "Pick perfect soundtrack" },
  { step: 4, title: "AI Edit", desc: "Let AI create first draft" },
  { step: 5, title: "Refine", desc: "Fine-tune to perfection" }
];

const StepsGrid = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {steps.map((item) => (
        <motion.div
          key={item.step}
          className="bg-editor-panel p-4 rounded-lg border border-editor-border/30 hover:border-editor-accent/30 transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: item.step * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-medium text-editor-accent">
              {item.step.toString().padStart(2, '0')}
            </span>
            <h3 className="text-purple-200">{item.title}</h3>
          </div>
          <p className="text-sm text-editor-text/70">{item.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StepsGrid;