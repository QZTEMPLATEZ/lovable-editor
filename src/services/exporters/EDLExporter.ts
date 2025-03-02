
import { EditProject, MatchedClip } from "@/types/video";
import { logger } from "@/utils/logger";

export class EDLExporter {
  private static formatTimecode(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 25); // Using 25fps for EDL
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  }
  
  static export(project: EditProject): string {
    try {
      logger.info('Starting EDL export', { projectName: project.name });
      
      let edl = `TITLE: ${project.name}\nFCM: NON-DROP FRAME\n\n`;
      
      project.matchedClips.forEach((clip, index) => {
        const clipNumber = (index + 1).toString().padStart(3, '0');
        const sourceName = clip.matchedFile.name.substring(0, 8).toUpperCase();
        
        const sourceInTC = this.formatTimecode(clip.inPoint);
        const sourceOutTC = this.formatTimecode(clip.outPoint);
        
        // For simplicity, using the same timecode for the record (timeline)
        const recordInTC = this.formatTimecode(clip.referenceSegment.startTime);
        const recordOutTC = this.formatTimecode(clip.referenceSegment.endTime);
        
        edl += `${clipNumber}  ${sourceName} V     C        ${sourceInTC} ${sourceOutTC} ${recordInTC} ${recordOutTC}\n`;
        edl += `* FROM CLIP NAME: ${clip.matchedFile.name}\n\n`;
      });
      
      logger.info('EDL export completed successfully');
      return edl;
    } catch (error) {
      logger.error('Error generating EDL', { error });
      throw new Error('Failed to generate EDL file');
    }
  }
}
