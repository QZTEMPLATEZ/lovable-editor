import React from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from "@/components/ui/scroll-area";
import { FolderCategory } from '@/types';
import { AnalysisResult } from '@/services/FileAnalysisService';

interface CategoryGridProps {
  categories: FolderCategory[];
  analysisResults: AnalysisResult[];
}

const CategoryGrid = ({ categories, analysisResults }: CategoryGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {categories.map((category) => (
        <motion.div
          key={category.name}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`p-4 rounded-xl border ${category.color} backdrop-blur-sm`}
        >
          <div className="flex items-center gap-3 mb-2">
            {category.icon}
            <h3 className="font-semibold text-white">{category.name}</h3>
            <span className="ml-auto bg-white/10 px-2 py-1 rounded-full text-sm">
              {analysisResults.filter(r => r.category === category.name).length}
            </span>
          </div>
          {analysisResults.filter(r => r.category === category.name).length > 0 && (
            <ScrollArea className="h-32 mt-2">
              {analysisResults
                .filter(r => r.category === category.name)
                .map((result, index) => (
                  <div key={index} className="text-sm text-gray-300 py-1 px-2">
                    {result.file.name}
                  </div>
                ))}
            </ScrollArea>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryGrid;