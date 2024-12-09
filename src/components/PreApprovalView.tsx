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
        className="relative bg-editor-glass.dark backdrop-blur-xl rounded-2xl p-8 border border-editor-border shadow-2xl overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-editor-glow.purple/10 via-editor-glow.pink/5 to-editor-glow.blue/10" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-editor-glow.purple/20 to-transparent blur-2xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-editor-glow.pink/20 to-transparent blur-2xl" />
        
        <div className="relative space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 text-center"
          >
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-editor-glow.purple via-editor-glow.pink to-editor-glow.blue animate-gradient">
              Preview Your Creation
            </h2>
            <div className="flex items-center justify-center gap-2 text-editor-text">
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-editor-glow.purple/50 to-transparent" />
              <p className="text-sm tracking-wide uppercase">Review and approve your video</p>
              <div className="h-1 w-12 bg-gradient-to-r from-transparent via-editor-glow.purple/50 to-transparent" />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="relative rounded-xl overflow-hidden shadow-2xl border border-editor-border"
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
            className="flex items-center justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onApprove}
                className="relative group px-8 py-6 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-green-500/20 group-hover:bg-green-500/30 backdrop-blur-sm transition-colors" />
                <div className="relative flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span className="font-medium tracking-wide">Approve</span>
                </div>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onRequestChanges}
                className="relative group px-8 py-6 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-editor-glow.purple to-editor-glow.pink opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-purple-500/20 group-hover:bg-purple-500/30 backdrop-blur-sm transition-colors" />
                <div className="relative flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  <span className="font-medium tracking-wide">Request Changes</span>
                </div>
              </Button>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={onReject}
                className="relative group px-8 py-6 rounded-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 bg-red-500/20 group-hover:bg-red-500/30 backdrop-blur-sm transition-colors" />
                <div className="relative flex items-center gap-2">
                  <X className="w-5 h-5" />
                  <span className="font-medium tracking-wide">Reject</span>
                </div>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PreApprovalView;