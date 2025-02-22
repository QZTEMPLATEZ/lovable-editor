
import React from 'react';
import { CloudLink } from '../types';
import { Button } from '@/components/ui/button';
import { Link2, X } from 'lucide-react';
import CloudLinkInput from '../sections/CloudLinkInput';
import MaterialUploadHeader from '../sections/MaterialUploadHeader';

interface LinkSectionProps {
  title: string;
  icon: 'video' | 'music';
  links: CloudLink[];
  inputValue: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  onRemove: (id: string) => void;
  placeholder: string;
  buttonText: string;
}

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

const LinkSection = ({
  title,
  icon,
  links,
  inputValue,
  onInputChange,
  onSubmit,
  onRemove,
  placeholder,
  buttonText,
}: LinkSectionProps) => {
  return (
    <div className="space-y-4">
      <MaterialUploadHeader icon={icon} title={title} />
      <CloudLinkInput
        value={inputValue}
        onChange={onInputChange}
        onSubmit={onSubmit}
        placeholder={placeholder}
        buttonText={buttonText}
      />
      {links.length > 0 && (
        <div className="space-y-2">
          {links.map(link => (
            <LinkItem 
              key={link.id} 
              link={link} 
              onRemove={() => onRemove(link.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LinkSection;
