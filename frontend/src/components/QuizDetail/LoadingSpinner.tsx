import { Trophy } from 'lucide-react';

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <Trophy className="mx-auto h-16 w-16 text-blue-500 mb-4" />
          <p className="text-xl text-gray-600">Loading quiz results...</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
