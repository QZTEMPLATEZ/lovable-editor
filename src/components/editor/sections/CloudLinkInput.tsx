
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'lucide-react';

interface CloudLinkInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder: string;
  buttonText: string;
}

const CloudLinkInput = ({
  value,
  onChange,
  onSubmit,
  placeholder,
  buttonText,
}: CloudLinkInputProps) => {
  return (
    <div className="flex items-center gap-4 w-full">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-editor-bg/50 border-purple-500/30 text-purple-200 placeholder:text-purple-300/50"
      />
      <Button
        onClick={onSubmit}
        className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-200"
      >
        <Link className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
    </div>
  );
};

export default CloudLinkInput;
