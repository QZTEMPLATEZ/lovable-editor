
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
}
