export interface VideoSizeRange {
  min: number;
  max: number;
  name: string;
  label: string;
  description: string;
  icon: React.ReactNode | null;
  recommendedTracks: number;
  tier: 'basic' | 'pro' | 'business';
}