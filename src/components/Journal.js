import React from 'react';

const Journal = ({ moodEntries, setCurrentView }) => {
  const entriesWithNotes = moodEntries.filter(entry => entry.note && entry.note.trim());

  // Get background color based on mood
  const getMoodBackgroundColor = (moodId) => {
    const moodColors = {
      great: 'bg-emerald-100',
      good: 'bg-sky-100', 
      okay: 'bg-yellow-100',
      low: 'bg-zinc-100',
      sad: 'bg-red-100'
    };
    return moodColors[moodId] || 'bg-neutral-100';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Journal</h1>
        <p className="text-neutral-600">Your personal collection of mood entries with notes and reflections</p>
      </div>

      {entriesWithNotes.length === 0 ? (
        <div className="card text-center py-12">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2">No journal entries yet</h3>
          <p className="text-neutral-600 mb-6 max-w-md mx-auto">
            Your journal will display all your mood entries that include personal notes and reflections. 
            Track your mood with notes on the dashboard to start building your journal.
          </p>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className="btn-primary"
          >
            Write Your First Journal Entry
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {entriesWithNotes.map((entry) => (
            <div 
              key={entry.id} 
              className={`${getMoodBackgroundColor(entry.mood.id)} rounded-xl shadow-sm border border-black p-6`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-neutral-50 rounded-full flex items-center justify-center border border-black">
                    <span className="text-xl">{entry.mood.emoji}</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-neutral-800 capitalize">
                        Feeling {entry.mood.label}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {new Date(entry.timestamp).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-neutral-800 leading-relaxed whitespace-pre-wrap">
                      {entry.note}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Journal Tips */}
      <div className="card">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-primary-800 mb-2">How to Build Your Journal</h4>
            <ul className="text-primary-700 text-sm space-y-1">
              <li>• Track your mood on the dashboard and add a note</li>
              <li>• Write about what triggered your mood</li>
              <li>• Describe your thoughts and feelings</li>
              <li>• Note what you're grateful for</li>
              <li>• Track patterns in your daily life</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal; 