
interface VideoClip {
  id: string;
  source: string;
  inPoint: number;
  outPoint: number;
  category: string;
  duration: number;
}

interface AudioTrack {
  id: string;
  source: string;
  startTime: number;
  duration: number;
  volume: number;
}

interface TransitionEffect {
  type: 'dissolve' | 'fade' | 'wipe';
  duration: number;
}

const generateClipXML = (clip: VideoClip): string => {
  return `
    <clipitem id="${clip.id}">
      <name>${clip.source}</name>
      <duration>${clip.duration}</duration>
      <rate>
        <timebase>30</timebase>
        <ntsc>TRUE</ntsc>
      </rate>
      <in>${clip.inPoint}</in>
      <out>${clip.outPoint}</out>
      <file id="${clip.id}_source">
        <name>${clip.source}</name>
        <pathurl>file://localhost/${clip.source}</pathurl>
      </file>
    </clipitem>
  `;
};

const generateAudioXML = (audio: AudioTrack): string => {
  return `
    <audio id="${audio.id}">
      <name>${audio.source}</name>
      <duration>${audio.duration}</duration>
      <volume>${audio.volume}</volume>
      <file id="${audio.id}_source">
        <name>${audio.source}</name>
        <pathurl>file://localhost/${audio.source}</pathurl>
      </file>
    </audio>
  `;
};

const generateTransitionXML = (transition: TransitionEffect): string => {
  return `
    <transition>
      <effect>
        <name>${transition.type}</name>
        <duration>${transition.duration}</duration>
      </effect>
    </transition>
  `;
};

export const generatePremiereXML = (
  projectName: string,
  videoClips: VideoClip[],
  audioTracks: AudioTrack[],
  transitions: TransitionEffect[]
): string => {
  const clipElements = videoClips.map(generateClipXML).join('\n');
  const audioElements = audioTracks.map(generateAudioXML).join('\n');
  const transitionElements = transitions.map(generateTransitionXML).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE xmeml>
<xmeml version="5">
  <sequence id="${projectName}">
    <name>${projectName}</name>
    <duration>${Math.max(...videoClips.map(c => c.outPoint))}</duration>
    <rate>
      <timebase>30</timebase>
      <ntsc>TRUE</ntsc>
    </rate>
    <media>
      <video>
        ${clipElements}
        ${transitionElements}
      </video>
      <audio>
        ${audioElements}
      </audio>
    </media>
  </sequence>
</xmeml>`;
};
