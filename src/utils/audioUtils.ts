export const createAudioElement = (file: File): HTMLAudioElement => {
  const audio = new Audio(URL.createObjectURL(file));
  return audio;
};

export const cleanupAudioElement = (audio: HTMLAudioElement) => {
  audio.pause();
  URL.revokeObjectURL(audio.src);
};

export const validateAudioFile = (file: File): boolean => {
  return file.type === 'audio/wav' || file.type === 'audio/mpeg';
};