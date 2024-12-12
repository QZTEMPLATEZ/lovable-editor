import React, { useState } from 'react';
import { useVideoType } from '@/contexts/VideoTypeContext';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewStep = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  const { selectedMusic, selectedStyle } = useVideoType();

  const generateSequence = async (version: string) => {
    setIsExporting(true);
    try {
      const sequenceXML = await generatePremiereSequence(version);
      downloadSequence(sequenceXML, `wedding_highlights_${version}.prproj`);
      toast({
        title: "Sequence Generated",
        description: `${version} sequence has been exported successfully.`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: error.message,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const generatePremiereSequence = async (version: string) => {
    // Different sequence formats based on version
    const sequences = {
      'cc2025': `<?xml version="1.0" encoding="UTF-8"?>
        <PremiereProject Version="25">
          <Project>
            <Name>Wedding Highlights CC2025</Name>
            <ProjectSettings>
              <ClipSettings>
                <DefaultSequenceSettings>
                  <VideoSettings>
                    <TimeDisplay>24</TimeDisplay>
                    <VideoFrameRate>24</VideoFrameRate>
                    <VideoFieldType>0</VideoFieldType>
                  </VideoSettings>
                  <AudioSettings>
                    <AudioSampleRate>48000</AudioSampleRate>
                    <AudioChannelType>1</AudioChannelType>
                  </AudioSettings>
                </DefaultSequenceSettings>
              </ClipSettings>
            </ProjectSettings>
          </Project>
        </PremiereProject>`,
      'cc2024': `<?xml version="1.0" encoding="UTF-8"?>
        <PremiereProject Version="24">
          <Project>
            <Name>Wedding Highlights CC2024</Name>
            <ProjectSettings>
              <ClipSettings>
                <DefaultSequenceSettings>
                  <VideoSettings>
                    <TimeDisplay>24</TimeDisplay>
                    <VideoFrameRate>24</VideoFrameRate>
                    <VideoFieldType>0</VideoFieldType>
                  </VideoSettings>
                  <AudioSettings>
                    <AudioSampleRate>48000</AudioSampleRate>
                    <AudioChannelType>1</AudioChannelType>
                  </AudioSettings>
                </DefaultSequenceSettings>
              </ClipSettings>
            </ProjectSettings>
          </Project>
        </PremiereProject>`,
      'xml2024': `<?xml version="1.0" encoding="UTF-8"?>
        <fcpxml version="1.10">
          <project name="Wedding Highlights XML2024">
            <sequence>
              <spine>
                <video>
                  <format>
                    <samplerate>48000</samplerate>
                    <channels>2</channels>
                    <frameDuration>1/24</frameDuration>
                  </format>
                </video>
              </spine>
            </sequence>
          </project>
        </fcpxml>`
    };

    return sequences[version] || sequences['cc2025'];
  };

  const downloadSequence = (xml: string, filename: string) => {
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-editor-bg/95 rounded-xl p-8 shadow-lg border border-purple-500/30"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Export Sequence</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => generateSequence('cc2025')}
            disabled={isExporting}
            variant="outline"
            className="w-full"
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Premiere CC 2025
          </Button>

          <Button
            onClick={() => generateSequence('cc2024')}
            disabled={isExporting}
            variant="outline"
            className="w-full"
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Premiere CC 2024
          </Button>

          <Button
            onClick={() => generateSequence('xml2024')}
            disabled={isExporting}
            variant="outline"
            className="w-full"
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            FCP XML (2024)
          </Button>
        </div>

        <p className="text-gray-400 mt-6 text-sm">
          Select your preferred export format. The FCP XML option provides broader compatibility with different editing software.
        </p>
      </motion.div>
    </div>
  );
};

export default ReviewStep;