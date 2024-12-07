import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check, X, RefreshCw } from 'lucide-react';

interface PreApprovalViewProps {
  videoUrl: string;
  onApprove: () => void;
  onReject: () => void;
  onRequestChanges: () => void;
}

const PreApprovalView = ({ videoUrl, onApprove, onReject, onRequestChanges }: PreApprovalViewProps) => {
  return (
    <div className="space-y-8 w-full max-w-6xl mx-auto">
      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/30 shadow-2xl">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
            Preview Your Video
          </h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative aspect-video rounded-xl overflow-hidden"
          >
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={onApprove}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Approve
            </Button>
            
            <Button
              onClick={onRequestChanges}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Request Changes
            </Button>
            
            <Button
              onClick={onReject}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Reject
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreApprovalView;