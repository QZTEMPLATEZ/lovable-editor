
export interface PremiereClip {
  id: string;
  name: string;
  duration: number;
  startTime?: number;
  energy?: number;
  moveTo?: (time: number) => void;
}

export interface PremiereSequence {
  id: string;
  name: string;
  clips: PremiereClip[];
  addClip: (clipId: string, startTime: number) => void;
  addMarker: (time: number, comment: string, color: string) => void;
  addTransition: (type: string, startTime: number, duration: number) => void;
  getAllClips: () => PremiereClip[];
  getAllAudioTracks: () => any[];
  hasTransition: (clip1: PremiereClip, clip2: PremiereClip) => boolean;
}

export interface PremiereProject {
  id: string;
  name: string;
  sequences: PremiereSequence[];
  createSequence: (name: string, resolution: string, fps: string) => PremiereSequence;
  getSequenceByName: (name: string) => PremiereSequence | null;
  getMediaInBin: (binName: string) => PremiereClip[];
}

declare global {
  interface Window {
    premiere: {
      project: PremiereProject;
    };
  }
}

export interface UXPHostApplication {
  ppro: {
    version: string;
    project: PremiereProject;
    onDocumentOpened: (callback: () => void) => void;
    onDocumentClosed: (callback: () => void) => void;
  };
}

declare global {
  const app: UXPHostApplication;
}
