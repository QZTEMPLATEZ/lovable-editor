
import { PremiereSequence } from './types';

export const detectSilence = (audioTrack: any): Array<{start: number, duration: number}> => {
  const silentSegments: Array<{start: number, duration: number}> = [];
  const clips = audioTrack.clips || [];
  
  let currentTime = 0;
  clips.forEach((clip: any) => {
    const audioData = clip.audioData || {};
    const rms = audioData.rms || 0;
    
    if (rms < 0.01) {
      silentSegments.push({
        start: currentTime,
        duration: clip.duration
      });
    }
    currentTime += clip.duration;
  });
  
  return silentSegments;
};

export const markSilentSections = async (sequence: PremiereSequence): Promise<void> => {
  try {
    const audioTracks = sequence.getAllAudioTracks();
    
    audioTracks.forEach(track => {
      const silenceSegments = detectSilence(track);
      silenceSegments.forEach(segment => {
        sequence.addMarker(segment.start, "Silêncio Detectado", "red");
      });
    });
  } catch (error) {
    console.error('Error marking silent sections:', error);
    throw new Error('Failed to mark silent sections');
  }
};

export const fineTuneMusicSync = async (
  sequence: PremiereSequence,
  beats: number[]
): Promise<void> => {
  try {
    sequence.getAllClips().forEach(clip => {
      if (!clip.startTime || !clip.moveTo) return;
      
      const closestBeat = beats.reduce((prev, curr) => {
        return Math.abs(curr - clip.startTime!) < Math.abs(prev - clip.startTime!)
          ? curr
          : prev;
      });
      
      clip.moveTo(closestBeat);
    });
  } catch (error) {
    console.error('Error fine-tuning music sync:', error);
    throw new Error('Failed to fine-tune music synchronization');
  }
};
