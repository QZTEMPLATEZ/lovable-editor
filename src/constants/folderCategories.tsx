import { Camera, Video, Music, Image, Gift, Mic, FileVideo, Plane, Clock, Film, Heart, Gem, PartyPopper, HelpCircle } from 'lucide-react';
import { FolderCategory } from '../types';

export const FOLDER_CATEGORIES: FolderCategory[] = [
  {
    name: 'BridePrep',
    icon: <Heart className="w-5 h-5" />,
    description: 'Bride preparation and getting ready',
    expectedTypes: '.mp4, .mov',
    color: 'from-pink-500/20 to-rose-500/20'
  },
  {
    name: 'GroomPrep',
    icon: <Video className="w-5 h-5" />,
    description: 'Groom preparation footage',
    expectedTypes: '.mp4, .mov',
    color: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    name: 'Ceremony',
    icon: <Heart className="w-5 h-5" />,
    description: 'Wedding ceremony moments',
    expectedTypes: '.mp4, .mov',
    color: 'from-purple-500/20 to-violet-500/20'
  },
  {
    name: 'Decoration',
    icon: <Image className="w-5 h-5" />,
    description: 'Venue and decoration details',
    expectedTypes: '.mp4, .mov, .jpg, .png',
    color: 'from-amber-500/20 to-yellow-500/20'
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
    icon: <PartyPopper className="w-5 h-5" />,
    description: 'Wedding party and celebration',
    expectedTypes: '.mp4, .mov',
    color: 'from-green-500/20 to-emerald-500/20'
  }
];