import React from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const EditingInterface = () => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-editor-panel rounded-xl p-6 border border-purple-500/20"
      >
        <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
          Project Settings
        </h2>

        <Alert className="mb-4 bg-purple-500/10 border-purple-500/30">
          <AlertCircle className="h-4 w-4 text-purple-400" />
          <AlertDescription className="text-purple-200">
            Configure your project settings before proceeding to organization.
          </AlertDescription>
        </Alert>
      </motion.div>
    </div>
  );
};

export default EditingInterface;