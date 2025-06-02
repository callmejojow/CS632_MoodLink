import React, { useState } from 'react';

const Settings = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [reminderTime, setReminderTime] = useState('18:00');

  const handleExportData = () => {
    const moodData = localStorage.getItem('moodlink-entries');
    if (moodData) {
      const dataStr = JSON.stringify(JSON.parse(moodData), null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `moodlink-data-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
    }
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to delete all your mood data? This action cannot be undone.')) {
      localStorage.removeItem('moodlink-entries');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Settings</h1>
        <p className="text-neutral-600">Customize your MoodLink experience</p>
      </div>

      {/* Notifications */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-neutral-700">Daily Mood Reminders</label>
              <p className="text-xs text-neutral-500">Get reminded to track your mood</p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                notifications ? 'bg-primary-600' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          
          {notifications && (
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-neutral-700">Reminder Time:</label>
              <input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>

      {/* Appearance */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Appearance</h3>
        <div className="flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-neutral-700">Dark Mode</label>
            <p className="text-xs text-neutral-500">Switch to dark theme</p>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              darkMode ? 'bg-primary-600' : 'bg-neutral-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-neutral-700">Export Data</label>
              <p className="text-xs text-neutral-500">Download your mood data as JSON</p>
            </div>
            <button onClick={handleExportData} className="btn-secondary text-sm">
              Export
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-neutral-700">Clear All Data</label>
              <p className="text-xs text-neutral-500">Permanently delete all mood entries</p>
            </div>
            <button onClick={handleClearData} className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors duration-200">
              Clear Data
            </button>
          </div>
        </div>
      </div>

      {/* Privacy */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">Privacy</h3>
        <div className="space-y-3">
          <p className="text-sm text-neutral-600">
            Your mood data is stored locally on your device and never shared with third parties.
          </p>
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-secondary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs text-neutral-600">Data stored locally on your device</span>
          </div>
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-secondary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs text-neutral-600">No data shared with third parties</span>
          </div>
          <div className="flex items-start space-x-2">
            <svg className="w-4 h-4 text-secondary-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-xs text-neutral-600">You control your data completely</span>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="card">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">About MoodLink</h3>
        <div className="space-y-2">
          <p className="text-sm text-neutral-600">Version 1.0.0</p>
          <p className="text-xs text-neutral-500">
            MoodLink is designed to help you track your mental health and wellbeing. 
            Always consult with healthcare professionals for serious mental health concerns.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings; 