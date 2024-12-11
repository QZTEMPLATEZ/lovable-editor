import React from 'react';

interface HeaderBannerProps {
  title: string;
}

const HeaderBanner = ({ title }: HeaderBannerProps) => {
  return (
    <div className="relative [aspect-ratio:21/9] bg-editor-panel overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <h1 className="text-4xl md:text-5xl font-cinzel tracking-[0.2em] text-white/90 uppercase">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default HeaderBanner;