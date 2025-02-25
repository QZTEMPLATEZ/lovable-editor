
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const VideoSelectorHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-[40vh] lg:h-[50vh] bg-[#0A0A0A] overflow-hidden">
      <Button
        variant="ghost"
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 z-10 text-white hover:bg-white/10 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="https://www.dropbox.com/scl/fi/2ctxlrnuqeqe8r4lcnnoz/first-page.mp4?rlkey=qknrts8gb6lwepv0vhupydosy&raw=1" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50" />
      </div>
      
      <div className="relative container mx-auto h-full max-w-[2560px] px-4 lg:px-8">
        <div className="flex flex-col justify-center h-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-cinzel font-extrabold tracking-[0.2em] uppercase text-white mb-4 leading-tight">
            GET UNLIMITED<br />VIDEO EDITING
          </h1>
          <p className="text-sm md:text-base lg:text-lg font-['Inter'] font-light text-white/80 mb-6 max-w-xl lg:max-w-2xl">
            Choose the perfect duration for your video project. Each option is carefully designed 
            to match different content needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoSelectorHeader;
