
export type VideoStyle = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
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
  timeCode?: string;
}

export interface ReferenceVideoSegment {
  startTime: number;
  endTime: number;
  category: VideoCategory;
  duration: number;
  transition?: 'cut' | 'dissolve' | 'fade';
  transitionDuration?: number;
}

export interface MatchedClip {
  referenceSegment: ReferenceVideoSegment;
  matchedFile: File;
  similarityScore: number;
  inPoint: number;
  outPoint: number;
}

export interface EditProject {
  name: string;
  referenceVideo: File;
  rawFootage: File[];
  referenceSegments: ReferenceVideoSegment[];
  matchedClips: MatchedClip[];
  created: Date;
  modified: Date;
}

export interface ExportOptions {
  format: 'xml' | 'edl' | 'fcpxml';
  includeAudio: boolean;
  includeTransitions: boolean;
}
