import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopNavigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full py-6 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <span 
          onClick={() => navigate('/duration')}
          className="font-['Cinzel'] text-3xl font-semibold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300 hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          OSÍRIZ
        </span>
      </div>
    </nav>
  );
};

export default TopNavigation;