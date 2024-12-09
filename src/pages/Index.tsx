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
    <div className="min-h-screen bg-editor-bg relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 animate-gradient" />
      
      {/* Geometric patterns */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 border border-editor-accent/10 rounded-lg"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: 0,
                opacity: 0.1,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                rotate: 360,
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                repeatType: "reverse",
                delay: i * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {showIntro && (
          <IntroScreen onComplete={handleIntroComplete} />
        )}
        {!showIntro && showTutorial && (
          <TutorialVideo onComplete={handleTutorialComplete} />
        )}
        {!showIntro && !showTutorial && (
          <div className="space-y-12 p-6">
            <motion.div 
              className="space-y-2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 inline-flex items-center gap-2">
                {greeting}
                <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              </h1>
            </motion.div>
            
            <motion.div 
              className="max-w-4xl mx-auto space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-center text-purple-300">
                5 Steps to Your Perfect Wedding Film
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  { step: 1, title: "Upload", desc: "Upload your raw wedding footage and photos" },
                  { step: 2, title: "Select Style", desc: "Choose your preferred editing style" },
                  { step: 3, title: "Music", desc: "Pick the perfect soundtrack" },
                  { step: 4, title: "AI Edit", desc: "Let our AI create your first draft" },
                  { step: 5, title: "Refine", desc: "Fine-tune your video to perfection" }
                ].map((item) => (
                  <motion.div
                    key={item.step}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: item.step * 0.1 }}
                  >
                    <div className="bg-editor-panel p-6 rounded-lg border border-editor-border/50 hover:border-editor-accent/50 transition-all duration-300 transform hover:-translate-y-1">
                      <div className="absolute -top-3 -right-3 w-8 h-8 bg-editor-accent rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-medium text-purple-200 mb-2">{item.title}</h3>
                      <p className="text-sm text-editor-text">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.p 
              className="text-center text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              Create stunning wedding videos with our AI-powered editor
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
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