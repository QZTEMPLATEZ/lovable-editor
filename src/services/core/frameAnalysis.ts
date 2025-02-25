
export const calculateFrameDifference = (frame1: ImageData, frame2: ImageData): number => {
  const data1 = frame1.data;
  const data2 = frame2.data;
  let diff = 0;
  let significantChanges = 0;
  
  // Análise mais detalhada do movimento
  for (let i = 0; i < data1.length; i += 4) {
    const pixelDiff = Math.abs(data1[i] - data2[i]) + 
                     Math.abs(data1[i + 1] - data2[i + 1]) + 
                     Math.abs(data1[i + 2] - data2[i + 2]);
    
    diff += pixelDiff;
    if (pixelDiff > 30) { // Threshold para mudança significativa
      significantChanges++;
    }
  }
  
  // Normaliza considerando tanto a diferença total quanto áreas de mudança significativa
  const totalPixels = frame1.width * frame1.height;
  const normalizedDiff = diff / (totalPixels * 3 * 255); // Normaliza para 0-1
  const changeRatio = significantChanges / totalPixels;
  
  return (normalizedDiff + changeRatio) * 50; // Escala para 0-100
};

export const determineSceneType = (motionScore: number): 'emotional' | 'action' | 'default' => {
  // Ajuste mais preciso dos thresholds
  if (motionScore > 35) return 'action';      // Cenas com muito movimento
  if (motionScore < 15) return 'emotional';    // Cenas mais estáticas/emocionais
  return 'default';
};

export const extractFrameData = async (video: HTMLVideoElement, timePoint: number): Promise<ImageData | null> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      console.error('Could not get canvas context');
      resolve(null);
      return;
    }

    // Usa resolução reduzida para melhor performance
    const targetWidth = 320;
    const aspectRatio = video.videoWidth / video.videoHeight;
    const targetHeight = Math.round(targetWidth / aspectRatio);

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const handleFrame = () => {
      try {
        context.drawImage(video, 0, 0, targetWidth, targetHeight);
        const frameData = context.getImageData(0, 0, targetWidth, targetHeight);
        resolve(frameData);
      } catch (error) {
        console.error('Error extracting frame:', error);
        resolve(null);
      }
    };

    video.currentTime = timePoint;
    video.addEventListener('seeked', handleFrame, { once: true });
  });
};
