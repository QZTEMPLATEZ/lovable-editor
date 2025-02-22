import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import TrackList from '../music/TrackList';
import { createAudioElement, cleanupAudioElement, validateAudioFile } from '@/utils/audioUtils';
import { detectBeats } from '@/utils/audioProcessing';
import { APP_CONFIG } from '@/config/appConfig';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { Video, Music, Link2, X } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import CloudLinkInput from './sections/CloudLinkInput';
import MaterialUploadHeader from './sections/MaterialUploadHeader';
import { Button } from '@/components/ui/button';

interface MusicTrackSelectorProps {
  onMusicSelect: (file: File, beats: any[]) => void;
}

interface SelectedTrack {
  file: File;
  beats: any[];
}

interface CloudLink {
  url: string;
  id: string;
}

const MusicSelector = ({ onMusicSelect }: MusicTrackSelectorProps) => {
  const [selectedTracks, setSelectedTracks] = useState<SelectedTrack[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const [musicCloudLink, setMusicCloudLink] = useState('');
  const [videoCloudLink, setVideoCloudLink] = useState('');
  const [musicLinks, setMusicLinks] = useState<CloudLink[]>([]);
  const [videoLinks, setVideoLinks] = useState<CloudLink[]>([]);
  const { toast } = useToast();
  const { setSelectedMusic } = useVideoType();

  const handleMusicCloudLink = async () => {
    if (!musicCloudLink.trim()) {
      toast({
        variant: "destructive",
        title: "Link inválido",
        description: "Por favor, insira um link válido para a música",
      });
      return;
    }

    if (musicLinks.length >= 3) {
      toast({
        variant: "destructive",
        title: "Limite atingido",
        description: "Você pode adicionar no máximo 3 links de música",
      });
      return;
    }

    try {
      setMusicLinks([...musicLinks, { url: musicCloudLink, id: Date.now().toString() }]);
      toast({
        title: "Link adicionado",
        description: "Link da música foi adicionado com sucesso",
      });
      setMusicCloudLink('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no processamento",
        description: "Não foi possível processar o arquivo de música do link fornecido",
      });
    }
  };

  const handleVideoCloudLink = async () => {
    if (!videoCloudLink.trim()) {
      toast({
        variant: "destructive",
        title: "Link inválido",
        description: "Por favor, insira um link válido para o vídeo",
      });
      return;
    }

    if (videoLinks.length >= 3) {
      toast({
        variant: "destructive",
        title: "Limite atingido",
        description: "Você pode adicionar no máximo 3 links de vídeo",
      });
      return;
    }

    try {
      setVideoLinks([...videoLinks, { url: videoCloudLink, id: Date.now().toString() }]);
      toast({
        title: "Link adicionado",
        description: "Link do vídeo foi adicionado com sucesso",
      });
      setVideoCloudLink('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no processamento",
        description: "Não foi possível processar o arquivo de vídeo do link fornecido",
      });
    }
  };

  const removeVideoLink = (id: string) => {
    setVideoLinks(videoLinks.filter(link => link.id !== id));
  };

  const removeMusicLink = (id: string) => {
    setMusicLinks(musicLinks.filter(link => link.id !== id));
  };

    const handleMusicUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files).filter(validateAudioFile);
    
    if (selectedTracks.length + newFiles.length > APP_CONFIG.music.maxTracks) {
      toast({
        variant: "destructive",
        title: "Too many tracks",
        description: `Maximum ${APP_CONFIG.music.maxTracks} tracks allowed`,
      });
      return;
    }

    if (newFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Invalid file format",
        description: "Please upload WAV or MP3 files only",
      });
      return;
    }

    await processFiles(newFiles);
  };

  const processFiles = async (files: File[]) => {
    setIsAnalyzing(true);
    
    try {
      const analyzedTracks: SelectedTrack[] = [];
      
      for (const file of files) {
        const beats = await detectBeats(file);
        onMusicSelect(file, beats);
        
        const audio = createAudioElement(file);
        setAudioElements(prev => ({
          ...prev,
          [file.name]: audio
        }));

        analyzedTracks.push({ file, beats });
      }

      const updatedTracks = [...selectedTracks, ...analyzedTracks];
      setSelectedTracks(updatedTracks);
      setSelectedMusic(updatedTracks.map(track => track.file));

      toast({
        title: "Music Analysis Complete",
        description: `${files.length} track${files.length === 1 ? '' : 's'} analyzed. Total tracks: ${updatedTracks.length}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Unable to analyze music beats. Please try another track.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const togglePlayPause = (fileName: string) => {
    const audio = audioElements[fileName];
    if (!audio) return;

    if (playingTrack === fileName) {
      audio.pause();
      setPlayingTrack(null);
    } else {
      if (playingTrack && audioElements[playingTrack]) {
        audioElements[playingTrack].pause();
      }
      audio.play();
      setPlayingTrack(fileName);
    }
  };

  const removeTrack = (index: number) => {
    const removedFile = selectedTracks[index];
    if (audioElements[removedFile.file.name]) {
      cleanupAudioElement(audioElements[removedFile.file.name]);
      const newAudioElements = { ...audioElements };
      delete newAudioElements[removedFile.file.name];
      setAudioElements(newAudioElements);
    }
    
    const updatedTracks = selectedTracks.filter((_, i) => i !== index);
    setSelectedTracks(updatedTracks);
    setSelectedMusic(updatedTracks.map(track => track.file));
    
    if (playingTrack === removedFile.file.name) {
      setPlayingTrack(null);
    }
    toast({
      title: "Track Removed",
      description: "Music track has been removed from the selection",
    });
  };

  const LinkItem = ({ link, onRemove }: { link: CloudLink; onRemove: () => void }) => (
    <div className="flex items-center justify-between bg-purple-500/10 rounded-lg px-4 py-2 gap-2">
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Link2 className="w-4 h-4 text-purple-400 shrink-0" />
        <span className="truncate text-purple-200 text-sm">{link.url}</span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-purple-300 hover:text-red-400 hover:bg-red-500/10"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-editor-bg/95 to-editor-bg/80 p-8 rounded-2xl backdrop-blur-lg border border-purple-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none" />
        
        <div className="relative space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-purple-400" />
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
                Upload de Material
              </h3>
            </div>
          </div>

          <Alert className="bg-purple-500/10 border-purple-500/30">
            <AlertDescription className="text-purple-200">
              Adicione seus vídeos e músicas através de links da nuvem (Dropbox, Google Drive, etc).
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            {/* Seção de Vídeos */}
            <div className="space-y-4">
              <MaterialUploadHeader icon="video" title="Vídeos" />
              <CloudLinkInput
                value={videoCloudLink}
                onChange={setVideoCloudLink}
                onSubmit={handleVideoCloudLink}
                placeholder="Cole aqui o link do vídeo (Dropbox, Google Drive, etc)"
                buttonText="Adicionar Vídeo"
              />
              {videoLinks.length > 0 && (
                <div className="space-y-2">
                  {videoLinks.map(link => (
                    <LinkItem 
                      key={link.id} 
                      link={link} 
                      onRemove={() => removeVideoLink(link.id)} 
                    />
                  ))}
                </div>
              )}
            </div>

            <Separator className="bg-purple-500/20" />

            {/* Seção de Músicas */}
            <div className="space-y-4">
              <MaterialUploadHeader icon="music" title="Músicas" />
              <CloudLinkInput
                value={musicCloudLink}
                onChange={setMusicCloudLink}
                onSubmit={handleMusicCloudLink}
                placeholder="Cole aqui o link da música (Dropbox, Google Drive, etc)"
                buttonText="Adicionar Música"
              />
              {musicLinks.length > 0 && (
                <div className="space-y-2">
                  {musicLinks.map(link => (
                    <LinkItem 
                      key={link.id} 
                      link={link} 
                      onRemove={() => removeMusicLink(link.id)} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <TrackList
            tracks={selectedTracks.map(track => ({
              file: track.file,
              duration: '',
              intensity: 1
            }))}
            playingTrack={playingTrack}
            isAnalyzing={isAnalyzing}
            onTogglePlay={togglePlayPause}
            onRemoveTrack={removeTrack}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicSelector;
