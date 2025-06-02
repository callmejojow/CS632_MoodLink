import React, { useMemo, useState } from 'react';

const MoodTrends = ({ moodEntries }) => {
  const [timeView, setTimeView] = useState('week');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const moodStats = useMemo(() => {
    if (moodEntries.length === 0) return null;

    const moodCounts = moodEntries.reduce((acc, entry) => {
      acc[entry.mood.id] = (acc[entry.mood.id] || 0) + 1;
      return acc;
    }, {});

    const mostCommon = Object.entries(moodCounts).reduce((a, b) => 
      moodCounts[a[0]] > moodCounts[b[0]] ? a : b
    );

    return {
      totalEntries: moodEntries.length,
      mostCommonMood: mostCommon[0],
      mostCommonCount: mostCommon[1],
      moodCounts
    };
  }, [moodEntries]);

  // Generate chart data based on selected time view
  const generateChartData = () => {
    const moodValues = { great: 5, good: 4, okay: 3, low: 2, sad: 1 };
    
    if (timeView === 'daily') {
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
    let labelFormat;
    
    switch (timeView) {
      case 'week':
        daysToShow = 7;
        labelFormat = { weekday: 'short' };
        break;
      case 'month':
        daysToShow = 30;
        labelFormat = { day: 'numeric' };
        break;
      case 'year':
        daysToShow = 365;
        labelFormat = { month: 'short' };
        break;
      default:
        daysToShow = 7;
        labelFormat = { weekday: 'short' };
    }
    
    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      const entry = moodEntries.find(entry => entry.date === dateString);
      
      days.push({
        date: date,
        label: date.toLocaleDateString('en-US', labelFormat),
        value: entry ? moodValues[entry.mood.id] : 0,
        hasData: !!entry,
        mood: entry?.mood
      });
    }
    
    return days;
  };

  const chartData = generateChartData();

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
    
    if (timeView === 'daily') {
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

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date);
    }
    return days;
  };

  const getMoodForDate = (date) => {
    const dateString = date.toDateString();
    return moodEntries.find(entry => entry.date === dateString);
  };

  const getMoodColor = (moodId) => {
    const colors = {
      great: 'bg-secondary-400',
      good: 'bg-primary-400',
      okay: 'bg-neutral-400',
      low: 'bg-warning-400',
      sad: 'bg-red-400'
    };
    return colors[moodId] || 'bg-neutral-200';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Mood Trends</h1>
        <p className="text-neutral-600">Track your mood patterns over time</p>
      </div>

      {moodEntries.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">No mood data yet</h3>
          <p className="text-neutral-600 mb-4">Start tracking your moods to see your patterns and trends.</p>
          <button className="btn-primary">Track Your First Mood</button>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="card">
              <div className="text-2xl font-bold text-primary-600">{moodStats.totalEntries}</div>
              <div className="text-sm text-neutral-600">Total Entries</div>
            </div>
            <div className="card">
              <div className="text-2xl font-bold text-secondary-600 capitalize">{moodStats.mostCommonMood}</div>
              <div className="text-sm text-neutral-600">Most Common Mood</div>
            </div>
            <div className="card">
              <div className="text-2xl font-bold text-neutral-600">{Math.round((moodStats.mostCommonCount / moodStats.totalEntries) * 100)}%</div>
              <div className="text-sm text-neutral-600">of the time</div>
            </div>
          </div>

          {/* Interactive Chart */}
          <div className="card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800">
                  {timeView === 'daily' ? 'Daily Mood Wave' : 'Mood Chart'}
                </h3>
                {timeView === 'daily' && (
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
                  onClick={() => setTimeView('daily')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                    timeView === 'daily' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => setTimeView('week')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                    timeView === 'week' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setTimeView('month')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                    timeView === 'month' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setTimeView('year')}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors duration-200 ${
                    timeView === 'year' ? 'bg-primary-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  Year
                </button>
              </div>
            </div>

            {/* Daily Navigation */}
            {timeView === 'daily' && (
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
                      
                      if (timeView === 'daily') {
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
                          {timeView === 'daily' && (
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
                  {timeView === 'daily' ? (
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
                    timeView === 'week' && chartData.map((d, index) => (
                      <text
                        key={index}
                        x={45 + (index * (355 / (chartData.length - 1)))}
                        y={240}
                        fontSize="12"
                        fill="#737373"
                        textAnchor="middle"
                      >
                        {d.label}
                      </text>
                    ))
                  )}
                </svg>
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-400">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p className="text-lg font-medium">
                  {timeView === 'daily' ? 'No mood entries for this day' : 'No data for selected period'}
                </p>
                <p className="text-sm">
                  {timeView === 'daily' ? 'Try selecting a different day' : 'Track more moods to see trends'}
                </p>
              </div>
            )}
          </div>

          {/* 7-Day Calendar - Hide in daily view */}
          {timeView !== 'daily' && (
            <div className="card">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">Last 7 Days</h3>
              <div className="grid grid-cols-7 gap-2">
                {getLast7Days().map((date, index) => {
                  const moodEntry = getMoodForDate(date);
                  const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                  const dayNumber = date.getDate();
                  
                  return (
                    <div key={index} className="text-center">
                      <div className="text-xs text-neutral-500 mb-1">{dayName}</div>
                      <div 
                        className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-medium cursor-pointer transition-all duration-200 ${
                          moodEntry ? getMoodColor(moodEntry.mood.id) + ' hover:scale-105' : 'bg-neutral-100 text-neutral-400'
                        }`}
                        onClick={() => {
                          if (moodEntry) {
                            setTimeView('daily');
                            setSelectedDate(date);
                          }
                        }}
                      >
                        {moodEntry ? moodEntry.mood.emoji : dayNumber}
                      </div>
                      <div className="text-xs text-neutral-500 mt-1">{dayNumber}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Recent Entries */}
          <div className="card">
            <h3 className="text-lg font-semibold text-neutral-800 mb-4">Recent Entries</h3>
            <div className="space-y-3">
              {moodEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{entry.mood.emoji}</div>
                    <div>
                      <div className="font-medium text-neutral-800 capitalize">{entry.mood.label}</div>
                      <div className="text-sm text-neutral-500">
                        {new Date(entry.timestamp).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>
                  {entry.note && (
                    <div className="text-sm text-neutral-600 max-w-xs truncate">
                      "{entry.note}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoodTrends; 