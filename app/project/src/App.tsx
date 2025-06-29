import React from 'react';
import Sidebar from './components/Sidebar';
import CourseContent from './components/CourseContent';
import Breadcrumb from './components/Breadcrumb';
import CourseHeader from './components/CourseHeader';
import VideoPlayer from './components/VideoPlayer';
import CourseTabs from './components/CourseTabs';

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeItem="courses" />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl">
            <Breadcrumb />
            <CourseHeader />
            
            {/* Video Player */}
            <div className="mb-8">
              <VideoPlayer />
            </div>
            
            {/* Course Details */}
            <CourseTabs />
          </div>
        </div>
        
        {/* Course Content Sidebar */}
        <CourseContent />
      </div>
    </div>
  );
}

export default App;