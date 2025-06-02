import React, { useState } from 'react';
import MoodSelector from './MoodSelector';

const Dashboard = ({ addMoodEntry }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleMoodSave = () => {
    if (selectedMood) {
      addMoodEntry(selectedMood, note);
      setSelectedMood(null);
      setNote('');
      setShowNoteInput(false);
      setShowConfirmation(true);
      
      // Hide confirmation after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mood Entry Section */}
      <div className="card">
        <h2 className="text-xl font-semibold text-neutral-800 mb-6">
          How are you feeling right now?
        </h2>
        
        <MoodSelector 
          selectedMood={selectedMood}
          onMoodSelect={setSelectedMood}
        />

        {/* Optional Note Input */}
        <div className="mt-6">
          {!showNoteInput ? (
            <button
              onClick={() => setShowNoteInput(true)}
              className="text-primary-600 hover:text-primary-700 text-sm font-medium transition-colors duration-200"
            >
              + Add more detail (optional)
            </button>
          ) : (
            <div className="space-y-3">
              <label htmlFor="mood-note" className="block text-sm font-medium text-neutral-700">
                How are you feeling? (optional)
              </label>
              <textarea
                id="mood-note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Share what's on your mind..."
                className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                rows={3}
              />
              <button
                onClick={() => setShowNoteInput(false)}
                className="text-neutral-500 hover:text-neutral-700 text-sm transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Save Button */}
        {selectedMood && (
          <div className="mt-6">
            <button
              onClick={handleMoodSave}
              className="btn-primary w-full sm:w-auto"
            >
              Save Mood Entry
            </button>
          </div>
        )}

        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="mt-4 p-4 bg-secondary-50 border border-secondary-200 rounded-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 text-secondary-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-secondary-800 font-medium">Mood entry saved successfully!</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mood Trends Card */}
        <div className="card hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Mood Trends</h3>
              <p className="text-neutral-600 text-sm mb-3">
                View your mood patterns and track your progress over time
              </p>
              <div className="flex items-center text-primary-600 text-sm font-medium">
                View trends
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Card */}
        <div className="card hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-neutral-800 mb-2">Insights</h3>
              <p className="text-neutral-600 text-sm mb-3">
                Get personalized tips and resources based on your mood patterns
              </p>
              <div className="flex items-center text-primary-600 text-sm font-medium">
                View insights
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 