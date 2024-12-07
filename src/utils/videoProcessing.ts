export interface VideoMetadata {
  fps: number;
  resolution: { width: number; height: number };
  duration: number;
}

export const analyzeVideoStability = async (file: File): Promise<number> => {
  // Placeholder for stability analysis
  // In a real implementation, this would use computer vision to analyze frame-to-frame movement
  console.log('Analyzing stability for:', file.name);
  return Math.random(); // Stability score between 0-1
};

export const calculateSlowMotionSpeed = (fps: number): number => {
  switch (fps) {
    case 120:
      return 0.2; // 20% speed for 120fps
    case 60:
      return 0.4; // 40% speed for 60fps
    default:
      return 0.5; // Default 50% speed
  }
};

export const getVideoMetadata = async (file: File): Promise<VideoMetadata> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      resolve({
        fps: 30, // This would need to be extracted from the actual video
        resolution: {
          width: video.videoWidth,
          height: video.videoHeight
        },
        duration: video.duration
      });
    };
    video.src = URL.createObjectURL(file);
  });
};