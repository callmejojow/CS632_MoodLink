import React from 'react';

const MoodSelector = ({ selectedMood, onMoodSelect }) => {
  const moods = [
    { 
      id: 'great', 
      emoji: '😊', 
      label: 'Great', 
      color: 'bg-emerald-100',
      selectedColor: 'bg-emerald-400'
    },
    { 
      id: 'good', 
      emoji: '🙂', 
      label: 'Good', 
      color: 'bg-sky-100',
      selectedColor: 'bg-sky-400'
    },
    { 
      id: 'okay', 
      emoji: '😐', 
      label: 'Okay', 
      color: 'bg-yellow-100',
      selectedColor: 'bg-yellow-400'
    },
    { 
      id: 'low', 
      emoji: '🙁', 
      label: 'Low', 
      color: 'bg-zinc-100',
      selectedColor: 'bg-zinc-400'
    },
    { 
      id: 'sad', 
      emoji: '😢', 
      label: 'Sad', 
      color: 'bg-red-100',
      selectedColor: 'bg-red-400'
    }
  ];

  const getButtonStyle = (mood) => {
    if (selectedMood?.id === mood.id) {
      // Selected mood: 3 levels darker, no border
      return `mood-button ${mood.selectedColor} selected-mood`;
    } else if (selectedMood) {
      // Other moods when one is selected: grey
      return `mood-button bg-gray-300`;
    } else {
      // No mood selected: original colors
      return `mood-button ${mood.color} hover:bg-opacity-80`;
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Mood Buttons - Single row on all screen sizes */}
      <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 overflow-x-auto pb-2 pt-4 px-1 sm:px-2">
        {moods.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood)}
            className={getButtonStyle(mood)}
            aria-label={`Select ${mood.label} mood`}
          >
            <span className="text-xl sm:text-2xl md:text-3xl">{mood.emoji}</span>
          </button>
        ))}
      </div>
      
      {/* Mood Labels */}
      <div className="flex justify-center gap-1 sm:gap-2 md:gap-4 px-1 sm:px-2">
        {moods.map((mood) => (
          <div
            key={`${mood.id}-label`}
            className={`text-center text-xs sm:text-sm font-medium transition-colors duration-200 min-w-[3rem] sm:min-w-[4rem] ${
              selectedMood?.id === mood.id 
                ? 'text-primary-600 dark:text-primary-400' 
                : selectedMood
                ? 'text-gray-500 dark:text-gray-400'
                : 'text-neutral-600 dark:text-neutral-300'
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