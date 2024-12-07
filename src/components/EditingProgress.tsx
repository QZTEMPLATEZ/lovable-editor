import React from 'react';
import { motion } from 'framer-motion';

interface EditingProgressProps {
  videoFiles: File[];
  progress: number;
}

const EditingProgress = ({ videoFiles, progress }: EditingProgressProps) => {
  return (
    <div className="space-y-8 w-full max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videoFiles.map((file, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative rounded-lg overflow-hidden group"
          >
            <video 
              src={URL.createObjectURL(file)} 
              className="w-full h-48 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white text-sm truncate">{file.name}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-editor-timeline/40 rounded-xl p-6 backdrop-blur-md border border-purple-500/20">
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-400">
            <span>Processing videos...</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-purple-500/20 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="h-1 bg-purple-500/20 rounded-full overflow-hidden"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.2
                }}
              >
                <div className="h-full w-full bg-purple-500/50" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditingProgress;