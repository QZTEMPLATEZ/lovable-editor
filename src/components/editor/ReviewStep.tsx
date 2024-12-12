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
    // Updated XML structure based on CC2025 format
    const sequences = {
      'cc2025': `<?xml version="1.0" encoding="UTF-8"?>
        <PremiereData Version="25">
          <Project ObjectRef="1"/>
          <Project ObjectID="1" ClassID="62ad66dd-0dcd-42da-a660-6d8fbde94876" Version="36">
            <Node Version="1">
              <Properties Version="1">
                <ProjectViewState.List ObjectID="2" ClassID="0962db4c-6349-4e53-b06c-6bbd45a9ac59" Version="3">
                  <ProjectViewState Version="1">
                    <TreeState Version="1">
                      <Node Version="1">
                        <Properties Version="1">
                          <Tree.Expanded>true</Tree.Expanded>
                        </Properties>
                      </Node>
                    </TreeState>
                  </ProjectViewState>
                </ProjectViewState.List>
              </Properties>
            </Node>
            <RootProjectItem ObjectRef="3"/>
            <ProjectSettings ObjectRef="4"/>
          </Project>
          <RootProjectItem ObjectID="3" ClassID="1c307a89-9318-47d7-a583-bf2553736543" Version="1">
            <ProjectItem Version="1">
              <Name>Wedding Highlights</Name>
            </ProjectItem>
            <Items Version="1">
              <Item Index="0" ObjectRef="5"/>
            </Items>
          </RootProjectItem>
          <ProjectSettings ObjectID="4" ClassID="50c16708-a1a1-4d2f-98d5-4e283ae28353" Version="18">
            <VideoSettings ObjectRef="6"/>
            <AudioSettings ObjectRef="7"/>
          </ProjectSettings>
          <VideoSettings ObjectID="6" ClassID="58474264-30c4-43a2-bba5-dc0812df8a3a" Version="9">
            <FrameRate>8475667200</FrameRate>
            <FrameSize>0,0,1920,1080</FrameSize>
            <PixelAspectRatio>1,1</PixelAspectRatio>
            <MaximumBitDepth>false</MaximumBitDepth>
          </VideoSettings>
          <AudioSettings ObjectID="7" ClassID="6baf5521-b132-4634-840e-13cec5bc86a4" Version="7">
            <FrameRate>5292000</FrameRate>
            <ChannelType>1</ChannelType>
          </AudioSettings>
        </PremiereData>`,
      'cc2024': `<?xml version="1.0" encoding="UTF-8"?>
        <PremiereData Version="24">
          // ... similar structure but with Version="24"
        </PremiereData>`,
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