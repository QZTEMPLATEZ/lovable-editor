
import { Camera, Video, Music, Image, Gift, Mic, FileVideo, Plane, Clock, Film, Heart, Gem, PartyPopper, FileQuestion } from 'lucide-react';
import { FolderCategory } from '../types';

export const FOLDER_CATEGORIES: FolderCategory[] = [
  {
    name: 'BridePrep',
    icon: <Camera className="w-5 h-5" />,
    description: 'Making of da Noiva',
    expectedTypes: '.mp4, .mov',
    color: 'from-pink-500/20 to-rose-500/20'
  },
  {
    name: 'GroomPrep',
    icon: <Video className="w-5 h-5" />,
    description: 'Making of do Noivo',
    expectedTypes: '.mp4, .mov',
    color: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    name: 'Ceremony',
    icon: <Heart className="w-5 h-5" />,
    description: 'Cerimônia',
    expectedTypes: '.mp4, .mov',
    color: 'from-red-500/20 to-orange-500/20'
  },
  {
    name: 'Decoration',
    icon: <Gem className="w-5 h-5" />,
    description: 'Decoração',
    expectedTypes: '.mp4, .mov',
    color: 'from-purple-500/20 to-violet-500/20'
  },
  {
    name: 'Reception',
    icon: <PartyPopper className="w-5 h-5" />,
    description: 'Recepção e Festa',
    expectedTypes: '.mp4, .mov',
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    name: 'OtherMoments',
    icon: <FileQuestion className="w-5 h-5" />,
    description: 'Outros Momentos',
    expectedTypes: '.mp4, .mov',
    color: 'from-gray-500/20 to-gray-400/20'
  }
];
