import { EditingProject } from './videoEditingLogic';

interface ExportOptions {
  format: 'premiere' | 'finalcut' | 'resolve';
  version?: 'legacy' | 'current' | 'compatible';
}

const generatePremiereXMLLegacy = (project: EditingProject): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <Project ObjectRef="1">
      <Group>1</Group>
      <Children ObjectRef="2"/>
      <BinTreeGroup>
        <Items>
          ${project.clips.map((clip, index) => `
            <Item ObjectID="${index + 3}">
              <Name>${clip.file.name}</Name>
              <Type>Clip</Type>
              <Media>
                <Video>
                  <FilePathURL>${clip.file.name}</FilePathURL>
                </Video>
              </Media>
            </Item>
          `).join('')}
        </Items>
      </BinTreeGroup>
    </Project>`;
};

const generatePremiereXMLCurrent = (project: EditingProject): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <PremiereData Version="7">
      <Project>
        <Timeline>
          ${project.clips.map((clip, index) => `
            <ClipItem>
              <Source>${clip.file.name}</Source>
              <Type>${clip.type}</Type>
              <Start>0</Start>
              <End>300</End>
            </ClipItem>
          `).join('')}
        </Timeline>
      </Project>
    </PremiereData>`;
};

const generatePremiereXMLCompatible = (project: EditingProject): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <xmeml version="5">
      <sequence>
        <name>Organized Sequence</name>
        <media>
          ${project.clips.map((clip, index) => `
            <video>
              <track>
                <clipitem>
                  <name>${clip.file.name}</name>
                  <file>
                    <name>${clip.file.name}</name>
                    <pathurl>${clip.file.name}</pathurl>
                  </file>
                </clipitem>
              </track>
            </video>
          `).join('')}
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

  if (options.format === 'premiere') {
    switch (options.version) {
      case 'legacy':
        exportData = generatePremiereXMLLegacy(project);
        break;
      case 'compatible':
        exportData = generatePremiereXMLCompatible(project);
        break;
      default:
        exportData = generatePremiereXMLCurrent(project);
    }
  } else if (options.format === 'finalcut') {
    exportData = generateFinalCutXML(project);
  } else {
    exportData = generateResolveXML(project);
  }

  return new Blob([exportData], { type: 'application/xml' });
};