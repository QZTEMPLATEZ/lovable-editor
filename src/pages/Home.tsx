
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Video, Film, FileVideo, Clapperboard, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { EditProject } from '@/types/video';

const Home = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [rawFiles, setRawFiles] = useState<File[]>([]);
  const [referenceVideo, setReferenceVideo] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [matchingProgress, setMatchingProgress] = useState<number>(0);
  const [project, setProject] = useState<EditProject | null>(null);
  
  const rawInputRef = useRef<HTMLInputElement>(null);
  const referenceInputRef = useRef<HTMLInputElement>(null);

  const handleRawFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setRawFiles(files);
      toast({
        title: "Success",
        description: `${files.length} raw video files selected`,
      });
    }
  };

  const handleReferenceSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setReferenceVideo(e.target.files[0]);
      toast({
        title: "Success",
        description: "Reference video selected: " + e.target.files[0].name,
      });
    }
  };

  const handleStartAnalysis = () => {
    if (!referenceVideo || rawFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Missing files",
        description: "Please select both raw footage and a reference video before continuing.",
      });
      return;
    }

    setIsAnalyzing(true);
    setCurrentStep(2);
    
    // Simulate analysis progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setAnalysisProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        setIsAnalyzing(false);
        simulateMatching();
      }
    }, 50);
  };

  const simulateMatching = () => {
    // Simulate matching progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      setMatchingProgress(progress);
      
      if (progress >= 100) {
        clearInterval(interval);
        createMockProject();
        setCurrentStep(3);
      }
    }, 50);
  };

  const createMockProject = () => {
    // Create a mock project for demonstration
    const newProject: EditProject = {
      name: "Wedding Auto Edit Project",
      referenceVideo: referenceVideo!,
      rawFootage: rawFiles,
      referenceSegments: [
        { startTime: 0, endTime: 30, category: 'brideprep', duration: 30 },
        { startTime: 30, endTime: 60, category: 'groomprep', duration: 30 },
        { startTime: 60, endTime: 180, category: 'ceremony', duration: 120 },
        { startTime: 180, endTime: 240, category: 'reception', duration: 60 },
      ],
      matchedClips: [],
      created: new Date(),
      modified: new Date()
    };
    
    setProject(newProject);
  };

  const handleExport = (format: 'xml' | 'edl' | 'fcpxml') => {
    toast({
      title: "Exporting Project",
      description: `Preparing ${format.toUpperCase()} file for download...`,
    });
    
    // Simulate export delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: `Your ${format.toUpperCase()} file is ready for download.`,
      });
      
      // Create and download a mock file
      const element = document.createElement('a');
      const file = new Blob([`Mock ${format.toUpperCase()} content - This would be the actual editor project file in production`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `wedding_project.${format}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white">
      <div className="container mx-auto py-10 px-4">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Wedding Auto Edit
          </h1>
          <p className="text-lg text-purple-300">
            Transform raw footage into professional edits using AI
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* Step 1: File Import */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl">
                <h2 className="text-2xl font-bold mb-4 text-purple-200">Step 1: Import Your Files</h2>
                
                {/* Raw Footage Upload */}
                <div 
                  onClick={() => rawInputRef.current?.click()}
                  className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 mb-6 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                >
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    className="hidden"
                    ref={rawInputRef}
                    onChange={handleRawFileSelection}
                  />
                  <FileVideo className="w-16 h-16 mx-auto mb-3 text-purple-400" />
                  <h3 className="text-xl font-medium mb-2 text-purple-200">
                    Upload Raw Footage
                  </h3>
                  <p className="text-purple-300/70 mb-3">
                    Drag and drop your raw wedding videos
                  </p>
                  {rawFiles.length > 0 && (
                    <div className="mt-3 p-2 bg-purple-900/30 rounded-lg text-left">
                      <p className="text-sm font-medium text-purple-200">{rawFiles.length} files selected</p>
                    </div>
                  )}
                </div>
                
                {/* Reference Video Upload */}
                <div 
                  onClick={() => referenceInputRef.current?.click()}
                  className="border-2 border-dashed border-purple-500/30 rounded-xl p-6 mb-6 text-center cursor-pointer hover:border-purple-500/50 transition-all duration-300"
                >
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    ref={referenceInputRef}
                    onChange={handleReferenceSelection}
                  />
                  <Video className="w-16 h-16 mx-auto mb-3 text-purple-400" />
                  <h3 className="text-xl font-medium mb-2 text-purple-200">
                    Upload Reference Video
                  </h3>
                  <p className="text-purple-300/70 mb-3">
                    Select an edited wedding video to use as reference
                  </p>
                  {referenceVideo && (
                    <div className="mt-3 p-2 bg-purple-900/30 rounded-lg text-left">
                      <p className="text-sm font-medium text-purple-200">{referenceVideo.name}</p>
                    </div>
                  )}
                </div>
                
                <Button 
                  className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
                  disabled={!referenceVideo || rawFiles.length === 0}
                  onClick={handleStartAnalysis}
                >
                  Continue to Analysis
                </Button>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Analysis & Matching */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-purple-200">Step 2: Analyzing & Matching</h2>
                
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
                        <p className="text-sm text-purple-200">✓ Identified 15 scenes in reference video</p>
                        <p className="text-sm text-purple-200">✓ Detected 4 different categories</p>
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
                            Processed {Math.min(rawFiles.length, Math.ceil(rawFiles.length * matchingProgress / 100))} of {rawFiles.length} raw files
                          </p>
                          {matchingProgress === 100 && (
                            <>
                              <p className="text-sm text-purple-200">✓ Found matches for 15/15 reference scenes</p>
                              <p className="text-sm text-purple-200">✓ Created timeline with {rawFiles.length} clips</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Export */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="p-6 bg-black/20 backdrop-blur-md border border-purple-500/20 rounded-xl">
                <h2 className="text-2xl font-bold mb-6 text-purple-200">Step 3: Export Your Project</h2>
                
                <div className="bg-purple-900/20 p-4 rounded-xl mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-purple-200">Project Summary</h3>
                  <ul className="space-y-2 text-purple-300">
                    <li className="flex items-center gap-2">
                      <Clapperboard className="w-4 h-4" />
                      <span>15 matched scenes from reference video</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <FileVideo className="w-4 h-4" />
                      <span>{rawFiles.length} raw footage files used</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Film className="w-4 h-4" />
                      <span>Total duration: ~5 minutes</span>
                    </li>
                  </ul>
                </div>
                
                <h3 className="text-lg font-medium mb-4 text-purple-200">Export Format</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <Button 
                    variant="outline" 
                    className="border-purple-500/30 hover:bg-purple-500/10 flex items-center justify-center gap-2 py-6"
                    onClick={() => handleExport('xml')}
                  >
                    <Download className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Adobe Premiere</p>
                      <p className="text-xs text-purple-400">XML</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-purple-500/30 hover:bg-purple-500/10 flex items-center justify-center gap-2 py-6"
                    onClick={() => handleExport('fcpxml')}
                  >
                    <Download className="w-5 h-5" />
                    <div>
                      <p className="font-medium">Final Cut Pro</p>
                      <p className="text-xs text-purple-400">FCPXML</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="border-purple-500/30 hover:bg-purple-500/10 flex items-center justify-center gap-2 py-6"
                    onClick={() => handleExport('edl')}
                  >
                    <Download className="w-5 h-5" />
                    <div>
                      <p className="font-medium">DaVinci Resolve</p>
                      <p className="text-xs text-purple-400">EDL</p>
                    </div>
                  </Button>
                </div>
                
                <Button 
                  variant="outline"
                  className="w-full border-purple-500/30 hover:bg-purple-500/10"
                  onClick={() => setCurrentStep(1)}
                >
                  Start New Project
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
