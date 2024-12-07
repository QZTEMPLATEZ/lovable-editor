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
    <div className="space-y-8 w-full max-w-6xl mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 rounded-2xl p-8 backdrop-blur-lg border border-purple-500/30 shadow-2xl overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-pink-500/10" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-500/20 to-transparent" />
        
        <div className="relative space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-purple-400 tracking-tight">
              Preview Your Creation
            </h2>
            <p className="text-gray-400 text-center text-sm tracking-wide uppercase">
              Review and approve your video
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-xl overflow-hidden shadow-2xl border border-purple-500/20"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-4 pt-4"
          >
            <Button
              onClick={onApprove}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-6 rounded-xl flex items-center gap-2 shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-105"
            >
              <Check className="w-5 h-5" />
              <span className="font-medium tracking-wide">Approve</span>
            </Button>
            
            <Button
              onClick={onRequestChanges}
              className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-6 py-6 rounded-xl flex items-center gap-2 shadow-lg shadow-purple-500/20 transition-all duration-300 hover:scale-105"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium tracking-wide">Request Changes</span>
            </Button>
            
            <Button
              onClick={onReject}
              className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white px-6 py-6 rounded-xl flex items-center gap-2 shadow-lg shadow-red-500/20 transition-all duration-300 hover:scale-105"
            >
              <X className="w-5 h-5" />
              <span className="font-medium tracking-wide">Reject</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PreApprovalView;