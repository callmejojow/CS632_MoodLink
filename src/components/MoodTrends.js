import React, { useMemo } from 'react';

const MoodTrends = ({ moodEntries }) => {
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

          {/* 7-Day Calendar */}
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
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-medium ${
                      moodEntry ? getMoodColor(moodEntry.mood.id) : 'bg-neutral-100 text-neutral-400'
                    }`}>
                      {moodEntry ? moodEntry.mood.emoji : dayNumber}
                    </div>
                    <div className="text-xs text-neutral-500 mt-1">{dayNumber}</div>
                  </div>
                );
              })}
            </div>
          </div>

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