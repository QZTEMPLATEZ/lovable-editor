import { VideoCategory } from '../types/video';
import { logger } from './logger';

export const calculateConfidenceScore = (
  visualIndicators: string[],
  metadata: any,
  filename: string
): number => {
  let score = 0;
  
  // Filename-based scoring
  if (filename.toLowerCase().includes('dji') || filename.toLowerCase().includes('mavic')) {
    score += 0.3;
  }

  // Metadata-based scoring
  if (metadata?.duration > 180) { // Videos longer than 3 minutes
    score += 0.2;
  }

  // Visual indicators scoring
  if (visualIndicators.length > 0) {
    score += 0.1 * visualIndicators.length;
  }

  logger.info(`Confidence score calculated: ${score} for file: ${filename}`);
  return Math.min(score, 1); // Cap at 1.0
};

export const validateCategory = (category: VideoCategory, confidence: number): boolean => {
  const MINIMUM_CONFIDENCE = 0.3;
  return confidence >= MINIMUM_CONFIDENCE;
};

export const getCategoryDescription = (category: VideoCategory): string => {
  const descriptions: Record<VideoCategory, string> = {
    brideprep: "Bride preparation footage",
    groomprep: "Groom preparation footage",
    decoration: "Venue and decoration shots",
    drone: "Aerial footage",
    ceremony: "Wedding ceremony footage",
    reception: "Reception and party footage",
    untagged: "Unclassified footage"
  };
  
  return descriptions[category];
};