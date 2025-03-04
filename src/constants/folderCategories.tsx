import React from 'react';
import { Heart, FileVideo, PartyPopper, Camera, Image, Users, Folder } from 'lucide-react';
import { FolderCategory } from '@/types';

export const FOLDERS: FolderCategory[] = [
  { 
    name: 'BridePrep', 
    icon: <Heart className="w-5 h-5" />, 
    description: 'Bride preparation and getting ready', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-pink-500/20 to-rose-500/20' 
  },
  { 
    name: 'GroomPrep', 
    icon: <Camera className="w-5 h-5" />, 
    description: 'Groom preparation footage', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-blue-500/20 to-indigo-500/20' 
  },
  { 
    name: 'Ceremony', 
    icon: <Heart className="w-5 h-5" />, 
    description: 'Wedding ceremony moments', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-purple-500/20 to-violet-500/20' 
  },
  { 
    name: 'Decoration', 
    icon: <FileVideo className="w-5 h-5" />, 
    description: 'Venue and decoration details', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-amber-500/20 to-yellow-500/20' 
  },
  { 
    name: 'DroneFootage', 
    icon: <FileVideo className="w-5 h-5" />, 
    description: 'Aerial shots of venue and ceremony', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-sky-500/20 to-blue-500/20' 
  },
  { 
    name: 'Reception', 
    icon: <PartyPopper className="w-5 h-5" />, 
    description: 'Wedding party and celebration', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-green-500/20 to-emerald-500/20' 
  },
  { 
    name: 'CoupleScenes', 
    icon: <Users className="w-5 h-5" />, 
    description: 'Romantic moments and couple interactions', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-red-500/20 to-pink-500/20' 
  },
  { 
    name: 'ProtocolPhotos', 
    icon: <Image className="w-5 h-5" />, 
    description: 'Formal and protocol photography sessions', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-violet-500/20 to-purple-500/20' 
  },
  { 
    name: 'OtherMoments', 
    icon: <Folder className="w-5 h-5" />, 
    description: 'Uncategorized and miscellaneous moments', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-gray-500/20 to-slate-500/20' 
  }
];

// Mantendo a compatibilidade com o nome anterior
export const FOLDER_CATEGORIES = FOLDERS;