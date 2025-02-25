
export interface FrameData {
  width: number;
  height: number;
  data: Uint8ClampedArray;
}

export interface FrameAnalysis {
  timePoint: number;
  motionScore: number;
  sceneType: SceneType;
  hasFaces: boolean;
  frameData: FrameData;
}

export interface AudioAnalysis {
  beats: number[];
  energy: number;
  tempo: number;
}

export type SceneType = 'emotional' | 'action' | 'default';

export interface EditingPreset {
  [key in SceneType]: {
    minDuration: number;
    maxDuration: number;
    preferredTransition: string;
    energyThreshold: number;
  };
}

export interface ClipInfo {
  timePoint: number;
  duration: number;
  transition?: string;
  sourceClip: any; // Referência ao clip original do Premiere
}

export interface EditingSequence {
  clips: ClipInfo[];
}
