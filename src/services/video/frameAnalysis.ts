
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

export const getFramePoints = (duration: number): number[] => {
  return [
    duration * 0.1,
    duration * 0.25,
    duration * 0.5,
    duration * 0.75,
    duration * 0.9
  ];
};

export const determineSceneType = (motionScore: number): 'emotional' | 'action' | 'default' => {
  if (motionScore > 40) return 'action';
  if (motionScore < 20) return 'emotional';
  return 'default';
};
