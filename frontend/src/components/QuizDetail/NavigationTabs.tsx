import React from 'react';

// Define a type for the possible view options
type ViewType = 'summary' | 'questions';

// Define the props interface
interface NavigationTabsProps {
  activeView: ViewType;
  setActiveView: React.Dispatch<React.SetStateAction<ViewType>>;
}

function NavigationTabs({ activeView, setActiveView }: NavigationTabsProps) {
  return (
    <div className="flex border-b mb-6">
      <button
        onClick={() => setActiveView('summary')}
        className={`px-4 py-2 ${
          activeView === 'summary' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
        }`}>
        Summary
      </button>
      <button
        onClick={() => setActiveView('questions')}
        className={`px-4 py-2 ${
          activeView === 'questions' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'
        }`}>
        Question Details
      </button>
    </div>
  );
}

export default NavigationTabs;
