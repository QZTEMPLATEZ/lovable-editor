
import { PremiereClip, PremiereSequence } from './types';

export const verifyAndApplyTransitions = async (sequence: PremiereSequence): Promise<void> => {
  try {
    const clips = sequence.getAllClips();
    
    for (let i = 0; i < clips.length - 1; i++) {
      const currentClip = clips[i];
      const nextClip = clips[i + 1];
      
      if (!sequence.hasTransition(currentClip, nextClip)) {
        // Adiciona uma transição suave entre os clips
        await sequence.addTransition(
          "Cross Dissolve",
          (currentClip.startTime || 0) + currentClip.duration - 0.5,
          1.0
        );
      }
    }
  } catch (error) {
    console.error('Error applying transitions:', error);
    throw new Error('Failed to apply transitions');
  }
};
