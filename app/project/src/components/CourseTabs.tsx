import React, { useState } from 'react';
import { Check } from 'lucide-react';

const CourseTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'author', label: 'Author' },
    { id: 'faq', label: 'FAQ' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const learningPoints = [
    'Setting up the environment',
    'Advanced HTML Practices',
    'Build a portfolio website',
    'Responsive Designs',
    'Understand HTML Programming',
    'Code HTML',
    'Start building beautiful websites'
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About Course</h2>
            <div className="prose text-gray-600 space-y-4">
              <p>
                Unlock the power of Figma, the leading collaborative design tool, with our comprehensive online course. 
                Whether you're a novice or looking to enhance your skills, this course will guide you through Figma's robust 
                features and workflows.
              </p>
              <p>
                Perfect for UI/UX designers, product managers, and anyone interested in modern design tools. Join us to elevate 
                your design skills and boost your productivity with Figma!
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-6">What You'll Learn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'author' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Author information would be displayed here.</p>
        </div>
      )}

      {activeTab === 'faq' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Frequently asked questions would be displayed here.</p>
        </div>
      )}

      {activeTab === 'announcements' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Course announcements would be displayed here.</p>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="text-center py-12">
          <p className="text-gray-500">Student reviews would be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default CourseTabs;