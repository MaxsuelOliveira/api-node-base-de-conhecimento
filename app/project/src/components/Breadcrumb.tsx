import React from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';

const Breadcrumb: React.FC = () => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
      <BookOpen className="w-4 h-4" />
      <span>Courses</span>
      <ChevronRight className="w-4 h-4" />
      <span>UI UX Design</span>
      <ChevronRight className="w-4 h-4" />
      <span className="text-gray-900 font-medium">Figma from A to Z</span>
    </nav>
  );
};

export default Breadcrumb;