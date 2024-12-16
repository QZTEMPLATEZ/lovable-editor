import React from 'react';
import ManifestDisplay from './components/ManifestDisplay';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <ManifestDisplay />
      </div>
      <Toaster />
    </div>
  );
};

export default App;