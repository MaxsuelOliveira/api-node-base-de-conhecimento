import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Play, Clock } from 'lucide-react';

interface Lesson {
  title: string;
  duration: string;
  completed?: boolean;
}

interface Section {
  id: string;
  title: string;
  duration: string;
  lessons: Lesson[];
  expanded?: boolean;
}

const CourseContent: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([
    {
      id: '01',
      title: 'Intro',
      duration: '22min',
      expanded: true,
      lessons: [
        { title: 'Introduction', duration: '2 min', completed: true },
        { title: 'What is Figma?', duration: '5 min' },
        { title: 'Understanding Figma', duration: '12 min' },
        { title: 'UI tour', duration: '3 min' },
      ]
    },
    {
      id: '02',
      title: 'Intermediate Level Stuff',
      duration: '1h 20min',
      lessons: []
    },
    {
      id: '03',
      title: 'Advanced Stuff',
      duration: '36min',
      lessons: []
    },
    {
      id: '04',
      title: 'Imports & Graphics',
      duration: '40min',
      lessons: []
    },
    {
      id: '05',
      title: 'Component in Figma',
      duration: '1h 12min',
      lessons: []
    },
    {
      id: '06',
      title: 'Styles in Figma',
      duration: '41min',
      lessons: []
    },
    {
      id: '07',
      title: 'Summary',
      duration: '8min',
      lessons: []
    }
  ]);

  const toggleSection = (sectionId: string) => {
    setSections(prev => prev.map(section => 
      section.id === sectionId 
        ? { ...section, expanded: !section.expanded }
        : section
    ));
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course content</h3>
        
        {sections.map((section) => (
          <div key={section.id} className="mb-3">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-900">
                  {section.id}: {section.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{section.duration}</span>
                {section.expanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>

            {section.expanded && section.lessons.length > 0 && (
              <div className="mt-2 ml-4 space-y-1">
                {section.lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <Play className="w-3 h-3 text-gray-400" />
                      <span className="text-sm text-gray-700">{lesson.title}</span>
                    </div>
                    <span className="text-xs text-gray-500">{lesson.duration}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Author Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Author</h4>
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-medium">CL</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h5 className="font-medium text-gray-900">Crystal Lucas</h5>
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">UI/UX Specialist</p>
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {'★'.repeat(5)}
              </div>
              <span className="text-sm text-gray-600">(4.8)</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Crystal is a seasoned UI/UX designer with over a decade of experience...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;