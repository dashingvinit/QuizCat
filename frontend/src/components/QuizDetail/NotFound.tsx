import { XCircle } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">No Quiz Details Found</h2>
        <p className="text-gray-600 mt-2">The quiz history could not be retrieved.</p>
      </div>
    </div>
  );
}

export default NotFound;
