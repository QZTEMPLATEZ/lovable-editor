
import { PremiereSequence, PremiereClip } from './types';

export const removeGapsInTimeline = async (sequence: PremiereSequence): Promise<void> => {
  try {
    const clips = sequence.getAllClips();
    for (let i = 1; i < clips.length; i++) {
      const currentClip = clips[i];
      const previousClip = clips[i - 1];
      const gap = (currentClip.startTime || 0) - ((previousClip.startTime || 0) + previousClip.duration);
      
      if (gap > 0 && currentClip.moveTo) {
        currentClip.moveTo((currentClip.startTime || 0) - gap);
      }
    }
  } catch (error) {
    console.error('Error removing gaps:', error);
    throw new Error('Failed to remove gaps in timeline');
  }
};

export const addClipsToTimelineSmoothly = async (
  sequence: PremiereSequence,
  clips: PremiereClip[]
): Promise<void> => {
  try {
    for (let i = 0; i < clips.length; i++) {
      const clip = clips[i];
      await sequence.addClip(clip.id, i * clip.duration);
      // Pequena pausa para evitar sobrecarga
      await new Promise(resolve => setTimeout(resolve, 50));
    }
  } catch (error) {
    console.error('Error adding clips smoothly:', error);
    throw new Error('Failed to add clips to timeline');
  }
};
