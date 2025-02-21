
import { OrganizationResult } from '@/types/organizer';
import { MusicAnalysis } from '@/utils/audioProcessing';

interface SequenceConfig {
  preferredClipDuration: number;
  transitionDuration: number;
  beatSyncEnabled: boolean;
}

export const generateEditSequence = (
  organizationResult: OrganizationResult,
  musicAnalysis: MusicAnalysis | null,
  config: SequenceConfig
) => {
  console.log('Generating edit sequence with config:', config);

  const sequence = [];
  const categories = [
    'MakingOf',
    'Ceremony',
    'Reception',
    'Details',
    'Decor'
  ];

  let currentTime = 0;

  // If we have music analysis, use it to sync cuts
  if (musicAnalysis && config.beatSyncEnabled) {
    console.log('Syncing to music beats:', musicAnalysis.beats.length, 'beats found');
    
    categories.forEach(category => {
      const files = organizationResult.categorizedFiles.get(category) || [];
      
      files.forEach((file, index) => {
        // Find nearest strong beat
        const nearestBeat = musicAnalysis.beats.find(
          beat => beat.timestamp >= currentTime && beat.type === 'strong'
        );

        if (nearestBeat) {
          sequence.push({
            file,
            category,
            startTime: nearestBeat.timestamp,
            duration: config.preferredClipDuration,
            transition: index < files.length - 1 ? {
              type: 'dissolve',
              duration: config.transitionDuration
            } : null
          });

          currentTime = nearestBeat.timestamp + config.preferredClipDuration;
        }
      });
    });
  } else {
    // No music analysis, use standard timing
    console.log('Using standard timing for sequence generation');
    
    categories.forEach(category => {
      const files = organizationResult.categorizedFiles.get(category) || [];
      
      files.forEach((file, index) => {
        sequence.push({
          file,
          category,
          startTime: currentTime,
          duration: config.preferredClipDuration,
          transition: index < files.length - 1 ? {
            type: 'dissolve',
            duration: config.transitionDuration
          } : null
        });

        currentTime += config.preferredClipDuration;
      });
    });
  }

  console.log('Generated sequence with', sequence.length, 'clips');
  return sequence;
};
