import React from 'react';

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  const moods = [
    { id: 'great', emoji: '😊', label: 'Great', color: 'bg-secondary-100' },
    { id: 'good', emoji: '🙂', label: 'Good', color: 'bg-primary-100' },
    { id: 'okay', emoji: '😐', label: 'Okay', color: 'bg-neutral-100' },
    { id: 'low', emoji: '🙁', label: 'Low', color: 'bg-warning-100' },
    { id: 'sad', emoji: '😢', label: 'Sad', color: 'bg-red-100' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood)}
            className={`mood-button ${mood.color} ${
              selectedMood?.id === mood.id ? 'selected' : 'hover:bg-opacity-80'
            }`}
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="text-3xl">{mood.emoji}</span>
          </button>
        ))}
      </div>
      
      {/* Mood Labels */}
      <div className="flex flex-wrap justify-center gap-4">
        {moods.map((mood) => (
          <div
            key={`${mood.id}-label`}
            className={`text-center text-sm font-medium transition-colors duration-200 ${
              selectedMood?.id === mood.id 
                ? 'text-primary-600' 
                : 'text-neutral-600'
            }`}
          >
            {mood.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector; 