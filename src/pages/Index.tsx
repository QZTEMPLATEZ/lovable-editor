import { useState, useEffect } from "react";
import VideoEditorContainer from "@/components/VideoEditorContainer";
import IntroScreen from "@/components/IntroScreen";
import TutorialVideo from "@/components/TutorialVideo";

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
    if (skipTutorial) {
      setShowTutorial(false);
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
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {showIntro ? (
          <IntroScreen onComplete={handleIntroComplete} />
        ) : showTutorial ? (
          <TutorialVideo onComplete={handleTutorialComplete} />
        ) : (
          <div className="space-y-12">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                {greeting}
              </h1>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-2xl font-semibold text-center text-purple-300">
                5 Steps to Your Perfect Wedding Film
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="bg-editor-panel p-6 rounded-lg">
                  <div className="text-xl font-bold text-purple-400 mb-2">1</div>
                  <h3 className="text-lg font-medium text-purple-200 mb-2">Upload</h3>
                  <p className="text-sm text-editor-text">Upload your raw wedding footage and photos</p>
                </div>
                
                <div className="bg-editor-panel p-6 rounded-lg">
                  <div className="text-xl font-bold text-purple-400 mb-2">2</div>
                  <h3 className="text-lg font-medium text-purple-200 mb-2">Select Style</h3>
                  <p className="text-sm text-editor-text">Choose your preferred editing style</p>
                </div>
                
                <div className="bg-editor-panel p-6 rounded-lg">
                  <div className="text-xl font-bold text-purple-400 mb-2">3</div>
                  <h3 className="text-lg font-medium text-purple-200 mb-2">Music</h3>
                  <p className="text-sm text-editor-text">Pick the perfect soundtrack</p>
                </div>
                
                <div className="bg-editor-panel p-6 rounded-lg">
                  <div className="text-xl font-bold text-purple-400 mb-2">4</div>
                  <h3 className="text-lg font-medium text-purple-200 mb-2">AI Edit</h3>
                  <p className="text-sm text-editor-text">Let our AI create your first draft</p>
                </div>
                
                <div className="bg-editor-panel p-6 rounded-lg">
                  <div className="text-xl font-bold text-purple-400 mb-2">5</div>
                  <h3 className="text-lg font-medium text-purple-200 mb-2">Refine</h3>
                  <p className="text-sm text-editor-text">Fine-tune your video to perfection</p>
                </div>
              </div>
            </div>

            <p className="text-center text-gray-400 max-w-2xl mx-auto">
              Create stunning wedding videos with our AI-powered editor
            </p>
            <VideoEditorContainer />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
