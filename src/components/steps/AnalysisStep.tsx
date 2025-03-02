
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AnalysisStepProps {
  analysisProgress: number;
  matchingProgress: number;
  rawFilesCount: number;
  onContinue: () => void;
}

const AnalysisStep: React.FC<AnalysisStepProps> = ({
  analysisProgress,
  matchingProgress,
  rawFilesCount,
  onContinue
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-purple-200">Analyzing & Matching</h2>
        
        <div className="space-y-8">
          {/* Reference Video Analysis */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-purple-200">
                Analyzing Reference Video
              </h3>
              <span className="text-sm text-purple-300">
                {analysisProgress < 100 ? `${analysisProgress}%` : 'Complete'}
              </span>
            </div>
            <Progress value={analysisProgress} className="h-2 bg-purple-900/30" />
            {analysisProgress === 100 && (
              <div className="p-3 bg-purple-900/20 rounded-lg">
                <p className="text-sm text-purple-200">✓ Identified scenes in reference video</p>
                <p className="text-sm text-purple-200">✓ Detected wedding event categories</p>
                <p className="text-sm text-purple-200">✓ Analyzed transitions and timing</p>
              </div>
            )}
          </div>
          
          {/* Raw Footage Analysis & Matching */}
          {analysisProgress === 100 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-purple-200">
                  Matching Raw Footage
                </h3>
                <span className="text-sm text-purple-300">
                  {matchingProgress < 100 ? `${matchingProgress}%` : 'Complete'}
                </span>
              </div>
              <Progress value={matchingProgress} className="h-2 bg-purple-900/30" />
              {matchingProgress > 0 && (
                <div className="p-3 bg-purple-900/20 rounded-lg">
                  <p className="text-sm text-purple-200">
                    Processed {Math.min(rawFilesCount, Math.ceil(rawFilesCount * matchingProgress / 100))} of {rawFilesCount} raw files
                  </p>
                  {matchingProgress > 30 && matchingProgress < 70 && (
                    <p className="text-sm text-purple-200">Categorizing footage and finding best matches...</p>
                  )}
                  {matchingProgress === 100 && (
                    <>
                      <p className="text-sm text-purple-200">✓ All raw footage categorized</p>
                      <p className="text-sm text-purple-200">✓ Best matches found for reference scenes</p>
                      <p className="text-sm text-purple-200">✓ Ready to export project</p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
        {matchingProgress === 100 && (
          <Button 
            className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
            onClick={onContinue}
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Continue to Export
          </Button>
        )}
      </Card>
    </motion.div>
  );
};

export default AnalysisStep;
