
import { MatchedClip, ReferenceVideoSegment, VideoAnalysisResult } from "@/types/video";
import { logger } from "@/utils/logger";

export class SceneMatcher {
  static async matchScenes(
    referenceSegments: ReferenceVideoSegment[],
    analyzedFootage: VideoAnalysisResult[]
  ): Promise<MatchedClip[]> {
    logger.info('Starting scene matching', {
      segmentCount: referenceSegments.length,
      footageCount: analyzedFootage.length
    });
    
    const matchedClips: MatchedClip[] = [];
    
    // For each segment in the reference video
    for (const segment of referenceSegments) {
      // Find footage files with matching category
      const matchingFootage = analyzedFootage.filter(
        footage => footage.category === segment.category
      );
      
      if (matchingFootage.length === 0) {
        logger.warn('No matching footage found for segment', {
          category: segment.category,
          startTime: segment.startTime,
          duration: segment.duration
        });
        continue;
      }
      
      // Sort by confidence
      const sortedMatches = [...matchingFootage].sort(
        (a, b) => b.confidence - a.confidence
      );
      
      // Pick the best match
      const bestMatch = sortedMatches[0];
      
      // Mock inPoint and outPoint - in a real implementation,
      // we would analyze the file to find the best subsection
      const inPoint = 0;
      const outPoint = segment.duration;
      
      matchedClips.push({
        referenceSegment: segment,
        matchedFile: bestMatch.file,
        similarityScore: bestMatch.confidence,
        inPoint,
        outPoint
      });
      
      logger.info('Matched clip', {
        category: segment.category,
        filename: bestMatch.file.name,
        confidence: bestMatch.confidence
      });
    }
    
    logger.info('Scene matching complete', {
      matchedCount: matchedClips.length,
      totalSegments: referenceSegments.length
    });
    
    return matchedClips;
  }
}
