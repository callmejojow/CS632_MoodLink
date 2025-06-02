import React, { useState } from 'react';
import MoodSelector from './MoodSelector';

const Dashboard = ({ addMoodEntry, moodEntries, setCurrentView }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [trendView, setTrendView] = useState('daily');
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  // Handle background click to reset mood selection
  const handleBackgroundClick = (e) => {
    // Only reset if clicking on the background (not on child elements)
    if (e.target === e.currentTarget) {
      setSelectedMood(null);
      setNote('');
      setShowNoteInput(false);
    }
  };

  // Generate simple line chart data for the last 7 days
  const generateChartData = () => {
    const moodValues = { great: 5, good: 4, okay: 3, low: 2, sad: 1 };
    
    if (trendView === 'daily') {
      // For daily view, show all mood entries from the selected date (max 12)
      const selectedDateString = selectedDate.toDateString();
      const dayEntries = moodEntries
        .filter(entry => entry.date === selectedDateString)
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
        .slice(0, 12); // Limit to maximum 12 entries
      
      return dayEntries.map((entry, index) => ({
        date: new Date(entry.timestamp),
        label: new Date(entry.timestamp).toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        value: moodValues[entry.mood.id],
        hasData: true,
        mood: entry.mood,
        fullEntry: entry,
        index: index // Add index for horizontal positioning
      }));
    }
    
    const days = [];
    let daysToShow;
    
    switch (trendView) {
      case 'week':
        daysToShow = 7;
        break;
      case 'month':
        daysToShow = 30;
        break;
      default:
        daysToShow = 7;
    }
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      const entry = moodEntries?.find(entry => entry.date === dateString);
      
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        value: entry ? moodValues[entry.mood.id] : 0,
        hasData: !!entry
      });
    }
    
    return days;
  };

  const chartData = generateChartData();
  const maxValue = 5;

  // Create SVG path for the line chart
  const createPath = () => {
    const width = 355;
    const height = 200;
    const dataPoints = chartData.filter(d => d.hasData);
    
    if (dataPoints.length < 1) return '';
    
    if (dataPoints.length === 1) {
      // Single point
      const x = width / 2;
      const y = height - (dataPoints[0].value / 5) * height;
      return `M ${x},${y} L ${x},${y}`;
    }
    
    if (trendView === 'daily') {
      // For daily view, space points horizontally and evenly
      const points = dataPoints.map((d, index) => {
        const x = dataPoints.length === 1 ? width / 2 : (index / (dataPoints.length - 1)) * width;
        const y = height - (d.value / 5) * height;
        return `${x},${y}`;
      });
      
      return `M ${points.join(' L ')}`;
    } else {
      // For other views, space points evenly
      const points = dataPoints.map((d, index) => {
        const xStep = width / (chartData.length - 1);
        const originalIndex = chartData.findIndex(point => point === d);
        const x = originalIndex * xStep;
        const y = height - (d.value / 5) * height;
        return `${x},${y}`;
      });
      
      return `M ${points.join(' L ')}`;
    }
  };

  // Get days that have mood entries for daily view navigation
  const getDaysWithEntries = () => {
    const daysWithEntries = new Set();
    moodEntries.forEach(entry => {
      daysWithEntries.add(entry.date);
    });
    return Array.from(daysWithEntries).sort((a, b) => new Date(b) - new Date(a));
  };

  const navigateDay = (direction) => {
    const daysWithEntries = getDaysWithEntries();
    const currentIndex = daysWithEntries.findIndex(date => date === selectedDate.toDateString());
    
    if (direction === 'prev' && currentIndex < daysWithEntries.length - 1) {
      setSelectedDate(new Date(daysWithEntries[currentIndex + 1]));
    } else if (direction === 'next' && currentIndex > 0) {
      setSelectedDate(new Date(daysWithEntries[currentIndex - 1]));
    }
  };

  const appTips = [
    "Track your mood daily for better insights",
    "Add notes to remember what influenced your mood",
    "Review your patterns in the Mood Tracker",
    "Use the Resources section for wellness tips"
  ];

  return (
    <div className="space-y-6">
      {/* Mood Entry Section */}
      <div className="mood-selector-card" onClick={handleBackgroundClick}>
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

      {/* Action Cards - Vertical on mobile, side by side on larger screens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Mood Trends Card */}
        <div className="mood-trends-card">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div>
              <h3 className="text-lg font-semibold text-neutral-800">
                {trendView === 'daily' ? 'Daily Mood Wave' : 'Mood Chart'}
              </h3>
              {trendView === 'daily' && (
                <p className="text-sm text-neutral-500 mt-1">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setTrendView('daily')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                  trendView === 'daily' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setTrendView('week')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                  trendView === 'week' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setTrendView('month')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                  trendView === 'month' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setTrendView('year')}
                className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                  trendView === 'year' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                Year
              </button>
            </div>
          </div>

          {/* Daily Navigation */}
          {trendView === 'daily' && (
            <div className="flex items-center justify-center space-x-4 mb-6">
              <button
                onClick={() => navigateDay('prev')}
                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                disabled={getDaysWithEntries().findIndex(date => date === selectedDate.toDateString()) >= getDaysWithEntries().length - 1}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-medium text-neutral-600">
                {chartData.filter(d => d.hasData).length} entries on this day
              </span>
              <button
                onClick={() => navigateDay('next')}
                className="p-2 rounded-lg hover:bg-neutral-100 transition-colors duration-200"
                disabled={getDaysWithEntries().findIndex(date => date === selectedDate.toDateString()) <= 0}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
          
          {chartData.some(d => d.hasData) ? (
            <div className="overflow-x-auto">
              <svg width="400" height="250" className="w-full max-w-full">
                {/* Y-axis labels */}
                {['Sad', 'Low', 'Okay', 'Good', 'Great'].map((label, index) => (
                  <g key={label}>
                    <line
                      x1="40"
                      y1={250 - 40 - (index * 40)}
                      x2="400"
                      y2={250 - 40 - (index * 40)}
                      stroke="#f5f5f5"
                      strokeWidth="1"
                    />
                    <text
                      x="35"
                      y={250 - 40 - (index * 40) + 4}
                      fontSize="12"
                      fill="#737373"
                      textAnchor="end"
                    >
                      {label}
                    </text>
                  </g>
                ))}
                
                {/* Chart area */}
                <g transform="translate(45, 10)">
                  {/* Data line */}
                  <path
                    d={createPath()}
                    fill="none"
                    stroke="#0ea5e9"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  
                  {/* Data points */}
                  {chartData.filter(d => d.hasData).map((d, index) => {
                    let x, y;
                    
                    if (trendView === 'daily') {
                      const dataPoints = chartData.filter(point => point.hasData);
                      x = dataPoints.length === 1 ? 355 / 2 : (index / (dataPoints.length - 1)) * 355;
                      y = 200 - (d.value / 5) * 200;
                    } else {
                      const xStep = 355 / (chartData.length - 1);
                      const originalIndex = chartData.findIndex(point => point === d);
                      x = originalIndex * xStep;
                      y = 200 - (d.value / 5) * 200;
                    }
                    
                    return (
                      <g key={index}>
                        <circle
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#0ea5e9"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="8"
                          fill="transparent"
                          className="hover:fill-primary-100 cursor-pointer"
                        />
                        {/* Emoji indicator for daily view */}
                        {trendView === 'daily' && (
                          <text
                            x={x}
                            y={y - 15}
                            fontSize="16"
                            textAnchor="middle"
                          >
                            {d.mood.emoji}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </g>
                
                {/* X-axis labels */}
                {trendView === 'daily' ? (
                  chartData.filter(d => d.hasData).map((d, index) => {
                    const dataPoints = chartData.filter(point => point.hasData);
                    const x = dataPoints.length === 1 ? 355 / 2 : (index / (dataPoints.length - 1)) * 355;
                    
                    return (
                      <text
                        key={index}
                        x={45 + x}
                        y={240}
                        fontSize="10"
                        fill="#737373"
                        textAnchor="middle"
                      >
                        {d.label}
                      </text>
                    );
                  })
                ) : (
                  trendView === 'week' && chartData.map((d, index) => (
                    <text
                      key={index}
                      x={45 + (index * (355 / (chartData.length - 1)))}
                      y={240}
                      fontSize="12"
                      fill="#737373"
                      textAnchor="middle"
                    >
                      {d.day}
                    </text>
                  ))
                )}
              </svg>
            </div>
          ) : (
            <div className="text-center py-12 text-stone-500">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-lg font-medium">
                {trendView === 'daily' ? 'No mood entries for this day' : 'No data for selected period'}
              </p>
              <p className="text-sm">
                {trendView === 'daily' ? 'Try selecting a different day' : 'Track more moods to see trends'}
              </p>
            </div>
          )}
        </div>

        {/* Insights Card */}
        <div 
          className="insights-card hover:shadow-md transition-shadow duration-200 cursor-pointer"
          onClick={() => setCurrentView('resources')}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-warning-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">Insights</h3>
            </div>
            
            <div className="space-y-2">
              {appTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-1 h-1 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-white leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
            
            <div className="flex items-center text-white text-sm font-medium mt-3">
              View resources
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 