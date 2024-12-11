import { Camera, Video, Music, Image, Gift, Mic, FileVideo, Plane, Clock, Film } from 'lucide-react';
import { FolderCategory } from '../types';

export const FOLDER_CATEGORIES: FolderCategory[] = [
  {
    name: 'MakingOf',
    icon: <Camera className="w-5 h-5" />,
    description: 'Preparation process footage',
    expectedTypes: '.mp4, .mov',
    color: 'from-purple-500/20 to-pink-500/20',
    subfolders: [
      {
        name: 'BridePrep',
        icon: <Camera className="w-4 h-4" />,
        description: 'Bride getting ready footage',
        expectedTypes: '.mp4, .mov',
        color: 'from-pink-400/20 to-pink-300/20'
      },
      {
        name: 'GroomPrep',
        icon: <Camera className="w-4 h-4" />,
        description: 'Groom preparation footage',
        expectedTypes: '.mp4, .mov',
        color: 'from-blue-400/20 to-blue-300/20'
      },
      {
        name: 'FamilyAndFriends',
        icon: <Video className="w-4 h-4" />,
        description: 'Family and friends preparation moments',
        expectedTypes: '.mp4, .mov',
        color: 'from-green-400/20 to-green-300/20'
      },
      {
        name: 'VenuePrep',
        icon: <Video className="w-4 h-4" />,
        description: 'Venue setup footage',
        expectedTypes: '.mp4, .mov',
        color: 'from-yellow-400/20 to-yellow-300/20'
      }
    ]
  },
  {
    name: 'Ceremony',
    icon: <Video className="w-5 h-5" />,
    description: 'Main ceremony footage',
    expectedTypes: '.mp4, .mov',
    color: 'from-blue-500/20 to-cyan-500/20',
    subfolders: [
      {
        name: 'Processional',
        icon: <Video className="w-4 h-4" />,
        description: 'Wedding party entrance',
        expectedTypes: '.mp4, .mov',
        color: 'from-blue-400/20 to-blue-300/20'
      },
      {
        name: 'Vows',
        icon: <Video className="w-4 h-4" />,
        description: 'Exchange of vows',
        expectedTypes: '.mp4, .mov',
        color: 'from-purple-400/20 to-purple-300/20'
      },
      {
        name: 'KeyMoments',
        icon: <Video className="w-4 h-4" />,
        description: 'Special ceremonial moments',
        expectedTypes: '.mp4, .mov',
        color: 'from-pink-400/20 to-pink-300/20'
      }
    ]
  },
  {
    name: 'Details',
    icon: <Image className="w-5 h-5" />,
    description: 'Close-up shots and details',
    expectedTypes: '.mp4, .mov, .jpg, .png',
    color: 'from-green-500/20 to-emerald-500/20',
    subfolders: [
      {
        name: 'Rings',
        icon: <Gift className="w-4 h-4" />,
        description: 'Ring shots',
        expectedTypes: '.mp4, .mov, .jpg, .png',
        color: 'from-yellow-400/20 to-yellow-300/20'
      },
      {
        name: 'Decor',
        icon: <Image className="w-4 h-4" />,
        description: 'Decoration details',
        expectedTypes: '.mp4, .mov, .jpg, .png',
        color: 'from-purple-400/20 to-purple-300/20'
      }
    ]
  },
  {
    name: 'Audio',
    icon: <Mic className="w-5 h-5" />,
    description: 'Audio recordings',
    expectedTypes: '.mp3, .wav',
    color: 'from-orange-500/20 to-amber-500/20',
    subfolders: [
      {
        name: 'VowsAudio',
        icon: <Mic className="w-4 h-4" />,
        description: 'Vows recordings',
        expectedTypes: '.mp3, .wav',
        color: 'from-red-400/20 to-red-300/20'
      },
      {
        name: 'Speeches',
        icon: <Mic className="w-4 h-4" />,
        description: 'Speech recordings',
        expectedTypes: '.mp3, .wav',
        color: 'from-orange-400/20 to-orange-300/20'
      }
    ]
  },
  {
    name: 'DroneFootage',
    icon: <Plane className="w-5 h-5" />,
    description: 'Aerial shots',
    expectedTypes: '.mp4, .mov',
    color: 'from-sky-500/20 to-blue-500/20'
  },
  {
    name: 'SlowMotion',
    icon: <Clock className="w-5 h-5" />,
    description: 'Slow motion clips',
    expectedTypes: '.mp4, .mov',
    color: 'from-indigo-500/20 to-purple-500/20'
  },
  {
    name: 'B-Roll',
    icon: <Film className="w-5 h-5" />,
    description: 'Additional footage',
    expectedTypes: '.mp4, .mov',
    color: 'from-gray-500/20 to-slate-500/20'
  }
];