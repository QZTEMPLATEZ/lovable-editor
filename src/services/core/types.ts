
export type SceneType = 'emotional' | 'action' | 'default';

export interface FrameAnalysis {
  timePoint: number;
  motionScore: number;
  sceneType: SceneType;
  hasFaces: boolean;
  peaks?: number[];
  averageMotion?: number;
}

export interface AudioAnalysis {
  beats: number[];
  energy: number;
  tempo: number;
}

export interface EditingRule {
  minDuration: number;
  maxDuration: number;
  preferredTransition: string;
  energyThreshold: number;
}

export interface EditingPreset {
  emotional: EditingRule;
  action: EditingRule;
  default: EditingRule;
}
