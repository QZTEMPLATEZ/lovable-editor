
import { PremiereSequence } from './types';

export const verifyAndApplyTransitions = async (
  sequence: PremiereSequence,
  defaultTransition: string = "Cross Dissolve",
  duration: number = 1.0
): Promise<void> => {
  try {
    const clips = sequence.getAllClips();
    for (let i = 0; i < clips.length - 1; i++) {
      if (!sequence.hasTransition(clips[i], clips[i + 1])) {
        sequence.addTransition(
          defaultTransition,
          (clips[i].startTime || 0) + clips[i].duration,
          duration
        );
      }
    }
  } catch (error) {
    console.error('Error verifying transitions:', error);
    throw new Error('Failed to verify and apply transitions');
  }
};
