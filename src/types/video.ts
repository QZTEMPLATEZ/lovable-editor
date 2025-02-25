
export type VideoStyle = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  features?: string[];
  technicalDetails?: {
    colorGrading?: string;
    transitions?: string;
    pacing?: string;
    effects?: string;
  };
  editingRules?: {
    takeDuration: {
      emotional: { min: number; max: number };
      action: { min: number; max: number };
      default: { min: number; max: number };
    };
    transitions: {
      directCut: number;
      crossDissolve: number;
      speedRamp: number;
      fadeToBlack: number;
    };
    musicSync: {
      beatMatch: boolean;
      energyMatch: boolean;
      tempoRange: { min: number; max: number };
    };
  };
};

export type VideoCategory = 
  | 'brideprep'
  | 'groomprep'
  | 'decoration'
  | 'drone'
  | 'ceremony'
  | 'reception'
  | 'untagged';

export interface VideoAnalysisResult {
  file: File;
  category: VideoCategory;
  confidence: number;
  motionAnalysis?: {
    averageMotion: number;
    peaks: number[];
    sceneType: 'emotional' | 'action' | 'default';
  };
  audioAnalysis?: {
    beats: number[];
    energy: number;
    tempo: number;
  };
}

export type EditingPreset = {
  name: string;
  rules: {
    takeDuration: {
      emotional: [number, number];
      action: [number, number];
      default: [number, number];
    };
    transitions: {
      directCut: number;
      crossDissolve: number;
      speedRamp: number;
      fadeToBlack: number;
    };
  };
};
