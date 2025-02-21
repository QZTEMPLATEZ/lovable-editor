
import { generatePremiereXML } from './premiere/premiereXMLGenerators';
import { toast } from "@/components/ui/use-toast";

interface ExportOptions {
  format: 'premiere' | 'resolve' | 'fcpx';
  includeAudio: boolean;
  includeTransitions: boolean;
  projectName: string;
}

export const exportProject = async (
  categorizedFiles: Map<string, File[]>,
  musicTracks: File[],
  options: ExportOptions
): Promise<void> => {
  try {
    console.log('Starting project export with options:', options);

    // Prepare video clips data
    const videoClips = Array.from(categorizedFiles.entries()).flatMap(
      ([category, files], categoryIndex) =>
        files.map((file, fileIndex) => ({
          id: `clip_${categoryIndex}_${fileIndex}`,
          source: file.name,
          inPoint: 0,
          outPoint: 300, // Placeholder duration
          category,
          duration: 300
        }))
    );

    // Prepare audio tracks data
    const audioTracks = musicTracks.map((track, index) => ({
      id: `audio_${index}`,
      source: track.name,
      startTime: 0,
      duration: 300, // Placeholder duration
      volume: 1.0
    }));

    // Add default transitions
    const transitions = videoClips.slice(1).map((_, index) => ({
      type: 'dissolve' as const,
      duration: 30 // 1 second at 30fps
    }));

    // Generate XML based on selected format
    let exportData: string;
    switch (options.format) {
      case 'premiere':
        exportData = generatePremiereXML(
          options.projectName,
          videoClips,
          options.includeAudio ? audioTracks : [],
          options.includeTransitions ? transitions : []
        );
        break;
      // Add support for other formats here
      default:
        throw new Error(`Unsupported export format: ${options.format}`);
    }

    // Create and download the file
    const blob = new Blob([exportData], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${options.projectName}.xml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('Project exported successfully');
    toast({
      title: "Exportação Concluída",
      description: "Projeto exportado com sucesso. Verifique seus downloads.",
    });
  } catch (error) {
    console.error('Error exporting project:', error);
    toast({
      variant: "destructive",
      title: "Erro na Exportação",
      description: "Falha ao exportar o projeto. Por favor, tente novamente.",
    });
  }
};
