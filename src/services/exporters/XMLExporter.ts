
import { EditProject, MatchedClip } from "@/types/video";
import { logger } from "@/utils/logger";

export class XMLExporter {
  private static formatTimecode(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 24); // Assuming 24fps
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  }
  
  private static generateClipXML(clip: MatchedClip, index: number): string {
    const id = `clipitem-${index + 1}`;
    const name = `Clip ${index + 1}`;
    const inTime = this.formatTimecode(clip.inPoint);
    const outTime = this.formatTimecode(clip.outPoint);
    const start = this.formatTimecode(clip.referenceSegment.startTime);
    const end = this.formatTimecode(clip.referenceSegment.endTime);
    
    return `
      <clipitem id="${id}">
        <name>${name}</name>
        <duration>${clip.outPoint - clip.inPoint}</duration>
        <rate>
          <timebase>24</timebase>
          <ntsc>FALSE</ntsc>
        </rate>
        <in>${inTime}</in>
        <out>${outTime}</out>
        <start>${start}</start>
        <end>${end}</end>
        <file id="file-${index + 1}">
          <name>${clip.matchedFile.name}</name>
          <pathurl>file://${clip.matchedFile.name}</pathurl>
          <rate>
            <timebase>24</timebase>
            <ntsc>FALSE</ntsc>
          </rate>
          <duration>${clip.outPoint - clip.inPoint}</duration>
        </file>
      </clipitem>
    `;
  }
  
  static export(project: EditProject): string {
    try {
      logger.info('Starting Premiere XML export', { projectName: project.name });
      
      const clips = project.matchedClips.map((clip, index) => 
        this.generateClipXML(clip, index)
      ).join('\n');
      
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="5">
  <sequence>
    <name>${project.name}</name>
    <duration>${project.referenceSegments[project.referenceSegments.length - 1].endTime}</duration>
    <rate>
      <timebase>24</timebase>
      <ntsc>FALSE</ntsc>
    </rate>
    <media>
      <video>
        <track>
          ${clips}
        </track>
      </video>
    </media>
  </sequence>
</xmeml>`;
      
      logger.info('Premiere XML export completed successfully');
      return xml;
    } catch (error) {
      logger.error('Error generating Premiere XML', { error });
      throw new Error('Failed to generate Premiere XML file');
    }
  }
}
