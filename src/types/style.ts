import { VideoStyle } from './video';

export interface StyleItemProps {
  style: StyleDefinition;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onStyleSelect: (style: VideoStyle) => void;
}

export interface StyleDefinition {
  id: string;
  title: string;
  description: string;
  previewVideo: string;
  features: string[];
  technicalDetails?: {
    colorGrading: string;
    transitions: string;
    pacing: string;
    effects: string;
  };
}