import { useState } from "react";
import VideoEditor from "@/components/VideoEditor";
import IntroScreen from "@/components/IntroScreen";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {showIntro ? (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      ) : (
        <VideoEditor />
      )}
    </>
  );
};

export default Index;