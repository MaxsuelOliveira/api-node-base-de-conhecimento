import React from 'react';
import { 
  ChevronLeft, 
  Share2, 
  Users, 
  Clock, 
  Star,
  Bell
} from 'lucide-react';

const CourseHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
          <ChevronLeft className="w-5 h-5 mr-1" />
        </button>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm font-medium">Share</span>
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
            <span>Enroll Now</span>
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Figma from A to Z
        </h1>
        <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          UI / UX Design
        </span>
      </div>

      <div className="flex items-center space-x-6 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>39 lessons</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>4h 30min</span>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-medium text-gray-900">4.5</span>
          <span>(126 reviews)</span>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;