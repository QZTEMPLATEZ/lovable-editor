import { Heart, FileVideo, PartyPopper, Camera, Users, Music } from 'lucide-react';
import { FolderCategory } from '@/types';

export const FOLDERS: FolderCategory[] = [
  { 
    name: 'Alianca Beijo e Saida', 
    icon: () => <Heart className="w-5 h-5" />, 
    description: 'Momentos da aliança, beijo e saída', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-purple-500/20 to-purple-400/20' 
  },
  { 
    name: 'Cenas do Casal', 
    icon: () => <Heart className="w-5 h-5" />, 
    description: 'Cenas exclusivas do casal', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-cyan-500/20 to-cyan-400/20' 
  },
  { 
    name: 'Danca do Casal', 
    icon: () => <Music className="w-5 h-5" />, 
    description: 'Primeira dança e momentos de dança', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-purple-500/20 to-purple-400/20' 
  },
  { 
    name: 'Decoracao', 
    icon: () => <FileVideo className="w-5 h-5" />, 
    description: 'Detalhes da decoração', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-orange-500/20 to-orange-400/20' 
  },
  { 
    name: 'Entrada da Noiva', 
    icon: () => <Heart className="w-5 h-5" />, 
    description: 'Entrada da noiva na cerimônia', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-green-500/20 to-green-400/20' 
  },
  { 
    name: 'Entrada do Noivo', 
    icon: () => <Heart className="w-5 h-5" />, 
    description: 'Entrada do noivo na cerimônia', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-red-500/20 to-red-400/20' 
  },
  { 
    name: 'Entrada Padrinhos', 
    icon: () => <Users className="w-5 h-5" />, 
    description: 'Entrada dos padrinhos', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-red-500/20 to-red-400/20' 
  },
  { 
    name: 'Making Of da Noiva', 
    icon: () => <Camera className="w-5 h-5" />, 
    description: 'Preparação da noiva', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-pink-500/20 to-pink-400/20' 
  },
  { 
    name: 'Making Of do Noivo', 
    icon: () => <Camera className="w-5 h-5" />, 
    description: 'Preparação do noivo', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-teal-500/20 to-teal-400/20' 
  },
  { 
    name: 'Cenas Extras', 
    icon: () => <FileVideo className="w-5 h-5" />, 
    description: 'Cenas adicionais', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-purple-500/20 to-purple-400/20' 
  },
  { 
    name: 'Noiva Pronta', 
    icon: () => <Heart className="w-5 h-5" />, 
    description: 'Momentos da noiva pronta', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-teal-500/20 to-teal-400/20' 
  },
  { 
    name: 'Takes da Cerimonia', 
    icon: () => <FileVideo className="w-5 h-5" />, 
    description: 'Momentos da cerimônia', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-orange-500/20 to-orange-400/20' 
  },
  { 
    name: 'Festa', 
    icon: () => <PartyPopper className="w-5 h-5" />, 
    description: 'Momentos da festa e recepção', 
    expectedTypes: '.mp4,.mov', 
    color: 'from-green-500/20 to-green-400/20' 
  }
];

// Export FOLDER_CATEGORIES as an alias of FOLDERS for backward compatibility
export const FOLDER_CATEGORIES = FOLDERS;