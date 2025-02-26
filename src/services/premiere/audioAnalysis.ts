
import { PremiereSequence } from './types';

export const markSilentSections = async (sequence: PremiereSequence): Promise<void> => {
  try {
    const audioTracks = sequence.getAllAudioTracks();
    
    for (const track of audioTracks) {
      for (const clip of track.clips) {
        if (clip.energy && clip.energy < 0.1) { // Seção silenciosa
          sequence.addMarker(clip.startTime || 0, "Silent Section", "blue");
        }
      }
    }
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
    const clips = sequence.getAllClips();
    
    for (let i = 0; i < clips.length; i++) {
      const clip = clips[i];
      const nearestBeat = beats.find(beat => 
        Math.abs((clip.startTime || 0) - beat) < 0.5
      );
      
      if (nearestBeat && clip.moveTo) {
        clip.moveTo(nearestBeat);
      }
    }
  } catch (error) {
    console.error('Error syncing with music:', error);
    throw new Error('Failed to sync with music beats');
  }
};
