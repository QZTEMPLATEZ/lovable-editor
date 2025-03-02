
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
      <Card className="p-6 bg-black border border-gray-800 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-white">Analyzing & Matching</h2>
        
        <div className="space-y-8">
          {/* Reference Video Analysis */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-white">
                Analyzing Reference Video
              </h3>
              <span className="text-sm text-gray-400">
                {analysisProgress < 100 ? `${analysisProgress}%` : 'Complete'}
              </span>
            </div>
            <Progress value={analysisProgress} className="h-2 bg-gray-900" />
            {analysisProgress === 100 && (
              <div className="p-3 bg-gray-900 rounded-lg border border-gray-800">
                <p className="text-sm text-gray-300">✓ Identified scenes in reference video</p>
                <p className="text-sm text-gray-300">✓ Detected wedding event categories</p>
                <p className="text-sm text-gray-300">✓ Analyzed transitions and timing</p>
              </div>
            )}
          </div>
          
          {/* Raw Footage Analysis & Matching */}
          {analysisProgress === 100 && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">
                  Matching Raw Footage
                </h3>
                <span className="text-sm text-gray-400">
                  {matchingProgress < 100 ? `${matchingProgress}%` : 'Complete'}
                </span>
              </div>
              <Progress value={matchingProgress} className="h-2 bg-gray-900" />
              {matchingProgress > 0 && (
                <div className="p-3 bg-gray-900 rounded-lg border border-gray-800">
                  <p className="text-sm text-gray-300">
                    Processed {Math.min(rawFilesCount, Math.ceil(rawFilesCount * matchingProgress / 100))} of {rawFilesCount} raw files
                  </p>
                  {matchingProgress > 30 && matchingProgress < 70 && (
                    <p className="text-sm text-gray-300">Categorizing footage and finding best matches...</p>
                  )}
                  {matchingProgress === 100 && (
                    <>
                      <p className="text-sm text-gray-300">✓ All raw footage categorized</p>
                      <p className="text-sm text-gray-300">✓ Best matches found for reference scenes</p>
                      <p className="text-sm text-gray-300">✓ Ready to export project</p>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
        
        {matchingProgress === 100 && (
          <Button 
            className="w-full mt-6 bg-black hover:bg-gray-900 text-white border border-gray-800 transition-all"
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
