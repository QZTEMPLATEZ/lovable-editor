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
      'cs4': `<?xml version="1.0" encoding="UTF-8"?>
        <!DOCTYPE xmeml>
        <xmeml version="4">
          <sequence>
            <name>Wedding Highlights CS4</name>
            // ... CS4 specific XML structure
          </sequence>
        </xmeml>`,
      'cs6': `<?xml version="1.0" encoding="UTF-8"?>
        <PremiereData Version="6">
          <Project>
            <Name>Wedding Highlights CS6</Name>
            // ... CS6 specific XML structure
          </Project>
        </PremiereData>`,
      'cc2020': `<?xml version="1.0" encoding="UTF-8"?>
        <PremiereProject Version="14">
          <Project>
            <Name>Wedding Highlights CC2020</Name>
            // ... CC2020 specific XML structure
          </Project>
        </PremiereProject>`,
      'cc2023': `<?xml version="1.0" encoding="UTF-8"?>
        <PremiereProject Version="23">
          <Project>
            <Name>Wedding Highlights CC2023</Name>
            // ... CC2023 specific XML structure
          </Project>
        </PremiereProject>`,
      'xml2023': `<?xml version="1.0" encoding="UTF-8"?>
        <fcpxml version="1.9">
          <project name="Wedding Highlights XML2023">
            // ... FCP XML structure
          </project>
        </fcpxml>`
    };

    return sequences[version] || sequences['cc2023'];
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            onClick={() => generateSequence('cs4')}
            disabled={isExporting}
            variant="outline"
            className="w-full"
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Premiere CS4
          </Button>

          <Button
            onClick={() => generateSequence('cs6')}
            disabled={isExporting}
            variant="outline"
            className="w-full"
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Premiere CS6
          </Button>

          <Button
            onClick={() => generateSequence('cc2020')}
            disabled={isExporting}
            variant="outline"
            className="w-full"
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Premiere CC 2020
          </Button>

          <Button
            onClick={() => generateSequence('cc2023')}
            disabled={isExporting}
            variant="outline"
            className="w-full"
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Premiere CC 2023
          </Button>

          <Button
            onClick={() => generateSequence('xml2023')}
            disabled={isExporting}
            variant="outline"
            className="w-full"
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            FCP XML (2023)
          </Button>
        </div>

        <p className="text-gray-400 mt-6 text-sm">
          Select the version that matches your Premiere Pro installation. If one version doesn't work, try another one.
          The FCP XML option provides broader compatibility with different editing software.
        </p>
      </motion.div>
    </div>
  );
};

export default ReviewStep;