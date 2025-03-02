
import { EditProject, MatchedClip, ReferenceVideoSegment } from "@/types/video";
import { logger } from "@/utils/logger";

export class FCPXMLExporter {
  private static formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    const frames = Math.floor((seconds % 1) * 24); // Assuming 24fps
    
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:${frames.toString().padStart(2, '0')}`;
  }
  
  private static generateClipXML(clip: MatchedClip, index: number): string {
    const inTime = this.formatTime(clip.inPoint);
    const outTime = this.formatTime(clip.outPoint);
    const duration = clip.outPoint - clip.inPoint;
    
    return `
      <clip id="clip-${index}" name="Clip ${index}">
        <file id="file-${index}">
          <name>${clip.matchedFile.name}</name>
          <pathurl>file://${clip.matchedFile.name}</pathurl>
          <duration>${duration}</duration>
        </file>
        <in>${inTime}</in>
        <out>${outTime}</out>
        <duration>${duration}</duration>
      </clip>
    `;
  }
  
  static export(project: EditProject): string {
    try {
      logger.info('Starting FCPXML export', { projectName: project.name });
      
      const clips = project.matchedClips.map((clip, index) => 
        this.generateClipXML(clip, index)
      ).join('\n');
      
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE fcpxml>
<fcpxml version="1.9">
  <resources>
    <format id="r1" name="FFVideoFormat1080p24" frameDuration="1/24s" width="1920" height="1080"/>
  </resources>
  <library>
    <event name="${project.name}">
      <project name="${project.name}">
        <sequence format="r1" duration="${project.referenceSegments[project.referenceSegments.length - 1].endTime}s">
          <spine>
            ${clips}
          </spine>
        </sequence>
      </project>
    </event>
  </library>
</fcpxml>`;
      
      logger.info('FCPXML export completed successfully');
      return xml;
    } catch (error) {
      logger.error('Error generating FCPXML', { error });
      throw new Error('Failed to generate FCPXML file');
    }
  }
}
