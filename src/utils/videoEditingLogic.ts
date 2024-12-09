import { detectBeats } from './audioProcessing';

export interface Clip {
  file: File;
  startTime: number;
  endTime: number;
  type: 'preparation' | 'ceremony' | 'celebration';
  significance: number;
}

export interface EditingProject {
  clips: Clip[];
  music: {
    file: File;
    beats: any[];
  };
  duration: {
    min: number;
    max: number;
  };
}

export const analyzeClipSignificance = async (clip: File): Promise<number> => {
  // This would use computer vision in production
  // For now, return a random significance score
  return Math.random();
};

export const categorizeClip = (filename: string): Clip['type'] => {
  const lowerName = filename.toLowerCase();
  if (lowerName.includes('prep') || lowerName.includes('ready')) return 'preparation';
  if (lowerName.includes('ceremony') || lowerName.includes('vow')) return 'ceremony';
  return 'celebration';
};

export const createHighlightReel = async (
  rawFiles: File[],
  musicFile: File,
  targetDuration: { min: number; max: number }
): Promise<EditingProject> => {
  const beats = await detectBeats(musicFile);
  
  // Analyze and categorize clips
  const analyzedClips: Clip[] = await Promise.all(
    rawFiles.map(async (file) => ({
      file,
      startTime: 0,
      endTime: 30, // Default 30-second segments
      type: categorizeClip(file.name),
      significance: await analyzeClipSignificance(file)
    }))
  );

  // Sort clips by significance
  const sortedClips = analyzedClips.sort((a, b) => b.significance - a.significance);

  // Select clips to fit target duration
  const selectedClips = sortedClips.slice(0, Math.ceil(targetDuration.max * 2)); // 2 clips per minute

  return {
    clips: selectedClips,
    music: {
      file: musicFile,
      beats
    },
    duration: targetDuration
  };
};