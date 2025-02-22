
import React from 'react';
import { Video } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";

const UploadHeader = () => {
  return (
    <>
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
    </>
  );
};

export default UploadHeader;
