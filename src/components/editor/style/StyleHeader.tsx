import React from 'react';
import { ChevronLeft, Sparkles, Wand2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StyleHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative h-[70vh] bg-[#0A0A0A] overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Background overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
      </div>
      
      {/* Content container */}
      <div className="relative container mx-auto h-full">
        <div className="flex flex-col justify-center h-full max-w-2xl px-6 py-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Choose Your Style
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-xl">
            Select a cinematic style that matches your vision. Each style offers a unique way to tell your story.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/music')}
              className="px-8 py-4 bg-[#222222] text-white font-semibold rounded-lg hover:bg-[#D946EF] transition-colors"
            >
              Continue
            </button>
            <button 
              onClick={() => navigate('/duration')}
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleHeader;