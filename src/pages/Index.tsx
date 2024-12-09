import { useState, useEffect } from "react";
import VideoEditorContainer from "@/components/VideoEditorContainer";
import IntroScreen from "@/components/IntroScreen";
import TutorialVideo from "@/components/TutorialVideo";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [showTutorial, setShowTutorial] = useState(false);
  const [greeting, setGreeting] = useState("Good evening");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  useEffect(() => {
    const skipTutorial = localStorage.getItem('skipTutorial') === 'true';
    if (!skipTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    const skipTutorial = localStorage.getItem('skipTutorial') === 'true';
    if (!skipTutorial) {
      setShowTutorial(true);
    }
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

  return (
    <div className="min-h-screen bg-editor-bg relative">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-editor-bg via-editor-bg/95 to-editor-bg" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {showIntro && (
          <IntroScreen onComplete={handleIntroComplete} />
        )}
        {!showIntro && showTutorial && (
          <TutorialVideo onComplete={handleTutorialComplete} />
        )}
        {!showIntro && !showTutorial && (
          <div className="p-6 space-y-8">
            {/* Welcome Section */}
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 inline-flex items-center gap-2 mb-4">
                {greeting}
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              </h1>
              <p className="text-editor-text/80 max-w-2xl mx-auto">
                Create stunning wedding videos with our AI-powered editor
              </p>
            </motion.div>
            
            {/* Steps Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                { step: 1, title: "Upload", desc: "Upload your raw footage" },
                { step: 2, title: "Style", desc: "Choose editing style" },
                { step: 3, title: "Music", desc: "Pick perfect soundtrack" },
                { step: 4, title: "AI Edit", desc: "Let AI create first draft" },
                { step: 5, title: "Refine", desc: "Fine-tune to perfection" }
              ].map((item) => (
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

            {/* Editor Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <VideoEditorContainer />
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;