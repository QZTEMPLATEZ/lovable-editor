import React from 'react';

interface StylePreviewVideoProps {
  videoUrl: string;
  isHovered: boolean;
  videoRef: React.RefObject<HTMLVideoElement>;
  onError: () => void;
}

const StylePreviewVideo = ({ videoUrl, isHovered, videoRef, onError }: StylePreviewVideoProps) => {
  return (
    <div className="absolute inset-0 z-[3] transition-opacity duration-500">
      <video
        ref={videoRef}
        src={videoUrl}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        muted
        playsInline
        onError={onError}
      />
    </div>
  );
};

export default StylePreviewVideo;