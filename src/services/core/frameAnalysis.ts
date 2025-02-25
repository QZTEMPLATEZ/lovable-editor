
export const calculateFrameDifference = (frame1: ImageData, frame2: ImageData): number => {
  const data1 = frame1.data;
  const data2 = frame2.data;
  let diff = 0;
  
  for (let i = 0; i < data1.length; i += 4) {
    diff += Math.abs(data1[i] - data2[i]); // R
    diff += Math.abs(data1[i + 1] - data2[i + 1]); // G
    diff += Math.abs(data1[i + 2] - data2[i + 2]); // B
  }
  
  return diff / (frame1.width * frame1.height * 3);
};

export const determineSceneType = (motionScore: number): 'emotional' | 'action' | 'default' => {
  if (motionScore > 40) return 'action';
  if (motionScore < 20) return 'emotional';
  return 'default';
};

export const extractFrameData = async (video: HTMLVideoElement, timePoint: number): Promise<ImageData | null> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      resolve(null);
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    video.currentTime = timePoint;
    
    video.addEventListener('seeked', () => {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const frameData = context.getImageData(0, 0, canvas.width, canvas.height);
      resolve(frameData);
    }, { once: true });
  });
};
