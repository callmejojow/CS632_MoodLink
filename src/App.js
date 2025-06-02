import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import MoodTrends from './components/MoodTrends';
import Journal from './components/Journal';
import Resources from './components/Resources';
import Settings from './components/Settings';
import CrisisSupport from './components/CrisisSupport';
import Sidebar from './components/Sidebar';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [moodEntries, setMoodEntries] = useState([]);

  // Load mood entries from localStorage on app start
  useEffect(() => {
    const savedEntries = localStorage.getItem('moodlink-entries');
    if (savedEntries) {
      setMoodEntries(JSON.parse(savedEntries));
    }
  }, []);

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodlink-entries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  const addMoodEntry = (mood, note = '') => {
    const newEntry = {
      id: Date.now(),
      mood,
      note,
      timestamp: new Date().toISOString(),
      date: new Date().toDateString()
    };
    setMoodEntries(prev => [newEntry, ...prev]);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard addMoodEntry={addMoodEntry} />;
      case 'mood-tracker':
        return <MoodTrends moodEntries={moodEntries} />;
      case 'journal':
        return <Journal moodEntries={moodEntries} />;
      case 'resources':
        return <Resources />;
      case 'settings':
        return <Settings />;
      case 'crisis-support':
        return <CrisisSupport />;
      default:
        return <Dashboard addMoodEntry={addMoodEntry} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-primary-600">MoodLink</h1>
              <p className="text-sm text-neutral-500">Your wellness companion</p>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen}
          currentView={currentView}
          setCurrentView={setCurrentView}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            {renderCurrentView()}
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App; 