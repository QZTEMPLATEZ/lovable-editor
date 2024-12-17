import { mediaProcessingService } from '../services/media/MediaProcessingService';
import { logger } from './logger';

export interface BeatInfo {
  timestamp: number;
  intensity: number;
  type: 'strong' | 'weak';
  bpm?: number;
}

export interface MusicAnalysis {
  beats: BeatInfo[];
  bpm: number;
  segments: AudioSegment[];
  duration: number;
  energyProfile: EnergyProfile;
}

interface AudioSegment {
  start: number;
  end: number;
  type: 'crescendo' | 'decrescendo' | 'steady' | 'speech' | 'music';
  intensity: number;
}

interface EnergyProfile {
  average: number;
  peak: number;
  valleys: number[];
  peaks: number[];
}

export const detectBeats = async (audioFile: File): Promise<BeatInfo[]> => {
  try {
    // Extrair áudio se for um arquivo de vídeo
    const audioBlob = audioFile.type.startsWith('video/') 
      ? await mediaProcessingService.extractAudio(audioFile)
      : audioFile;

    // Analisar o áudio
    const analysis = await mediaProcessingService.analyzeAudio(audioBlob);
    
    // Converter para nosso formato de beats
    return analysis.beats.map((timestamp, index) => ({
      timestamp,
      intensity: 0.5 + Math.random() * 0.5, // Será substituído por análise real
      type: index % 4 === 0 ? 'strong' : 'weak',
      bpm: analysis.bpm
    }));
  } catch (error) {
    logger.error('Error detecting beats:', error);
    throw error;
  }
};

export const analyzeMusicTrack = async (file: File): Promise<MusicAnalysis> => {
  const beats = await detectBeats(file);
  
  // Calculate average energy and find peaks
  const energyProfile: EnergyProfile = {
    average: beats.reduce((sum, beat) => sum + beat.intensity, 0) / beats.length,
    peak: Math.max(...beats.map(beat => beat.intensity)),
    peaks: findPeaks(beats),
    valleys: findValleys(beats)
  };
  
  // Identify music segments (crescendos, etc)
  const segments = identifySegments(beats);
  
  return {
    beats,
    bpm: beats[0]?.bpm || 120,
    segments,
    duration: beats[beats.length - 1]?.timestamp || 0,
    energyProfile
  };
};

export const synchronizeToBeats = (
  beats: BeatInfo[],
  clips: File[],
  style: 'dynamic' | 'smooth' | 'balanced' = 'balanced'
): void => {
  console.log('Synchronizing clips to beats:', {
    beatsCount: beats.length,
    clipsCount: clips.length,
    style
  });
  
  // Calculate optimal cut points based on style
  const cutPoints = calculateCutPoints(beats, style);
  console.log('Generated cut points:', cutPoints);
};

// Helper functions
const findPeaks = (beats: BeatInfo[]): number[] => {
  return beats
    .map((beat, i) => beat.intensity > 0.8 ? i : -1)
    .filter(index => index !== -1);
};

const findValleys = (beats: BeatInfo[]): number[] => {
  return beats
    .map((beat, i) => beat.intensity < 0.3 ? i : -1)
    .filter(index => index !== -1);
};

const identifySegments = (beats: BeatInfo[]): AudioSegment[] => {
  const segments: AudioSegment[] = [];
  let currentSegment: AudioSegment = {
    start: 0,
    end: 0,
    type: 'steady',
    intensity: 0
  };
  
  let prevIntensity = beats[0]?.intensity || 0;
  const threshold = 0.15; // Minimum change to identify crescendo/decrescendo
  
  beats.forEach((beat, index) => {
    const intensityChange = beat.intensity - prevIntensity;
    
    if (Math.abs(intensityChange) > threshold) {
      // End current segment
      currentSegment.end = beat.timestamp;
      segments.push(currentSegment);
      
      // Start new segment
      currentSegment = {
        start: beat.timestamp,
        end: 0,
        type: intensityChange > 0 ? 'crescendo' : 'decrescendo',
        intensity: beat.intensity
      };
    }
    
    prevIntensity = beat.intensity;
  });
  
  // Add final segment
  if (beats.length > 0) {
    currentSegment.end = beats[beats.length - 1].timestamp;
    segments.push(currentSegment);
  }
  
  return segments;
};

const calculateCutPoints = (
  beats: BeatInfo[],
  style: 'dynamic' | 'smooth' | 'balanced'
): number[] => {
  const cutThresholds = {
    dynamic: 0.4,
    balanced: 0.6,
    smooth: 0.8
  };
  
  return beats
    .filter(beat => beat.intensity > cutThresholds[style])
    .map(beat => beat.timestamp);
};
