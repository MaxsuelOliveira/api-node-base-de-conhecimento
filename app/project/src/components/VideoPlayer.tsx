import React from 'react';
import { Play } from 'lucide-react';

const VideoPlayer: React.FC = () => {
  return (
    <div className="relative aspect-video bg-gradient-to-br from-yellow-400 via-orange-400 to-yellow-500 rounded-xl overflow-hidden shadow-lg">
      {/* Background Image Placeholder */}
      <div className="absolute inset-0 bg-black bg-opacity-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      
      {/* Centered Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <button className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center shadow-lg hover:bg-opacity-100 transition-all duration-200 hover:scale-110">
          <Play className="w-6 h-6 text-gray-800 ml-1" />
        </button>
      </div>

      {/* Mock person silhouette */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-64 bg-gradient-to-t from-yellow-600/40 to-transparent rounded-t-full" />
    </div>
  );
};

export default VideoPlayer;