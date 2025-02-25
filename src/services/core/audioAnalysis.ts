
export const detectBeats = (audioBuffer: AudioBuffer): number[] => {
  const data = audioBuffer.getChannelData(0);
  const sampleRate = audioBuffer.sampleRate;
  const beats: number[] = [];
  
  // Configurações para detecção de beat
  const threshold = 0.15;
  const minimumGap = sampleRate * 0.3; // 300ms entre beats
  let lastBeat = 0;
  
  for (let i = 0; i < data.length; i++) {
    const energy = Math.abs(data[i]);
    
    if (energy > threshold && i - lastBeat > minimumGap) {
      beats.push(i / sampleRate);
      lastBeat = i;
    }
  }
  
  return beats;
};

export const calculateEnergy = (audioBuffer: AudioBuffer): number => {
  const data = audioBuffer.getChannelData(0);
  let energy = 0;
  
  for (let i = 0; i < data.length; i++) {
    energy += data[i] * data[i];
  }
  
  return energy / data.length;
};

export const estimateTempo = (beats: number[]): number => {
  if (beats.length < 2) return 0;
  
  const intervals: number[] = [];
  for (let i = 1; i < beats.length; i++) {
    intervals.push(beats[i] - beats[i-1]);
  }
  
  const averageInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
  return Math.round(60 / averageInterval);
};
