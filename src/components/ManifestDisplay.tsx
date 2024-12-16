import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Copy } from 'lucide-react';

const ManifestDisplay = () => {
  const { toast } = useToast();
  const manifestContent = `<?xml version="1.0" encoding="UTF-8"?>
<ExtensionManifest Version="7.0" ExtensionBundleId="com.meuexemplo.minhaextensao" ExtensionBundleVersion="1.0.0"
    ExtensionBundleName="QZ Templatez" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
    <ExtensionList>
        <Extension Id="com.meuexemplo.minhaextensao.panel" Version="1.0" />
    </ExtensionList>
    <ExecutionEnvironment>
        <HostList>
            <Host Name="PPRO" Version="[15.0,99.9]" />
        </HostList>
        <LocaleList>
            <Locale Code="All" />
        </LocaleList>
        <RequiredRuntimeList>
            <RequiredRuntime Name="CSXS" Version="11.0" />
        </RequiredRuntimeList>
        <DispatchInfoList>
            <Extension Id="com.meuexemplo.minhaextensao.panel">
                <DispatchInfo>
                    <Resources>
                        <MainPath>./index.html</MainPath>
                        <ScriptPath>./main.js</ScriptPath>
                        <CEFCommandLine>
                            <Parameter>--enable-nodejs</Parameter>
                            <Parameter>--mixed-context</Parameter>
                            <Parameter>--allow-file-access</Parameter>
                        </CEFCommandLine>
                    </Resources>
                    <Lifecycle>
                        <AutoVisible>true</AutoVisible>
                    </Lifecycle>
                    <UI>
                        <Type>Panel</Type>
                        <Menu>QZ Templatez</Menu>
                        <Geometry>
                            <Size>
                                <Height>600</Height>
                                <Width>400</Width>
                            </Size>
                        </Geometry>
                    </UI>
                </DispatchInfo>
            </Extension>
        </DispatchInfoList>
    </ExecutionEnvironment>
</ExtensionManifest>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(manifestContent);
      toast({
        title: "Copiado!",
        description: "O conteúdo do manifest.xml foi copiado para sua área de transferência.",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro ao copiar",
        description: "Não foi possível copiar o conteúdo. Tente novamente.",
      });
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Manifest.xml</h2>
        <Button onClick={handleCopy} variant="outline" className="flex items-center gap-2">
          <Copy className="w-4 h-4" />
          Copiar Código
        </Button>
      </div>
      <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
        <code className="text-sm text-gray-100 whitespace-pre">
          {manifestContent}
        </code>
      </pre>
    </div>
  );
};

export default ManifestDisplay;