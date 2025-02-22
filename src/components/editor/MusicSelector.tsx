import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import TrackList from '../music/TrackList';
import MusicUploadSection from '../music/MusicUploadSection';
import { createAudioElement, cleanupAudioElement, validateAudioFile } from '@/utils/audioUtils';
import { detectBeats } from '@/utils/audioProcessing';
import { APP_CONFIG } from '@/config/appConfig';
import { useVideoType } from '@/contexts/VideoTypeContext';
import MusicHeader from './music/MusicHeader';
import ContinueButton from './music/ContinueButton';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link, Music, Video } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";

interface MusicTrackSelectorProps {
  onMusicSelect: (file: File, beats: any[]) => void;
}

interface SelectedTrack {
  file: File;
  beats: any[];
}

const MusicSelector = ({ onMusicSelect }: MusicTrackSelectorProps) => {
  const [selectedTracks, setSelectedTracks] = useState<SelectedTrack[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});
  const [musicCloudLink, setMusicCloudLink] = useState('');
  const [videoCloudLink, setVideoCloudLink] = useState('');
  const { toast } = useToast();
  const { setSelectedMusic } = useVideoType();

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

  const handleCloudLink = async () => {
    if (!musicCloudLink.trim()) {
      toast({
        variant: "destructive",
        title: "Link inválido",
        description: "Por favor, insira um link válido",
      });
      return;
    }

    try {
      // Aqui você implementaria a lógica para baixar e processar o arquivo do link
      toast({
        title: "Processando link",
        description: "Iniciando download do arquivo de música...",
      });
      // Por enquanto vamos apenas mostrar que recebemos o link
      console.log('Processando link:', musicCloudLink);
      setMusicCloudLink('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no processamento",
        description: "Não foi possível processar o arquivo do link fornecido",
      });
    }
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

  const handleMusicCloudLink = async () => {
    if (!musicCloudLink.trim()) {
      toast({
        variant: "destructive",
        title: "Link inválido",
        description: "Por favor, insira um link válido para a música",
      });
      return;
    }

    try {
      toast({
        title: "Processando link",
        description: "Iniciando download do arquivo de música...",
      });
      console.log('Processando link de música:', musicCloudLink);
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

    try {
      toast({
        title: "Processando link",
        description: "Iniciando download do arquivo de vídeo...",
      });
      console.log('Processando link de vídeo:', videoCloudLink);
      setVideoCloudLink('');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro no processamento",
        description: "Não foi possível processar o arquivo de vídeo do link fornecido",
      });
    }
  };

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
            <ContinueButton hasSelectedTracks={selectedTracks.length > 0} />
          </div>

          <Alert className="bg-purple-500/10 border-purple-500/30">
            <AlertDescription className="text-purple-200">
              Adicione seus vídeos e músicas através de upload direto ou links da nuvem (Dropbox, Google Drive, etc).
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            {/* Seção de Vídeos */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-200 flex items-center gap-2">
                <Video className="w-4 h-4" /> Vídeos
              </h4>
              <div className="flex items-center gap-4 w-full">
                <Input
                  type="text"
                  placeholder="Cole aqui o link do vídeo (Dropbox, Google Drive, etc)"
                  value={videoCloudLink}
                  onChange={(e) => setVideoCloudLink(e.target.value)}
                  className="flex-1 bg-editor-bg/50 border-purple-500/30 text-purple-200 placeholder:text-purple-300/50"
                />
                <Button
                  onClick={handleVideoCloudLink}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Adicionar Vídeo
                </Button>
              </div>
            </div>

            <Separator className="bg-purple-500/20" />

            {/* Seção de Músicas */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-purple-200 flex items-center gap-2">
                <Music className="w-4 h-4" /> Músicas
              </h4>
              <div className="flex items-center gap-4 w-full">
                <Input
                  type="text"
                  placeholder="Cole aqui o link da música (Dropbox, Google Drive, etc)"
                  value={musicCloudLink}
                  onChange={(e) => setMusicCloudLink(e.target.value)}
                  className="flex-1 bg-editor-bg/50 border-purple-500/30 text-purple-200 placeholder:text-purple-300/50"
                />
                <Button
                  onClick={handleMusicCloudLink}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200"
                >
                  <Link className="w-4 h-4 mr-2" />
                  Adicionar Música
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none" />
                <div className="text-center p-4 border-2 border-dashed border-purple-500/30 rounded-xl">
                  <Music className="w-12 h-12 mx-auto text-purple-400 mb-2" />
                  <p className="text-purple-200 mb-2">ou faça upload direto dos arquivos</p>
                  <MusicUploadSection 
                    onMusicUpload={handleMusicUpload}
                    maxTracks={APP_CONFIG.music.maxTracks}
                  />
                </div>
              </div>
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
