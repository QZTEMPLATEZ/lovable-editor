import React from 'react';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative ${className}`}>
      <img
        src="/lovable-uploads/72e20526-5c13-4d4b-b33e-fa614b5f1c21.png"
        alt="Wedding Templatez Logo"
        className="w-12 h-12 object-contain"
      />
    </div>
  );
};

export default Logo;