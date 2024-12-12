import { useRef, useState, useEffect, useCallback } from 'react';

export const useVideoPreview = (isHovered: boolean) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  const handleVideoPlay = useCallback(async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setVideoError(false);
      } catch (error) {
        console.log('Video autoplay failed:', error);
        setVideoError(true);
      }
    }
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && !videoError) {
        handleVideoPlay();
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, handleVideoPlay, videoError]);

  const handleVideoError = () => setVideoError(true);

  return { videoRef, videoError, handleVideoError };
};