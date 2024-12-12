import { VideoSizeRange } from '../types';

export const VIDEO_SIZES: VideoSizeRange[] = [
  {
    min: 3,
    max: 5,
    name: "Trailer",
    label: "3-5 minutes",
    description: "Dynamic event summary\n• Best moment highlights\n• Engaging transitions\n• Emotional storytelling\n• Professional pacing\n• Perfect for sharing",
    icon: null,
    recommendedTracks: 2,
    tier: 'pro'
  },
  {
    min: 0.5,
    max: 1.5,
    name: "Social",
    label: "30s - 1:30min",
    description: "Quick, high-energy edit for social media\n• Perfect for Instagram/TikTok\n• Fast-paced highlights\n• Key moments only\n• Music-driven edits\n• Vertical format ready",
    icon: null,
    recommendedTracks: 1,
    tier: 'basic'
  },
  {
    min: 8,
    max: 12,
    name: "Short Film",
    label: "8-12 minutes",
    description: "Detailed artistic edit",
    icon: null,
    recommendedTracks: 3,
    tier: 'pro'
  },
  {
    min: 15,
    max: 20,
    name: "Wedding Movie",
    label: "15-20 minutes",
    description: "Comprehensive coverage",
    icon: null,
    recommendedTracks: 4,
    tier: 'business'
  },
  {
    min: 30,
    max: 40,
    name: "Cinematic Wedding",
    label: "30-40 minutes",
    description: "Full cinematic experience",
    icon: null,
    recommendedTracks: 6,
    tier: 'business'
  }
];

export const VIDEO_STYLES = [
  {
    id: 'classic',
    title: 'Classic Cinematic',
    description: 'Timeless & Emotional',
    previewVideo: 'https://www.dropbox.com/scl/fi/6qe8m4ab7nzjj14ne0h6u/CLASSIC-LONG-OK-OK.mp4?raw=1',
    features: [
      "Warm, film-inspired color grading for timeless appeal",
      "Perfectly balanced framing with golden ratio composition",
      "Smooth, intentional camera movements that enhance emotion",
      "Carefully crafted emotional storytelling progression",
      "Scene-specific pacing that matches the moments intensity",
      "Elegant transitions that flow naturally between scenes",
      "Rich orchestral sound design with layered ambient audio",
      "Traditional 24fps cinematic look and feel",
      "Thoughtful use of slow motion for emotional peaks",
      "Professional color correction with film emulation"
    ],
    technicalDetails: {
      colorGrading: "Warm, film-like tones with subtle contrast",
      transitions: "Cross dissolves, gentle fades",
      pacing: "Measured, intentional cuts (3-5 seconds)",
      effects: "Light film grain, anamorphic lens simulation"
    }
  },
  {
    id: 'cinematic',
    title: 'Modern Cinema',
    description: 'Contemporary & Bold',
    previewVideo: 'https://www.dropbox.com/scl/fi/ng9ndcl10lcownk1mtx4g/CINEMATOGRAFICO-LONG-OK.mp4?raw=1',
    features: [
      "High-contrast film-like grading with cinematic LUTs",
      "Dynamic camera movements with advanced stabilization",
      "Dramatic lighting emphasis using advanced color science",
      "Creative depth transitions with parallax effects",
      "Bold, non-linear storytelling approach",
      "Artistic scene sequencing with emotional build-up",
      "Enhanced emotional peaks through advanced editing",
      "Premium sound design with orchestral elements",
      "Anamorphic widescreen aspect ratio",
      "Hollywood-grade color treatment and finishing"
    ],
    technicalDetails: {
      colorGrading: "High contrast, cinematic color science",
      transitions: "Dynamic wipes, creative morphs",
      pacing: "Variable pacing (1-4 seconds)",
      effects: "Lens flares, advanced color grading"
    }
  },
  {
    id: 'documentary',
    title: 'Documentary',
    description: 'Authentic & Natural',
    previewVideo: 'https://www.dropbox.com/scl/fi/rxab2rc98t7ox9hxcrb4b/251219_Urban-Couple-Photoshoot-Photography_By_Azulroto_Artlist_4K.mp4?raw=1',
    features: [
      "Natural color grading preserving true-to-life colors",
      "Authentic storytelling following real events",
      "Chronological sequencing with minimal manipulation",
      "Crystal-clear dialogue and speech enhancement",
      "Long, uninterrupted takes capturing genuine moments",
      "Minimal transitions to maintain authenticity",
      "Rich ambient sound capture and preservation",
      "Real-time pacing that respects natural flow",
      "Focus on candid reactions and genuine emotions",
      "Natural lighting with minimal enhancement"
    ],
    technicalDetails: {
      colorGrading: "Natural, true-to-life colors",
      transitions: "Simple cuts, minimal effects",
      pacing: "Extended shots (5-15 seconds)",
      effects: "Subtle stabilization only"
    }
  },
  {
    id: 'dynamic',
    title: 'Dynamic',
    description: 'Energetic & Bold',
    previewVideo: 'https://www.dropbox.com/scl/fi/m75wtfagul3ui9qbi996b/DINAMICO-OK.mp4?raw=1',
    features: [
      "High-energy editing synchronized with music beats",
      "Vibrant color treatment with enhanced saturation",
      "Fast-paced cuts timed to musical rhythm",
      "Creative speed ramping and time manipulation",
      "Modern transition effects (whips, zooms, morphs)",
      "Split-screen and multi-angle compositions",
      "Advanced motion graphics and text animations",
      "Contemporary sound design with beat matching",
      "Dramatic slow motion and time-lapse sequences",
      "Cutting-edge visual effects and overlays"
    ],
    technicalDetails: {
      colorGrading: "High saturation, vibrant look",
      transitions: "Fast cuts, whip pans, zooms",
      pacing: "Rapid cuts (0.5-2 seconds)",
      effects: "Speed ramping, motion graphics"
    }
  }
];
