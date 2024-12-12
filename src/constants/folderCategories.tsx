import { Camera, Video, Music, Image, Gift, Mic, FileVideo, Plane, Clock, Film, Heart, Ring, Party, HelpCircle } from 'lucide-react';
import { FolderCategory } from '../types';

export const FOLDER_CATEGORIES: FolderCategory[] = [
  {
    name: 'BridePrep',
    icon: <Heart className="w-5 h-5" />,
    description: 'Bride preparation and getting ready',
    expectedTypes: '.mp4, .mov',
    color: 'from-pink-500/20 to-rose-500/20',
    subfolders: [
      {
        name: 'Makeup',
        icon: <Camera className="w-4 h-4" />,
        description: 'Bride makeup process',
        expectedTypes: '.mp4, .mov',
        color: 'from-pink-400/20 to-pink-300/20'
      },
      {
        name: 'Dress',
        icon: <Camera className="w-4 h-4" />,
        description: 'Wedding dress moments',
        expectedTypes: '.mp4, .mov',
        color: 'from-pink-400/20 to-pink-300/20'
      },
      {
        name: 'BridalDetails',
        icon: <Ring className="w-4 h-4" />,
        description: 'Bride accessories and details',
        expectedTypes: '.mp4, .mov',
        color: 'from-pink-400/20 to-pink-300/20'
      }
    ]
  },
  {
    name: 'GroomPrep',
    icon: <Video className="w-5 h-5" />,
    description: 'Groom preparation footage',
    expectedTypes: '.mp4, .mov',
    color: 'from-blue-500/20 to-indigo-500/20',
    subfolders: [
      {
        name: 'Suit',
        icon: <Camera className="w-4 h-4" />,
        description: 'Groom getting dressed',
        expectedTypes: '.mp4, .mov',
        color: 'from-blue-400/20 to-blue-300/20'
      },
      {
        name: 'GroomDetails',
        icon: <Ring className="w-4 h-4" />,
        description: 'Groom accessories and details',
        expectedTypes: '.mp4, .mov',
        color: 'from-blue-400/20 to-blue-300/20'
      }
    ]
  },
  {
    name: 'Ceremony',
    icon: <Heart className="w-5 h-5" />,
    description: 'Wedding ceremony moments',
    expectedTypes: '.mp4, .mov',
    color: 'from-purple-500/20 to-violet-500/20',
    subfolders: [
      {
        name: 'Entrance',
        icon: <Video className="w-4 h-4" />,
        description: 'Ceremony entrance footage',
        expectedTypes: '.mp4, .mov',
        color: 'from-purple-400/20 to-purple-300/20'
      },
      {
        name: 'Vows',
        icon: <Video className="w-4 h-4" />,
        description: 'Wedding vows exchange',
        expectedTypes: '.mp4, .mov',
        color: 'from-purple-400/20 to-purple-300/20'
      },
      {
        name: 'RingExchange',
        icon: <Ring className="w-4 h-4" />,
        description: 'Ring exchange moment',
        expectedTypes: '.mp4, .mov',
        color: 'from-purple-400/20 to-purple-300/20'
      }
    ]
  },
  {
    name: 'Decoration',
    icon: <Image className="w-5 h-5" />,
    description: 'Venue and decoration details',
    expectedTypes: '.mp4, .mov, .jpg, .png',
    color: 'from-amber-500/20 to-yellow-500/20',
    subfolders: [
      {
        name: 'Venue',
        icon: <Image className="w-4 h-4" />,
        description: 'Venue setup and details',
        expectedTypes: '.mp4, .mov, .jpg, .png',
        color: 'from-amber-400/20 to-amber-300/20'
      },
      {
        name: 'Flowers',
        icon: <Image className="w-4 h-4" />,
        description: 'Floral arrangements',
        expectedTypes: '.mp4, .mov, .jpg, .png',
        color: 'from-amber-400/20 to-amber-300/20'
      }
    ]
  },
  {
    name: 'DroneFootage',
    icon: <Plane className="w-5 h-5" />,
    description: 'Aerial shots of venue and ceremony',
    expectedTypes: '.mp4, .mov',
    color: 'from-sky-500/20 to-blue-500/20'
  },
  {
    name: 'Reception',
    icon: <Party className="w-5 h-5" />,
    description: 'Wedding party and celebration',
    expectedTypes: '.mp4, .mov',
    color: 'from-green-500/20 to-emerald-500/20',
    subfolders: [
      {
        name: 'FirstDance',
        icon: <Video className="w-4 h-4" />,
        description: 'First dance moments',
        expectedTypes: '.mp4, .mov',
        color: 'from-green-400/20 to-green-300/20'
      },
      {
        name: 'Party',
        icon: <Party className="w-4 h-4" />,
        description: 'Party celebration footage',
        expectedTypes: '.mp4, .mov',
        color: 'from-green-400/20 to-green-300/20'
      }
    ]
  },
  {
    name: 'Untagged',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'Videos pending classification',
    expectedTypes: '.mp4, .mov',
    color: 'from-gray-500/20 to-slate-500/20'
  }
];