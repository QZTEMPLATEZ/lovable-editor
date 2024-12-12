import { EditingProject } from './videoEditingLogic';

interface ExportOptions {
  format: 'premiere' | 'finalcut' | 'resolve';
}

const generatePremiereXML = (project: EditingProject): string => {
  const currentDate = new Date().toISOString();
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="5">
  <sequence>
    <name>Wedding Highlights</name>
    <duration>1800</duration>
    <rate>
      <timebase>30</timebase>
      <ntsc>TRUE</ntsc>
    </rate>
    <timecode>
      <rate>
        <timebase>30</timebase>
        <ntsc>TRUE</ntsc>
      </rate>
      <string>00:00:00:00</string>
      <frame>0</frame>
      <source>source</source>
      <displayformat>NDF</displayformat>
    </timecode>
    <media>
      <video>
        <format>
          <samplecharacteristics>
            <width>1920</width>
            <height>1080</height>
            <pixelaspectratio>square</pixelaspectratio>
            <rate>
              <timebase>30</timebase>
              <ntsc>TRUE</ntsc>
            </rate>
            <codec>
              <name>H.264</name>
            </codec>
          </samplecharacteristics>
        </format>
        <track>
          ${project.clips.map((clip, index) => `
            <clipitem id="clipitem-${index + 1}">
              <name>${clip.file.name}</name>
              <duration>300</duration>
              <rate>
                <timebase>30</timebase>
                <ntsc>TRUE</ntsc>
              </rate>
              <start>0</start>
              <end>300</end>
              <file id="file-${index + 1}">
                <name>${clip.file.name}</name>
                <pathurl>file://localhost/${clip.file.name}</pathurl>
                <rate>
                  <timebase>30</timebase>
                  <ntsc>TRUE</ntsc>
                </rate>
                <media>
                  <video>
                    <samplecharacteristics>
                      <width>1920</width>
                      <height>1080</height>
                      <pixelaspectratio>square</pixelaspectratio>
                    </samplecharacteristics>
                  </video>
                </media>
              </file>
            </clipitem>
          `).join('')}
        </track>
      </video>
      <audio>
        <track/>
      </audio>
    </media>
  </sequence>
</xmeml>`;
};

const generateFinalCutXML = (project: EditingProject): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <fcpxml version="1.9">
      <project>
        <sequence>
          ${project.clips.map((clip, index) => `
            <clip>
              <source>${clip.file.name}</source>
              <type>${clip.type}</type>
            </clip>
          `).join('')}
        </sequence>
      </project>
    </fcpxml>`;
};

const generateResolveXML = (project: EditingProject): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <DaVinciResolve>
      <Timeline>
        ${project.clips.map((clip, index) => `
          <Clip>
            <Source>${clip.file.name}</Source>
            <Type>${clip.type}</Type>
          </Clip>
        `).join('')}
      </Timeline>
    </DaVinciResolve>`;
};

export const exportProject = async (
  project: EditingProject,
  options: ExportOptions
): Promise<Blob> => {
  let exportData: string;

  switch (options.format) {
    case 'premiere':
      exportData = generatePremiereXML(project);
      break;
    case 'finalcut':
      exportData = generateFinalCutXML(project);
      break;
    case 'resolve':
      exportData = generateResolveXML(project);
      break;
    default:
      throw new Error('Unsupported export format');
  }

  return new Blob([exportData], { type: 'application/xml' });
};