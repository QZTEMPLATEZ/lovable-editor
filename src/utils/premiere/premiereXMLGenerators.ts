import { EditingProject } from '../videoEditingLogic';
import { logger } from '../logger';

export const generatePremiereXMLLegacy = (project: EditingProject): string => {
  logger.info('Generating legacy Premiere XML format');
  const timebase = 30; // NTSC timebase
  const mediaStart = 0;
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="4">
  <sequence>
    <name>Wedding Highlights</name>
    <duration>${project.duration.max * timebase * 60}</duration>
    <rate>
      <timebase>${timebase}</timebase>
      <ntsc>TRUE</ntsc>
    </rate>
    <media>
      <video>
        ${project.clips.map((clip, index) => `
          <track>
            <clipitem id="clipitem-${index + 1}">
              <name>${clip.file.name}</name>
              <duration>${clip.endTime - clip.startTime}</duration>
              <rate>
                <timebase>${timebase}</timebase>
                <ntsc>TRUE</ntsc>
              </rate>
              <start>${mediaStart}</start>
              <end>${clip.endTime - clip.startTime}</end>
              <file id="file-${index + 1}">
                <name>${clip.file.name}</name>
                <pathurl>${clip.file.name}</pathurl>
                <media>
                  <video>
                    <samplecharacteristics>
                      <rate>
                        <timebase>${timebase}</timebase>
                        <ntsc>TRUE</ntsc>
                      </rate>
                    </samplecharacteristics>
                  </video>
                </media>
              </file>
            </clipitem>
          </track>
        `).join('')}
      </video>
      <audio>
        ${project.music ? `
          <track>
            <clipitem>
              <name>${project.music.file.name}</name>
              <duration>${project.duration.max * timebase * 60}</duration>
              <file id="audio-1">
                <name>${project.music.file.name}</name>
                <pathurl>${project.music.file.name}</pathurl>
              </file>
            </clipitem>
          </track>
        ` : ''}
      </audio>
    </media>
  </sequence>
</xmeml>`;
};

export const generatePremiereXMLCurrent = (project: EditingProject): string => {
  logger.info('Generating current Premiere XML format');
  return `<?xml version="1.0" encoding="UTF-8"?>
<premiere-project version="7">
  <project>
    <sequences>
      <sequence id="sequence-1">
        <duration>${project.duration.max * 60}</duration>
        <videoTracks>
          ${project.clips.map((clip, index) => `
            <track id="${index + 1}">
              <clip>
                <name>${clip.file.name}</name>
                <pathurl>${clip.file.name}</pathurl>
                <duration>${clip.endTime - clip.startTime}</duration>
                <start>0</start>
                <end>${clip.endTime - clip.startTime}</end>
              </clip>
            </track>
          `).join('')}
        </videoTracks>
        <audioTracks>
          ${project.music ? `
            <track id="audio-1">
              <clip>
                <name>${project.music.file.name}</name>
                <pathurl>${project.music.file.name}</pathurl>
                <duration>${project.duration.max * 60}</duration>
              </clip>
            </track>
          ` : ''}
        </audioTracks>
      </sequence>
    </sequences>
  </project>
</premiere-project>`;
};

export const generatePremiereXMLCompatible = (project: EditingProject): string => {
  logger.info('Generating compatible Premiere XML format');
  return `<?xml version="1.0" encoding="UTF-8"?>
<premieredata version="1">
  <sequence>
    <name>Wedding Highlights</name>
    <duration>${project.duration.max * 60}</duration>
    <timebase>30</timebase>
    <media>
      <video>
        ${project.clips.map((clip, index) => `
          <track>
            <clipitem>
              <masterclip>${clip.file.name}</masterclip>
              <name>${clip.file.name}</name>
              <enabled>TRUE</enabled>
              <duration>${clip.endTime - clip.startTime}</duration>
              <start>0</start>
              <end>${clip.endTime - clip.startTime}</end>
              <in>0</in>
              <out>${clip.endTime - clip.startTime}</out>
              <file>
                <name>${clip.file.name}</name>
                <pathurl>${clip.file.name}</pathurl>
              </file>
            </clipitem>
          </track>
        `).join('')}
      </video>
      <audio>
        ${project.music ? `
          <track>
            <clipitem>
              <name>${project.music.file.name}</name>
              <enabled>TRUE</enabled>
              <duration>${project.duration.max * 60}</duration>
              <file>
                <name>${project.music.file.name}</name>
                <pathurl>${project.music.file.name}</pathurl>
              </file>
            </clipitem>
          </track>
        ` : ''}
      </audio>
    </media>
  </sequence>
</premieredata>`;
};