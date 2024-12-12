import { VideoStyle } from '@/types/video';
import { logger } from './logger';
import { startStyleProcessing, endStyleProcessing } from './styleProcessingMetrics';

export interface StyleSettings {
  transitionDuration: number;
  colorGrading: {
    contrast: number;
    saturation: number;
    temperature: number;
  };
  cutTiming: 'slow' | 'medium' | 'fast';
  effects: string[];
}

const styleSettingsCache = new Map<string, StyleSettings>();

export const getStyleSettings = (style: VideoStyle): StyleSettings => {
  // Check cache first
  const cached = styleSettingsCache.get(style.id);
  if (cached) {
    return cached;
  }

  const settings = calculateStyleSettings(style);
  styleSettingsCache.set(style.id, settings);
  return settings;
};

const calculateStyleSettings = (style: VideoStyle): StyleSettings => {
  switch (style.id) {
    case 'classic':
      return {
        transitionDuration: 1.0,
        colorGrading: {
          contrast: 1.1,
          saturation: 1.0,
          temperature: 0
        },
        cutTiming: 'medium',
        effects: ['crossDissolve']
      };
    case 'cinematic':
      return {
        transitionDuration: 1.5,
        colorGrading: {
          contrast: 1.2,
          saturation: 0.9,
          temperature: -5
        },
        cutTiming: 'slow',
        effects: ['filmGrain', 'letterbox', 'slowMotion']
      };
    case 'documentary':
      return {
        transitionDuration: 0.8,
        colorGrading: {
          contrast: 1.0,
          saturation: 1.0,
          temperature: 0
        },
        cutTiming: 'medium',
        effects: ['stabilization']
      };
    case 'dynamic':
      return {
        transitionDuration: 0.3,
        colorGrading: {
          contrast: 1.3,
          saturation: 1.2,
          temperature: 5
        },
        cutTiming: 'fast',
        effects: ['flash', 'zoom', 'beatSync']
      };
    default:
      logger.warn(`Unknown style ${style.id}, using default settings`);
      return {
        transitionDuration: 1.0,
        colorGrading: {
          contrast: 1.0,
          saturation: 1.0,
          temperature: 0
        },
        cutTiming: 'medium',
        effects: []
      };
  }
};

export const applyStyleToProject = async (
  clips: File[],
  style: VideoStyle,
  customReference?: File
) => {
  try {
    startStyleProcessing(style.id);
    
    logger.info(`Starting style application: ${style.name}`, {
      clipCount: clips.length,
      hasCustomReference: !!customReference
    });

    const settings = getStyleSettings(style);
    
    // Process clips in chunks to avoid memory issues
    const chunkSize = 5;
    const processedClips: File[] = [];
    
    for (let i = 0; i < clips.length; i += chunkSize) {
      const chunk = clips.slice(i, i + chunkSize);
      const processedChunk = await Promise.all(
        chunk.map(clip => processClip(clip, settings))
      );
      processedClips.push(...processedChunk);
      
      logger.info(`Processed chunk ${i / chunkSize + 1}/${Math.ceil(clips.length / chunkSize)}`);
    }

    const metrics = endStyleProcessing(style.id);
    
    return {
      settings,
      processedClips,
      styleApplied: true,
      metrics
    };
  } catch (error) {
    logger.error(`Error applying style ${style.name}:`, error);
    throw error;
  }
};

const processClip = async (clip: File, settings: StyleSettings): Promise<File> => {
  // This is a placeholder for actual video processing
  // In a real implementation, this would apply the style settings to the video
  return clip;
};